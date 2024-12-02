import React, { useState } from "react";
import "./actualizar_pago.css";

const PagarCuota = () => {
  let [idDepto, setIdDepto] = useState("");
  let [fechaAPagar, setFechaAPagar] = useState("");
  let [mensaje, setMensaje] = useState("");
  let [numeroDepto, setNumeroDepto] = useState("");  
  let [fechaPago, setFechaPago] = useState("");
  let [periodoPagado, setPeriodoPagado] = useState("");
  let [estadoTransaccion, setEstadoTransaccion] = useState("");

  let datosExistentes = numeroDepto + fechaPago + periodoPagado + estadoTransaccion;

  let pagarCuota = async (e) => {
    e.preventDefault();

    if (!idDepto || !fechaAPagar) {
      setMensaje("Todos los campos son obligatorios");
      return;
    }

    try {
      let fechaPago = new Date().toISOString().split("T")[0];
      let url = `http://127.0.0.1:5000/pagar_cuota/${idDepto}/${fechaAPagar}/${fechaPago}`;

      let response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let respuesta = await response.json();
        if(JSON.stringify(respuesta).includes("No existen")){
          setMensaje(`No existen pagos para este departamento o fecha`);
        } else {
          setMensaje(`Pago registrado exitosamente:`);
          setNumeroDepto(respuesta.numero_depto);
          setPeriodoPagado(respuesta.periodo_pagado);
          setFechaPago(respuesta.fechaPago);
          setEstadoTransaccion(respuesta.estado_transaccion);
        }

      } else {
        let errorData = await response.json();
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
      <form className="form" onSubmit={pagarCuota}>
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
      {datosExistentes ? (       
      <div className="center-container">
      <div className="card">
        <h3>Detalles del Pago</h3>
        <p>Número de Departamento: {numeroDepto}</p>
        <p>Fecha de Pago: {fechaPago}</p>
        <p>Periodo Pagado: {periodoPagado}</p>
        <p>Estado de Transacción: {estadoTransaccion}</p>
      </div>
      </div>):<span></span>}


      {/* Footer */}
      <footer className="footer">
        <p className="letras">© 2024 Gestión de Departamentos. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default PagarCuota;
