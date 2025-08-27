import { useState, useEffect } from "react";
import sunIcon from "../assets/sun-icon.svg?react";   
import moonIcon from "../assets/moon-icon.svg?react"; 
import ThemedIcon from "../components/ThemedIcon";

export default function DarkModeSwitch() {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme === "dark";
      
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    >
      <ThemedIcon
        Icon={dark ? sunIcon : moonIcon}
        className="w-6 h-6"
      />
    </button>
  );
}
