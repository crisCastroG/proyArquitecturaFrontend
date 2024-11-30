import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/home";
import GenerarGastos from "./components/generar_gastos";
import ActualizarPago from "./components/actualizar_pago";
import ListarPagosPendientes from "./components/listar_pagos_pendientes";

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generar-gastos" element={<GenerarGastos />} />
        <Route path="/actualizar-pago" element={<ActualizarPago />} />
        <Route path="/listar-pendientes" element={<ListarPagosPendientes />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
