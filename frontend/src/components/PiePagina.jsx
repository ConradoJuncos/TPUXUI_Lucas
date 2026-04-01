import React, { useState, useEffect } from "react";
import juegosService from "../services/juegos.service";

function PiePagina(juegosFiltrado) {
  const [juegosTotal, setJuegosTotal] = useState(0);

  const cargarJuegosTotales = async () => {
    const data = await juegosService.contarJuegos();
    setJuegosTotal(data);
  };

  useEffect(() => {
    cargarJuegosTotales();
  }, []);


  return (
    <footer className="bg-light text-center py-4 mt-5">
      <div className="container">
        <small className="d-block mb-2">
          &copy; 2025 Odio esta materia.
          <img
            width="50"
            height="50"
            src="https://alfabetajuega.com/hero/2024/08/kento-nanami-en-la-segunda-temporada-de-jujutsu-kaisen.jpg?width=768&aspect_ratio=16:9&format=nowebp"
            alt="Kento Nanami from Jujutsu Kaisen"
            className="ms-2 rounded-circle"
            style={{ objectFit: 'cover' }}
          />
        </small>
        {juegosTotal !== null && (
          <p className="mb-0">Juegos totales en la base de datos: {juegosTotal}</p>
        )}
        {juegosFiltrado.cantidad !== null && (
          <p className="mb-0">Juegos totales filtrados: {juegosFiltrado.juegosFiltradoCount || juegosTotal}</p>
        )}
      </div>
    </footer>
  );
}

export default PiePagina;