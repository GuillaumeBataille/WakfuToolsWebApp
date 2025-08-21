import { useState } from "react";
import { simulate } from "../utils/simulate";
type Mode = "normal" | "booster" | "boosterGuild";

export default function Template1() {
  const [startLevel, setStartLevel] = useState(5);
  const [targetLevel, setTargetLevel] = useState(100);
  const [mode, setMode] = useState<Mode>("normal");

  //ArrayResults
  const [resources, setResources] = useState<Map<number, number>>(new Map());
  const [recipes, setRecipes] = useState<Map<number, { crafts: number; xp: number }>>(new Map());
  const [logs, setLogs] = useState<any[]>([]);
  const [totals, setTotals] = useState({ totalResources: 0, totalCrafts: 0, totalXp: 0 });

  //Processing 
  const runSimulation = () => {
    const result = simulate({ startLevel, targetLevel, mode });
    if ((result as any).error) {
      alert((result as any).error);
      return;
    }

    setResources(result.resourceTotals);
    setRecipes(new Map([...result.recipeCrafts.entries()].map(([k, v]) => [k, { crafts: v, xp: result.recipeXp.get(k) || 0 }])));
    setLogs(result.logs);
    setTotals(result.totals);
  };

  return (
    <main className="container mx-auto p-4">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Optimiseur d’XP par crafts — Wakfu</h1>
        <p className="text-sm">
          Recettes aux paliers <strong>5, 15, 25, …</strong> (palier 10 à partir de 5).<br />
          Chaque craft consomme <strong>5 ressources du palier p</strong> et <strong>5 du palier p-5</strong>.
        </p>
      </header>

      <section className="mb-4 flex gap-4">
        <div>
          <label>Niveau de départ</label>
          <input
            type="number"
            min={0}
            step={1}
            value={startLevel}
            onChange={e => setStartLevel(Number(e.target.value))}
            className="ml-2 border px-2 py-1"
          />
        </div>
        <div>
          <label>Niveau cible</label>
          <input
            type="number"
            min={5}
            step={5}
            value={targetLevel}
            onChange={e => setTargetLevel(Number(e.target.value))}
            className="ml-2 border px-2 py-1"
          />
        </div>
        <div>
          <label>Mode d’XP par craft</label>
          <select value={mode} onChange={e => setMode(e.target.value as Mode)} className="ml-2 border px-2 py-1">
            <option value="normal">Normal (300)</option>
            <option value="booster">Booster (450)</option>
            <option value="boosterGuild">Booster + Guilde (~472.5)</option>
          </select>
        </div>
        <div>
          <button onClick={runSimulation} className="px-4 py-2 bg-blue-600 text-white rounded">Simuler</button>
        </div>
      </section>

      {/* Tables */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ressources */}
        <div className="border p-2">
          <h2 className="font-bold">Récap ressources par palier</h2>
          <table className="w-full text-right text-sm">
            <thead>
              <tr>
                <th className="text-left">Palier ressource</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(resources.entries()).map(([palier, qty]) => (
                <tr key={palier}>
                  <td className="text-left">{palier}</td>
                  <td>{Math.round(qty).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{totals.totalResources.toLocaleString()}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Recettes */}
        <div className="border p-2">
          <h2 className="font-bold">Recettes utilisées (par palier de recette)</h2>
          <table className="w-full text-right text-sm">
            <thead>
              <tr>
                <th>Palier recette</th>
                <th>Crafts</th>
                <th>XP gagnée</th>
              </tr>
            </thead>
            <tbody>
              {Array.from(recipes.entries()).map(([palier, val]) => (
                <tr key={palier}>
                  <td>{palier}</td>
                  <td>{val.crafts}</td>
                  <td>{Math.round(val.xp * 10)/10}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>Total</th>
                <th>{totals.totalCrafts}</th>
                <th>{Math.round(totals.totalXp*10)/10}</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {/* Logs */}
      <section className="border p-2 mt-4">
        <h2 className="font-bold">Log de progression (niveau par niveau)</h2>
        <table className="w-full text-right text-sm">
          <thead>
            <tr>
              <th>Avant</th>
              <th>→</th>
              <th>Après</th>
              <th>Crafts</th>
              <th>Recette</th>
              <th>XP / craft</th>
              <th>XP visée</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((row, idx) => (
              <tr key={idx}>
                <td>{row.from}</td>
                <td>→</td>
                <td>{row.to}</td>
                <td>{row.crafts}</td>
                <td>{row.recipeLevel}</td>
                <td>{Math.round(row.xpPerCraft*10)/10}</td>
                <td>{Math.round(row.aimed*10)/10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
