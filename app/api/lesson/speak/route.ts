import { NextResponse } from "next/server";

import { LESSON_SPEECH_MAX_CHARS } from "@/lib/lessonSpeech";

export const runtime = "nodejs";

type SpeakBody = {
  text?: unknown;
};

const recentByIp = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 40; // requests / window
const WINDOW_MS = 10 * 60 * 1000;

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const row = recentByIp.get(ip);
  if (!row || now >= row.resetAt) {
    recentByIp.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  row.count += 1;
  return row.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { error: "Lesson narration is not configured (missing OPENAI_API_KEY)." },
      { status: 503 }
    );
  }

  const ip = clientIp(req);
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many listen requests. Try again soon." }, { status: 429 });
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
      { error: "Could not generate lesson audio right now." },
      { status: 502 }
    );
  }

  const audio = await upstream.arrayBuffer();
  return new NextResponse(audio, {
    status: 200,
    headers: {
      "Content-Type": "audio/mpeg",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
