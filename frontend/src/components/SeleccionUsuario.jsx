
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SeleccionUsuario() {
  const [usuario, setUsuario] = useState('');
  const navigate = useNavigate();

//   const manejarLogin = () => {
//     if (usuario) {
//       navigate('/flujo', { state: { usuario } });
//     }
//   };

   const flujosIniciales = {
     rrhh: { flujo: 'revision_rrhh', proceso: 'P1' },
     jefe: { flujo: 'aprobacion_vacaciones', proceso: 'P1' },
     trabajador: { flujo: 'solicitud_vacaciones', proceso: 'P1' }
   };

   const manejarLogin = () => {
     if (usuario && flujosIniciales[usuario]) {
       const { flujo, proceso } = flujosIniciales[usuario];
//        navigate(`/flujo/${flujo}/${proceso}`, { state: { usuario } });
        navigate(`/entrada/${usuario}`);
     }
   };

  return (
    <div>
      <h2>Seleccione su rol</h2>
      <select onChange={(e) => setUsuario(e.target.value)} defaultValue="">
        <option value="" disabled>-- Seleccionar --</option>
        <option value="rrhh">RRHH</option>
        <option value="jefe">Jefe</option>
        <option value="trabajador">Trabajador</option>
      </select>
      <button onClick={manejarLogin} disabled={!usuario}>Entrar</button>
    </div>
  );
}

export default SeleccionUsuario;
