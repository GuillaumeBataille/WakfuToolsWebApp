import { useState } from "react";
import HomeIcon from "../assets/home-icon.svg?react";
import ThemedIcon from "../components/ThemedIcon";

export default function Template2() {
  const [isWhite, setIsWhite] = useState(false);

  return (
    <div className="p-6 flex flex-col items-center space-y-4">
      <p>Template 2 - Contenu test</p>

      <ThemedIcon Icon={HomeIcon} className="h-6 w-6" />


      <button
        onClick={() => setIsWhite(!isWhite)}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
      >
        Passer en {isWhite ? "noir" : "blanc"}
      </button>
    </div>
  );
}
