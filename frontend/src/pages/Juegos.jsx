import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import juegosService from "../services/juegos.service";
import plataformasService from "../services/plataformas.service";
import { usePreferences } from "../context/PreferencesContext";
import { useUser } from "../context/UserContext";

import "./Page.css";

// Información visual de cada clasificación ESRB (ícono + tono). La
// etiqueta de texto se traduce según el idioma activo, ya que el color
// nunca debe ser el único canal para transmitir información
// (lineamientos de accesibilidad).
const ESRB_META = {
  E: { icono: "fa-child", tono: "success" },
  E10: { icono: "fa-children", tono: "info" },
  T: { icono: "fa-user-graduate", tono: "primary" },
  M: { icono: "fa-user-shield", tono: "warning" },
  AO: { icono: "fa-ban", tono: "danger" },
  RP: { icono: "fa-hourglass-half", tono: "neutral" },
  UR: { icono: "fa-question-circle", tono: "neutral" },
};

const formatearFecha = (fecha, locale) =>
  new Date(fecha).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const Estrellas = ({ valoracion }) => {
  const llenas = Math.min(5, Math.max(0, Math.round((valoracion || 0) / 20)));
  return (
    <span className="game-card__stars" aria-hidden="true">
      {"★".repeat(llenas)}
      {"☆".repeat(5 - llenas)}
    </span>
  );
};

const Juegos = ({ setFilteredGameCount }) => {
  const [juegos, setJuegos] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({
    texto: "",
    idPlataforma: "",
    ESRB: ""
  });
  const [pageSize, setPageSize] = useState(10);
  const [orden, setOrden] = useState("relevancia");

  const navigate = useNavigate();
  const { t } = usePreferences();
  const { usuario } = useUser();
  const esAdmin = usuario?.nombre === "Admin";

  const cargarPopulares = async () => {
    setCargando(true);
    const data = await juegosService.getMasPopulares();
    setJuegos(data);
    setCargando(false);
  };

  const cargarPlataformas = async () => {
    const data = await plataformasService.obtenerTodas();
    setPlataformas(data);
  };

  const buscar = async (evento) => {
    evento?.preventDefault();
    setCargando(true);
    const data = await juegosService.buscarFiltrado(filtros);
    setJuegos(data);
    const cuenta = await juegosService.contarJuegos(filtros);
    setFilteredGameCount(cuenta);
    setCargando(false);
  };

  const limpiarFiltros = async () => {
    setFiltros({ texto: "", idPlataforma: "", ESRB: "" });
    setFilteredGameCount(undefined);
    cargarPopulares();
  };

  const eliminar = async (id, nombre) => {
    if (confirm(t.juegos.confirmDelete(nombre))) {
      await juegosService.eliminar(id);
      buscar();
    }
  };

  useEffect(() => {
    cargarPlataformas();
    cargarPopulares();
  }, []);

  const juegosOrdenados = [...juegos].sort((a, b) => {
    if (orden === "alfabetico") return a.nombre.localeCompare(b.nombre, t.common.dateLocale);
    if (orden === "calificacion") return b.valoracion - a.valoracion;
    return 0;
  });
  const juegosVisibles = juegosOrdenados.slice(0, pageSize);

  return (
    <div className="page-juegos">
      <header className="page-header">
        <h1>{t.juegos.title}</h1>
        <p className="page-header__lead">{t.juegos.lead}</p>
      </header>

      <section className="filters-card" aria-label={t.juegos.filtersTitle}>
        <h2 className="filters-card__title">
          <i className="bi bi-funnel" aria-hidden="true"></i> {t.juegos.filtersTitle}
        </h2>
        <form className="filters-form" onSubmit={buscar}>
          <div className="filters-form__field filters-form__field--grow">
            <label htmlFor="filtro-texto">{t.juegos.searchLabel}</label>
            <input
              id="filtro-texto"
              type="text"
              className="form-control"
              placeholder={t.juegos.searchPlaceholder}
              value={filtros.texto}
              onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
            />
          </div>

          <div className="filters-form__field">
            <label htmlFor="filtro-plataforma">{t.juegos.platformLabel}</label>
            <select
              id="filtro-plataforma"
              className="form-select"
              value={filtros.idPlataforma}
              onChange={(e) => setFiltros({ ...filtros, idPlataforma: e.target.value })}
            >
              <option value="">{t.juegos.allPlatforms}</option>
              {plataformas.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>

          <div className="filters-form__field">
            <label htmlFor="filtro-esrb">{t.juegos.esrbLabel}</label>
            <select
              id="filtro-esrb"
              className="form-select"
              value={filtros.ESRB}
              onChange={(e) => setFiltros({ ...filtros, ESRB: e.target.value })}
            >
              <option value="">{t.juegos.allRatings}</option>
              {Object.entries(t.esrb).map(([codigo, info]) => (
                <option key={codigo} value={codigo}>{info.code} - {info.label}</option>
              ))}
            </select>
          </div>

          <div className="filters-form__field">
            <label htmlFor="orden-juegos">{t.juegos.sortLabel}</label>
            <select
              id="orden-juegos"
              className="form-select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              {Object.entries(t.juegos.sortOptions).map(([clave, etiqueta]) => (
                <option key={clave} value={clave}>{etiqueta}</option>
              ))}
            </select>
          </div>

          <div className="filters-form__field">
            <label htmlFor="tamano-pagina">{t.juegos.pageSizeLabel}</label>
            <select
              id="tamano-pagina"
              className="form-select"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              {[10, 25, 100].map((n) => (
                <option key={n} value={n}>{t.juegos.pageSizeOption(n)}</option>
              ))}
            </select>
          </div>

          <div className="filters-form__actions">
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-search" aria-hidden="true"></i> {t.juegos.filter}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={limpiarFiltros}>
              <i className="bi bi-x-circle" aria-hidden="true"></i> {t.juegos.clear}
            </button>
          </div>
        </form>
      </section>

      {cargando && (
        <div className="state-message" role="status">
          <div className="spinner-border text-primary" aria-hidden="true"></div>
          <p>{t.juegos.loading}</p>
        </div>
      )}

      {!cargando && (
        <p className="results-count" aria-live="polite">
          {t.juegos.resultsCount(juegosVisibles.length)}
        </p>
      )}

      {!cargando && juegos.length === 0 && (
        <div className="state-message">
          <i className="bi bi-emoji-frown state-message__icon" aria-hidden="true"></i>
          <p>{t.juegos.empty}</p>
          <button className="btn btn-outline-primary" onClick={limpiarFiltros}>
            {t.juegos.clearFilters}
          </button>
        </div>
      )}

      {!cargando && juegos.length > 0 && (
        <div className="games-grid">
            {juegosVisibles.map((juego) => {
              const meta = ESRB_META[juego.ESRB] || ESRB_META.UR;
              const etiquetaEsrb = (t.esrb[juego.ESRB] || t.esrb.UR).label;
              return (
                <article className="game-card" key={juego.id}>
                  <header className="game-card__header">
                    <h3 className="game-card__title">{juego.nombre}</h3>
                    <span className="platform-badge">
                      <i className="bi bi-display" aria-hidden="true"></i>
                      {juego.plataforma?.nombre}
                    </span>
                  </header>

                  <p className="game-card__meta">
                    <span><i className="bi bi-tag" aria-hidden="true"></i> {juego.genero}</span>
                    <span><i className="bi bi-building" aria-hidden="true"></i> {juego.dearrollador}</span>
                    <span><i className="bi bi-calendar-event" aria-hidden="true"></i> {formatearFecha(juego.fechaEstreno, t.common.dateLocale)}</span>
                  </p>

                  <div className="game-card__rating" aria-label={t.common.ratingLabel(juego.valoracion, juego.opiniones)}>
                    <Estrellas valoracion={juego.valoracion} />
                    <span className="game-card__score">{juego.valoracion}/100</span>
                    <span className="game-card__reviews">({juego.opiniones} {t.common.reviewsWord})</span>
                  </div>

                  <div className="game-card__footer-row">
                    <span className={`esrb-badge esrb-badge--${meta.tono}`}>
                      <i className={`fas ${meta.icono}`} aria-hidden="true"></i>
                      {juego.ESRB} · {etiquetaEsrb}
                    </span>
                  </div>

                  {juego.urlWeb && (
                    <a
                      href={juego.urlWeb}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="game-card__link"
                    >
                      <i className="bi bi-box-arrow-up-right" aria-hidden="true"></i>
                      {t.common.visitWebsite}
                      <span className="visually-hidden">{t.common.opensInNewTab}</span>
                    </a>
                  )}

                  {esAdmin && (
                    <div className="game-card__actions">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => navigate(`/juegos/editar/${juego.id}`)}
                      >
                        <i className="bi bi-pencil-square" aria-hidden="true"></i> {t.common.edit}
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => eliminar(juego.id, juego.nombre)}
                      >
                        <i className="bi bi-trash3" aria-hidden="true"></i> {t.common.delete}
                      </button>
                    </div>
                  )}
                </article>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Juegos;
