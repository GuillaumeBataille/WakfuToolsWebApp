import React from "react";
import { useCalculateurXPMetier } from "../../contexts/CalculateurXPMetierContext";

export default function CalculateurXPMetierRight() {
  const { selectedItem, selectedLocationsList } = useCalculateurXPMetier();
console.log(selectedItem);
  return (
    <div className="p-4 text-center">
      
      {selectedItem ? (
        <>
          <p className="border-b flex items-center justify-center gap-2 h-10px">
      
            {selectedItem.imagePath && (
            <img
              src={`${selectedItem.imagePath}`}
              alt={selectedItem.itemName}
              className="w-24 h-24 inline-block mr-2"
            />
            )}
            Ressource sélectionnée : {selectedItem.itemName}
          </p>

          {selectedLocationsList.length > 0 ? (
            <ul className="mt-10">
              {selectedLocationsList.map((loc, idx) => (
                <li key={idx}>{loc}</li>
              ))}
            </ul>
          ) : (
            <p>Aucune localisation connue</p>
          )}
        </>
      ) : (
        <p>
          Sélectionnez une ressource <span className="text-2xl">🗺️</span> pour voir l'emplacement
        </p>
      )}
    </div>
  );
}
