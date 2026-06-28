export const PYTHON_TERMINAL_PROMPT = "kanam-bot@python ~$";

export function formatPythonTerminal(
  body: string,
  prompt: string = PYTHON_TERMINAL_PROMPT
): string {
  return `${prompt} python main.py\n${body}\n${prompt}`;
}

export function rejectsUppercasePrint(code: string): boolean {
  return code.includes("Print(");
}
