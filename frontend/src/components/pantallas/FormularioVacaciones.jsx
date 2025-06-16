import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function FormularioVacaciones() {
  const [formData, setFormData] = useState({
    ciEmpleado: "",
    fechaInicio: "",
    fechaFin: "",
    motivo: "",
    usuarioAsignado: ""
  });
  const [rolPermitido, setRolPermitido] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const rol = sessionStorage.getItem("rol");
    setRolPermitido(rol === "trabajador");
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tareas/iniciar/solicitud-vacaciones", formData);
      setMensaje("Solicitud enviada exitosamente");
      setError("");
//       navigate("/"); // o a donde quieras redirigir después
    } catch (err) {
        console.error("Detalles del error:", err.response?.data || err.message);
      setError("Error al enviar la solicitud");
      setMensaje("");
      console.error(err);
    }
  };

//   if (!rolPermitido) {
//     return <p>⚠️ Solo los trabajadores pueden acceder a este formulario.</p>;
//   }

  return (
    <div>
      <h2>📝 Formulario de Solicitud de Vacaciones</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>CI del Empleado:</label>
          <input
            type="text"
            name="ciEmpleado"
            value={formData.ciEmpleado}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha Inicio:</label>
          <input
            type="date"
            name="fechaInicio"
            value={formData.fechaInicio}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Fecha Fin:</label>
          <input
            type="date"
            name="fechaFin"
            value={formData.fechaFin}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Motivo:</label>
          <textarea
            name="motivo"
            value={formData.motivo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Usuario Asignado (RRHH):</label>
          <input
            type="text"
            name="usuarioAsignado"
            value={formData.usuarioAsignado}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Enviar Solicitud</button>
      </form>

      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default FormularioVacaciones;
