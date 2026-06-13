import { plataformas } from "../data/mockPlataformas";

// Servicio "mock": ver juegos.service.js para más contexto.
const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

const obtenerTodas = async () => {
  await delay();
  return [...plataformas];
};

export default {
  obtenerTodas
};
