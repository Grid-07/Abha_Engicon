"""Copy the five supplied renders into the Bimla project's brochure set.

Sources live in the clipboard cache; they are 1280x720 JPEGs. Nothing is
upscaled — the largest place any of them is drawn is about 640 CSS px, so the
native width already covers a 2x screen.
"""

from pathlib import Path

from PIL import Image

SRC = Path("C:/Users/Nikak/.workbuddy-ai/clipboard-images")
OUT = Path("D:/Abha_Engicon/public/projects/bimla/images/brochure")

# The render that replaces the About portrait, and the four amenity tiles.
# 058Z and 060Z are the same file: the pool shot and the play-area shot were
# supplied twice, so both tiles carry the frame as sent.
FILES = {
    "clipboard-2026-11-18T15-41-58-055Z-89930f65.jpg": "about-render.jpg",
    "clipboard-2026-11-18T15-41-58-058Z-5c047a01.jpg": "amenity-swim.jpg",
    "clipboard-2026-11-18T15-41-58-060Z-5c047a01.jpg": "amenity-pool.jpg",
    "clipboard-2026-11-18T15-41-58-059Z-36787064.jpg": "amenity-gym.jpg",
    "clipboard-2026-11-18T15-41-58-061Z-438c350b.jpg": "amenity-community.jpg",
}


def main() -> None:
    for name, out_name in FILES.items():
        im = Image.open(SRC / name).convert("RGB")
        im.save(OUT / out_name, quality=88, subsampling=0, optimize=True, progressive=True)
        print(f"{out_name:24} {im.width}x{im.height}")


if __name__ == "__main__":
    main()
