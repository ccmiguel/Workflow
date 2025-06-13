// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import api from '../services/api';
//
// function FlujoInicio() {
//   const { state } = useLocation();
//   const usuario = state?.usuario;
//   const navigate = useNavigate();
//
//   const [flujo, setFlujo] = useState('');
//   const [datos, setDatos] = useState({});
//
//   const iniciarProceso = () => {
//     const endpoint = flujo === 'vacaciones' ? 'solicitud-vacaciones' : 'solicitud-permisos';
//     const payload = {
//       ...datos,
//       usuarioAsignado: usuario
//     };
//
//     api.post(`/tareas/iniciar/${endpoint}`, payload)
//       .then(() => {
//         alert('✅ Proceso iniciado');
//         navigate(`/${flujo}&${usuario}`);
//       })
//       .catch((err) => {
//         console.error('Error:', err);
//         alert('❌ Error al iniciar el proceso');
//       });
//   };
//
//   const manejarCambio = (e) => {
//     setDatos({ ...datos, [e.target.name]: e.target.value });
//   };
//
//   return (
//     <div>
//       <h2>Iniciar un nuevo proceso - Usuario: {usuario.toUpperCase()}</h2>
//
//       <select onChange={(e) => setFlujo(e.target.value)} defaultValue="">
//         <option value="" disabled>-- Seleccionar flujo --</option>
//         <option value="vacaciones">Vacaciones</option>
//         <option value="permisos">Permisos</option>
//       </select>
//
//       {flujo === 'vacaciones' && (
//         <>
//           <input name="ciEmpleado" placeholder="CI" onChange={manejarCambio} />
//           <input name="fechaInicio" placeholder="Fecha inicio (yyyy-mm-dd)" onChange={manejarCambio} />
//           <input name="fechaFin" placeholder="Fecha fin (yyyy-mm-dd)" onChange={manejarCambio} />
//           <input name="motivo" placeholder="Motivo" onChange={manejarCambio} />
//         </>
//       )}
//
//       {flujo === 'permisos' && (
//         <>
//           <input name="ciEmpleado" placeholder="CI" onChange={manejarCambio} />
//           <input name="fecha" placeholder="Fecha (yyyy-mm-dd)" onChange={manejarCambio} />
//           <input name="tipoPermiso" placeholder="Tipo de permiso" onChange={manejarCambio} />
//           <input name="horas" placeholder="Horas (opcional)" onChange={manejarCambio} />
//           <input name="justificacion" placeholder="Justificación" onChange={manejarCambio} />
//         </>
//       )}
//
//       <br />
//       <button onClick={iniciarProceso} disabled={!flujo}>Nuevo proceso</button>
//     </div>
//   );
// }
//
// export default FlujoInicio;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';

function FlujoInicio() {
  const { state } = useLocation();
  const usuario = state?.usuario;
  const navigate = useNavigate();

  const [flujo, setFlujo] = useState('');
  const [datos, setDatos] = useState({});
  const [error, setError] = useState('');

  const manejarCambio = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };


  const validarCampos = () => {
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!datos.ciEmpleado || datos.ciEmpleado.length < 6) return "CI inválido";

    if (flujo === 'vacaciones') {
      if (!datos.fechaInicio || !fechaRegex.test(datos.fechaInicio)) return "Fecha inicio inválida";
      if (!datos.fechaFin || !fechaRegex.test(datos.fechaFin)) return "Fecha fin inválida";

      const inicio = new Date(datos.fechaInicio);
      const fin = new Date(datos.fechaFin);

      if (fin < inicio) return "La fecha de fin no puede ser anterior a la fecha de inicio";

      if (!datos.motivo) return "Motivo requerido";
    }

    if (flujo === 'permisos') {
      if (!datos.fecha || !fechaRegex.test(datos.fecha)) return "Fecha inválida";
      if (!datos.tipoPermiso) return "Tipo de permiso requerido";
      if (!datos.justificacion) return "Justificación requerida";
    }

    return ''; // sin errores
  };


  const iniciarProceso = () => {
    const mensajeError = validarCampos();
    if (mensajeError) {
      setError(mensajeError);
      return;
    }

    setError('');
    const endpoint = flujo === 'vacaciones' ? 'solicitud-vacaciones' : 'solicitud-permisos';
    const payload = {
      ...datos,
      usuarioAsignado: usuario
    };

    api.post(`/tareas/iniciar/${endpoint}`, payload)
      .then(() => {
        alert('✅ Proceso iniciado');
        navigate(`/${flujo}/${usuario}`);

//         navigate(`/${flujo}&${usuario}`);
      })
      .catch((err) => {
        console.error('Error:', err);
        alert('❌ Error al iniciar el proceso');
      });
  };

  // Nueva función para ir a la lista sin crear proceso
    const irALaLista = () => {
      if (!flujo) {
        alert('Por favor selecciona un flujo primero.');
        return;
      }
      navigate(`/${flujo}/${usuario}`);
    };

  return (
    <div>
      <h2>Iniciar un nuevo proceso - Usuario: {usuario?.toUpperCase()}</h2>

      <select onChange={(e) => setFlujo(e.target.value)} defaultValue="">
        <option value="" disabled>-- Seleccionar flujo --</option>
        <option value="vacaciones">Vacaciones</option>
        <option value="permisos">Permisos</option>
      </select>

      {flujo === 'vacaciones' && (
        <>
          <input name="ciEmpleado" placeholder="CI" onChange={manejarCambio} />
          <input name="fechaInicio" placeholder="Fecha inicio (yyyy-mm-dd)" onChange={manejarCambio} />
          <input name="fechaFin" placeholder="Fecha fin (yyyy-mm-dd)" onChange={manejarCambio} />
          <input name="motivo" placeholder="Motivo" onChange={manejarCambio} />
        </>
      )}

      {flujo === 'permisos' && (
        <>
          <input name="ciEmpleado" placeholder="CI" onChange={manejarCambio} />
          <input name="fecha" placeholder="Fecha (yyyy-mm-dd)" onChange={manejarCambio} />
          <input name="tipoPermiso" placeholder="Tipo de permiso" onChange={manejarCambio} />
          <input name="horas" placeholder="Horas (opcional)" onChange={manejarCambio} />
          <input name="justificacion" placeholder="Justificación" onChange={manejarCambio} />
        </>
      )}

      {error && <p style={{ color: 'red' }}>⚠️ {error}</p>}

      <br />
      <button onClick={iniciarProceso} disabled={!flujo}>Nuevo proceso</button>
      <button onClick={irALaLista} disabled={!flujo}>Ver lista de tareas</button>

    </div>
  );
}

export default FlujoInicio;
