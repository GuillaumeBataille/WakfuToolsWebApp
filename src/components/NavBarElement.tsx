import { Link } from "react-router-dom";
import DarkmodeSwitch from "./DarkmodeSwitch";
import ThemedIcon from "./ThemedIcon";

type NavBarElementProps = {
  displayType: "text" | "logo";
  targetType: "route" | "darkmodeswitcher" | "action";
  label?: string;        
  to?: string;           
  LogoComponent?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>; 
  onClick?: () => void;  
};

export default function NavBarElement({
  displayType,
  targetType,
  label,
  to,
  LogoComponent,
  onClick,
}: NavBarElementProps) {

  const renderContent = () => {
    if (displayType === "text") return label;
    if (LogoComponent) {
      return (
        <ThemedIcon Icon={LogoComponent} className="h-6 w-6"/>
      );
    }
    return null;
  };

  switch (targetType) {
    case "darkmodeswitcher":
      return <DarkmodeSwitch />;

    case "route":
      if (!to) return null;
      return (
        <Link to={to} className="px-3 flex items-center hover:underline">
          {renderContent()}
        </Link>
      );

    case "action":
      if (!onClick) return null;
      return (
        <button onClick={onClick} className="px-3 flex items-center hover:underline">
          {renderContent()}
        </button>
      );

    default:
      return null;
  }
}
