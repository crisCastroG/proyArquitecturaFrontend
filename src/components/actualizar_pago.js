import React, { useState } from "react";
import "./actualizar_pago.css";

const PagarCuota = () => {
  const [idDepto, setIdDepto] = useState("");
  const [fechaAPagar, setFechaAPagar] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handlePagarCuota = async (e) => {
    e.preventDefault();

    if (!idDepto || !fechaAPagar) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      const fechaPago = new Date().toISOString().split("T")[0];
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
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Pagar Cuota</h1>
      </header>

      {/* Formulario */}
      <form className="form" onSubmit={handlePagarCuota}>
        <div className="form-group">
          <label htmlFor="idDepto">ID Departamento:</label>
          <input
            id="idDepto"
            type="number"
            value={idDepto}
            onChange={(e) => setIdDepto(e.target.value)}
            placeholder="Ingrese el ID del departamento"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fechaAPagar">Fecha a Pagar:</label>
          <input
            id="fechaAPagar"
            type="date"
            value={fechaAPagar}
            onChange={(e) => setFechaAPagar(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">
          Registrar Pago
        </button>
      </form>

      {/* Mensaje */}
      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* Footer */}
      <footer className="footer">
        <p className="letras">© 2024 Gestión de Departamentos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PagarCuota;
