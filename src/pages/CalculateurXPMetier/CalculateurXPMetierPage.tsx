import { createPage } from "../../utils/createPage";
import { CalculateurXPMetierProvider } from "../../contexts/CalculateurXPMetierContext";

const CalculateurXPMetierPage = createPage("CalculateurXPMetier", [
  (children) => <CalculateurXPMetierProvider>{children}</CalculateurXPMetierProvider>,
]);

export default CalculateurXPMetierPage;
