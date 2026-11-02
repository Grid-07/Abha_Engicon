"""Generate the tab / home-screen icons from the Abha Engicon wordmark.

    python scripts/make-icons.py

Writes into public/:

    favicon.ico            16 / 32 / 48, rounded
    favicon-32.png         rounded
    favicon-192.png        rounded
    favicon-512.png        rounded
    maskable-512.png       full bleed, extra padding for Android's mask
    apple-touch-icon.png   180, full bleed (iOS applies its own mask)
    site.webmanifest

Every mark is rebuilt from the alpha channel of the company's own artwork
rather than being downscaled from a screenshot, so the hairline strokes of
the Didone serif stay crisp at 16px instead of turning to mush.

Two different cuts of the logo are used, because one cut cannot serve both
ends of the size range:

    the full lockup    581x233, 2.49:1   the app / home-screen icon
    the ABHA line      581x135, 4.30:1   the larger icons
    the single A       116x135, 0.86:1   the tab icon

At 16px the full lockup is unreadable -- its ENGICON line lands under 2px and
the ABHA letters collide. The lone A is the only cut of the logo that still
reads as a letter at that size, so it is what the browser tab gets. It is
drawn at its native 116x135, never upscaled.

The artwork is painted flat over the ink plate by writing the alpha channel
onto a solid colour, so nothing is resampled twice.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
BRAND = PUB / "images" / "brand"

CONFIG = {
    "name": "Abha Engicon",
    "short_name": "Abha Engicon",
    "theme": "#e7cca4",
    "background": "#f3ebdd",
}

INK = (20, 20, 24)
MARK = (231, 204, 164)

LOCKUP = BRAND / "logo-sand.png"       # 581x233, the full wordmark
ABHA = BRAND / "logo-abha-sand.png"    # 581x135, the ABHA line alone
MONO = BRAND / "logo-mark-a-sand.png"  # 116x135, the first A alone

BASE = 512
CORNER = 0.18

# Fraction of the plate the artwork spans, per cut.
LOCKUP_FIT = 0.76
ABHA_FIT = 0.80
MONO_FIT = 0.70  # of the plate height, because the A is tall and narrow


def plate(size: int, radius_ratio: float | None, colour=INK) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    if radius_ratio:
        r = round(size * radius_ratio)
        draw.rounded_rectangle([0, 0, size - 1, size - 1], radius=r, fill=colour + (255,))
    else:
        draw.rectangle([0, 0, size - 1, size - 1], fill=colour + (255,))
    return canvas


def paint(art: Image.Image, colour=MARK) -> Image.Image:
    """The artwork alpha laid onto a flat colour, with no resampling."""
    out = Image.new("RGBA", art.size, colour + (255,))
    out.putalpha(art.getchannel("A"))
    return out


def place(art: Image.Image, size: int, fit: float, by_height: bool = False) -> Image.Image:
    """Scale the artwork to fit inside `fit` of the plate and centre it."""
    if by_height:
        scale = size * fit / art.height
    else:
        scale = size * fit / art.width
    w = max(1, round(art.width * scale))
    h = max(1, round(art.height * scale))
    return art.resize((w, h), Image.LANCZOS)


def icon(art: Image.Image, size: int, radius_ratio: float | None, fit: float,
         by_height: bool = False) -> Image.Image:
    canvas = plate(size, radius_ratio)
    layer = place(art, size, fit, by_height)
    canvas.alpha_composite(layer, ((size - layer.width) // 2, (size - layer.height) // 2))
    return canvas


def main() -> None:
    lockup = Image.open(LOCKUP).convert("RGBA")
    abha = Image.open(ABHA).convert("RGBA")
    mono = Image.open(MONO).convert("RGBA")

    # --- the tab icon -------------------------------------------------------
    # Built at 192 and resampled down, so the 16px frame comes from a large
    # master rather than from a 16px raster blown up. The A is drawn at its
    # native 116x135 inside that master.
    tab = icon(mono, 192, CORNER, MONO_FIT, by_height=True)
    f16 = tab.resize((16, 16), Image.LANCZOS)
    f32 = tab.resize((32, 32), Image.LANCZOS)
    f48 = tab.resize((48, 48), Image.LANCZOS)

    f32.save(PUB / "favicon-32.png")
    f48.save(
        PUB / "favicon.ico",
        sizes=[(16, 16), (32, 32), (48, 48)],
        append_images=[f16, f32],
    )

    # --- the home-screen / PWA icons ----------------------------------------
    # These are seen large, so they carry the full official lockup.
    icon(lockup, BASE, CORNER, LOCKUP_FIT).save(PUB / "favicon-512.png")
    icon(lockup, BASE, CORNER, LOCKUP_FIT).resize((192, 192), Image.LANCZOS).save(
        PUB / "favicon-192.png"
    )

    # iOS rounds the corners itself, and Android's maskable safe zone is a
    # circle inside the middle 80% -- so both get a full-bleed plate and a
    # smaller mark rather than the rounded, tightly-cropped desktop icon.
    icon(lockup, BASE, None, 0.66).resize((180, 180), Image.LANCZOS).save(
        PUB / "apple-touch-icon.png"
    )
    icon(abha, BASE, None, ABHA_FIT).save(PUB / "maskable-512.png")

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
