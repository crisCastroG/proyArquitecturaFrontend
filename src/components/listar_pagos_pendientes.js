import React, { useState } from "react";
import "./listar_pagos_pendientes.css";

const ListarPendientes = () => {
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [pagosPendientes, setPagosPendientes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const listarPagosPendientes = async (e) => {
    e.preventDefault();

    if (!mes || !anio) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      const url = `http://127.0.0.1:5000/pagos_pendientes/${mes}/${anio}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const departamentos = data.departamentos;

        setPagosPendientes(departamentos);
        setMensaje(`Se encontraron ${departamentos.length} pagos pendientes.`);
      } else {
        const errorData = await response.json();
        setMensaje(`Error al obtener los pagos pendientes: ${errorData.titulo}`);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setMensaje("Error al conectar con la API");
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Pagos Pendientes</h1>
      </header>

      {/* Formulario */}
      <form className="form" onSubmit={listarPagosPendientes}>
        <div className="form-group">
          <label htmlFor="mes">Mes (MM):</label>
          <input
            id="mes"
            type="number"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            required
            min="1"
            max="12"
            placeholder="MM"
          />
        </div>
        <div className="form-group">
          <label htmlFor="anio">Año (YYYY):</label>
          <input
            id="anio"
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
            min="2000"
            placeholder="YYYY"
          />
        </div>
        <button type="submit" className="btn">
          Generar Listado
        </button>
      </form>

      {/* Mensaje */}
      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* Tabla */}
      {pagosPendientes.length > 0 && (
        <div className="table-container">
          <h3>Listado de Pagos Pendientes</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Piso Departamento</th>
                <th>Número Departamento</th>
                <th>Fecha a Pagar</th>
                <th>Monto a Pagar</th>
              </tr>
            </thead>
            <tbody>
              {pagosPendientes.map((pago, index) => (
                <tr key={index}>
                  <td>{pago.piso_depto}</td>
                  <td>{pago.numero_depto}</td>
                  <td>{pago.fecha_a_pagar}</td>
                  <td>{Math.round(pago.monto_a_pagar)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p className="letras">© 2024 Gestión de Departamentos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default ListarPendientes;
