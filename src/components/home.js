import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Bienvenido a la gestión de departamentos</h1>
      <nav>
        <ul>
          <li><Link to="/generar-gastos">Generar Gastos Comunes</Link></li>
          <li><Link to="/actualizar-pago">Actualizar Gasto Común</Link></li>
          <li><Link to="/listar-pendientes">Listado de Gastos Pendientes</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;