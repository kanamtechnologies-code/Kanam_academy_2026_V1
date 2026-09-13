#!/usr/bin/env python3
"""Kanam library cards — one photo, type on the image. No grid, no collage."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "library"
ASSETS = Path(
    "/Users/torythompson/.cursor/projects/Users-torythompson-Downloads-Kanam-academy-2026-V1-main/assets"
)
LOCKUP = ROOT / "public" / "images" / "brand" / "kanam-logo-lockup-trimmed.png"
PHOTO_P = ASSETS / "kanam-card-photo-v3-portrait.png"
PHOTO_L = ASSETS / "kanam-card-photo-v3-landscape.png"

DISPLAY_URL = "learn.kanamacademy.com"
CLASS_CODE = "KANAM-HCLS"

DIGITAL = {
    "hook": "Judge what's true online. Protect your identity.",
    "chips": [
        ["Computers", "Search", "Fake news", "Privacy"],
        ["AI tools", "Passwords", "Footprint", "Safe accounts"],
    ],
}
FINANCIAL = {
    "hook": "Turn a paycheck into a plan you can keep.",
    "chips": [
        ["Banking", "Budgets", "Credit", "Taxes"],
        ["Saving", "Investing", "Insurance", "Scams"],
    ],
}

GOLD = (216, 192, 122)
GREEN = (20, 78, 62)
INK = (18, 36, 30)
WHITE = (255, 255, 255)
SOFT = (236, 238, 234)

AVENIR = "/System/Library/Fonts/Supplemental/Avenir Next.ttc"
GEORGIA = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"


# Avenir Next.ttc: 0 Bold, 2 Demi Bold, 5 Medium, 7 Regular
BOLD, DEMI, MED, REG = 0, 2, 5, 7


def av(size: int, face: int = REG) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(AVENIR, size, index=face)


def geo(size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(GEORGIA, size)


def lockup_white(max_w: int) -> Image.Image:
    src = Image.open(LOCKUP).convert("RGBA")
    box = src.getbbox()
    if box:
        src = src.crop(box)
    px = src.load()
    w, h = src.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 10 or (r > 235 and g > 235 and b > 235):
                px[x, y] = (255, 255, 255, 0 if r > 235 else a)
                continue
            if r > 150 and g > 130 and b < 150:
                px[x, y] = (*GOLD, a)
            else:
                px[x, y] = (255, 255, 255, a)
    box = src.getbbox()
    if box:
        src = src.crop(box)
    ratio = max_w / src.width
    return src.resize((int(src.width * ratio), int(src.height * ratio)), Image.Resampling.LANCZOS)


def qr(size: int) -> Image.Image:
    return Image.open(OUT / "kanam-hcls-qr.png").convert("RGBA").resize(
        (size, size), Image.Resampling.NEAREST
    )


def lift(im: Image.Image, strength: float = 1.0) -> Image.Image:
    """strength 1.0 = 4x6 grade. 5x7 uses less so the table matches."""
    rgb = im.convert("RGB")
    exp = 1.0 + 0.48 * strength
    gain = 1.0 + 0.10 * strength
    bright = 1.0 + 0.14 * strength

    def tone(v: int) -> int:
        x = v / 255.0
        y = 1 - (1 - x) ** exp
        y = min(1.0, y * gain)
        return min(255, int(y * 255))

    rgb = rgb.point([tone(i) for i in range(256)] * 3)
    rgb = ImageEnhance.Brightness(rgb).enhance(bright)
    rgb = ImageEnhance.Contrast(rgb).enhance(0.97)
    rgb = ImageEnhance.Color(rgb).enhance(1.06)
    return rgb


def dark_veil(canvas: Image.Image, start: float = 0.52, bot_a: int = 72) -> Image.Image:
    """Light wash so white type still reads on wood — not a black grade."""
    w, h = canvas.size
    y0 = int(h * start)
    grad = Image.new("L", (1, h), 0)
    gp = grad.load()
    for y in range(y0, h):
        t = (y - y0) / max(1, h - 1 - y0)
        gp[0, y] = int(bot_a * (t**0.85))
    mask = grad.resize((w, h), Image.Resampling.BILINEAR)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=32))
    tint = Image.new("RGBA", (w, h), (28, 36, 32, 255))
    tint.putalpha(mask)
    return Image.alpha_composite(canvas, tint)


def type_veil(canvas: Image.Image, start: float = 0.38, top_a: int = 105, bot_a: int = 168) -> Image.Image:
    """Fade from the photo into a type wash — no hard horizon."""
    w, h = canvas.size
    fade = 0.26
    y0 = int(h * max(0.0, start - fade))
    y1 = int(h * start)
    grad = Image.new("L", (1, h), 0)
    gp = grad.load()
    for y in range(y0, h):
        if y < y1:
            t = (y - y0) / max(1, y1 - y0)
            ease = t * t * (3 - 2 * t)
            gp[0, y] = int(top_a * ease)
        else:
            t = (y - y1) / max(1, h - 1 - y1)
            gp[0, y] = int(top_a + (bot_a - top_a) * (t**0.7))
    mask = grad.resize((w, h), Image.Resampling.BILINEAR)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=36))
    tint = Image.new("RGBA", (w, h), (14, 20, 18, 255))
    tint.putalpha(mask)
    return Image.alpha_composite(canvas, tint)


def side_veil(canvas: Image.Image, start: float = 0.46, max_a: int = 168) -> Image.Image:
    """Darken the type column so copy reads over busy bookshelves."""
    w, h = canvas.size
    x0 = int(w * start)
    grad = Image.new("L", (w, 1), 0)
    gp = grad.load()
    for x in range(w):
        if x < x0:
            continue
        t = (x - x0) / max(1, w - 1 - x0)
        gp[x, 0] = int(max_a * (t**0.58))
    mask = grad.resize((w, h), Image.Resampling.BILINEAR)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=28))
    tint = Image.new("RGBA", (w, h), (16, 22, 20, 255))
    tint.putalpha(mask)
    return Image.alpha_composite(canvas, tint)


def left_veil(canvas: Image.Image, end: float = 0.58, max_a: int = 150) -> Image.Image:
    """Darken a left type column so copy reads over a sweater or table."""
    w, h = canvas.size
    x1 = int(w * end)
    grad = Image.new("L", (w, 1), 0)
    gp = grad.load()
    for x in range(x1):
        t = 1 - x / max(1, x1)
        ease = t * t * (3 - 2 * t)
        gp[x, 0] = int(max_a * ease)
    mask = grad.resize((w, h), Image.Resampling.BILINEAR)
    mask = mask.filter(ImageFilter.GaussianBlur(radius=28))
    tint = Image.new("RGBA", (w, h), (16, 22, 20, 255))
    tint.putalpha(mask)
    return Image.alpha_composite(canvas, tint)


def cover(
    path: Path,
    size: tuple[int, int],
    focus=(0.5, 0.35),
    zoom: float = 1.0,
    lift_strength: float = 1.0,
) -> Image.Image:
    im = Image.open(path).convert("RGB")
    tw, th = size
    scale = max(tw / im.width, th / im.height) * zoom
    nw, nh = int(im.width * scale), int(im.height * scale)
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    x = int(max(0, min((nw - tw) * focus[0], nw - tw)))
    y = int(max(0, min((nh - th) * focus[1], nh - th)))
    return lift(im.crop((x, y, x + tw, y + th)), strength=lift_strength)


def txt(draw, xy, text, font, fill=WHITE):
    x, y = xy
    size = getattr(font, "size", 24) or 24
    r = 2 if size >= 28 else 1
    ink = (10, 14, 12)
    for dx in range(-r, r + 1):
        for dy in range(-r, r + 1):
            if dx or dy:
                draw.text((x + dx, y + dy), text, font=font, fill=ink)
    draw.text(xy, text, font=font, fill=fill)


def tw(draw, text, font) -> int:
    return draw.textbbox((0, 0), text, font=font)[2]


def wrap(draw, text: str, font, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if tw(draw, trial, font) <= max_w:
            cur = trial
        else:
            if cur:
                lines.append(cur)
            cur = word
    if cur:
        lines.append(cur)
    return lines


def block(draw, x, y, text, font, fill, max_w, leading) -> int:
    for line in wrap(draw, text, font, max_w):
        txt(draw, (x, y), line, font, fill)
        y += leading
    return y


def track_section(
    draw,
    x: int,
    y: int,
    spec: dict,
    title: str,
    title_size: int,
    hook_font,
    chip_font,
    col: int,
    hook_lead: int,
    chip_lead: int,
) -> int:
    y = track_title(draw, x, y, title, title_size)
    txt(draw, (x, y), spec["hook"], hook_font, GOLD)
    y += hook_lead
    for row in spec["chips"]:
        y = chips(draw, x, y, row, chip_font, col, chip_lead)
    return y


def track_title(draw, x: int, y: int, title: str, size: int) -> int:
    """Bold course name, lighter 16 lessons on the same line."""
    head = av(size, BOLD)
    meta = av(max(18, int(size * 0.68)), MED)
    txt(draw, (x, y), title, head, WHITE)
    gap = tw(draw, title + "    ", head)
    txt(draw, (x + gap, y + 8), "16 lessons", meta, SOFT)
    return y + int(size * 1.25)


def chips(
    draw, x: int, y: int, items: list[str], font, max_w: int, leading: int, fill=SOFT
) -> int:
    sep = "    ·    "
    line = sep.join(items)
    if tw(draw, line, font) <= max_w:
        cx = x
        for i, item in enumerate(items):
            txt(draw, (cx, y), item, font, fill)
            cx += tw(draw, item, font)
            if i < len(items) - 1:
                txt(draw, (cx, y), sep, font, GOLD)
                cx += tw(draw, sep, font)
        return y + leading
    mid = max(1, len(items) // 2)
    y = chips(draw, x, y, items[:mid], font, max_w, leading, fill)
    return chips(draw, x, y, items[mid:], font, max_w, leading, fill)


def qr_plate(canvas: Image.Image, xy: tuple[int, int], size: int, pad: int = 18) -> None:
    x, y = xy
    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle((x, y, x + size + pad * 2, y + size + pad * 2), 18, fill=WHITE)
    canvas.paste(qr(size), (x + pad, y + pad), qr(size))


def pin_qr(canvas: Image.Image, size: int, pad: int = 22, margin: int = 52) -> tuple[int, int, int]:
    """Park a full QR plate inside the card — never clipped."""
    W, H = canvas.size
    plate = size + pad * 2
    x = W - margin - plate
    y = H - margin - plate
    qr_plate(canvas, (x, y), size, pad=pad)
    return x, y, plate


def letter_sheet(card: Image.Image, label: str) -> Image.Image:
    W, H = 2550, 3300
    sheet = Image.new("RGB", (W, H), (232, 228, 220))
    d = ImageDraw.Draw(sheet)
    d.text((80, 72), f"Kanam Academy  ·  {label}  ·  Print at 100%", font=av(26, 5), fill=(90, 90, 86))
    cx, cy = (W - card.width) // 2, (H - card.height) // 2 + 16
    sheet.paste(card, (cx, cy))
    return sheet


def build_portrait(
    photo: Path = PHOTO_P,
    focus: tuple[float, float] = (0.48, 0.10),
    zoom: float = 1.36,
    y_start: int = 800,
    col: int = 840,
    veil: bool = False,
    wash: tuple[int, int] | None = None,
) -> Image.Image:
    W, H = 1500, 2100
    canvas = cover(photo, (W, H), focus=focus, zoom=zoom, lift_strength=0.38).convert("RGBA")
    top_a, bot_a = wash if wash else ((132, 196) if veil else (98, 150))
    canvas = type_veil(canvas, start=0.34, top_a=top_a, bot_a=bot_a)
    d = ImageDraw.Draw(canvas)

    logo = lockup_white(470)
    canvas.paste(logo, (36, 24), logo)

    q = 300
    pad = 24
    margin = 56
    qx, qy, plate = pin_qr(canvas, q, pad=pad, margin=margin)
    d = ImageDraw.Draw(canvas)

    x = 36
    y = y_start
    txt(d, (x, y), "Go at your own pace, on your phone or any computer.", av(34, MED), SOFT)
    y += 48
    txt(d, (x, y), "Learn digital skills", geo(90), WHITE)
    y += 98
    txt(d, (x, y), "and money skills.", geo(90), WHITE)
    y += 92
    txt(d, (x, y), "Two tracks.  16 lessons each.", av(36, MED), SOFT)
    y += 48
    txt(d, (x, y), "Free with your PINES card.", av(42, BOLD), GOLD)

    y += 48
    y = track_section(
        d, x, y, DIGITAL, "Digital Literacy", 42, av(32, DEMI), av(30, REG), col, 42, 40
    )
    y += 32
    y = track_section(
        d, x, y, FINANCIAL, "Financial Literacy", 42, av(32, DEMI), av(30, REG), col, 42, 40
    )

    fy = qy + 8
    txt(d, (x, fy), "Scan.  Confirm your PINES card.  Start.", av(34, BOLD), GOLD)
    txt(d, (x, fy + 46), "Under 13? Have a parent sign you up.", av(28, MED), SOFT)
    txt(d, (x, fy + 82), DISPLAY_URL, av(28, MED), SOFT)
    return canvas.convert("RGB")


def build_landscape(
    photo: Path = PHOTO_L,
    focus: tuple[float, float] = (0.14, 0.48),
    zoom: float = 1.16,
    veil: bool = False,
    cta: str = "table",
    column_veil: tuple[float, int] | None = None,
) -> Image.Image:
    W, H = 1800, 1200
    canvas = cover(photo, (W, H), focus=focus, zoom=zoom).convert("RGBA")
    if veil:
        canvas = dark_veil(canvas, start=0.12, bot_a=56)
    if column_veil:
        canvas = side_veil(canvas, start=column_veil[0], max_a=column_veil[1])
    d = ImageDraw.Draw(canvas)

    logo = lockup_white(380)
    canvas.paste(logo, (28, 16), logo)

    q = 250
    qx, qy, plate = pin_qr(canvas, q, pad=20, margin=44)
    d = ImageDraw.Draw(canvas)

    x = 1000
    col = 760
    y = 12
    txt(d, (x, y), "Go at your own pace, on your phone or any computer.", av(22, MED), SOFT)
    y += 34
    txt(d, (x, y), "Learn digital", geo(62), WHITE)
    y += 66
    txt(d, (x, y), "and money skills.", geo(62), WHITE)
    y += 64
    txt(d, (x, y), "Two courses.  32 lessons.  About 8 weeks.", av(22, MED), SOFT)
    y += 34
    txt(d, (x, y), "Normally $100 each.  Free with your PINES card.", av(26, BOLD), GOLD)

    y += 36
    y = track_section(
        d, x, y, DIGITAL, "Digital Literacy", 30, av(23, DEMI), av(21, REG), col, 30, 30
    )
    y += 28
    y = track_section(
        d, x, y, FINANCIAL, "Financial Literacy", 30, av(23, DEMI), av(21, REG), col, 30, 30
    )

    if cta == "column" and y < qy - 200:
        y += 28
        txt(d, (x, y), "Walk away knowing how to spot a scam,", av(22, MED), WHITE)
        y += 30
        txt(d, (x, y), "lock down a password, and start a budget.", av(22, MED), WHITE)
        y += 36
        txt(d, (x, y), "Hands-on lessons.  No teacher.  No app.", av(22, MED), SOFT)
        y += 40
        txt(d, (x, y), "Scan.  Confirm your PINES card.  Start.", av(24, BOLD), GOLD)
        y += 32
        txt(d, (x, y), "Under 13? Have a parent sign you up.", av(20, MED), SOFT)
        y += 28
        txt(d, (x, y), DISPLAY_URL, av(20, MED), SOFT)

    label = "Scan to start"
    lf = av(24, BOLD)
    lw = tw(d, label, lf)
    txt(d, (qx + plate - lw, qy - 42), label, lf, GOLD)

    if cta == "table":
        tx = 40
        ty = qy + 6
        txt(d, (tx, ty), "Walk away knowing how to spot a scam.", av(23, MED), WHITE)
        txt(d, (tx, ty + 34), "Scan.  Confirm your PINES card.  Start.", av(24, BOLD), GOLD)
        txt(d, (tx, ty + 68), "Under 13? Have a parent sign you up.", av(20, MED), SOFT)
        txt(d, (tx, ty + 98), DISPLAY_URL, av(20, MED), SOFT)
    return canvas.convert("RGB")


def build_back(
    photo: Path = PHOTO_L,
    focus: tuple[float, float] = (0.22, 0.46),
    zoom: float = 1.16,
) -> Image.Image:
    W, H = 1800, 1200
    canvas = cover(photo, (W, H), focus=focus, zoom=zoom).convert("RGBA")
    canvas = left_veil(canvas, end=0.70, max_a=198)
    d = ImageDraw.Draw(canvas)
    x = 40
    col = 980
    y = 400
    txt(d, (x, y), "Already in Kanam?", av(24, MED), SOFT)
    y += 36
    txt(d, (x, y), "Scan the front to add", geo(52), WHITE)
    y += 60
    txt(d, (x, y), "both tracks.", geo(52), WHITE)
    y += 56
    txt(d, (x, y), "Normally $100 each.  Free with your PINES card.", av(26, BOLD), GOLD)

    y += 36
    y = track_section(
        d, x, y, DIGITAL, "Digital Literacy", 30, av(23, DEMI), av(21, REG), col, 30, 30
    )
    y += 26
    y = track_section(
        d, x, y, FINANCIAL, "Financial Literacy", 30, av(23, DEMI), av(21, REG), col, 30, 30
    )

    y += 36
    txt(d, (x, y), "Walk away knowing how to spot a scam", av(22, MED), WHITE)
    y += 30
    txt(d, (x, y), "and start a budget you can actually keep.", av(22, MED), WHITE)
    y += 36
    txt(d, (x, y), "Under 13? Have a parent sign you up.", av(20, MED), SOFT)
    y += 28
    txt(d, (x, y), DISPLAY_URL, av(20, MED), SOFT)
    return canvas.convert("RGB")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    if not (OUT / "kanam-hcls-qr.png").exists():
        raise SystemExit("Missing QR")

    portraits = [
        {
            "name": "kanam-hcls-counter-card-5x7.png",
            "photo": PHOTO_P,
            "focus": (0.48, 0.10),
            "zoom": 1.36,
        },
        {
            "name": "kanam-hcls-counter-card-5x7-phone.png",
            "photo": ASSETS / "kanam-card-photo-v4-phone-portrait.png",
            "focus": (0.02, 0.00),
            "zoom": 1.28,
            "y_start": 760,
            "col": 720,
            "veil": True,
            "wash": (148, 210),
        },
        {
            "name": "kanam-hcls-counter-card-5x7-computer.png",
            "photo": ASSETS / "kanam-card-photo-v4-carrel-portrait.png",
            "focus": (0.40, 0.08),
            "zoom": 1.14,
            "col": 760,
            "veil": True,
        },
        {
            "name": "kanam-hcls-counter-card-5x7-family.png",
            "photo": ASSETS / "kanam-card-photo-v4-family-portrait.png",
            "focus": (0.50, 0.04),
            "zoom": 1.22,
            "y_start": 760,
            "col": 680,
            "veil": True,
            "wash": (140, 200),
        },
        {
            "name": "kanam-hcls-counter-card-5x7-budget.png",
            "photo": ASSETS / "kanam-card-photo-v4-budget-portrait.png",
            "focus": (0.22, 0.00),
            "zoom": 1.34,
            "y_start": 740,
            "col": 640,
            "veil": True,
            "wash": (156, 214),
        },
        {
            "name": "kanam-hcls-counter-card-5x7-stacks.png",
            "photo": ASSETS / "kanam-card-photo-v4-stacks-portrait.png",
            "focus": (0.18, 0.20),
            "zoom": 1.06,
            "col": 800,
            "veil": True,
        },
    ]
    first = None
    for spec in portraits:
        card = build_portrait(
            spec["photo"],
            spec["focus"],
            spec["zoom"],
            spec.get("y_start", 800),
            spec.get("col", 840),
            spec.get("veil", False),
            spec.get("wash"),
        )
        card.save(OUT / spec["name"], dpi=(300, 300))
        if first is None:
            first = card

    landscapes = [
        {
            "name": "kanam-hcls-postcard-4x6-front.png",
            "photo": PHOTO_L,
            "focus": (0.14, 0.48),
            "zoom": 1.16,
            "column_veil": (0.44, 214),
        },
        {
            "name": "kanam-hcls-postcard-4x6-front-phone.png",
            "photo": ASSETS / "kanam-card-photo-v4-phone-landscape.png",
            "focus": (0.55, 0.40),
            "zoom": 1.10,
            "veil": True,
            "cta": "column",
            "column_veil": (0.44, 188),
        },
        {
            "name": "kanam-hcls-postcard-4x6-front-computer.png",
            "photo": ASSETS / "kanam-card-photo-v4-carrel-landscape.png",
            "focus": (0.72, 0.38),
            "zoom": 1.08,
            "veil": True,
            "cta": "column",
        },
    ]
    first_l = None
    for spec in landscapes:
        card = build_landscape(
            spec["photo"],
            spec["focus"],
            spec["zoom"],
            spec.get("veil", False),
            spec.get("cta", "table"),
            spec.get("column_veil"),
        )
        card.save(OUT / spec["name"], dpi=(300, 300))
        if first_l is None:
            first_l = card

    back = build_back()
    back.save(OUT / "kanam-hcls-postcard-4x6-back.png", dpi=(300, 300))
    letter_sheet(first, "5×7 counter card").save(OUT / "kanam-hcls-counter-card-letter.png", dpi=(300, 300))
    letter_sheet(first_l, "4×6 postcard").save(OUT / "kanam-hcls-postcard-letter.png", dpi=(300, 300))
    print("wrote", OUT)


if __name__ == "__main__":
    main()
