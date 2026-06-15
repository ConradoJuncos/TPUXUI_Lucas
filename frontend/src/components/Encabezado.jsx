import { NavLink } from 'react-router-dom';
import usuarioPlaceholder from '../assets/images/user-placeholder.png';
import { usePreferences } from '../context/PreferencesContext';
import { useUser } from '../context/UserContext';

const claseEnlace = ({ isActive }) =>
    `site-nav__link${isActive ? ' is-active' : ''}`;

export default function Encabezado() {
    const { theme, toggleTheme, lang, toggleLang, t } = usePreferences();
    const { usuario, logout } = useUser();

    const enlaces = [
        { to: '/juegos/lista', icono: 'bi-joystick', etiqueta: t.nav.games },
        { to: '/estrenos', icono: 'bi-stars', etiqueta: t.nav.releases },
        { to: '/juegos/nuevo', icono: 'bi-plus-circle', etiqueta: t.nav.newGame },
    ];

    return (
        <header className="site-header">
            <div className="site-header__top">
                <div className="site-header__brand">
                    <i className="bi bi-controller" aria-hidden="true"></i>
                    <span>GameVault</span>
                </div>

                <div className="site-header__actions">
                    <div className="header-controls">
                        <button
                            type="button"
                            className="icon-toggle"
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
                            title={theme === 'dark' ? t.theme.toLight : t.theme.toDark}
                        >
                            <i
                                className={`bi ${theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'}`}
                                aria-hidden="true"
                            ></i>
                        </button>
                        <button
                            type="button"
                            className="icon-toggle icon-toggle--lang"
                            onClick={toggleLang}
                            aria-label={t.language.toggleLabel}
                            title={t.language.toggleLabel}
                        >
                            <i className="bi bi-translate" aria-hidden="true"></i>
                            <span>{lang === 'es' ? 'ES' : 'EN'}</span>
                        </button>
                    </div>

                    <button
                        type="button"
                        className="usuario-pill"
                        onClick={logout}
                        aria-label={t.nav.switchUser}
                        title={t.nav.switchUser}
                    >
                        <img
                            src={usuarioPlaceholder}
                            alt=""
                            className="usuario-pill__avatar"
                        />
                        <span className="usuario-pill__nombre">{usuario.nombre} {usuario.apellido}</span>
                    </button>
                </div>
            </div>

            {/* Navegación principal: barra de pestañas inferior en mobile
                (alcanzable con el pulgar) y barra horizontal en escritorio. */}
            <nav className="site-nav" aria-label={t.nav.ariaLabel}>
                <ul className="site-nav__list">
                    {enlaces.map(({ to, icono, etiqueta }) => (
                        <li key={to}>
                            <NavLink to={to} className={claseEnlace}>
                                <i className={`bi ${icono}`} aria-hidden="true"></i>
                                <span>{etiqueta}</span>
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
