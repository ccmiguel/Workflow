import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function BandejaEntrada({ usuario }) {
  const [procesos, setProcesos] = useState([]);
  const [verTodos, setVerTodos] = useState(false);
  const [flujoSeleccionado, setFlujoSeleccionado] = useState(''); // F1, F2, o vacío para todos
  const navigate = useNavigate();

  useEffect(() => {
    let endpoint = verTodos ? '/flujo/todos' : `/flujo/usuario/${usuario}`;

    // Añadir filtro de flujo si está seleccionado
    if (flujoSeleccionado) {
      endpoint += `?flujo=${flujoSeleccionado}`;
    }

    api.get(endpoint).then(res => {
      setProcesos(res.data);
    }).catch(err => {
      console.error("Error al obtener procesos:", err);
    });
  }, [usuario, verTodos, flujoSeleccionado]);

  const manejarRedireccion = (flujo, proceso) => {
    navigate(`/flujo/${flujo}/${proceso}`);
  };

  return (
    <div>
      <h2>Bandeja de Entrada - {usuario?.toUpperCase()}</h2>
      <div>
        <button onClick={() => setVerTodos(false)}>Ver solo mi rol</button>
        <button onClick={() => setVerTodos(true)}>Ver todos</button>
      </div>

      <div style={{ margin: '10px 0' }}>
        <label>Filtrar por flujo: </label>
        <select value={flujoSeleccionado} onChange={(e) => setFlujoSeleccionado(e.target.value)}>
          <option value="">Todos</option>
          <option value="F1">F1</option>
          <option value="F2">F2</option>
        </select>
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>Flujo</th>
            <th>Proceso</th>
            <th>Siguiente</th>
            <th>Tipo</th>
            <th>Rol</th>
            <th>Pantalla</th>
            <th>Operaciones</th>
          </tr>
        </thead>
        <tbody>
          {procesos.length === 0 ? (
            <tr><td colSpan="7">No hay datos disponibles</td></tr>
          ) : (
            procesos.map((fila, index) => (
              <tr key={index}>
                <td>{fila.flujo}</td>
                <td>{fila.proceso}</td>
                <td>{fila.siguiente}</td>
                <td>{fila.tipo}</td>
                <td>{fila.rol}</td>
                <td>{fila.pantalla}</td>
                <td>
                  <button onClick={() => manejarRedireccion(fila.flujo, fila.proceso)}>
                    Ir a {fila.pantalla}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BandejaEntrada;
