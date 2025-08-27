import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

type CalculateurXPMetierContextType = {
  multiplier: number;
  setMultiplier: (value: number) => void;
  metier: string;
  setMetier: (value: string) => void;
  showDetails: boolean;
  setShowDetails: (value: boolean) => void;
  selectedItem: any | null;
  setSelectedItem: (item: any | null) => void;
  selectedLocationsList: string[];
  data: any | null; // données JSON chargées
};

const CalculateurXPMetierContext = createContext<CalculateurXPMetierContextType | undefined>(undefined);

export function CalculateurXPMetierProvider({ children }: { children: ReactNode }) {
  const [multiplier, setMultiplier] = useState(1);
  const [metier, setMetier] = useState("Pêcheur");
  const [showDetails, setShowDetails] = useState(false);
  const [selectedItem, setSelectedItemState] = useState<any | null>(null);
  const [selectedLocationsList, setSelectedLocationsList] = useState<string[]>([]);
  const [data, setData] = useState<any | null>(null);

    useEffect(() => {
      fetch("/wakfutoolswebapp/WakfuData/data.json") // attention au nom du repo si site sur GitHub Pages
        .then((res) => res.json())
        .then(setData)
        .catch((err) => console.error("Erreur lors du chargement des données :", err));
    }, []);

  const setSelectedItem = (item: any | null) => {
    setSelectedItemState(item);
    if (item?.locations) {
      setSelectedLocationsList(item.locations);
    } else {
      setSelectedLocationsList([]);
    }
  };

  return (
    <CalculateurXPMetierContext.Provider
      value={{
        multiplier,
        setMultiplier,
        metier,
        setMetier,
        showDetails,
        setShowDetails,
        selectedItem,
        setSelectedItem,
        selectedLocationsList,
        data,
      }}
    >
      {children}
    </CalculateurXPMetierContext.Provider>
  );
}

export function useCalculateurXPMetier() {
  const context = useContext(CalculateurXPMetierContext);
  if (!context) {
    throw new Error("useCalculateurXPMetier must be used within CalculateurXPMetierProvider");
  }
  return context;
}
