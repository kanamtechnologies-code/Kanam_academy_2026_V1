/** In-browser mini Python interpreter for Kanam lessons. */

export type MiniValue = string | number | boolean | MiniList | MiniDict;

interface MiniList extends Array<MiniValue> {}
export interface MiniDict {
  [key: string]: MiniValue;
}

function miniToString(v: MiniValue): string {
  if (Array.isArray(v)) return JSON.stringify(v);
  if (v && typeof v === "object") return JSON.stringify(v);
  return String(v);
}

function isQuoted(s: string) {
  const t = s.trim();
  return (
    (t.startsWith('"') && t.endsWith('"') && t.length >= 2) ||
    (t.startsWith("'") && t.endsWith("'") && t.length >= 2)
  );
}

function unquote(s: string) {
  const t = s.trim();
  if (!isQuoted(t)) return t;
  return t.slice(1, -1);
}

function splitTopLevelPlus(expr: string) {
  const parts: string[] = [];
  let cur = "";
  let quote: '"' | "'" | null = null;
  let depth = 0;
  for (let i = 0; i < expr.length; i++) {
    const ch = expr[i];
    if (quote) {
      cur += ch;
      if (ch === quote && expr[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      cur += ch;
      continue;
    }
    if (ch === "(") {
      depth++;
      cur += ch;
      continue;
    }
    if (ch === ")") {
      depth = Math.max(0, depth - 1);
      cur += ch;
      continue;
    }
    if (ch === "+" && depth === 0) {
      parts.push(cur);
      cur = "";
      continue;
    }
    cur += ch;
  }
  parts.push(cur);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function evalMiniExpr(expr: string, env: Record<string, MiniValue>): string | null {
  const t = expr.trim();
  if (!t) return "";

  const parts = splitTopLevelPlus(t);
  if (parts.length > 1) {
    const evaluated = parts.map((p) => evalMiniExpr(p, env));
    if (evaluated.some((x) => x === null)) return null;
    return evaluated.join("");
  }

  if (isQuoted(t)) return unquote(t);

  const strCall = t.match(/^str\s*\(\s*([A-Za-z_]\w*)\s*\)$/);
  if (strCall) {
    const v = env[strCall[1]];
    return v === undefined ? "" : miniToString(v);
  }

  if (/^(True|False)$/.test(t)) return t === "True" ? "True" : "False";

  if (/^-?\d+$/.test(t)) return t;

  if (/^[A-Za-z_]\w*$/.test(t)) {
    const v = env[t];
    return v === undefined ? "" : miniToString(v);
  }

  const dictGet = t.match(/^([A-Za-z_]\w*)\[\s*(["'][^"']+["'])\s*\]\s*$/);
  if (dictGet) {
    const obj = env[dictGet[1]];
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return "";
    const key = unquote(dictGet[2]);
    const v = (obj as MiniDict)[key];
    return v === undefined ? "" : miniToString(v);
  }

  return null;
}

export type MiniRunResult = {
  stdout: string[];
  env: Record<string, MiniValue>;
  error?: string;
};

function parseIndent(line: string) {
  let count = 0;
  for (const ch of line) {
    if (ch === " ") count += 1;
    else if (ch === "\t") count += 4;
    else break;
  }
  return count;
}

type MiniLine = { indent: number; text: string; raw: string; lineNo: number };

type MiniStmt =
  | { kind: "assign"; name: string; expr: string; lineNo: number }
  | { kind: "print"; expr: string; lineNo: number }
  | { kind: "list_call"; name: string; method: "append" | "remove" | "pop"; arg?: string; lineNo: number }
  | { kind: "dict_set"; name: string; key: string; expr: string; lineNo: number }
  | { kind: "def"; name: string; params: string[]; body: MiniStmt[]; lineNo: number }
  | { kind: "call"; name: string; args: string[]; lineNo: number }
  | { kind: "if"; branches: Array<{ test?: string; body: MiniStmt[] }>; lineNo: number }
  | { kind: "while"; test: string; body: MiniStmt[]; lineNo: number }
  | { kind: "for"; varName: string; rangeExpr: string; body: MiniStmt[]; lineNo: number };

function stripInlineComment(s: string) {
  // Keep it simple: strip '#' when not inside quotes.
  let out = "";
  let quote: "'" | '"' | null = null;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (quote) {
      out += ch;
      if (ch === quote && s[i - 1] !== "\\") quote = null;
      continue;
    }
    if (ch === "'" || ch === '"') {
      quote = ch;
      out += ch;
      continue;
    }
    if (ch === "#") break;
    out += ch;
  }
  return out.trimEnd();
}

function preprocessLines(code: string): MiniLine[] {
  const rawLines = code.replace(/\r\n/g, "\n").split("\n");
  const lines: MiniLine[] = [];
  for (let i = 0; i < rawLines.length; i++) {
    const raw = rawLines[i];
    const indent = parseIndent(raw);
    const text = stripInlineComment(raw.slice(Math.min(raw.length, raw.search(/[^\s]/) === -1 ? raw.length : 0)) || raw)
      .trim();
    // Use raw indent slice safely (trim() above loses indentation; we need original non-comment content)
    const cleaned = stripInlineComment(raw).trim();
    if (!cleaned) continue;
    lines.push({ indent, text: cleaned, raw, lineNo: i + 1 });
  }
  return lines;
}

function parseBlock(lines: MiniLine[], startIdx: number, indent: number): { body: MiniStmt[]; nextIdx: number } {
  const body: MiniStmt[] = [];
  let i = startIdx;
  while (i < lines.length) {
    const line = lines[i];
    if (line.indent < indent) break;
    if (line.indent > indent) {
      throw new Error(`IndentationError on line ${line.lineNo}: unexpected indent`);
    }

    const txt = line.text;
    const ifMatch = txt.match(/^if\s+(.+)\s*:\s*$/);
    const whileMatch = txt.match(/^while\s+(.+)\s*:\s*$/);
    const forMatch = txt.match(/^for\s+([A-Za-z_]\w*)\s+in\s+range\s*\(\s*(.+?)\s*\)\s*:\s*$/);
    const defMatch = txt.match(/^def\s+([A-Za-z_]\w*)\s*\(\s*([A-Za-z_]\w*)?\s*\)\s*:\s*$/);
    if (ifMatch) {
      const branches: Array<{ test?: string; body: MiniStmt[] }> = [];
      const test = ifMatch[1].trim();
      const parsedIfBody = parseBlock(lines, i + 1, indent + 4);
      branches.push({ test, body: parsedIfBody.body });
      i = parsedIfBody.nextIdx;

      while (i < lines.length && lines[i].indent === indent) {
        const t2 = lines[i].text;
        const elifMatch = t2.match(/^elif\s+(.+)\s*:\s*$/);
        const elseMatch = t2.match(/^else\s*:\s*$/);
        if (elifMatch) {
          const elifBody = parseBlock(lines, i + 1, indent + 4);
          branches.push({ test: elifMatch[1].trim(), body: elifBody.body });
          i = elifBody.nextIdx;
          continue;
        }
        if (elseMatch) {
          const elseBody = parseBlock(lines, i + 1, indent + 4);
          branches.push({ test: undefined, body: elseBody.body });
          i = elseBody.nextIdx;
          break;
        }
        break;
      }

      body.push({ kind: "if", branches, lineNo: line.lineNo });
      continue;
    }

    if (whileMatch) {
      const test = whileMatch[1].trim();
      const parsedBody = parseBlock(lines, i + 1, indent + 4);
      body.push({ kind: "while", test, body: parsedBody.body, lineNo: line.lineNo });
      i = parsedBody.nextIdx;
      continue;
    }

    if (forMatch) {
      const varName = forMatch[1].trim();
      const rangeExpr = forMatch[2].trim();
      const parsedBody = parseBlock(lines, i + 1, indent + 4);
      body.push({ kind: "for", varName, rangeExpr, body: parsedBody.body, lineNo: line.lineNo });
      i = parsedBody.nextIdx;
      continue;
    }

    if (defMatch) {
      const name = defMatch[1].trim();
      const param = (defMatch[2] ?? "").trim();
      const params = param ? [param] : [];
      const parsedBody = parseBlock(lines, i + 1, indent + 4);
      body.push({ kind: "def", name, params, body: parsedBody.body, lineNo: line.lineNo });
      i = parsedBody.nextIdx;
      continue;
    }

    const printMatch = txt.match(/^print\s*\(\s*(.*)\s*\)\s*$/);
    if (printMatch) {
      body.push({ kind: "print", expr: printMatch[1], lineNo: line.lineNo });
      i += 1;
      continue;
    }

    const listCallMatch = txt.match(
      /^([A-Za-z_]\w*)\.(append|remove|pop)\(\s*(.*?)\s*\)\s*$/
    );
    if (listCallMatch) {
      const name = listCallMatch[1];
      const method = listCallMatch[2] as "append" | "remove" | "pop";
      const argRaw = (listCallMatch[3] ?? "").trim();
      const arg = argRaw.length ? argRaw : undefined;
      body.push({ kind: "list_call", name, method, arg, lineNo: line.lineNo });
      i += 1;
      continue;
    }

    const dictSetMatch = txt.match(
      /^([A-Za-z_]\w*)\[\s*(["'][^"']+["'])\s*\]\s*=\s*(.+)$/
    );
    if (dictSetMatch) {
      const name = dictSetMatch[1];
      const key = unquote(dictSetMatch[2]);
      const expr = dictSetMatch[3].trim();
      body.push({ kind: "dict_set", name, key, expr, lineNo: line.lineNo });
      i += 1;
      continue;
    }

    const callMatch = txt.match(/^([A-Za-z_]\w*)\s*\(\s*(.*?)\s*\)\s*$/);
    if (callMatch) {
      const name = callMatch[1].trim();
      const argsRaw = (callMatch[2] ?? "").trim();
      const args = argsRaw.length ? [argsRaw] : [];
      // Avoid treating built-ins as calls; only allow calling user-defined functions.
      if (name !== "print" && name !== "input" && name !== "str" && name !== "range") {
        body.push({ kind: "call", name, args, lineNo: line.lineNo });
        i += 1;
        continue;
      }
    }

    const assignMatch = txt.match(/^([A-Za-z_]\w*)\s*=\s*(.+)$/);
    if (assignMatch) {
      body.push({ kind: "assign", name: assignMatch[1], expr: assignMatch[2].trim(), lineNo: line.lineNo });
      i += 1;
      continue;
    }

    // If they typed `elif`/`else` without a matching if at this level, call it out.
    if (/^(elif|else)\b/.test(txt)) {
      throw new Error(`SyntaxError on line ${line.lineNo}: '${txt.split(/\s+/)[0]}' without a matching if`);
    }

    throw new Error(`SyntaxError on line ${line.lineNo}: I don't understand: ${txt}`);
  }
  return { body, nextIdx: i };
}

function evalMiniValue(expr: string, env: Record<string, MiniValue>): MiniValue {
  const t = expr.trim();
  if (!t) return "";
  if (t === "[]") return [];
  if (t === "{}") return {};
  if (/^(True|False)$/.test(t)) return t === "True";
  if (/^-?\d+$/.test(t)) return Number(t);

  // {"key": "value", "n": 1} (dictionary literal; string keys only)
  if (t.startsWith("{") && t.endsWith("}") && t !== "{}") {
    const inner = t.slice(1, -1).trim();
    const out: MiniDict = {};
    if (!inner) return out;

    const splitTopLevelCommas = (s: string) => {
      const parts: string[] = [];
      let cur = "";
      let depth = 0;
      let quote: "'" | '"' | null = null;
      let esc = false;
      for (const ch of s) {
        if (esc) {
          cur += ch;
          esc = false;
          continue;
        }
        if (quote) {
          if (ch === "\\") {
            esc = true;
            cur += ch;
            continue;
          }
          if (ch === quote) quote = null;
          cur += ch;
          continue;
        }
        if (ch === "'" || ch === '"') {
          quote = ch;
          cur += ch;
          continue;
        }
        if (ch === "(" || ch === "[" || ch === "{") depth += 1;
        if (ch === ")" || ch === "]" || ch === "}") depth = Math.max(0, depth - 1);
        if (ch === "," && depth === 0) {
          const trimmed = cur.trim();
          if (trimmed) parts.push(trimmed);
          cur = "";
          continue;
        }
        cur += ch;
      }
      const trimmed = cur.trim();
      if (trimmed) parts.push(trimmed);
      return parts;
    };

    const findTopLevelColon = (s: string) => {
      let depth = 0;
      let quote: "'" | '"' | null = null;
      let esc = false;
      for (let i = 0; i < s.length; i++) {
        const ch = s[i];
        if (esc) {
          esc = false;
          continue;
        }
        if (quote) {
          if (ch === "\\") {
            esc = true;
            continue;
          }
          if (ch === quote) quote = null;
          continue;
        }
        if (ch === "'" || ch === '"') {
          quote = ch;
          continue;
        }
        if (ch === "(" || ch === "[" || ch === "{") depth += 1;
        if (ch === ")" || ch === "]" || ch === "}") depth = Math.max(0, depth - 1);
        if (ch === ":" && depth === 0) return i;
      }
      return -1;
    };

    for (const item of splitTopLevelCommas(inner)) {
      const colon = findTopLevelColon(item);
      if (colon < 0) throw new Error(`SyntaxError: invalid dict entry: ${item}`);
      const keyExpr = item.slice(0, colon).trim();
      const valExpr = item.slice(colon + 1).trim();
      if (!isQuoted(keyExpr)) throw new Error("SyntaxError: dictionary keys must be quoted strings");
      const key = unquote(keyExpr);
      out[key] = evalMiniValue(valExpr, env);
    }
    return out;
  }

  // str(x)
  const strCall = t.match(/^str\s*\(\s*([A-Za-z_]\w*)\s*\)$/);
  if (strCall) {
    const v = env[strCall[1]];
    if (v === undefined) throw new Error(`NameError: name '${strCall[1]}' is not defined`);
    return miniToString(v);
  }

  // input("prompt") or input("prompt").lower()
  const inputCall = t.match(/^input\s*\(\s*(.*?)\s*\)\s*(\.lower\(\))?\s*$/);
  if (inputCall) {
    // This gets handled at execution time (because we need the variable name).
    return "";
  }

  // x + y (numbers) or "a" + name (strings) etc (top-level + only)
  const parts = splitTopLevelPlus(t);
  if (parts.length > 1) {
    let acc: MiniValue | null = null;
    for (const p of parts) {
      const v = evalMiniValue(p, env);
      if (acc === null) {
        acc = v;
        continue;
      }
      if (typeof acc === "number" && typeof v === "number") acc = acc + v;
      else if (typeof acc === "string" && typeof v === "string") acc = acc + v;
      else if (typeof acc === "string" && typeof v !== "string") {
        throw new Error("TypeError: can only concatenate str (not non-str) to str");
      } else if (typeof acc !== "string" && typeof v === "string") {
        throw new Error("TypeError: unsupported operand types for +");
      } else {
        // boolean/other combos not used in our lessons; keep strict.
        throw new Error("TypeError: unsupported operand types for +");
      }
    }
    return acc ?? "";
  }

  if (isQuoted(t)) return unquote(t);

  // variable name
  if (/^[A-Za-z_]\w*$/.test(t)) {
    const v = env[t];
    if (v === undefined) throw new Error(`NameError: name '${t}' is not defined`);
    return v;
  }

  const dictGet = t.match(/^([A-Za-z_]\w*)\[\s*(["'][^"']+["'])\s*\]\s*$/);
  if (dictGet) {
    const obj = env[dictGet[1]];
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) {
      throw new Error(`TypeError: '${dictGet[1]}' is not a dictionary`);
    }
    const key = unquote(dictGet[2]);
    const v = (obj as MiniDict)[key];
    if (v === undefined) throw new Error(`KeyError: '${key}'`);
    return v;
  }

  // x - 1 / x + 1 (common scoring)
  const math = t.match(/^([A-Za-z_]\w*)\s*([+-])\s*(\d+)\s*$/);
  if (math) {
    const left = env[math[1]];
    if (typeof left !== "number") throw new Error("TypeError: math needs numbers");
    const n = Number(math[3]);
    return math[2] === "+" ? left + n : left - n;
  }

  throw new Error(`SyntaxError: can't evaluate expression: ${t}`);
}

function evalCondition(test: string, env: Record<string, MiniValue>): boolean {
  const t = test.trim();
  if (!t) return false;

  // "hello" in player_input.lower()
  const inMatch = t.match(/^["']([^"']+)["']\s+in\s+([A-Za-z_]\w*)(?:\.(lower|strip)\(\))?\s*$/);
  if (inMatch) {
    const needle = (inMatch[1] ?? "").toString();
    const varName = inMatch[2];
    const fn = inMatch[3] as "lower" | "strip" | undefined;
    const v = env[varName];
    if (v === undefined) throw new Error(`NameError: name '${varName}' is not defined`);
    if (typeof v !== "string") throw new Error(`TypeError: '${varName}' must be a string`);
    const hay = fn === "lower" ? v.toLowerCase() : fn === "strip" ? v.trim() : v;
    const ndl = fn === "lower" ? needle.toLowerCase() : needle;
    return hay.includes(ndl);
  }

  // len(user_input) < 10   (also supports .strip())
  const lenMatch = t.match(/^len\(\s*([A-Za-z_]\w*)(?:\.(strip)\(\))?\s*\)\s*<\s*(\d+)\s*$/);
  if (lenMatch) {
    const varName = lenMatch[1];
    const fn = lenMatch[2] as "strip" | undefined;
    const n = Number(lenMatch[3]);
    const v = env[varName];
    if (v === undefined) throw new Error(`NameError: name '${varName}' is not defined`);
    if (typeof v !== "string") throw new Error(`TypeError: '${varName}' must be a string`);
    const s = fn === "strip" ? v.trim() : v;
    return s.length < n;
  }

  // while running   (truthy)
  if (/^[A-Za-z_]\w*$/.test(t)) {
    const v = env[t];
    if (v === undefined) throw new Error(`NameError: name '${t}' is not defined`);
    return Boolean(v);
  }

  const eq = t.match(/^([A-Za-z_]\w*)\s*==\s*(.+)$/);
  if (!eq) throw new Error(`SyntaxError: unsupported condition: ${t}`);
  const leftName = eq[1];
  const left = env[leftName];
  if (left === undefined) throw new Error(`NameError: name '${leftName}' is not defined`);
  const rightVal = evalMiniValue(eq[2], env);
  return left === rightVal;
}

export function runMiniPython(code: string, runtime: Record<string, string>, opts?: { maxSteps?: number }): MiniRunResult {
  const env: Record<string, MiniValue> = {};
  const stdout: string[] = [];
  const functions: Record<string, { params: string[]; body: MiniStmt[] }> = {};
  const maxSteps = opts?.maxSteps ?? 500;
  let steps = 0;

  const lines = preprocessLines(code);
  let program: MiniStmt[] = [];
  try {
    program = parseBlock(lines, 0, 0).body;
  } catch (e) {
    return { stdout: [], env, error: (e as Error).message };
  }

  const execStmt = (stmt: MiniStmt) => {
    steps += 1;
    if (steps > maxSteps) throw new Error("RuntimeError: program took too long (possible infinite loop)");

    if (stmt.kind === "assign") {
      // score = score + 1 style
      const inc = stmt.expr.match(/^([A-Za-z_]\w*)\s*([+-])\s*(\d+)\s*$/);
      if (inc && inc[1] === stmt.name && typeof env[stmt.name] === "number") {
        const cur = env[stmt.name] as number;
        const n = Number(inc[3]);
        env[stmt.name] = inc[2] === "+" ? cur + n : cur - n;
        return;
      }

      const inputCall = stmt.expr.match(/^input\s*\(\s*(.*?)\s*\)\s*(\.lower\(\))?\s*$/);
      if (inputCall) {
        const promptExpr = inputCall[1]?.trim();
        const promptStr =
          promptExpr && isQuoted(promptExpr) ? unquote(promptExpr) : promptExpr ? String(promptExpr) : "";
        const answerRaw = (runtime?.[stmt.name] ?? "").toString();
        const answer = inputCall[2] ? answerRaw.toLowerCase() : answerRaw;
        stdout.push(`${promptStr}${answer}`);
        env[stmt.name] = answer;
        return;
      }

      env[stmt.name] = evalMiniValue(stmt.expr, env);
      return;
    }

    if (stmt.kind === "print") {
      const v = evalMiniValue(stmt.expr, env);
      stdout.push(typeof v === "string" ? v : miniToString(v));
      return;
    }

    if (stmt.kind === "list_call") {
      const cur = env[stmt.name];
      if (!Array.isArray(cur)) {
        throw new Error(
          `TypeError on line ${stmt.lineNo}: '${stmt.name}' is not a list (did you forget: ${stmt.name} = [] ?) `
        );
      }

      if (stmt.method === "append") {
        if (!stmt.arg) throw new Error(`SyntaxError on line ${stmt.lineNo}: append() needs an argument`);
        const v = evalMiniValue(stmt.arg, env);
        cur.push(v);
        return;
      }

      if (stmt.method === "remove") {
        if (!stmt.arg) throw new Error(`SyntaxError on line ${stmt.lineNo}: remove() needs an argument`);
        const v = evalMiniValue(stmt.arg, env);
        const idx = cur.findIndex((x) => miniToString(x) === miniToString(v));
        if (idx < 0) throw new Error(`ValueError on line ${stmt.lineNo}: item not found in list`);
        cur.splice(idx, 1);
        return;
      }

      // pop()
      const idxRaw = stmt.arg ? evalMiniValue(stmt.arg, env) : undefined;
      const idxNum =
        idxRaw === undefined
          ? cur.length - 1
          : typeof idxRaw === "number"
            ? Math.floor(idxRaw)
            : Number.NaN;
      if (!Number.isFinite(idxNum)) throw new Error(`TypeError on line ${stmt.lineNo}: pop() index must be a number`);
      if (idxNum < 0 || idxNum >= cur.length)
        throw new Error(`IndexError on line ${stmt.lineNo}: pop index out of range`);
      cur.splice(idxNum, 1);
      return;
    }

    if (stmt.kind === "dict_set") {
      const cur = env[stmt.name];
      if (!cur || typeof cur !== "object" || Array.isArray(cur)) {
        throw new Error(
          `TypeError on line ${stmt.lineNo}: '${stmt.name}' is not a dictionary (did you forget: ${stmt.name} = {} ?) `
        );
      }
      (cur as MiniDict)[stmt.key] = evalMiniValue(stmt.expr, env);
      return;
    }

    if (stmt.kind === "def") {
      functions[stmt.name] = { params: stmt.params, body: stmt.body };
      return;
    }

    if (stmt.kind === "call") {
      const fn = functions[stmt.name];
      if (!fn) {
        throw new Error(`NameError on line ${stmt.lineNo}: function '${stmt.name}' is not defined`);
      }
      if (fn.params.length !== stmt.args.length) {
        throw new Error(
          `TypeError on line ${stmt.lineNo}: ${stmt.name}() takes ${fn.params.length} argument(s) but ${stmt.args.length} were given`
        );
      }

      // Very small "local scope": bind params temporarily in env, run body, then restore.
      const restore: Record<string, MiniValue | undefined> = {};
      for (let idx = 0; idx < fn.params.length; idx++) {
        const p = fn.params[idx];
        restore[p] = env[p];
        env[p] = evalMiniValue(stmt.args[idx], env);
      }
      for (const s of fn.body) execStmt(s);
      for (const p of fn.params) {
        const prev = restore[p];
        if (prev === undefined) delete env[p];
        else env[p] = prev;
      }
      return;
    }

    if (stmt.kind === "if") {
      for (const br of stmt.branches) {
        if (br.test === undefined) {
          for (const s of br.body) execStmt(s);
          return;
        }
        if (evalCondition(br.test, env)) {
          for (const s of br.body) execStmt(s);
          return;
        }
      }
      return;
    }

    if (stmt.kind === "while") {
      let guard = 0;
      while (evalCondition(stmt.test, env)) {
        guard += 1;
        if (guard > 25) throw new Error("RuntimeError: loop ran too many times (did you forget to stop it?)");
        for (const s of stmt.body) execStmt(s);
        // If the loop uses input(), our lessons expect one “turn” per Run.
        if (/\binput\s*\(/.test(code)) break;
      }
      return;
    }

    if (stmt.kind === "for") {
      const m = stmt.rangeExpr.match(/^(\d+)$|^([A-Za-z_]\w*)$/);
      if (!m) throw new Error(`SyntaxError on line ${stmt.lineNo}: range(...) must be a number or a variable`);
      const rangeVal = m[1] ? Number(m[1]) : env[m[2] ?? ""];
      if (typeof rangeVal !== "number") {
        throw new Error(`TypeError on line ${stmt.lineNo}: range(...) needs a number`);
      }
      const n = Math.max(0, Math.min(50, Math.floor(rangeVal)));
      for (let idx = 0; idx < n; idx++) {
        env[stmt.varName] = idx;
        for (const s of stmt.body) execStmt(s);
      }
      return;
    }
  };

  try {
    for (const s of program) execStmt(s);
    return { stdout, env };
  } catch (e) {
    return { stdout, env, error: (e as Error).message };
  }
}

export function analyzeScratch(code: string, runtime: Record<string, string>) {
  const env: Record<string, MiniValue> = {};

  // input(...) assignments: x = input("prompt")
  for (const m of code.matchAll(/\b([A-Za-z_]\w*)\s*=\s*input\s*\(/g)) {
    const name = m[1];
    if (name in runtime) env[name] = runtime[name];
  }

  // basic assignments: x = "text" | 123 | True/False
  for (const m of code.matchAll(
    /^\s*([A-Za-z_]\w*)\s*=\s*(["'][^"']*["']|-?\d+|True|False)\s*$/gm
  )) {
    const name = m[1];
    const raw = m[2].trim();
    if (isQuoted(raw)) env[name] = unquote(raw);
    else if (raw === "True" || raw === "False") env[name] = raw === "True";
    else env[name] = Number(raw);
  }

  // derive printed lines (best-effort, line-based)
  const printed: string[] = [];
  for (const line of code.split("\n")) {
    const idx = line.indexOf("print(");
    if (idx < 0) continue;
    const open = line.indexOf("(", idx);
    const close = line.lastIndexOf(")");
    if (open < 0 || close < 0 || close <= open) continue;
    const inner = line.slice(open + 1, close).trim();
    const out = evalMiniExpr(inner, env);
    printed.push(out === null ? `(couldn't evaluate) ${inner}` : out);
  }

  const vars = Object.entries(env)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => ({ key: k, value: v }));

  const hasWhile = /\bwhile\b/.test(code);
  const hasFor = /\bfor\b/.test(code);
  const hasIf = /\bif\b/.test(code);
  const hasElif = /\belif\b/.test(code);
  const hasElse = /\belse\s*:/.test(code);
  const hasInput = /\binput\s*\(/.test(code);
  const hasPrint = /\bprint\s*\(/.test(code);

  const summaryBits: string[] = [];
  if (hasInput) summaryBits.push("You asked the user a question with input().");
  if (vars.length) summaryBits.push("You saved info into memory boxes (variables).");
  if (hasIf || hasElif || hasElse) summaryBits.push("You used choices (if/elif/else).");
  if (hasWhile) summaryBits.push("You used a loop (while), so parts can repeat.");
  if (hasFor) summaryBits.push("You used a loop (for), so parts can repeat.");
  if (hasPrint) summaryBits.push("You printed messages to the console.");

  const summary =
    summaryBits.length > 0
      ? summaryBits.join(" ")
      : "Start by adding a variable or a print statement, then press Run.";

  const tips: string[] = [];
  if (!hasPrint) tips.push("Add print(...) so you can see output in the console.");
  if (hasInput && vars.length === 0)
    tips.push("Tip: save input into a variable like name = input(\"...\").");
  if (hasWhile)
    tips.push("Heads up: loops can print multiple times — your output may repeat while it runs.");
  if (hasFor)
    tips.push("Heads up: loops can print multiple times — your output may repeat for each loop turn.");

  return { env, vars, printed, summary, tips };
}
