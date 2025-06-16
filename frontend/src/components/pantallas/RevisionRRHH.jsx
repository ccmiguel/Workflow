import React, { useEffect, useState } from "react";
// import api from "../services/api";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

function RevisionRRHH() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [rolPermitido, setRolPermitido] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const rol = sessionStorage.getItem("rol");
    setRolPermitido(rol === "rrhh");

    if (rol === "rrhh") {
      api.get("/tareas/solicitudes-vacaciones/pendientes")
        .then(res => setSolicitudes(res.data))
        .catch(err => console.error("Error al obtener solicitudes:", err));
    }
  }, []);

  if (!rolPermitido) {
      return <p>⚠️ Solo rrhh puede acceder a estos datos.</p>;
    }

  return (
    <div>
      <h3>📋 Revisión de solicitudes por RRHH</h3>
      {solicitudes.length === 0 ? (
        <p>No hay solicitudes pendientes.</p>
      ) : (
        <ul>
          {solicitudes.map((s, idx) => (
            <li key={s.taskId}>
              <strong>CI:</strong> {s.ciEmpleado} |
              <strong>Inicio:</strong> {s.fechaInicio} |
              <strong>Fin:</strong> {s.fechaFin} |
              <strong>Motivo:</strong> {s.motivo} |
              <button onClick={() => navigate(`/flujo/F1/P3?taskId=${s.taskId}`)}>
                📄 Verificar documentos
              </button>
            </li>

          ))}
        </ul>
      )}
    </div>
  );
}

export default RevisionRRHH;
