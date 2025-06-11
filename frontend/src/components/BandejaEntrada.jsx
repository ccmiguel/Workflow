import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';

function BandejaEntrada({ usuario }) {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    api.get(`/tareas/${usuario}`).then(res => setTareas(res.data));
  }, [usuario]);

  const completar = (id) => {
    api.post(`/tareas/${id}/completar`, { aprobado: true });
    alert("Tarea completada");
  };

  return (
    <ul>
      {tareas.map(t => (
        <li key={t.id}>
          {t.nombre} - {t.proceso}
          <button onClick={() => completar(t.id)}>Completar</button>
        </li>
      ))}
    </ul>
  );
}

export default BandejaEntrada;
