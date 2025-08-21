import { Link } from "react-router-dom";
import DarkModeSwitch from "../DarkModeSwitch";


type NavBarElementProps = {
  displayType: "text" | "logo";
  targetType: "route" | "darkmodeswitcher" | "action";
  label?: string;        
  logoSrc?: string;      
  to?: string;           
  LogoComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; 
  onClick?: () => void;  
};

export default function NavBarElement({
  displayType,
  targetType,
  label,
  logoSrc,
  to,
  onClick,
}: NavBarElementProps) {


switch (targetType) {
  case "darkmodeswitcher":
    return <DarkModeSwitch />;

  case "route":
    if (!to) return null;
    return (
      <Link to={to} className="px-3 flex items-center hover:underline">
        {displayType === "text"
          ? label
          : logoSrc
          ? <img src={logoSrc} alt={label || "logo"} className="h-6 w-6" />
          : null}
      </Link>
    );

  case "action":
    if (!onClick) return null;
    return (
      <button onClick={onClick} className="px-3 flex items-center hover:underline">
        {displayType === "text"
          ? label
          : logoSrc
          ? <img src={logoSrc} alt={label || "logo"} className="h-6 w-6" />
          : null}
      </button>
    );

  default:
    return null;
}
}
