import NavBarElement from "./NavBarElement";
import homeIcon from "../assets/home-icon.svg?react";
import reloadIcon from "../assets/reload-icon.svg?react";


const leftElements = [
  { displayType: "logo", targetType: "route", LogoComponent: homeIcon, to: "/WakfuToolsWebApp/", label: "Home" },
  { displayType: "text", targetType: "darkmodeswitcher", label: "Dark Mode" },
] as const;

const centerElements = [
  { displayType: "text", targetType: "route", label: "Calculateur XP Métier", to: "/WakfuToolsWebApp/CalculateurXPMetier" },
  /*{ displayType: "text", targetType: "route", label: "Page de test", to: "/template2" },*/
 ] as const;

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center px-6 py-3 z-50 border-b">

      {/* Left section */}
      <div className="flex items-center space-x-4">
        {leftElements.map((el, idx) => (
          <NavBarElement key={idx} {...el} />
        ))}
      </div>

      {/* Center section */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-4 text-deepblue dark:text-washedwhite">
        {centerElements.map((el, idx) => (
          <NavBarElement key={idx} {...el} />
        ))}
      </div>

    </header>
  );
}
