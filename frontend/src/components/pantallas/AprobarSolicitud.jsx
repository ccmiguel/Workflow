import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function AprobarSolicitud() {
  const [datos, setDatos] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const taskId = searchParams.get("taskId");

  useEffect(() => {
    api.get(`/tareas/detalles/${taskId}`)
      .then(res => setDatos(res.data))
      .catch(console.error);

    // Obtener datos de seguimiento
      api.get(`/tareas/seguimiento/${taskId}`)
        .then(res => {
          setDatos(prev => ({ ...prev, seguimiento: res.data }));
        })
        .catch(console.error);
  }, [taskId]);

//   const aprobar = (estado) => {
//     api.post(`/tareas/${taskId}/completar`, { aprobado: estado })
//       .then(() => {
//         alert("Solicitud procesada");
//         navigate("/");
//       })
//       .catch(console.error);
//   };
  const aprobar = (estado) => {
      api.post(`/tareas/${taskId}/completar`, { aprobado: estado })
        .then(() => {
          alert("Solicitud procesada");

          // Redirigir según el resultado
          if (estado === "aprobado") {
//             navigate(`/flujo/F1/P6?taskId=${taskId}`); // NotificarResultado.jsx
               navigate(`/flujo/F1/P6`); // NotificarResultado.jsx
          } else {
              navigate(`/flujo/F1/P7`); // Rec
//             navigate(`/flujo/F1/P5?taskId=${taskId}`); // RechazoVacaciones.jsx
          }
        })
        .catch(err => {
          console.error("Error al aprobar/rechazar:", err);
          alert("Error al procesar la solicitud.");
        });
    };

  return (
    <div>
      <h2>✅ Aprobar Solicitud</h2>
      {datos ? (
        <div>
          <p><strong>CI:</strong> {datos.ciEmpleado}</p>
          <p><strong>Motivo:</strong> {datos.motivo}</p>
{/*           <button onClick={() => aprobar("aprobado")}>✅ Aprobar</button> */}
{/*           <button onClick={() => aprobar("rechazado")}>❌ Rechazar</button> */}
        </div>
      ) : <p>Cargando...</p>}
    </div>
  );
}

export default AprobarSolicitud;