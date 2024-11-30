import React, { useState } from "react";

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
        const departamentos = data.departamentos; // Acceder a la propiedad 'departamentos'
  
        setPagosPendientes(departamentos); // Almacenar los datos en el estado
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
    <div>
      <h2>Pagos Pendientes</h2>
      <form onSubmit={listarPagosPendientes}>
        <div>
          <label>Mes (MM):</label>
          <input
            type="number"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            required
            min="1"
            max="12"
            placeholder="MM"
          />
        </div>
        <div>
          <label>Año (YYYY):</label>
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
            min="2000"
            placeholder="YYYY"
          />
        </div>
        <button type="submit">Generar Listado</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      {pagosPendientes.length > 0 && (
        <div>
          <h3>Listado de Pagos Pendientes</h3>
          <table border="1">
            <thead>
              <tr>
                <th>Piso departamento</th>
                <th>Numero departamento</th>
                <th>Fecha a pagar</th>
                <th>Monto a pagar</th>
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
    </div>
  );
};

export default ListarPendientes;
