// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../../services/api";
//
// function VerificarDocumentos() {
//   const [datos, setDatos] = useState(null);
//   const [autorizado, setAutorizado] = useState(true);
//   const [rolPermitido, setRolPermitido] = useState(false);
//   const [loading, setLoading] = useState(true); // ← corregido
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const taskId = searchParams.get("taskId");
//
//
//   useEffect(() => {
//       const rol = sessionStorage.getItem("rol");
//       setRolPermitido(rol === "rrhh");
//
//       if (rol === "rrhh" && taskId) {
//         api.get(`/tareas/detalles/${taskId}`)
//           .then(res => {
//             setDatos(res.data);
//             setLoading(false);
//           })
//           .catch(err => {
//             console.error("Error al obtener datos:", err);
//             setLoading(false);
//           });
//       } else {
//         setLoading(false);
//       }
//   }, [taskId]);
//
//   const manejarDecision = (respuesta) => {
//       api.post(`/tareas/${taskId}/completar`, { aprobado: respuesta })
//         .then(() => {
//           alert(`Documentos ${respuesta === "si" ? "aprobados" : "rechazados"} correctamente.`);
//           navigate("/");
//         })
//         .catch(err => {
//           console.error("Error al completar tarea:", err);
//           alert("Hubo un error al procesar la decisión.");
//         });
//     };
//
//     if (loading) return <p>Cargando...</p>;
//
//     if (!rolPermitido) {
//       return <p style={{ color: "red" }}>❌ No tienes permiso para ver esta pantalla. Solo RRHH puede acceder.</p>;
//     }
//
//       return (
//         <div>
//           <h2>🗂️ Verificar Documentos</h2>
//           {loading ? (
//             <p>Cargando...</p>
//           ) : datos && datos.ciEmpleado ? (
//             <div>
//               <p><strong>CI Empleado:</strong> {datos.ciEmpleado}</p>
//               <p><strong>Motivo:</strong> {datos.motivo}</p>
//               <p><strong>Fecha Inicio:</strong> {datos.fechaInicio}</p>
//               <p><strong>Fecha Fin:</strong> {datos.fechaFin}</p>
//               <button onClick={() => manejarDecision("si")}>✅ Aprobar Documentos</button>
//               <button onClick={() => manejarDecision("no")} style={{ marginLeft: "10px" }}>❌ Rechazar Documentos</button>
//             </div>
//           ) : (
//             <p>No se encontraron datos de la solicitud.</p>
//           )}
//
//         </div>
//       );
//     }
//
// export default VerificarDocumentos;

import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";

function VerificarDocumentos() {
  const [datos, setDatos] = useState(null);
  const [rolPermitido, setRolPermitido] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const taskId = searchParams.get("taskId");
  console.log("Task ID recibido:", taskId); // 👈 Aquí verificas si viene null


  useEffect(() => {
    const rol = sessionStorage.getItem("rol");
    setRolPermitido(rol === "rrhh");

    if (rol === "rrhh" && taskId) {
      api.get(`/tareas/detalles/${taskId}`)
        .then(res => setDatos(res.data))
        .catch(err => console.error("Error al obtener datos:", err));
    }
  }, [taskId]);

//   const verificar = (estado) => {
//     api.post(`/tareas/${taskId}/completar`, { aprobado: estado })
//       .then(() => {
//         alert("Verificación registrada.");
//         navigate("/");
//       })
//       .catch(err => alert("Error al verificar."));
//   };
  const verificar = (estado) => {
    api.post(`/tareas/${taskId}/completar`, {
      aprobado: estado,
      nrotramite: datos.nrotramite  // <--- asegurarse que exista y esté definido
    })
    .then(() => {
      alert("Verificación registrada.");
      if (estado === "verificado") {
        navigate(`/flujo/F1/P4?taskId=${taskId}`);
      } else {
        navigate(`/flujo/F1/P5?taskId=${taskId}`);
      }
    })
    .catch(err => {
      console.error("Error al verificar:", err);
      alert("Error al verificar.");
      navigate("/flujo/F1/P7");
    });
  };

  if (!rolPermitido) return <p>🔒 Acceso denegado</p>;

  return (
    <div>
      <div>
        <h2>🗂️ Verificar Documentos</h2>
        {datos ? (
          <div>
            <p><strong>CI Empleado:</strong> {datos.ciEmpleado}</p>
            <p><strong>Motivo:</strong> {datos.motivo}</p>
            <p><strong>Fecha Inicio:</strong> {datos.fechaInicio}</p>
            <p><strong>Fecha Fin:</strong> {datos.fechaFin}</p>
            <button onClick={() => verificar("verificado")}>✅ Verificado</button>
            <button onClick={() => verificar("falta")} style={{ marginLeft: "10px" }}>❌ Falta documentación</button>
          </div>
        ) : <p>Cargando datos...</p>}
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => navigate("/flujo/F1/P2")}>⬅️ Anterior</button>
        <button onClick={() => navigate(`/flujo/F1/P4?taskId=${taskId}`)} style={{ marginLeft: "10px" }}>
          Siguiente ➡️
        </button>
      </div>
    </div>
  );
}

export default VerificarDocumentos;
