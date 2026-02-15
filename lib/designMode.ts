export type DesignTargetUser = "Student" | "Gamer" | "Beginner Coder" | "Other";

export type DesignState = {
  purpose: string;
  targetUser: DesignTargetUser;
  inputsNeeded: string[];
  memoryToStore: string[];
  rulesPlainEnglish: string; // multiline
};

export function defaultDesignState(): DesignState {
  return {
    purpose: "",
    targetUser: "Student",
    inputsNeeded: [],
    memoryToStore: [],
    rulesPlainEnglish: "",
  };
}

function normalizeId(s: string) {
  return (s ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 32);
}

function linesFromMultiline(s: string) {
  return (s ?? "")
    .split(/\r?\n/g)
    .map((x) => x.trim())
    .filter(Boolean);
}

function extractQuotedKeyword(rule: string): string | null {
  const m = rule.match(/["']([^"']{2,30})["']/);
  return m?.[1]?.trim() ? m[1].trim() : null;
}

function ruleToCondition(rule: string): { condition: string; kind: "len_short" | "keyword_in" | "todo" } {
  const r = (rule ?? "").toLowerCase();
  if (/\btoo\s+short\b|\bshort\b/.test(r)) {
    return { condition: "len(user_input) < 10", kind: "len_short" };
  }
  const kw = extractQuotedKeyword(rule);
  if (kw) {
    const safe = kw.toLowerCase().replace(/"/g, "");
    return { condition: `"${safe}" in user_input.lower()`, kind: "keyword_in" };
  }
  return { condition: "False  # TODO: write a condition for this rule", kind: "todo" };
}

function nameLike(s: string) {
  const t = (s ?? "").trim().toLowerCase();
  return t === "name" || t.includes("user name") || t.includes("username");
}

export function generatePythonStarterCode(design: DesignState): string {
  const purpose = (design.purpose ?? "").trim();
  const rules = linesFromMultiline(design.rulesPlainEnglish);
  const memoryItems = (design.memoryToStore ?? []).map((x) => x.trim()).filter(Boolean);
  const hasMemory = memoryItems.length > 0;

  const wantsName = memoryItems.some(nameLike);
  const otherMemory = memoryItems.filter((x) => !nameLike(x));

  const memoryLines: string[] = [];
  if (hasMemory) {
    memoryLines.push("helper_memory = {}");
    if (wantsName) {
      memoryLines.push('helper_memory["name"] = input("What is your name? ")');
      memoryLines.push('print("Hi " + helper_memory["name"] + "!")');
    }
    for (const raw of otherMemory) {
      const key = normalizeId(raw) || "item";
      memoryLines.push(`helper_memory["${key}"] = ""  # TODO: ask and store ${raw}`);
    }
    memoryLines.push("");
  }

  const fnLines: string[] = [];
  fnLines.push("def helper(user_input):");

  if (!rules.length) {
    fnLines.push('    print("Tell me more!")');
  } else {
    rules.slice(0, 5).forEach((rule, idx) => {
      const { condition, kind } = ruleToCondition(rule);
      const head = idx === 0 ? "if" : "elif";
      fnLines.push(`    ${head} ${condition}:`);
      if (kind === "len_short") {
        fnLines.push('        print("Can you tell me a little more?")');
      } else if (kind === "keyword_in") {
        const kw = extractQuotedKeyword(rule) ?? "keyword";
        // Keep it simple and consistent with what students learned (print + strings).
        fnLines.push(`        print("I heard: ${kw}.")`);
      } else {
        fnLines.push(`        # ${rule}`);
        fnLines.push('        print("TODO: add a helpful response here.")');
      }
    });

    fnLines.push("    else:");
    if (wantsName) {
      fnLines.push('        print("Thanks, " + helper_memory["name"] + "! Ask me something else.")');
    } else {
      fnLines.push('        print("Thanks! Ask me something else.")');
    }
  }

  const inputsLines: string[] = [];
  inputsLines.push('question = input("Ask me a question: ")');
  inputsLines.push("helper(question)");

  const header = [
    "# Kanam AI Helper — Starter Code",
    purpose ? `# Purpose: ${purpose}` : "# Purpose: (fill this in)",
    "",
  ];

  // Optional TODO prompts for additional inputs (kept minimal — no lists).
  const extraInputs = (design.inputsNeeded ?? []).map((x) => x.trim()).filter(Boolean).slice(0, 3);
  const extraInputLines =
    extraInputs.length > 0
      ? [
          "# Optional inputs you mentioned (add later if you want):",
          ...extraInputs.map((x) => `# - ${x}`),
          "",
        ]
      : [];

  const out = [
    ...header,
    ...extraInputLines,
    ...memoryLines,
    ...fnLines,
    "",
    ...inputsLines,
    "",
  ].join("\n");

  return out.replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

