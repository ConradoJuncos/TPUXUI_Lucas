import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Juegos from "./pages/Juegos";
import UltimosEstrenos from "./pages/UltimosEstrenos";
import FormularioJuego from "./pages/FormularioJuego";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";

import "./App.css";

function App() {
  const [juegosFiltrado, setJuegosFiltrado] = useState(0);

  return (
    <BrowserRouter>
      <Encabezado />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Navigate to="/juegos/lista" />} />
          <Route path="/juegos/lista" element={<Juegos setFilteredGameCount={setJuegosFiltrado} />} />
          <Route path="/estrenos" element={<UltimosEstrenos />} />
          <Route path="/juegos/nuevo" element={<FormularioJuego />} />
          <Route path="/juegos/editar/:id" element={<FormularioJuego />} />
        </Routes>
      </main>
      <PiePagina juegosFiltradoCount={juegosFiltrado} />
    </BrowserRouter>
  );
}

export default App;
