import React, { useState } from "react";


function GenerarGastos() {
    let [mes, setMes] = useState("");
    let [anio, setAnio] = useState("");
    let [resultado, setResultado] = useState(null);
    let [error, setError] = useState("");

    const generarGastos = async (e) => {
        e.preventDefault();

        if (!mes || !anio) {
            setError("Por favor, completa ambos campos.");
            return;
        }

        try {
            let response = await fetch(`http://127.0.0.1:5000/generar_gastos/${mes}/${anio}`);

            if (!response.ok) {
                throw new Error("Error al obtener los datos.");
            }

            const data = await response.json();
            setResultado(data);
            setError("");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Generar Gastos</h1>
            <form onSubmit={generarGastos}>
                <div>
                    <label>Mes:</label>
                    <input
                        type="number"
                        min="1"
                        max="12"
                        value={mes}
                        onChange={(e) => setMes(e.target.value)}
                        placeholder="Ejemplo: 6"
                    />
                </div>
                <div>
                    <label>Año:</label>
                    <input type="number"
                        min="2000"
                        max="2100"
                        value={anio}
                        onChange={(e) => setAnio(e.target.value)}
                        placeholder="Ejemplo: 2024"
                    />
                </div>
                <button type="submit">Generar</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {resultado && (
                <div>
                    <h2>Gastos generados con éxito:</h2>
                    <pre>{JSON.stringify(resultado, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default GenerarGastos;