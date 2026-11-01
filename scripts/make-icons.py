"""Generate the tab / home-screen icons from the Abha Engicon column emblem.

    python scripts/make-icons.py

Writes into public/:

    favicon.ico            16 / 32 / 48, rounded
    favicon-32.png         rounded
    favicon-192.png        rounded
    favicon-512.png        rounded
    maskable-512.png       full bleed, extra padding for Android's mask
    apple-touch-icon.png   180, full bleed (iOS applies its own mask)
    site.webmanifest

The emblem is a flat single-colour shape, so it is rebuilt at every size from
its alpha channel rather than being downscaled from a screenshot — thin strokes
stay crisp at 16px instead of turning to mush.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"

CONFIG = {
    "emblem": "images/brand/emblem-sand.png",
    "name": "Abha Engicon",
    "short_name": "Abha Engicon",
    "theme": "#e7cca4",
    "background": "#f3ebdd",
}

INK = (20, 20, 24)
MARK = (231, 204, 164)

BASE = 512
CORNER = 0.18


def recolour(emblem: Image.Image, colour, box: int) -> Image.Image:
    """Emblem alpha painted flat, scaled to fit a `box` square."""
    em = emblem.crop(emblem.getbbox())
    scale = min(box / em.width, box / em.height)
    size = (max(1, round(em.width * scale)), max(1, round(em.height * scale)))
    em = em.resize(size, Image.LANCZOS)
    solid = Image.new("RGBA", em.size, colour + (255,))
    solid.putalpha(em.getchannel("A"))
    return solid


def plate(size: int, radius_ratio: float | None) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    if radius_ratio:
        r = round(size * radius_ratio)
        draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=INK + (255,))
    else:
        draw.rectangle([0, 0, size - 1, size - 1], fill=INK + (255,))
    return canvas


def icon(emblem: Image.Image, size: int, radius_ratio: float | None, mark_ratio: float) -> Image.Image:
    canvas = plate(size, radius_ratio)
    layer = recolour(emblem, MARK, round(size * mark_ratio))
    canvas.alpha_composite(
        layer,
        ((size - layer.width) // 2, (size - layer.height) // 2),
    )
    return canvas


def main() -> None:
    emblem = Image.open(ROOT / "public" / CONFIG["emblem"]).convert("RGBA")

    rounded = icon(emblem, BASE, CORNER, 0.82)
    rounded.resize((512, 512), Image.LANCZOS).save(PUB / "favicon-512.png")
    rounded.resize((192, 192), Image.LANCZOS).save(PUB / "favicon-192.png")
    rounded.resize((32, 32), Image.LANCZOS).save(PUB / "favicon-32.png")

    # Pillow builds the .ico from the largest image, resampling per size.
    rounded.resize((256, 256), Image.LANCZOS).save(
        PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)]
    )

    # iOS rounds the corners itself, and Android's maskable safe zone is a
    # circle inside the middle 80% — so both get a full-bleed plate and a
    # smaller mark rather than the rounded, tightly-cropped desktop icon.
    icon(emblem, BASE, None, 0.54).resize((180, 180), Image.LANCZOS).save(
        PUB / "apple-touch-icon.png"
    )
    icon(emblem, BASE, None, 0.46).save(PUB / "maskable-512.png")

    (PUB / "site.webmanifest").write_text(
        "{\n"
        f'  "name": "{CONFIG["name"]}",\n'
        f'  "short_name": "{CONFIG["short_name"]}",\n'
        '  "start_url": "./",\n'
        '  "scope": "./",\n'
        '  "display": "standalone",\n'
        f'  "theme_color": "{CONFIG["theme"]}",\n'
        f'  "background_color": "{CONFIG["background"]}",\n'
        '  "icons": [\n'
        '    { "src": "./favicon-192.png", "sizes": "192x192", "type": "image/png" },\n'
        '    { "src": "./favicon-512.png", "sizes": "512x512", "type": "image/png" },\n'
        '    { "src": "./maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }\n'
        "  ]\n"
        "}\n",
        encoding="utf-8",
    )

    for name in (
        "favicon.ico",
        "favicon-32.png",
        "favicon-192.png",
        "favicon-512.png",
        "maskable-512.png",
        "apple-touch-icon.png",
        "site.webmanifest",
    ):
        print(f"  {name:22} {(PUB / name).stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
