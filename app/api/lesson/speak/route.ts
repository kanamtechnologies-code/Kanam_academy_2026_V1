import { NextResponse } from "next/server";

import {
  clientIpFromRequest,
  enforceRateLimits,
} from "@/lib/auth/rateLimit";
import { LESSON_SPEECH_MAX_CHARS } from "@/lib/lessonSpeech";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const runtime = "nodejs";

type SpeakBody = {
  text?: unknown;
};

const AUTH_LIMIT = { limit: 40, windowMs: 10 * 60 * 1000 };
const ANON_LIMIT = { limit: 8, windowMs: 10 * 60 * 1000 };

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Lesson narration is not configured (missing OPENAI_API_KEY)." },
      { status: 503 }
    );
  }

  let userId: string | null = null;
  try {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    userId = user?.id ?? null;
  } catch {
    userId = null;
  }

  const bucketKey = userId ? `speak:user:${userId}` : `speak:ip:${clientIpFromRequest(req)}`;
  const limited = enforceRateLimits(
    [{ key: bucketKey, ...(userId ? AUTH_LIMIT : ANON_LIMIT) }],
    "Too many listen requests. Try again soon."
  );
  if (limited) {
    // Speak clients expect `{ error }` not `{ ok: false, error }`
    return NextResponse.json(
      { error: "Too many listen requests. Try again soon." },
      { status: 429, headers: limited.headers }
    );
  }

  let body: SpeakBody;
  try {
    body = (await req.json()) as SpeakBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) {
    return NextResponse.json({ error: "Text is required." }, { status: 400 });
  }
  if (text.length > LESSON_SPEECH_MAX_CHARS) {
    return NextResponse.json(
      { error: `Text must be ${LESSON_SPEECH_MAX_CHARS} characters or fewer.` },
      { status: 400 }
    );
  }

  const voice = (process.env.OPENAI_TTS_VOICE || "nova").trim() || "nova";
  const model = (process.env.OPENAI_TTS_MODEL || "tts-1-hd").trim() || "tts-1-hd";

  const upstream = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      voice,
      input: text,
      response_format: "mp3",
    }),
  });

  if (!upstream.ok) {
    const detail = await upstream.text().catch(() => "");
    console.error("[lesson/speak] OpenAI error", upstream.status, detail.slice(0, 400));
    return NextResponse.json(
      { error: "Could not generate audio right now." },
      { status: 502 }
    );
  }

  const audio = await upstream.arrayBuffer();
  return new NextResponse(audio, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "no-store",
    },
  });
}
