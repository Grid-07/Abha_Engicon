"""Derive the Abha Engicon wordmark assets from the official logo file.

    python scripts/make-logo.py

The source of truth is the company's own logo:

    public/images/brand/abha engicon.png

It is a 1024x1024 RGB file: the ABHA/ENGICON wordmark in black on a flat sand
ground. The ground is uniform (231, 203, 164) to within a unit of noise, and
the lettering is pure black, so the artwork can be lifted out exactly rather
than approximated:

    a = 1 - pixel / ground      (per channel, because the ink is black)

That is the un-composite of black ink over the sand ground. The result is a
true alpha matte with the antialiased edges intact, which is then painted in
the three colours the sites use. Nothing is redrawn and nothing is traced --
the letterforms are the company's own pixels, only the colour and the ground
are changed.

Writes into public/images/brand/:

    logo-ink.png       full wordmark, ink     #141418   light grounds
    logo-cream.png     full wordmark, cream   #f3ebdd   dark grounds
    logo-sand.png      full wordmark, sand    #e7cca4   the project bars
    logo-abha-*.png    the ABHA line alone    for small sizes and the tab icon
    logo-mark-a-*.png  the first A alone      the tab / app icon monogram

The ABHA-only crop exists because the full lockup is 2.5:1 -- at a 30px nav
height its ENGICON line lands under 5px and turns to mush. The short form is
what reads at that size.

The single A is the last step down that ladder: the Didone serif letter is
114x135 of the company's own pixels, and it is the only part of the logo that
survives a 16px favicon. It is drawn at its native size inside the icon
plate, never upscaled, so the hairline strokes stay crisp.
"""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
BRAND = PUB / "images" / "brand"

SOURCE = BRAND / "abha engicon.png"

GROUND = (231.0, 203.0, 164.0)

INK = (20, 20, 24)
CREAM = (243, 235, 221)
SAND = (231, 204, 164)

# The two lines of the lockup, as bands of ink rows in the 1024 canvas.
ABHA_BAND = (397, 532)
ENGICON_BAND = (591, 624)

# The first A of the ABHA line, as a column range in the cropped ABHA band
# (letters land at 2-115, 163-254, 308-419, 465-578).
A_BAND = (0, 122)

CUTOFF = 8  # alpha below this counts as empty


def matte(source: Image.Image) -> Image.Image:
    """Lift the black artwork off the sand ground into an alpha channel."""
    rgb = source.convert("RGB")
    w, h = rgb.size
    px = rgb.load()

    alpha = Image.new("L", (w, h), 0)
    ap = alpha.load()

    for y in range(h):
        for x in range(w):
            p = px[x, y]
            v = 1.0 - (p[0] / GROUND[0] + p[1] / GROUND[1] + p[2] / GROUND[2]) / 3.0
            ap[x, y] = max(0, min(255, int(round(v * 255))))

    out = Image.new("RGBA", (w, h), INK + (0,))
    out.putalpha(alpha)
    return out


def tight(im: Image.Image) -> Image.Image:
    """Crop to the ink, then drop the near-empty fringe."""
    a = im.getchannel("A").point(lambda v: 255 if v > CUTOFF else 0)
    box = a.getbbox()
    if not box:
        raise SystemExit("no artwork found in the source file")
    return im.crop(box)


def paint(im: Image.Image, colour) -> Image.Image:
    """Recolour the artwork, keeping the alpha matte exactly as it is."""
    out = Image.new("RGBA", im.size, colour + (0,))
    out.putalpha(im.getchannel("A"))
    return out


def band(im: Image.Image, rows) -> Image.Image:
    """Take one text line out of the full lockup."""
    top, bottom = rows
    return im.crop((0, top, im.width, bottom))


def columns(im: Image.Image, left: int, right: int) -> Image.Image:
    """Take one glyph out of a text line."""
    return im.crop((left, 0, right, im.height))


def main() -> None:
    if not SOURCE.exists():
        raise SystemExit(f"missing source file: {SOURCE}")

    # The band coordinates are in the 1024 canvas, so the split has to happen
    # before the tight crop moves everything.
    matted = matte(Image.open(SOURCE))

    full = tight(matted)
    abha = tight(band(matted, ABHA_BAND))
    letter = tight(columns(abha, *A_BAND))

    print(f"source   {SOURCE.name}  {Image.open(SOURCE).size}")
    print(f"lockup   {full.size}  aspect {full.width / full.height:.3f}")
    print(f"abha     {abha.size}  aspect {abha.width / abha.height:.3f}")
    print(f"mark a   {letter.size}  aspect {letter.width / letter.height:.3f}")

    for name, colour in (("ink", INK), ("cream", CREAM), ("sand", SAND)):
        paint(full, colour).save(BRAND / f"logo-{name}.png")
        paint(abha, colour).save(BRAND / f"logo-abha-{name}.png")
        paint(letter, colour).save(BRAND / f"logo-mark-a-{name}.png")

    for f in sorted(BRAND.glob("logo-*.png")):
        print(f"  {f.name:24} {f.stat().st_size / 1024:6.1f} KB")


if __name__ == "__main__":
    main()
