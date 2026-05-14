import json
from io import BytesIO
from pathlib import Path
from zipfile import ZipFile

import requests


HOW_TO_COOK_ARCHIVE_URL = "https://github.com/Anduin2017/HowToCook/archive/refs/heads/master.zip"

CATEGORY_NAMES = {
    "vegetable_dish": "素菜",
    "meat_dish": "荤菜",
    "aquatic": "水产",
    "breakfast": "早餐",
    "staple": "主食",
    "semi-finished": "半成品加工",
    "soup": "汤与粥",
    "drink": "饮料",
    "condiment": "酱料和其它材料",
    "dessert": "甜品",
}

SKIP_CATEGORIES = {"template"}


def fetch_archive():
    response = requests.get(
        HOW_TO_COOK_ARCHIVE_URL,
        headers={"User-Agent": "Ayaka-Eat-Recipe-Crawler"},
        timeout=30,
    )
    response.raise_for_status()
    return ZipFile(BytesIO(response.content))


def iter_markdown_files():
    with fetch_archive() as archive:
        for item_path in archive.namelist():
            parts = item_path.split("/", 1)
            if len(parts) != 2:
                continue

            repo_path = parts[1]

            if repo_path.startswith("dishes/") and repo_path.endswith(".md"):
                yield repo_path


def to_recipe(path: str):
    parts = path.split("/")
    if len(parts) < 3:
        return None

    category_slug = parts[1]
    if category_slug in SKIP_CATEGORIES:
        return None

    name = Path(parts[-1]).stem
    category = CATEGORY_NAMES.get(category_slug, category_slug)

    return {
        "name": name,
        "category": category,
        "link": path.removesuffix(".md"),
        "source_path": path,
    }


def fetch_recipes():
    recipes = []

    for path in iter_markdown_files():
        recipe = to_recipe(path)
        if recipe:
            recipes.append(recipe)

    return sorted(recipes, key=lambda item: (item["source_path"], item["name"]))


def save_data(data):
    output_path = Path("public/recipes.json")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(data, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def main():
    save_data(fetch_recipes())


if __name__ == "__main__":
    main()
