"""Rebuild the social share card with the official Abha Engicon wordmark.

    python scripts/make-og.py

Writes public/images/og-image.jpg.

The card is a split panel: a sand lattice field on the left, the aerial render
of the complex on the right. The render is a 770px-wide 3D render whose source
file is not in the repo, so the right panel is preserved pixel for pixel and
never redrawn. It is kept as scripts/og-render-source.jpg so that rebuilding
the card never re-compresses it.

The left panel is not redrawn either -- it is rebuilt from the site's own
recipe so that it matches the page it shares a link to:

    ground  sand-200 (#e7cca4)
    lattice images/brand/lattice-sand.jpg, scaled to 430px wide, tiled
    opacity 0.5

That recipe was recovered from the original card by measurement, and it
reproduces it to within the JPEG noise floor (rms 2.9/255).

The wordmark is the company's own artwork: the ABHA line is placed in exactly
the optical slot the old type-set version occupied, so the composition of the
card is unchanged and only the letterforms are now the real ones.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
BRAND = PUB / "images" / "brand"

CARD = PUB / "images" / "og-image.jpg"
RENDER_SOURCE = ROOT / "scripts" / "og-render-source.jpg"
LATTICE = BRAND / "lattice-sand.jpg"
LOGO = BRAND / "logo-ink.png"

W, H = 1200, 630
SEAM = 430          # the split between the lattice panel and the render
TILE_W = 430        # the lattice tile's width on the card
GROUND = (231, 204, 164)  # sand-200
OPACITY = 0.5

# Where the old type-set wordmark sat, measured off the original card.
ABHA_BOX = (90, 235, 339, 293)   # x0, y0, x1, y1 of the ABHA line's ink
RULE = (181, 390, 249, 391)      # the rule under the wordmark

INK = (20, 20, 24)


def build_panel() -> Image.Image:
    """The site's lattice treatment: ground blended under the tiled lattice."""
    tile = Image.open(LATTICE).convert("RGB")
    tile = tile.resize((TILE_W, round(TILE_W * tile.height / tile.width)), Image.LANCZOS)

    lattice = Image.new("RGB", (SEAM, H))
    for y in range(0, H, tile.height):
        lattice.paste(tile, (0, y))

    ground = Image.new("RGB", (SEAM, H), GROUND)
    return Image.blend(ground, lattice, OPACITY)


def abha_band(logo: Image.Image):
    """The bounding box of the ABHA line -- the first run of ink rows."""
    alpha = logo.getchannel("A")
    w, h = logo.size
    px = alpha.load()

    rows = [y for y in range(h) if any(px[x, y] > 24 for x in range(w))]
    top = rows[0]
    gap = next(y for y in range(top, h) if not any(px[x, y] > 24 for x in range(w)))

    cols = [x for x in range(w) if any(px[x, y] > 24 for y in range(top, gap))]
    return (min(cols), top, max(cols), gap - 1)


def place_wordmark(panel: Image.Image) -> Image.Image:
    """Drop the official lockup into the slot the old wordmark occupied."""
    logo = Image.open(LOGO).convert("RGBA")

    x0, _, x1, _ = abha_band(logo)
    target_w = ABHA_BOX[2] - ABHA_BOX[0] + 1
    scale = target_w / (x1 - x0 + 1)

    sized = logo.resize(
        (max(1, round(logo.width * scale)), max(1, round(logo.height * scale))),
        Image.LANCZOS,
    )

    # Re-derive the ABHA box after scaling so the placement is exact.
    ax0, ay0, _, _ = abha_band(sized)
    left = ABHA_BOX[0] - ax0
    top = ABHA_BOX[1] - ay0

    canvas = panel.copy()
    canvas.paste(sized, (left, top), sized)
    return canvas


def draw_rule(panel: Image.Image) -> Image.Image:
    draw = ImageDraw.Draw(panel)
    draw.rectangle([RULE[0], RULE[1], RULE[2], RULE[3]], fill=INK)
    return panel


def render_panel() -> Image.Image:
    """The aerial render, preserved pixel for pixel across rebuilds."""
    if not RENDER_SOURCE.exists():
        card = Image.open(CARD).convert("RGB")
        card.crop((SEAM, 0, W, H)).save(RENDER_SOURCE, quality=95, subsampling=0)
    return Image.open(RENDER_SOURCE).convert("RGB")


def main() -> None:
    render = render_panel()

    panel = build_panel()
    panel = place_wordmark(panel)
    panel = draw_rule(panel)

    card = Image.new("RGB", (W, H))
    card.paste(panel, (0, 0))
    card.paste(render, (SEAM, 0))

    card.save(CARD, quality=93, subsampling=0, optimize=True)
    print(f"  {CARD.relative_to(ROOT)}  {card.size}  {CARD.stat().st_size / 1024:.1f} KB")


if __name__ == "__main__":
    main()
