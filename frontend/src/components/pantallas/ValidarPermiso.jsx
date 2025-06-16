import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function ValidarPermiso() {
  const [datos, setDatos] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const taskId = searchParams.get("taskId");

  useEffect(() => {
    api.get(`/tareas/detalles/${taskId}`).then(res => setDatos(res.data));
  }, [taskId]);

  const manejarValidacion = (estado) => {
    api.post(`/tareas/${taskId}/completar`, { validado: estado })
      .then(() => navigate("/"))
      .catch(err => alert("Error: " + err));
  };

  return (
    <div>
      <h2>🧐 Validar Permiso</h2>
      {datos && (
        <div>
          <p>CI: {datos.ciEmpleado}</p>
          <p>Tipo: {datos.tipoPermiso}</p>
          <p>Fecha: {datos.fecha}</p>
          <p>Horas: {datos.horas}</p>
          <p>Justificación: {datos.justificacion}</p>
          <button onClick={() => manejarValidacion("verificado")}>✅ Verificado</button>
          <button onClick={() => manejarValidacion("rechazado")} style={{ marginLeft: "10px" }}>❌ Falta Información</button>
        </div>
      )}
    </div>
  );
}

export default ValidarPermiso;