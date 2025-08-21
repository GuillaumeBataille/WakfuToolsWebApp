import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Template1 from "../pages/Template1";
import Template2 from "../pages/Template2";

export default function RouteHandler() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/template1" element={<Template1 />} />
      <Route path="/template2" element={<Template2 />} />
    </Routes>
  );
}
