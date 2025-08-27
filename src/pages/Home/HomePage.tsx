import React from "react";
import Layout from "../../components/Layout";

// Imports directs des composants Home
import HomeTop from "./HomeTop";
import HomeLeft from "./HomeLeft";
import HomeCenter from "./HomeCenter";
import HomeRight from "./HomeRight";

const HomePage: React.FC = () => {
  return (
    <Layout
      top={<HomeTop />}
      left={<HomeLeft />}
      center={<HomeCenter />}
      right={<HomeRight />}
    />
    
  );
};

export default HomePage;
