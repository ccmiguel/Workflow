// import React, { useState } from "react";
// import api from "../../services/api";
//
// function FormularioPermiso() {
//   const [formulario, setFormulario] = useState({
//     ciEmpleado: "",
//     fecha: "",
//     tipoPermiso: "",
//     horas: "",
//     justificacion: ""
//   });
//
//   const manejarCambio = (e) => {
//     setFormulario({ ...formulario, [e.target.name]: e.target.value });
//   };
//
//   const manejarEnvio = () => {
//     api.post("/iniciar/solicitud-permisos", formulario)
//       .then(() => alert("Solicitud de permiso enviada"))
//       .catch(err => alert("Error: " + err.message));
//   };
//
//   return (
//     <div>
//       <h2>📄 Solicitud de Permiso</h2>
//       <input name="ciEmpleado" placeholder="CI" onChange={manejarCambio} />
//       <input name="fecha" type="date" onChange={manejarCambio} />
//       <input name="tipoPermiso" placeholder="Tipo de Permiso" onChange={manejarCambio} />
//       <input name="horas" placeholder="Horas (opcional)" onChange={manejarCambio} />
//       <textarea name="justificacion" placeholder="Justificación" onChange={manejarCambio} />
//       <button onClick={manejarEnvio}>Enviar</button>
//     </div>
//   );
// }
//
// export default FormularioPermiso;

import React from "react";

function RechazoPermiso() {
  return (
    <div>
      <h2>❌ Su solicitud fue rechazada. Consulte con RRHH para más detalles.</h2>
    </div>
  );
}

export default RechazoPermiso;