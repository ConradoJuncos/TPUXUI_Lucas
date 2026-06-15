import { useState } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Juegos from "./pages/Juegos";
import UltimosEstrenos from "./pages/UltimosEstrenos";
import FormularioJuego from "./pages/FormularioJuego";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";
import LoginModal from "./components/LoginModal";
import { useUser } from "./context/UserContext";

import "./App.css";

function App() {
  const [juegosFiltrado, setJuegosFiltrado] = useState(0);
  const { usuario } = useUser();

  if (!usuario) {
    return <LoginModal />;
  }

  return (
    <HashRouter>
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
    </HashRouter>
  );
}

export default App;
