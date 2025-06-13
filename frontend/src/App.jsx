// import React from 'react';
// import SeleccionUsuario from './components/SeleccionUsuario';
//
// function App() {
//   return (
//     <div>
//       <SeleccionUsuario />
//     </div>
//   );
// }
//
// export default App;


import React from 'react';
import { useParams } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SeleccionUsuario from './components/SeleccionUsuario';
import FlujoInicio from './components/FlujoInicio';
import BandejaEntrada from './components/BandejaEntrada';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SeleccionUsuario />} />
        <Route path="/flujo" element={<FlujoInicio />} />
        <Route path="/:flujo/:usuario" element={<BandejaEntradaWrapper />} />
{/*         <Route path="/:flujo&:usuario" element={<BandejaEntradaWrapper />} /> */}
      </Routes>
    </Router>
  );
}

// Wrapper para extraer params de la URL
function BandejaEntradaWrapper() {
  const { flujo, usuario } = useParams();
  return (
    <>
      <h2>Bandeja de Entrada - {usuario.toUpperCase()}</h2>
      <BandejaEntrada usuario={usuario} />
    </>
  );
}

export default App;
