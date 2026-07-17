/** Minimal section shape needed to build listen-aloud scripts. */
export type SpeechSection = {
  kicker?: string;
  title: string;
  body: string;
  bullets?: string[];
  callout?: { label: string; text: string };
  checkIn?: { prompt: string };
};

/** OpenAI speech endpoint hard limit is 4096 characters. */
export const LESSON_SPEECH_MAX_CHARS = 4000;

/** Strip markdown-ish markup so TTS reads clean prose. */
export function stripForSpeech(text: string) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

export type SpeechSegmentId =
  | "kicker"
  | "title"
  | "body"
  | "bullets"
  | "callout"
  | "checkIn";

export type SpeechSegment = {
  id: SpeechSegmentId;
  text: string;
};

export type SpeechWord = {
  text: string;
  segment: SpeechSegmentId;
  localIndex: number;
  charStart: number;
};

export function buildSectionSpeechSegments(section: SpeechSection): SpeechSegment[] {
  const segments: SpeechSegment[] = [];
  if (section.kicker) segments.push({ id: "kicker", text: stripForSpeech(section.kicker) });
  segments.push({ id: "title", text: stripForSpeech(section.title) });
  if (section.body) segments.push({ id: "body", text: stripForSpeech(section.body) });
  if (section.bullets?.length) {
    segments.push({
      id: "bullets",
      text: section.bullets.map((b, i) => `${i + 1}. ${stripForSpeech(b)}`).join(" "),
    });
  }
  if (section.callout) {
    segments.push({
      id: "callout",
      text: `${stripForSpeech(section.callout.label)}. ${stripForSpeech(section.callout.text)}`,
    });
  }
  if (section.checkIn) {
    segments.push({
      id: "checkIn",
      text: `Quick check. ${stripForSpeech(section.checkIn.prompt)}`,
    });
  }
  return segments.filter((s) => s.text.trim().length > 0);
}

export function buildSectionSpeechText(section: SpeechSection) {
  return buildSectionSpeechSegments(section)
    .map((s) => s.text)
    .join(". ");
}

export function tokenizeSpeechWords(text: string): string[] {
  return text.match(/[A-Za-z0-9][A-Za-z0-9'’\-]*|[^\sA-Za-z0-9]+/g)?.filter((w) => /\S/.test(w)) ?? [];
}

/** Flatten section speech into timed/highlightable words with segment ownership. */
export function buildSpeechWords(section: SpeechSection): SpeechWord[] {
  const segments = buildSectionSpeechSegments(section);
  const words: SpeechWord[] = [];
  let charCursor = 0;

  segments.forEach((segment, segmentIndex) => {
    if (segmentIndex > 0) charCursor += 2; // ". " joiner from buildSectionSpeechText
    const parts = segment.text.match(/\S+|\s+/g) ?? [];
    let localIndex = 0;
    let localChar = 0;
    for (const part of parts) {
      if (/^\s+$/.test(part)) {
        localChar += part.length;
        charCursor += part.length;
        continue;
      }
      words.push({
        text: part,
        segment: segment.id,
        localIndex,
        charStart: charCursor,
      });
      localIndex += 1;
      localChar += part.length;
      charCursor += part.length;
    }
  });

  return words;
}

export function wordIndexAtChar(words: SpeechWord[], charIndex: number) {
  if (!words.length) return 0;
  let idx = 0;
  for (let i = 0; i < words.length; i += 1) {
    if (words[i].charStart <= charIndex) idx = i;
    else break;
  }
  return idx;
}

/** Character-weighted timing with slight pauses after punctuation. */
export function wordIndexAtTime(words: string[], durationSec: number, currentTimeSec: number) {
  if (!words.length || durationSec <= 0) return 0;
  const weights = words.map((w) => {
    const base = Math.max(1, w.replace(/[^A-Za-z0-9]/g, "").length || w.length);
    const pause = /[.!?;:]$/.test(w) ? 2.4 : /,$/.test(w) ? 1.4 : 1;
    return base * pause;
  });
  const total = weights.reduce((a, b) => a + b, 0) || 1;
  const target = Math.min(1, Math.max(0, currentTimeSec / durationSec)) * total;
  let acc = 0;
  for (let i = 0; i < weights.length; i += 1) {
    acc += weights[i];
    if (target <= acc) return i;
  }
  return words.length - 1;
}

/**
 * Map a global speech word index onto one segment for highlighting.
 * null = highlighting off; -1 = not yet reached; local index = active;
 * segmentLength = all words in segment already spoken.
 */
export function localWordIndex(
  words: SpeechWord[],
  globalIndex: number | null,
  segment: SpeechSegmentId
): number | null {
  if (globalIndex === null) return null;
  const segmentIndices: number[] = [];
  for (let i = 0; i < words.length; i += 1) {
    if (words[i].segment === segment) segmentIndices.push(i);
  }
  if (!segmentIndices.length) return null;
  const first = segmentIndices[0];
  const last = segmentIndices[segmentIndices.length - 1];
  if (globalIndex < first) return -1;
  if (globalIndex > last) return segmentIndices.length;
  return words[globalIndex].localIndex;
}

/** Split long slide text into TTS-sized chunks at sentence boundaries. */
export function chunkSpeechText(text: string, maxChars = LESSON_SPEECH_MAX_CHARS): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  if (trimmed.length <= maxChars) return [trimmed];

  const sentences = trimmed.match(/[^.!?]+[.!?]+(?:\s+|$)|[^.!?]+$/g) ?? [trimmed];
  const chunks: string[] = [];
  let current = "";

  for (const sentence of sentences) {
    const next = current ? `${current} ${sentence.trim()}` : sentence.trim();
    if (next.length <= maxChars) {
      current = next;
      continue;
    }
    if (current) chunks.push(current);
    if (sentence.trim().length <= maxChars) {
      current = sentence.trim();
    } else {
      let rest = sentence.trim();
      while (rest.length > maxChars) {
        chunks.push(rest.slice(0, maxChars));
        rest = rest.slice(maxChars);
      }
      current = rest;
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

export function pickBrowserVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  if (!voices.length) return null;
  const preferred = [
    /google us english/i,
    /microsoft aria/i,
    /microsoft jenny/i,
    /samantha/i,
    /karen/i,
    /moira/i,
    /natural/i,
    /enhanced/i,
  ];
  for (const pattern of preferred) {
    const match = voices.find((v) => pattern.test(v.name) && /^en/i.test(v.lang));
    if (match) return match;
  }
  return (
    voices.find((v) => /^en(-|_)?US/i.test(v.lang)) ??
    voices.find((v) => /^en/i.test(v.lang)) ??
    voices[0]
  );
}
