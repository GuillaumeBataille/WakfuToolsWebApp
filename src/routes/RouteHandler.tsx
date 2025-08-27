import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/HomePage";
import CalculateurXPMetier from "../pages/CalculateurXPMetier/CalculateurXPMetierPage";


export default function RouteHandler() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/WakfuToolsWebApp/" element={<Home/>} />
      <Route path="/CalculateurXPMetier" element={<CalculateurXPMetier/>} />
    </Routes>
  );
}
