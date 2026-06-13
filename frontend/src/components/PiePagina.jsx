import { useState, useEffect } from "react";
import juegosService from "../services/juegos.service";
import { usePreferences } from "../context/PreferencesContext";

function PiePagina({ juegosFiltradoCount }) {
  const [juegosTotal, setJuegosTotal] = useState(null);
  const { t } = usePreferences();

  useEffect(() => {
    juegosService.contarJuegos().then(setJuegosTotal);
  }, []);

  const hayFiltro = typeof juegosFiltradoCount === "number";

  return (
    <footer className="site-footer">
      <div className="site-footer__content">
        <div className="site-footer__brand">
          <i className="bi bi-controller" aria-hidden="true"></i>
          <span>GameVault</span>
        </div>

        <p className="site-footer__stats">
          <i className="bi bi-collection" aria-hidden="true"></i>
          {juegosTotal === null
            ? t.footer.loadingCatalog
            : t.footer.gamesInCatalog(juegosTotal)}
          {hayFiltro && (
            <span className="site-footer__stats-extra">
              {" · "}
              {t.footer.matchesSearch(juegosFiltradoCount)}
            </span>
          )}
        </p>

        <p className="site-footer__copy">{t.footer.copyright}</p>
      </div>
    </footer>
  );
}

export default PiePagina;
