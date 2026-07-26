/**
 * Turn common beginner mistakes into short, actionable feedback
 * (shown above the console on Run & check).
 */
export function coachPythonExerciseFeedback(opts: {
  code: string;
  runError: string | null;
  fallback: string;
}): string {
  const { code, runError, fallback } = opts;
  const tips: string[] = [];

  // name = tory  →  name = "tory"
  if (/\bname\s*=\s*(?!["'])([A-Za-z_]\w*)\b/.test(code)) {
    tips.push('Wrap text in quotes: name = "tory" (not name = tory).');
  }

  // print("...") + name  →  print("..." + name)
  if (/print\s*\([^;\n]*\)\s*\+\s*name\b/.test(code)) {
    tips.push('Keep + name inside the parentheses: print("Hi! I am " + name).');
  }

  if (tips.length) return tips.join(" ");

  const nameErr = runError?.match(/NameError: name '([^']+)' is not defined/);
  if (nameErr && nameErr[1] !== "name" && nameErr[1] !== "print") {
    return `Put quotes around text values: name = "${nameErr[1]}"`;
  }

  if (runError?.includes("SyntaxError")) {
    return "There's a syntax problem — check the console tip, fix that line, then Run & check again.";
  }

  return fallback;
}
