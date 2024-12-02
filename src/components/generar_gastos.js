import React, { useState } from "react";
import "./generar_gastos.css";

function GenerarGastos() {
  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState("");

  const generarGastos = async (e) => {
    e.preventDefault();

    if (!mes || !anio) {
      setError("Por favor, completa ambos campos.");
      return;
    }

    try {
      let response = await fetch(`http://127.0.0.1:5000/generar_gastos/${mes}/${anio}`);

      if (response.ok) {
        let data = await response.json();
        let departamentos = data.departamentos || [];

        setResultado(departamentos);
        if (departamentos.length === 0) {
          setError("No se encontraron gastos para generar");
        } else {
          setError("");
        }
      } else {
        let errorData = await response.json();
        setError(`Error al generar gastos: ${errorData.titulo}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Generar Gastos</h1>
      </header>

      {/* Formulario */}
      <form className="form" onSubmit={generarGastos}>
        <div className="form-group">
          <label htmlFor="mes">Mes:</label>
          <input
            id="mes"
            type="number"
            min="1"
            max="12"
            required
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            placeholder="Ejemplo: 6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="anio">Año:</label>
          <input
            id="anio"
            type="number"
            min="2000"
            max="2100"
            required
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            placeholder="Ejemplo: 2024"
          />
        </div>
        <button type="submit" className="btn">Generar</button>
      </form>

      {/* Mensaje de error */}
      {error && <p className="error">{error}</p>}

      {/* Resultados */}
      {resultado.length > 0 && (
        <div className="results">
          <h2>Gastos generados con éxito:</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Piso</th>
                <th>Número de Departamento</th>
                <th>Pago Agua</th>
                <th>Pago Luz</th>
                <th>Total a Pagar</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((gasto, index) => (
                <tr key={index}>
                  <td>{gasto.piso_depto}</td>
                  <td>{gasto.numero_depto}</td>
                  <td>{gasto.pagoAgua.toFixed(0)}</td>
                  <td>{gasto.pagoLuz.toFixed(0)}</td>
                  <td>{gasto.totalPorPagar.toFixed(0)}</td>
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
}

export default GenerarGastos;
