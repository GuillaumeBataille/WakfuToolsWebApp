import json
from pathlib import Path
from fuzzywuzzy import process, fuzz

# Fichiers
DATA_JSON_PATH = Path("WakfuDataTest/data_clean.json")  # fichier existant avec itemName, itemId, etc.
NEW_LOCATIONS_JSON_PATH = Path("resources_from_html.json")    # fichier avec les nouvelles locations
OUTPUT_JSON_PATH = Path("data_matching.json")  # fichier de sortie

# Charger les items existants
with open(DATA_JSON_PATH, "r", encoding="utf-8") as f:
    all_items = json.load(f)

# Aplatir tous les items dans une seule liste pour le fuzzy matching
all_items_list = []
for metier_data in all_items.values():
    for level_items in metier_data.values():
        all_items_list.extend(level_items)

item_names = [i["itemName"] for i in all_items_list]

# Charger les nouvelles locations
with open(NEW_LOCATIONS_JSON_PATH, "r", encoding="utf-8") as f:
    new_locations_data = json.load(f)

# Liste pour stocker les items sans correspondance ou sans locations
unmatched_locations = []

# Parcours des métiers et niveaux
for metier, levels in new_locations_data.items():
    for lvl, items in levels.items():
        for new_item in items:
            res_name = new_item["itemName"]
            locations = new_item.get("locations", [])

            if not locations:
                unmatched_locations.append({
                    "itemName": res_name,
                    "metier": metier,
                    "niveau": lvl,
                    "reason": "Aucune location trouvée"
                })

            # Fuzzy match pour retrouver l'item exact dans data_clean.json
            match = process.extractOne(res_name, item_names, scorer=fuzz.WRatio)
            if match is None:
                unmatched_locations.append({
                    "itemName": res_name,
                    "metier": metier,
                    "niveau": lvl,
                    "reason": "Aucun match trouvé"
                })
                continue

            match_name, score = match
            matched_item = next(i for i in all_items_list if i["itemName"] == match_name)

            # Ajouter / fusionner les locations
            existing_locations = matched_item.get("locations", [])
            combined_locations = list(set(existing_locations + locations))  # fusion sans doublons
            matched_item["locations"] = combined_locations

# Ajouter la liste des items non matchés ou sans location dans le JSON final
all_items["_unmatched_locations"] = unmatched_locations

# Sauvegarder le JSON mis à jour
with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(all_items, f, indent=2, ensure_ascii=False)

print(f"✅ JSON mis à jour avec les locations ajouté et unmatched list : {OUTPUT_JSON_PATH}")
