// import React from 'react';
// import { useEffect, useState } from 'react';
// import api from '../services/api';
//
// function BandejaEntrada({ usuario }) {
//   const [tareas, setTareas] = useState([]);
//
//   useEffect(() => {
//     api.get(`/tareas/${usuario}`).then(res => setTareas(res.data));
//   }, [usuario]);
//
//   const completar = (id) => {
//     api.post(`/tareas/${id}/completar`, { aprobado: true })
//       .then(() => {
//         alert("✅ Tarea completada correctamente");
//         // Opcional: recargar la lista de tareas después de completar
//         api.get(`/tareas/${usuario}`).then(res => setTareas(res.data));
//       })
//       .catch((error) => {
//         console.error("❌ Error al completar la tarea:", error);
//         alert("⚠️ Ocurrió un error al completar la tarea. Revisa la consola.");
//       });
//   };
//
//   return (
//     <ul>
//       {tareas.map(t => (
//         <li key={t.id}>
//           {t.nombre} - {t.proceso}
//           <button onClick={() => completar(t.id)}>Completar</button>
//         </li>
//       ))}
//     </ul>
//   );
// }
//
// export default BandejaEntrada;

//

import React, { useEffect, useState } from 'react';
import api from '../services/api';

function BandejaEntrada({ usuario }) {
  const [tareas, setTareas] = useState([]);
  const [detalles, setDetalles] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  useEffect(() => {
    api.get(`/tareas/${usuario}`).then(res => setTareas(res.data));
  }, [usuario]);

  const completar = (id) => {
    api.post(`/tareas/${id}/completar`, { aprobado: true })
      .then(() => {
        alert("✅ Tarea completada correctamente");
        api.get(`/tareas/${usuario}`).then(res => setTareas(res.data));
        setModalAbierto(false);
        setDetalles(null);
      })
      .catch((error) => {
        console.error("❌ Error al completar la tarea:", error);
        alert("⚠️ Ocurrió un error al completar la tarea.");
      });
  };

  const verDetalles = (id) => {
    api.get(`/tareas/detalles/${id}`)
      .then(res => {
        setDetalles({ ...res.data, idTarea: id });
        setModalAbierto(true);
      })
      .catch(err => {
        console.error("Error al obtener detalles:", err);
        alert("No se pudo cargar la información de la tarea.");
      });
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setDetalles(null);
  };

  return (
    <div>
      <ul>
        {tareas.map(t => (
          <li key={t.id}>
            {t.nombre} - {t.proceso}
            <button onClick={() => verDetalles(t.id)}>Ver detalles</button>
            <button onClick={() => completar(t.id)}>Completar</button>
          </li>
        ))}
      </ul>

      {modalAbierto && detalles && (
        <div style={estilos.modalFondo}>
          <div style={estilos.modalContenido}>
            <button onClick={cerrarModal} style={estilos.cerrar}>X</button>
            <h3>📝 Detalles de la tarea</h3>
            {Object.entries(detalles).map(([clave, valor]) => (
              <p key={clave}><strong>{clave}:</strong> {valor}</p>
            ))}
            <button onClick={() => completar(detalles.idTarea)}>Completar esta tarea</button>
          </div>
        </div>
      )}
    </div>
  );
}

const estilos = {
  modalFondo: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modalContenido: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    maxHeight: '80%',
    overflowY: 'auto',
    position: 'relative'
  },
  cerrar: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontWeight: 'bold',
    background: 'transparent',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default BandejaEntrada;

