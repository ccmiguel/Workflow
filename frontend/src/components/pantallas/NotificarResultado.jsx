// NotificarResultado.jsx
import React, { useEffect, useState } from "react";
import api from "../../services/api";

function NotificarResultado() {
//   const [mensaje, setMensaje] = useState("");
//
//   useEffect(() => {
//     const ci = sessionStorage.getItem("ciEmpleado");
//     api.get(`/resultado/${ci}`)
//       .then(res => {
//         if (res.data.estado === "aprobado") {
//           setMensaje("✅ Su solicitud fue aprobada");
//         } else {
//           setMensaje("❌ Diríjase a la sección de rechazo de vacaciones");
//         }
//       })
//       .catch(() => setMensaje("No se encontró resultado."));
//   }, []);
//
//   return <p>{mensaje}</p>;

    return (
        <div>
          <h2>✅ Su solicitud de permiso ha sido aprobada</h2>
        </div>
      );
}

export default NotificarResultado;