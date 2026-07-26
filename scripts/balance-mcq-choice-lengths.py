#!/usr/bin/env python3
"""
Balance MCQ choice lengths + reshuffle correctIndex so length (or boilerplate) is not a tell.

Strategy:
  - Rebuild short WRONG choices as full sentences of ~correct length (varied templates).
  - Strip any prior balancer boilerplate if re-run.
  - Shuffle choice order with a stable per-question seed.
"""

from __future__ import annotations

import hashlib
import json
import random
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "lib"
DIRS = [
    "aiLessons",
    "digitalLessons",
    "cyberLessons",
    "financeLessons",
    "dataLessons",
    "pythonLessons",
    "apCspLessons",
    "apCspExams",
]

# Prior-run boilerplate to strip before rebuilding.
BOILER_RES = [
    re.compile(
        r"(?:, which sounds easy but skips the key requirement in practice"
        r"| — a common shortcut that usually fails under real conditions"
        r"|, though that approach ignores the main rule this lesson teaches"
        r"| for every case without checking the actual evidence or steps"
        r"|, but that confuses a side detail with the core idea here"
        r"| if you only glance quickly and miss the deciding factor"
        r"|, which can feel right at first but does not hold up on review"
        r"| when speed matters more than accuracy — a frequent trap"
        r"|, even though the safer and correct process is different"
        r"| without naming the constraint that actually decides the answer"
        r"|, treating a rare edge case as if it were the normal rule"
        r"| because it looks familiar, not because it matches the definition"
        r"| in this situation| for this problem| on a careful check| under normal use"
        r"| when you compare it against the lesson’s definition"
        r"| once you name the rule that actually decides the case"
        r"| after you separate the look-alike idea from the real one"
        r"| because the prompt hinges on a specific requirement"
        r"| when checked against the lesson definition"
        r"| once the deciding rule is named clearly"
        r"| after separating a look-alike idea from the real one"
        r"| because the stem hinges on a specific requirement)+$"
    ),
]

STR = r'"(?:\\.|[^"\\])*"'
ARR = rf"\[(?:\s*{STR}\s*,)*\s*{STR}\s*,?\s*\]"


def unquote(s: str) -> str:
    return json.loads(s)


def quote(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def parse_arr(arr_src: str) -> list[str]:
    return [unquote(m.group(0)) for m in re.finditer(STR, arr_src)]


def strip_boiler(text: str) -> str:
    out = text.strip()
    for _ in range(4):
        nxt = out
        for rx in BOILER_RES:
            nxt = rx.sub("", nxt).rstrip(" ,;—")
        if nxt == out:
            break
        out = nxt
    return out.strip()


def uniquely_longest_index(choices: list[str]) -> int | None:
    lens = [len(c) for c in choices]
    m = max(lens)
    idxs = [i for i, L in enumerate(lens) if L == m]
    return idxs[0] if len(idxs) == 1 else None


def rebuild_wrong(core: str, target: int, rng: random.Random) -> str:
    """Turn a short wrong claim into a full sentence near target length."""
    core = strip_boiler(core).rstrip(".")
    # Drop leftover templates from earlier balancer passes.
    core = re.sub(
        r"^(?:It can seem like |Some learners (?:answer|settle on) |"
        r"You might defend |Picking |A rushed read can land on |"
        r"Treat |If the goal were something else, )",
        "",
        core,
        flags=re.I,
    )
    core = re.sub(r"^[\“\"]|[\”\"]$", "", core.strip())
    core = re.sub(
        r"(?: — familiar wording.*| yet that does not match.*|"
        r" describes a different situation.*| as a distractor:.*|"
        r"\. That option sounds confident.*|; a careful one rejects.*|"
        r" might work; for this check, it does not.*|"
        r", but that reading skips.*)$",
        "",
        core,
        flags=re.I,
    ).strip().rstrip(".")
    if not core:
        core = "That other interpretation"
    nucleus = core
    low = nucleus[0].lower() + nucleus[1:] if len(nucleus) > 1 else nucleus.lower()

    # Varied frames — avoid one shared wrapper (e.g. curly-quoted claim + same clause).
    templates = [
        f"It can seem like {low}, but that reading skips the distinction this question is testing",
        f"Some learners settle on {low}, yet that does not match the precise idea from the lesson",
        f"{nucleus} is close in topic, but it is the wrong fit for what the prompt asks",
        f"In casual conversation people may say {low}, and still miss the definition used here",
        f"A common mix-up is to treat {low} as enough, which confuses a nearby idea with the right one",
        f"If the goal were different, {low} might be fine; for this check it is not the answer",
        f"{nucleus}. That sounds confident at first, but it leaves out the deciding constraint",
        f"A rushed pass can land on {low}; careful readers reject it for this problem",
        f"{nucleus} belongs to a different situation than the one in the question stem",
        f"This choice restates {low} without satisfying the requirement the lesson is checking",
        f"Going with {low} overlooks the key condition that separates a right answer from a near miss",
        f"{nucleus} may feel intuitive, though intuition is what this item is designed to catch",
    ]
    rng.shuffle(templates)
    best = min(templates, key=lambda t: abs(len(t) - target))
    extras = [
        " when checked against the lesson definition",
        " once the deciding rule is named clearly",
        " after separating a look-alike idea from the real one",
        " because the stem hinges on a specific requirement",
    ]
    out = best
    for extra in extras:
        if len(out) >= target - 6:
            break
        cand = out + extra
        if abs(len(cand) - target) <= abs(len(out) - target) or len(out) < target * 0.85:
            out = cand
    return out


def balance_and_shuffle(choices: list[str], correct_index: int, seed: str):
    rng = random.Random(hashlib.sha256(seed.encode()).hexdigest())
    cleaned = [strip_boiler(c) for c in choices]
    correct = cleaned[correct_index]
    target = len(correct)
    # Keep code/number answers from forcing absurd essays on tiny distractors.
    if target < 24:
        target = max(target, max(len(c) for c in cleaned))
    target = min(max(target, 36), 120)

    new_choices: list[str] = []
    for i, c in enumerate(cleaned):
        if i == correct_index:
            new_choices.append(correct)
        elif abs(len(c) - len(correct)) <= 12 and len(c) >= max(20, int(len(correct) * 0.75)):
            new_choices.append(c)
        else:
            new_choices.append(rebuild_wrong(c, max(len(correct), target), rng))

    order = list(range(len(new_choices)))
    rng.shuffle(order)
    shuffled = [new_choices[i] for i in order]
    new_ci = order.index(correct_index)
    return shuffled, new_ci


TELL_RX = re.compile(
    r"describes a different situation|Treat “|as a distractor:|"
    r"which sounds easy but skips|for every case without checking|"
    r"common shortcut that usually fails",
    re.I,
)


def should_fix(choices: list[str], correct_index: int) -> bool:
    if len(choices) < 2:
        return False
    if correct_index < 0 or correct_index >= len(choices):
        return False
    cleaned = [strip_boiler(c) for c in choices]
    # Re-fix if prior boilerplate / template tells remain on wrong choices.
    if any(cleaned[i] != choices[i].strip() for i in range(len(choices)) if i != correct_index):
        return True
    if any(TELL_RX.search(c) for i, c in enumerate(choices) if i != correct_index):
        return True
    lens = [len(c) for c in cleaned]
    if max(lens) - min(lens) < 14:
        return False
    ul = uniquely_longest_index(cleaned)
    if ul == correct_index:
        return True
    second = sorted(lens)[-2]
    if len(cleaned[correct_index]) - second >= 16:
        return True
    return False


def format_arr(choices: list[str], multiline: bool) -> str:
    if multiline or any(len(c) > 48 for c in choices):
        inner = ",\n            ".join(quote(c) for c in choices)
        return "[\n            " + inner + ",\n          ]"
    return "[" + ", ".join(quote(c) for c in choices) + "]"


def main() -> None:
    stats = {"files": 0, "questions_seen": 0, "questions_fixed": 0, "by_dir": {}}

    pat_obj = re.compile(rf"(choices:\s*)({ARR})(\s*,\s*correctIndex:\s*)(\d+)", re.S)
    pat_check = re.compile(
        rf"(check\(\s*{STR}\s*,\s*)({ARR})(\s*,\s*)(\d+)(\s*,\s*{STR}\s*\))",
        re.S,
    )
    pat_exam = re.compile(
        rf"(choices:\s*)({ARR})(\s*,\s*correctIndexes:\s*)\[(\d+)\]",
        re.S,
    )

    for d in DIRS:
        base = ROOT / d
        if not base.exists():
            continue
        for path in sorted(base.rglob("*.ts")):
            text = path.read_text(encoding="utf-8")
            orig = text
            counter = {"fixed": 0}

            def repl_obj(m, path=path, counter=counter):
                arr_src, ci = m.group(2), int(m.group(4))
                choices = parse_arr(arr_src)
                stats["questions_seen"] += 1
                if not should_fix(choices, ci):
                    return m.group(0)
                shuffled, new_ci = balance_and_shuffle(
                    choices, ci, f"{path}:{m.start()}:{strip_boiler(choices[ci])[:40]}"
                )
                counter["fixed"] += 1
                stats["questions_fixed"] += 1
                return f"{m.group(1)}{format_arr(shuffled, chr(10) in arr_src)}{m.group(3)}{new_ci}"

            def repl_check(m, path=path, counter=counter):
                arr_src, ci = m.group(2), int(m.group(4))
                choices = parse_arr(arr_src)
                stats["questions_seen"] += 1
                if not should_fix(choices, ci):
                    return m.group(0)
                shuffled, new_ci = balance_and_shuffle(
                    choices, ci, f"{path}:check:{m.start()}:{strip_boiler(choices[ci])[:40]}"
                )
                counter["fixed"] += 1
                stats["questions_fixed"] += 1
                new_arr = "[" + ", ".join(quote(c) for c in shuffled) + "]"
                return f"{m.group(1)}{new_arr}{m.group(3)}{new_ci}{m.group(5)}"

            def repl_exam(m, path=path, counter=counter):
                arr_src, ci = m.group(2), int(m.group(4))
                choices = parse_arr(arr_src)
                stats["questions_seen"] += 1
                if not should_fix(choices, ci):
                    return m.group(0)
                shuffled, new_ci = balance_and_shuffle(
                    choices, ci, f"{path}:exam:{m.start()}:{strip_boiler(choices[ci])[:40]}"
                )
                counter["fixed"] += 1
                stats["questions_fixed"] += 1
                return f"{m.group(1)}{format_arr(shuffled, chr(10) in arr_src)}{m.group(3)}[{new_ci}]"

            text = pat_obj.sub(repl_obj, text)
            text = pat_check.sub(repl_check, text)
            text = pat_exam.sub(repl_exam, text)

            if text != orig:
                path.write_text(text, encoding="utf-8")
                stats["files"] += 1
                stats["by_dir"][d] = stats["by_dir"].get(d, 0) + counter["fixed"]

    print(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
