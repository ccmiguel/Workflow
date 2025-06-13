// import React, { useState } from 'react';
// import BandejaEntrada from './BandejaEntrada';
//
// function SeleccionUsuario() {
//   const [usuario, setUsuario] = useState('');
//   const [logueado, setLogueado] = useState(false);
//
//   const manejarCambio = (e) => setUsuario(e.target.value);
//   const manejarLogin = () => setLogueado(true);
//
//   return (
//     <div>
//       {!logueado ? (
//         <>
//           <h2>Seleccione su rol</h2>
//           <select onChange={manejarCambio} defaultValue="">
//             <option value="" disabled>-- Seleccionar --</option>
//             <option value="rrhh">RRHH</option>
//             <option value="jefe">Jefe</option>
//           </select>
//           <button onClick={manejarLogin} disabled={!usuario}>Entrar</button>
//         </>
//       ) : (
//         <>
//           <h2>Bandeja de Entrada - {usuario.toUpperCase()}</h2>
//           <BandejaEntrada usuario={usuario} />
//         </>
//       )}
//     </div>
//   );
// }
//
// export default SeleccionUsuario;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeleccionUsuario() {
  const [usuario, setUsuario] = useState('');
  const navigate = useNavigate();

  const manejarLogin = () => {
    if (usuario) {
      navigate('/flujo', { state: { usuario } });
    }
  };

  return (
    <div>
      <h2>Seleccione su rol</h2>
      <select onChange={(e) => setUsuario(e.target.value)} defaultValue="">
        <option value="" disabled>-- Seleccionar --</option>
        <option value="rrhh">RRHH</option>
        <option value="jefe">Jefe</option>
      </select>
      <button onClick={manejarLogin} disabled={!usuario}>Entrar</button>
    </div>
  );
}

export default SeleccionUsuario;
