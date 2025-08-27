import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/HomePage";
import CalculateurXPMetier from "../pages/CalculateurXPMetier/CalculateurXPMetierPage";
import Template2 from "../pages/Template2";

export default function RouteHandler() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/CalculateurXPMetier" element={<CalculateurXPMetier/>} />
      <Route path="/template2" element={<Template2 />} />
    </Routes>
  );
}
