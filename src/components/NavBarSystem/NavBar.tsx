import NavBarElement from "./NavBarElement";
import homeIcon from "../../assets/home-icon.svg";
import reloadIcon from "../../assets/reload-icon.svg"; 

const leftElements = [
  { displayType: "logo", targetType: "route", logoSrc: homeIcon, to: "/", label: "Home" },
  { displayType: "logo", targetType: "action", logoSrc: reloadIcon, onClick: () => window.location.reload(), label: "Reload" },
  { displayType: "text", targetType: "darkmodeswitcher", label: "Dark Mode" },
];

const centerElements = [
  { displayType: "text", targetType: "route", label: "Calculateur XP Métier", to: "/template1" },
  /*{ displayType: "text", targetType: "route", label: "", to: "/template2" },*/
];

export default function NavBar() {
  return (
    <header className="fixed top-0 left-0 w-full flex items-center px-6 py-3 z-50">

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
