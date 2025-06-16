import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function FirmarPermiso() {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("taskId");
  const navigate = useNavigate();

  const manejarFirma = (aprobado) => {
    api.post(`/tareas/${taskId}/completar`, { aprobado })
      .then(() => navigate("/emitir-permiso"))
      .catch(err => alert("Error: " + err));
  };

  return (
    <div>
      <h2>✍️ Firmar Solicitud</h2>
      <button onClick={() => manejarFirma("si")}>✅ Aprobar</button>
      <button onClick={() => manejarFirma("no")}>❌ Rechazar</button>
    </div>
  );
}

export default FirmarPermiso;
