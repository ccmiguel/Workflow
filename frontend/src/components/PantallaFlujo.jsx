import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

// Importa aquí tus pantallas
import FormularioVacaciones from './pantallas/FormularioVacaciones';
import RevisionRRHH from './pantallas/RevisionRRHH';
import VerificarDocumentos from './pantallas/VerificarDocumentos';
import AprobarSolicitud from './pantallas/AprobarSolicitud';
import ActualizarRegistro from './pantallas/ActualizarRegistro';
import NotificarResultado from './pantallas/NotificarResultado';
import FormularioPermisos from './pantallas/FormularioPermisos';
import RevisionPermisoRRHH from './pantallas/RevisionPermisoRRHH';
import ValidarPermiso from './pantallas/ValidarPermiso';
import FirmarPermiso from './pantallas/FirmarPermiso';
import EmitirPermiso from './pantallas/EmitirPermiso';
import NotificarEmision from './pantallas/NotificarEmision';
import RechazoVacaciones from './pantallas/RechazoVacaciones';
import RechazoPermiso from './pantallas/RechazoPermiso';

function PantallaFlujo() {
//   const { flujo, proceso } = useParams();
  const { flujo, proceso, usuario } = useParams();
  const [pantalla, setPantalla] = useState('');
  const [siguiente, setSiguiente] = useState('');
  const [anterior, setAnterior] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/flujo/paso/${flujo}/${proceso}`).then(res => {
      setPantalla(res.data.pantalla);
      setSiguiente(res.data.siguiente);
    });

    // Nueva consulta para encontrar el proceso anterior
    api.get(`/flujo/anterior/${flujo}/${proceso}`).then(res => {
      setAnterior(res.data.anterior); // asumimos que tu backend responde con { anterior: "P2" }
    });
  }, [flujo, proceso]);

  const irSiguiente = () => {
    if (siguiente) {
      navigate(`/flujo/${flujo}/${siguiente}`);
    } else {
      alert('Este es el último paso del flujo.');
      setTimeout(() => {
            navigate(`/`);
          }, 1000);
    }
  };

  const irAnterior = () => {
    if (anterior) {
      navigate(`/flujo/${flujo}/${anterior}`);
    } else {
      alert('Este es el primer paso del flujo.');
    }
  };

  // Mapeo entre nombres de pantallas (de la BD) y componentes React
  const renderizarPantalla = () => {
    switch (pantalla) {
      case 'formulario_vacaciones': return <FormularioVacaciones />;
      case 'revision_rrhh': return <RevisionRRHH />;
      case 'verificar_documentos': return <VerificarDocumentos />;
      case 'aprobar_solicitud': return <AprobarSolicitud />;
      case 'actualizar_registro': return <ActualizarRegistro />;
      case 'notificar_resultado': return <NotificarResultado />;
      case 'formulario_permisos': return <FormularioPermisos />;
      case 'revision_permiso_rrhh': return <RevisionPermisoRRHH />;
      case 'validar_permiso': return <ValidarPermiso />;
      case 'firmar_permiso': return <FirmarPermiso />;
      case 'emitir_permiso': return <EmitirPermiso />;
      case 'notificar_emision': return <NotificarEmision />;
      case 'rechazo_vacaciones': return <RechazoVacaciones />;
      case 'rechazo_permiso': return <RechazoPermiso />;
      default: return <p>Pantalla no encontrada: {pantalla}</p>;
    }
  };

  return (
    <div>
      <h3>Flujo: {flujo} | Proceso: {proceso}</h3>
      <h4>Pantalla: {pantalla}</h4>

      {renderizarPantalla()}

      <button onClick={irAnterior} disabled={!anterior}>Anterior</button>
        <button onClick={irSiguiente} style={{ marginLeft: "10px" }}>Siguiente</button>
    </div>
  );
}

export default PantallaFlujo;
