import json
import requests
from bs4 import BeautifulSoup
from pathlib import Path
import re
from fuzzywuzzy import process, fuzz

# Fichiers
RAW_HTML_PATH = Path("WakfuDataTest/raw_html.html")
DATA_JSON_PATH = Path("WakfuDataTest/data_clean.json")
OUTPUT_JSON_PATH = Path("resources_with_locations.json")

# URL de la page MethodWakfu
URL = "https://methodwakfu.com/artisanat/localisation-des-ressources/"

# Récupérer la page
print(f"Téléchargement de la page {URL} ...")
res = requests.get(URL)
res.raise_for_status()
print(f"Page téléchargée : {len(res.text)} caractères")

# Sauvegarder le HTML brut
with open(RAW_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(res.text)

# Charger data_clean.json
with open(DATA_JSON_PATH, "r", encoding="utf-8") as f:
    all_items = json.load(f)

item_names = [i["itemName"] for i in all_items]

soup = BeautifulSoup(res.text, "html.parser")
html_data = {}

# Parcours des tableaux par métier
for table_idx, table in enumerate(soup.select("table"), start=1):
    header = table.find_previous("h2")
    if not header:
        continue
    metier = header.text.strip().capitalize()
    print(f"\nTraitement métier : {metier} (table {table_idx})")
    html_data[metier] = {}

    for row_idx, tr in enumerate(table.select("tr")[1:], start=1):
        cols = tr.find_all("td")
        if len(cols) < 3:
            continue

        # Niveau
        try:
            lvl = int(cols[0].text.strip())
        except ValueError:
            continue

        # Nom de la ressource
        res_name_html = cols[1].text.strip()

        # Localisations
        loc_td = tr.find("td", class_="column-4")
        locations = []
        if loc_td:
            fragments = list(loc_td.stripped_strings)
            for frag in fragments:
                parts = re.split(r'\s*[,&]\s*', frag)
                locations.extend([p for p in parts if p])

        # Fuzzy match avec data_clean.json
        match = process.extractOne(res_name_html, item_names, scorer=fuzz.WRatio)
        if match and match[1] >= 80:  # seuil de similarité
            match_name = match[0]
            # Chercher l'objet complet dans all_items
            item_data = next((i for i in all_items if i["itemName"] == match_name), None)
            if item_data:
                item_entry = item_data.copy()
                item_entry["locations"] = locations
                html_data[metier].setdefault(str(lvl), []).append(item_entry)
        else:
            print(f"⚠️ Pas de match trouvé pour '{res_name_html}' (métier {metier}, niveau {lvl})")

# Sauvegarder le JSON final
with open(OUTPUT_JSON_PATH, "w", encoding="utf-8") as f:
    json.dump(html_data, f, indent=2, ensure_ascii=False)

print(f"\nJSON généré : {OUTPUT_JSON_PATH}")

