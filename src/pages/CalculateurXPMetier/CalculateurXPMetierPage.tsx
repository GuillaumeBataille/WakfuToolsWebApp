import React from "react";
import Layout from "../../components/Layout";
import { CalculateurXPMetierProvider } from "../../contexts/CalculateurXPMetierContext";

// Imports directs de tes composants
import CalculateurXPMetierTop from "./CalculateurXPMetierTop";
import CalculateurXPMetierLeft from "./CalculateurXPMetierLeft";
import CalculateurXPMetierCenter from "./CalculateurXPMetierCenter";
import CalculateurXPMetierRight from "./CalculateurXPMetierRight";

const CalculateurXPMetierPage: React.FC = () => {
  return (
    <CalculateurXPMetierProvider>
      <Layout
        top={<CalculateurXPMetierTop />}
        left={<CalculateurXPMetierLeft />}
        center={<CalculateurXPMetierCenter />}
        right={<CalculateurXPMetierRight />}
      />
    </CalculateurXPMetierProvider>

  );
};

export default CalculateurXPMetierPage;
