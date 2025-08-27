import json
from pathlib import Path
import requests

# Répertoires
INPUT_DIR = Path("")  # dossier contenant tes 3 JSON
OUTPUT_DIR = Path("WakfuDataTest")
OUTPUT_DIR.mkdir(exist_ok=True)

def download_image(url, filepath):
    if not filepath.exists():
        try:
            resp = requests.get(url)
            resp.raise_for_status()
            filepath.write_bytes(resp.content)
            print(f"Téléchargé {filepath}")
        except Exception as e:
            print(f"Erreur téléchargement {url}: {e}")
    else:
        print(f"Image déjà existante: {filepath}")

def main():
    print("Chargement JSON locaux...")
    with open(INPUT_DIR / "collectibleResources.json", "r", encoding="utf-8") as f:
        collectible_resources = json.load(f)
    with open(INPUT_DIR / "JobsItem.json", "r", encoding="utf-8") as f:
        jobs_items = json.load(f)
    with open(INPUT_DIR / "recipesCategories.json", "r", encoding="utf-8") as f:
        jobs_categories = json.load(f)

    # Filtrage des items valides
    jobs_items_filtered = [
        item for item in jobs_items if item["definition"]["rarity"] == 1
    ]

    # Dictionnaires pour lookup rapide
    skillId_to_job = {job["definition"]["id"]: job for job in jobs_categories}
    collectItemId_to_item = {
        item["definition"]["id"]: item for item in jobs_items_filtered
    }

    # Structure pour le JSON récapitulatif
    summary = {}

    for res in collectible_resources:
        # Filtrage des resourceNextIndex
        if res.get("resourceNextIndex") != 0:
            continue

        skill_id = res["skillId"]
        skill_level_required = res["skillLevelRequired"]
        collect_item_id = res["collectItemId"]

        if skill_id not in skillId_to_job or collect_item_id not in collectItemId_to_item:
            continue

        job = skillId_to_job[skill_id]
        item = collectItemId_to_item[collect_item_id]

        job_name = job["title"]["fr"]
        item_name = item["title"]["fr"]
        gfx_id = item["definition"]["graphicParameters"]["gfxId"]

        # Crée l'arborescence métier / niveau pour les images
        folder_path = OUTPUT_DIR / job_name / str(skill_level_required)
        folder_path.mkdir(parents=True, exist_ok=True)

        # Télécharge l'image de l'item
        image_url = f"https://static.ankama.com/wakfu/portal/game/item/115/{gfx_id}.png"
        image_path = folder_path / f"{item_name}.png"
        download_image(image_url, image_path)

        # Ajoute dans la structure JSON
        summary.setdefault(job_name, {}).setdefault(str(skill_level_required), []).append({
            "itemId": collect_item_id,
            "itemName": item_name,
            "gfxId": gfx_id,
            "rarity": item["definition"]["rarity"],
            "imagePath": str(image_path.relative_to(OUTPUT_DIR))
        })

    # Sauvegarde du JSON
    with open(OUTPUT_DIR / "data.json", "w", encoding="utf-8") as f:
        json.dump(summary, f, indent=4, ensure_ascii=False)

    print(f"Résumé JSON généré : {OUTPUT_DIR/'data.json'}")

if __name__ == "__main__":
    main()
