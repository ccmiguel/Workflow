import React, { useEffect, useState } from "react";
import api from "../../services/api";

function EmitirPermiso() {
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    api.post("/flujoseguimiento/registro", {
      flujo: "F2",
      proceso: "P7",
      usuario: sessionStorage.getItem("usuario")
    }).then(() => setMensaje("📁 Registro completado con éxito"))
      .catch(() => setMensaje("❌ Error al registrar"));
  }, []);

  return <h3>{mensaje}</h3>;
}

export default EmitirPermiso;
