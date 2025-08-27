import React, { useEffect, useMemo, useState } from "react";
import { generateLevelRows, LevelRow, PalierXp } from "../../utils/CalculateurXPMetierFunctions";
import { useCalculateurXPMetier } from "../../contexts/CalculateurXPMetierContext";
 
const RESOURCES_PER_CRAFT = 5;

export default function FeatureCenterXp() {
  const { multiplier, metier, showDetails, selectedItem,setSelectedItem } = useCalculateurXPMetier();
  const [data, setData] = useState<any>(null);

 


  // Charger ton JSON depuis /public/WakfuData/data.json
  useEffect(() => {
    fetch("/WakfuData/data.json")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error("Erreur chargement JSON:", err));
  }, []);

  const paliers: (PalierXp & {
    craftsNeeded: number;
    resourcesNeeded: number;
    resourceLevels: [number, number];
  })[] = useMemo(() => {
    const rows: LevelRow[] = generateLevelRows(155);
    const multiplesOf10 = rows.filter(
      (row) => (row.level - 5) % 10 === 0 && row.level !== 0 && row.level > 5
    );

    return multiplesOf10.map((row, index) => {
      const prevTotalXp = index > 0 ? multiplesOf10[index - 1].totalXp : 0;
      const xpRequired = row.totalXp - prevTotalXp;
      const craftsNeeded = Math.ceil(xpRequired / (300 * multiplier));
      const resourcesNeeded = craftsNeeded * RESOURCES_PER_CRAFT;

      return {
        palier: row.level,
        xpRequired,
        craftsNeeded,
        resourcesNeeded,
        resourceLevels: [row.level - 10, row.level - 15],
      };
    });
  }, [multiplier]);

  // Récupérer les ressources pour un métier + un niveau donné
  function getResourcesForLevel(jobName: string, level: number) {
    if (!data || !data[jobName]) return [];
    return data[jobName][level] || [];
  }

  return (
    <div className="font-content w-full max-w-4xl mx-auto">
      <h1 className="font-title text-center text-3xl mb-15">
        XP et ressources par palier (15 → 155) pour {metier}
      </h1>

      <div className="rounded-2xl shadow-sm border border-gray-200 overflow-hidden max-h-[600px] overflow-y-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0 z-10">
            <tr>
              <th className="h-[75px] px-4 py-2 text-sm">Palier</th>
              {showDetails && (
                <th className="h-[50px] px-4 py-2 text-sm">XP requise</th>
              )}
              {showDetails && (
                <th className="h-[50px] px-4 py-2 text-sm">Crafts nécessaires</th>
              )}
              <th className="h-[75px] px-4 py-2 text-sm">Quantité</th>
              <th className="h-[75px] px-4 py-2 text-sm">Ressources à recolter</th>
            </tr>
          </thead>
          <tbody>
            {paliers.map(
              ({ palier, xpRequired, craftsNeeded, resourcesNeeded, resourceLevels }) => {
                const resourcesForLevel = [
                  ...getResourcesForLevel(metier, resourceLevels[0]),
                  ...getResourcesForLevel(metier, resourceLevels[1]),
                ];

                return (
                  <tr
                    key={palier}
                    className="border-t border-b odd:bg-washedwhite even:bg-gray-200 dark:odd:bg-deepblue dark:even:bg-[#12202e] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-1">{palier - 10}→{palier}</td>
                    {showDetails && (
                      <td className="px-4 py-1">{xpRequired.toLocaleString("fr-FR")}</td>
                    )}
                    {showDetails && <td className="px-4 py-1">{craftsNeeded}</td>}
                    <td className="px-4 py-1">{resourcesNeeded}</td>
                    <td className="px-4 py-1">
                    <div className="flex flex-col gap-2">
                    {[resourceLevels[1], resourceLevels[0]].map((lvl) => {
                      const resourcesForLevel = data?.[metier]?.[lvl] || [];
                      
                      return (
                        <div key={`${metier}-${lvl}`}  className="flex items-center gap-2">
                          <span className="font-medium">Lvl {lvl}:</span>
                          {resourcesForLevel.map((res: any) => (
                            <div key={res.itemId} className="flex items-center gap-5 text-sm">
                              <img
                                src={`/WakfuData/${res.imagePath}`}
                                alt={res.itemName}
                                className="w-12 h-12 "
                              />
                              <span>{res.itemName}</span>
                               {/* Bouton "Emplacement" */}
                            <button
                              onClick={() => setSelectedItem(res)}
                              className="flex items-center justify-center w-10 h-10 rounded-md bg-washedwhite/10 transition-colors"
                            >
                              <span className="text-2xl">🗺️</span>
                            </button>
                            </div>
                          ))}
                        </div>
                      );
                    })}

                    </div>

                  </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
