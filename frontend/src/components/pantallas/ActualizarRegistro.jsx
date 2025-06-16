// ActualizarRegistro.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";

function ActualizarRegistro() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    api.get("/seguimiento/listar") // suponiendo que tienes un endpoint así
      .then(res => setRegistros(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>📊 Seguimiento de Solicitudes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Trámite</th>
            <th>Flujo</th>
            <th>Proceso</th>
            <th>Usuario</th>
            <th>Inicio</th>
            <th>Fin</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r, i) => (
            <tr key={i}>
              <td>{r.nrotramite}</td>
              <td>{r.flujo}</td>
              <td>{r.proceso}</td>
              <td>{r.usuario}</td>
              <td>{r.fechaInicio}</td>
              <td>{r.fechaFin}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActualizarRegistro;
