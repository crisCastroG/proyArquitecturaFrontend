import React, { useState } from "react";

const PagarCuota = () => {
  const [idDepto, setIdDepto] = useState("");
  const [fechaAPagar, setFechaAPagar] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handlePagarCuota = async (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!idDepto || !fechaAPagar) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      // Obtener fecha actual en formato YYYY-MM-DD
      const fechaPago = new Date().toISOString().split("T")[0];

      // Endpoint dinámico
      const url = `http://127.0.0.1:5000/pagar_cuota/${idDepto}/${fechaAPagar}/${fechaPago}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje(`Pago registrado exitosamente: ${JSON.stringify(data)}`);
      } else {
        const errorData = await response.json();
        setMensaje(`Error al registrar el pago: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setMensaje("Error al conectar con la API");
    }
  };

  return (
    <div>
      <h2>Pagar Cuota</h2>
      <form onSubmit={handlePagarCuota}>
        <div>
          <label>ID Departamento:</label>
          <input
            type="number"
            value={idDepto}
            onChange={(e) => setIdDepto(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha a Pagar (YYYY-MM-DD):</label>
          <input
            type="date"
            value={fechaAPagar}
            onChange={(e) => setFechaAPagar(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar Pago</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default PagarCuota;