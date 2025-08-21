import { Link } from "react-router-dom";
import DarkModeSwitch from "../DarkModeSwitch";

type NavBarElementProps = {
  displayType: "text" | "logo";
  targetType: "route" | "darkmodeswitcher" | "action";
  label?: string;        // Texte ou alt du logo
  logoSrc?: string;      // Path / URL du logo
  to?: string;           // Route cible
  LogoComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; // SVG React
  onClick?: () => void;  // Action custom
};

export default function NavBarElement({
  displayType,
  targetType,
  label,
  logoSrc,
  to,
  onClick,
}: NavBarElementProps) {
  // Dark mode switcher
  if (targetType === "darkmodeswitcher") {
    return <DarkModeSwitch />;
  }

  // Element de navigation route
  if (targetType === "route" && to) {
    return (
      <Link to={to} className="px-3 flex items-center hover:underline">
        {displayType === "text" ? label : logoSrc ? (
          <img src={logoSrc} alt={label || "logo"} className="h-6 w-6" />
        ) : null}
      </Link>
    );
  }

  // Element action (bouton)
  if (targetType === "action" && onClick) {
    return (
      <button onClick={onClick} className="px-3 flex items-center hover:underline">
        {displayType === "text" ? label : logoSrc ? (
          <img src={logoSrc} alt={label || "logo"} className="h-6 w-6" />
        ) : null}
      </button>
    );
  }

  return null;
}
