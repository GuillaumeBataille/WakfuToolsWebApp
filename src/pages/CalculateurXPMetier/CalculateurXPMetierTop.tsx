import React from "react";
import { useCalculateurXPMetier } from "../../contexts/CalculateurXPMetierContext";
import { METIERS, XP_BONUS } from "../../config/constants";


export default function CalculateurXPMetierTop() {
  const { multiplier, setMultiplier, metier, setMetier, showDetails, setShowDetails} = useCalculateurXPMetier();


  return (
    <div className="w-full text-center">
      <h1 className="text-3xl font-bold">Calculateur XP Métier</h1>
      <p className="font-content mt-2 mb-4">
        Outils pour optimiser la prise de niveau des métiers dans Wakfu
      </p>

      {/* Div configurateur */}
      <div className="flex justify-center gap-4 items-center mt-4 font-content">
        {/* Sélecteur métier */}
        <div>
          <label className="mr-2">Métier :</label>
        <select
        className="border rounded px-2 py-1"
        value={metier}
        onChange={(e) => setMetier(e.target.value)}
        >
        {METIERS.map((m) => (
            <option key={m.label} value={m.label}>
            {m.icon} {m.label}  {/* ici, l'emoji s'affiche avant le texte */}
            </option>
        ))}
        </select>
        </div>

        {/* Sélecteur bonus XP */}
        <div>
          <label className="mr-2">Bonus XP :</label>
          <select
            className="border rounded px-2 py-1"
            value={multiplier}
            onChange={(e) => setMultiplier(Number(e.target.value))}
          >
            {XP_BONUS.map((b) => (
              <option key={b.label} value={b.multiplier}>
                {b.label}
              </option>
            ))}
          </select>
        </div>
                {/* Affichage détails */}
        <div>
          <label className="mr-2">Détails</label>
          <input
    type="checkbox"
    id="showDetails"
    className="w-4 h-4"
    checked={showDetails}
    onChange={() => setShowDetails(!showDetails)}
  />
        </div>
      </div>
    </div>
  );
}
