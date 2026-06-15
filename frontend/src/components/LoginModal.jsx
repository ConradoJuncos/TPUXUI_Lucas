import { useState } from 'react';
import { usePreferences } from '../context/PreferencesContext';
import { useUser } from '../context/UserContext';

export default function LoginModal() {
    const { t } = usePreferences();
    const { login } = useUser();
    const [form, setForm] = useState({ nombre: '', apellido: '', contrasena: '' });
    const [errores, setErrores] = useState({});

    const actualizarCampo = (campo) => (evento) =>
        setForm({ ...form, [campo]: evento.target.value });

    const enviar = (evento) => {
        evento.preventDefault();

        const nuevosErrores = {};
        if (!form.nombre.trim()) nuevosErrores.nombre = true;
        if (!form.apellido.trim()) nuevosErrores.apellido = true;
        if (!form.contrasena.trim()) nuevosErrores.contrasena = true;

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        login(form.nombre.trim(), form.apellido.trim());
    };

    return (
        <div className="login-overlay">
            <div className="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title">
                <h1 id="login-title" className="login-modal__title">
                    <i className="bi bi-controller" aria-hidden="true"></i> {t.login.title}
                </h1>
                <p className="login-modal__lead">{t.login.lead}</p>

                <form onSubmit={enviar} noValidate>
                    <div className="login-modal__field">
                        <label htmlFor="login-nombre">{t.login.fields.nombre}</label>
                        <input
                            id="login-nombre"
                            type="text"
                            autoFocus
                            autoComplete="given-name"
                            placeholder={t.login.placeholders.nombre}
                            value={form.nombre}
                            onChange={actualizarCampo('nombre')}
                            className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
                            aria-invalid={errores.nombre ? 'true' : 'false'}
                            aria-describedby={errores.nombre ? 'login-nombre-error' : undefined}
                        />
                        {errores.nombre && (
                            <p id="login-nombre-error" className="form-error">
                                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                                {t.login.errors.nombre}
                            </p>
                        )}
                    </div>

                    <div className="login-modal__field">
                        <label htmlFor="login-apellido">{t.login.fields.apellido}</label>
                        <input
                            id="login-apellido"
                            type="text"
                            autoComplete="family-name"
                            placeholder={t.login.placeholders.apellido}
                            value={form.apellido}
                            onChange={actualizarCampo('apellido')}
                            className={`form-control ${errores.apellido ? 'is-invalid' : ''}`}
                            aria-invalid={errores.apellido ? 'true' : 'false'}
                            aria-describedby={errores.apellido ? 'login-apellido-error' : undefined}
                        />
                        {errores.apellido && (
                            <p id="login-apellido-error" className="form-error">
                                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                                {t.login.errors.apellido}
                            </p>
                        )}
                    </div>

                    <div className="login-modal__field">
                        <label htmlFor="login-contrasena">{t.login.fields.contrasena}</label>
                        <input
                            id="login-contrasena"
                            type="password"
                            autoComplete="current-password"
                            value={form.contrasena}
                            onChange={actualizarCampo('contrasena')}
                            className={`form-control ${errores.contrasena ? 'is-invalid' : ''}`}
                            aria-invalid={errores.contrasena ? 'true' : 'false'}
                            aria-describedby={errores.contrasena ? 'login-contrasena-error' : undefined}
                        />
                        {errores.contrasena && (
                            <p id="login-contrasena-error" className="form-error">
                                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                                {t.login.errors.contrasena}
                            </p>
                        )}
                    </div>

                    <div className="login-modal__actions">
                        <button type="submit" className="btn btn-primary">
                            <i className="bi bi-box-arrow-in-right" aria-hidden="true"></i> {t.login.submit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
