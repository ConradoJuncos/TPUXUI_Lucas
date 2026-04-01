import React, { useState } from "react"; // <--- Add useState import here
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Juegos from "./pages/Juegos";
import UltimosEstrenos from "./pages/UltimosEstrenos";
import FormularioJuego from "./pages/FormularioJuego";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";


function App() {
  const [juegosFiltrado, setJuegosFiltrado] = useState(0);

  return (
    <BrowserRouter>
      <div className="container-md mt-5">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Navigate to="/juegos/lista" />} />
          <Route path="/juegos/lista" element={<Juegos setFilteredGameCount={setJuegosFiltrado} />} />
          <Route path="/estrenos" element={<UltimosEstrenos />} />
          <Route path="/juegos/nuevo" element={<FormularioJuego />} />
          <Route path="/juegos/editar/:id" element={<FormularioJuego />} />
        </Routes>
        <PiePagina juegosFiltradoCount={juegosFiltrado} />
      </div>
    </BrowserRouter>
  );
}

export default App;
