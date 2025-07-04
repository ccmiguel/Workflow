
import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeleccionUsuario from './components/SeleccionUsuario';
import FlujoInicio from './components/FlujoInicio';
import BandejaEntrada from './components/BandejaEntrada';
import PantallaFlujo from './components/PantallaFlujo';
import VerificarDocumentos from './components/pantallas/VerificarDocumentos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeleccionUsuario />} />
        <Route path="/flujo/:flujo/:proceso" element={<PantallaFlujo />} />
        <Route path="/flujo" element={<FlujoInicio />} />
        <Route path="/:flujo/:usuario" element={<BandejaEntradaWrapper />} />
        <Route path="/flujo/F1/P3" element={<VerificarDocumentos />} /> {/* <-- Ruta explícita */}
        {/*         <Route path="/:flujo&:usuario" element={<BandejaEntradaWrapper />} /> */}
      </Routes>
    </Router>
  );
}

// Wrapper para extraer params de la URL
function BandejaEntradaWrapper() {
//   const { flujo, usuario } = useParams();
  const { usuario } = useParams();
  return (
    <>
      <h2>Bandeja de Entrada - {usuario.toUpperCase()}</h2>
      <BandejaEntrada usuario={usuario} />
    </>
  );
}

export default App;
