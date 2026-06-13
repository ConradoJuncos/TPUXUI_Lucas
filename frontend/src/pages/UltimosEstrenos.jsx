import React, { useEffect, useState } from "react";
import juegosService from "../services/juegos.service";
import { usePreferences } from "../context/PreferencesContext";

import "./Page.css";

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

// Cuántas tarjetas, de las más recientes, se destacan con la etiqueta
// "Nuevo". Es solo un recurso visual para esta demo con datos de relleno.
const CANTIDAD_DESTACADOS = 3;

const UltimosEstrenos = () => {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { t } = usePreferences();

  useEffect(() => {
    juegosService.getUltimosEstrenos().then((data) => {
      setJuegos(data);
      setCargando(false);
    });
  }, []);

  return (
    <div className="page-estrenos">
      <header className="page-header">
        <h1>{t.estrenos.title}</h1>
        <p className="page-header__lead">{t.estrenos.lead}</p>
      </header>

      {cargando && (
        <div className="state-message" role="status">
          <div className="spinner-border text-primary" aria-hidden="true"></div>
          <p>{t.estrenos.loading}</p>
        </div>
      )}

      {!cargando && juegos.length === 0 && (
        <div className="state-message">
          <i className="bi bi-emoji-frown state-message__icon" aria-hidden="true"></i>
          <p>{t.estrenos.empty}</p>
        </div>
      )}

      {!cargando && juegos.length > 0 && (
        <div className="games-grid">
          {juegos.map((juego, indice) => {
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

                {indice < CANTIDAD_DESTACADOS && (
                  <span className="badge-nuevo">
                    <i className="bi bi-stars" aria-hidden="true"></i> {t.estrenos.newBadge}
                  </span>
                )}

                <p className="game-card__meta">
                  <span><i className="bi bi-tag" aria-hidden="true"></i> {juego.genero}</span>
                  <span><i className="bi bi-building" aria-hidden="true"></i> {juego.dearrollador}</span>
                  <span><i className="bi bi-calendar-event" aria-hidden="true"></i> {formatearFecha(juego.fechaEstreno, t.common.dateLocale)}</span>
                </p>

                <div className="game-card__rating" aria-label={t.common.ratingLabel(juego.valoracion, juego.opiniones)}>
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
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UltimosEstrenos;
