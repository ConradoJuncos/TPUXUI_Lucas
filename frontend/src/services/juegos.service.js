import { juegos as juegosSemilla } from "../data/mockJuegos";
import { plataformas } from "../data/mockPlataformas";

// -----------------------------------------------------------------------
// Servicio "mock": esta demo es 100% visual (ver context.md), por lo que
// reemplazamos las llamadas HTTP al backend por datos de relleno en
// memoria. La forma de cada función se mantiene igual que la versión
// original basada en axios para que los componentes no necesiten cambios.
// -----------------------------------------------------------------------

let juegos = juegosSemilla.map((j) => ({ ...j }));
let proximoId = Math.max(...juegos.map((j) => j.id)) + 1;

// Pequeño retardo artificial para poder mostrar estados de carga
// (principio de Feedback de los lineamientos UX/UI).
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

const buscarPlataforma = (idPlataforma) =>
  plataformas.find((p) => p.id === Number(idPlataforma)) || null;

const aFechaISO = (fecha) => {
  if (fecha instanceof Date) return fecha.toISOString().slice(0, 10);
  return fecha;
};

const obtenerTodos = async () => {
  await delay();
  return [...juegos];
};

const obtenerPorId = async (id) => {
  await delay();
  const juego = juegos.find((j) => j.id === Number(id));
  return juego ? { ...juego } : null;
};

const crear = async (juego) => {
  await delay();
  const nuevo = {
    ...juego,
    id: proximoId++,
    fechaEstreno: aFechaISO(juego.fechaEstreno),
    idPlataforma: Number(juego.idPlataforma),
    plataforma: buscarPlataforma(juego.idPlataforma)
  };
  juegos = [nuevo, ...juegos];
  return { ...nuevo };
};

const actualizar = async (id, juego) => {
  await delay();
  const actualizado = {
    ...juego,
    id: Number(id),
    fechaEstreno: aFechaISO(juego.fechaEstreno),
    idPlataforma: Number(juego.idPlataforma),
    plataforma: buscarPlataforma(juego.idPlataforma)
  };
  juegos = juegos.map((j) => (j.id === Number(id) ? actualizado : j));
  return { ...actualizado };
};

const eliminar = async (id) => {
  await delay();
  juegos = juegos.filter((j) => j.id !== Number(id));
};

const getUltimosEstrenos = async () => {
  await delay();
  return [...juegos]
    .sort((a, b) => new Date(b.fechaEstreno) - new Date(a.fechaEstreno))
    .slice(0, 10);
};

const getMasPopulares = async () => {
  await delay();
  return [...juegos]
    .filter((j) => j.opiniones > 500)
    .sort((a, b) => b.valoracion - a.valoracion)
    .slice(0, 10);
};

const coincideFiltros = (juego, { texto, idPlataforma, ESRB } = {}) => {
  if (texto) {
    const t = texto.toLowerCase();
    const coincideTexto =
      juego.nombre.toLowerCase().includes(t) ||
      juego.genero.toLowerCase().includes(t) ||
      juego.dearrollador.toLowerCase().includes(t);
    if (!coincideTexto) return false;
  }
  if (idPlataforma && juego.idPlataforma !== Number(idPlataforma)) return false;
  if (ESRB && juego.ESRB !== ESRB) return false;
  return true;
};

const buscarFiltrado = async (filtros) => {
  await delay();
  return [...juegos]
    .filter((j) => coincideFiltros(j, filtros))
    .sort((a, b) => new Date(b.fechaEstreno) - new Date(a.fechaEstreno))
    .slice(0, 25);
};

const contarJuegos = async (filtros = {}) => {
  await delay(150);
  return juegos.filter((j) => coincideFiltros(j, filtros)).length;
};

export default {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  getUltimosEstrenos,
  getMasPopulares,
  buscarFiltrado,
  contarJuegos
};
