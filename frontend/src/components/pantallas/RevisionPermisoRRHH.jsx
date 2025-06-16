import React, { useEffect, useState } from "react";
import api from "../../services/api";

function RevisionPermisoRRHH() {
  const [solicitudes, setSolicitudes] = useState([]);

  useEffect(() => {
    api.get("/tareas/solicitudes-permisos/pendientes")
      .then(res => setSolicitudes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>📂 Revisión RRHH - Permisos</h2>
      <ul>
        {solicitudes.map(s => (
          <li key={s.taskId}>
            CI: {s.ciEmpleado} | Tipo: {s.tipoPermiso} | Fecha: {s.fecha}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RevisionPermisoRRHH;