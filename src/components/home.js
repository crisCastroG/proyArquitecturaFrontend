import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Importa estilos personalizados si los necesitas

function Home() {
  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h1>Bienvenido a la gestión de departamentos</h1>
      </header>

      {/* Navegación */}
      <nav className="nav">
        <div className="tabs">
          <Link to="/generar-gastos" className="tab">Generar Gastos Comunes</Link>
          <Link to="/actualizar-pago" className="tab">Actualizar Gasto Común</Link>
          <Link to="/listar-pendientes" className="tab">Listado de Gastos Pendientes</Link>
        </div>
      </nav>

      {/* Bloque inferior */}
      <footer className="footer">
        <p className="letras">© 2024 Gestión de Departamentos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;