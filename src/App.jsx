import React from "react";
import { Routes, Route } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import QuienesSomos from "./pages/QuienesSomos";
import Terminos from "./pages/Terminos";
import Condiciones from "./pages/Condiciones";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/quienes-somos" element={<QuienesSomos />} />
      <Route path="/terminos" element={<Terminos />} />
      <Route path="/condiciones" element={<Condiciones />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
 