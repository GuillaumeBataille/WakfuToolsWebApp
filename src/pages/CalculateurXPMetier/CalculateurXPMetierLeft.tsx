
import React, { useMemo } from "react";
import { LevelRow, generateLevelRows } from "../../utils/CalculateurXPMetierFunctions";

export default function CalculateurXPMetierLeft() {
  const rows: LevelRow[] = useMemo(() => generateLevelRows(155), []);

  return (
    <div className="font-content w-full max-w-4xl mx-20 z-10">
      <h1 className="font-title text-xl mb-4">Tableau des niveaux (0 → 155)</h1>

      <div className="rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className=" max-h-[500px] overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900 text-sm">
              <tr>
                <th className="px-4 py-3 sticky left-0 bg-gray-50 dark:bg-gray-900 z-10">
                  Niveau
                </th>
                <th className="px-4 py-3">XP requis</th>
                <th className="px-4 py-3">XP accumulé</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ level, nextXp, totalXp }) => (
                <tr
                  key={level}
                  className="odd:bg-white even:bg-gray-50 dark:odd:bg-deepblue dark:even:bg-[#12202e] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <td className="px-4 py-2 font-subcontent">{level}</td>
                  <td className="px-4 py-2">
                    {nextXp === null ? "—" : nextXp.toLocaleString("fr-FR")}
                  </td>
                  <td className="px-4 py-2">{totalXp.toLocaleString("fr-FR")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Légende */}
        <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 border-t border-gray-200 z-10">
          <div className="font-subcontent">
            <div>
              XP → niveau suivant : <code>level × 150 + 75</code>
            </div>
            <div>
              XP totale : <code>0.5 × level × (level − 1) × 150 + level × 75</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

