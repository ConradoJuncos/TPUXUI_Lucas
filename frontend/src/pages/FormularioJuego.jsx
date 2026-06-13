import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import plataformasService from "../services/plataformas.service";
import juegosService from "../services/juegos.service";
import { usePreferences } from "../context/PreferencesContext";

import './Page.css';

const FormularioJuego = () => {
  const [plataformas, setPlataformas] = useState([]);
  const [enviando, setEnviando] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { t } = usePreferences();

  useEffect(() => {
    plataformasService.obtenerTodas().then(setPlataformas);
    if (id) {
      juegosService.obtenerPorId(id).then((juego) => {
        juego.fechaEstreno = new Date(juego.fechaEstreno).toISOString().slice(0, 10);
        reset(juego);
      });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    setEnviando(true);
    data.idPlataforma = Number(data.idPlataforma);
    data.fechaEstreno = new Date(data.fechaEstreno);
    if (id) {
      await juegosService.actualizar(id, data);
    } else {
      await juegosService.crear(data);
    }
    navigate("/juegos/lista");
  };

  return (
    <div className="page-formulario">
      <header className="page-header">
        <h1>{id ? t.formulario.titleEdit : t.formulario.titleNew}</h1>
        <p className="page-header__lead">
          {id ? t.formulario.leadEdit : t.formulario.leadNew}
        </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="game-form" noValidate>
        <fieldset className="game-form__section">
          <legend>{t.formulario.sections.general}</legend>

          <div className="game-form__field game-form__field--grow">
            <label htmlFor="nombre">
              {t.formulario.fields.nombre} <span className="required-mark" aria-hidden="true">*</span>
              <span className="visually-hidden">{t.formulario.requiredSuffix}</span>
            </label>
            <input
              id="nombre"
              {...register("nombre", { required: true })}
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              aria-invalid={errors.nombre ? "true" : "false"}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
            {errors.nombre && (
              <p id="nombre-error" className="form-error">
                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                {t.formulario.errors.nombre}
              </p>
            )}
          </div>

          <div className="game-form__field">
            <label htmlFor="genero">
              {t.formulario.fields.genero} <span className="required-mark" aria-hidden="true">*</span>
              <span className="visually-hidden">{t.formulario.requiredSuffix}</span>
            </label>
            <input
              id="genero"
              {...register("genero", { required: true })}
              className={`form-control ${errors.genero ? "is-invalid" : ""}`}
              aria-invalid={errors.genero ? "true" : "false"}
              aria-describedby={errors.genero ? "genero-error" : undefined}
            />
            {errors.genero && (
              <p id="genero-error" className="form-error">
                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                {t.formulario.errors.genero}
              </p>
            )}
          </div>

          <div className="game-form__field">
            <label htmlFor="dearrollador">
              {t.formulario.fields.desarrollador} <span className="required-mark" aria-hidden="true">*</span>
              <span className="visually-hidden">{t.formulario.requiredSuffix}</span>
            </label>
            <input
              id="dearrollador"
              {...register("dearrollador", { required: true })}
              className={`form-control ${errors.dearrollador ? "is-invalid" : ""}`}
              aria-invalid={errors.dearrollador ? "true" : "false"}
              aria-describedby={errors.dearrollador ? "dearrollador-error" : undefined}
            />
            {errors.dearrollador && (
              <p id="dearrollador-error" className="form-error">
                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                {t.formulario.errors.desarrollador}
              </p>
            )}
          </div>

          <div className="game-form__field">
            <label htmlFor="fechaEstreno">
              {t.formulario.fields.fechaEstreno} <span className="required-mark" aria-hidden="true">*</span>
              <span className="visually-hidden">{t.formulario.requiredSuffix}</span>
            </label>
            <input
              id="fechaEstreno"
              type="date"
              {...register("fechaEstreno", { required: true })}
              className={`form-control ${errors.fechaEstreno ? "is-invalid" : ""}`}
              aria-invalid={errors.fechaEstreno ? "true" : "false"}
              aria-describedby={errors.fechaEstreno ? "fecha-error" : undefined}
            />
            {errors.fechaEstreno && (
              <p id="fecha-error" className="form-error">
                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                {t.formulario.errors.fechaEstreno}
              </p>
            )}
          </div>

          <div className="game-form__field">
            <label htmlFor="idPlataforma">
              {t.formulario.fields.plataforma} <span className="required-mark" aria-hidden="true">*</span>
              <span className="visually-hidden">{t.formulario.requiredSuffix}</span>
            </label>
            <select
              id="idPlataforma"
              {...register("idPlataforma", { required: true })}
              className={`form-select ${errors.idPlataforma ? "is-invalid" : ""}`}
              aria-invalid={errors.idPlataforma ? "true" : "false"}
              aria-describedby={errors.idPlataforma ? "plataforma-error" : undefined}
            >
              <option value="">{t.formulario.selectPlatform}</option>
              {plataformas.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
            {errors.idPlataforma && (
              <p id="plataforma-error" className="form-error">
                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                {t.formulario.errors.plataforma}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="game-form__section">
          <legend>{t.formulario.sections.rating}</legend>

          <div className="game-form__field">
            <label htmlFor="valoracion">{t.formulario.fields.valoracion}</label>
            <input
              id="valoracion"
              type="number"
              min="0"
              max="100"
              {...register("valoracion", { min: 0, max: 100 })}
              className="form-control"
            />
          </div>

          <div className="game-form__field">
            <label htmlFor="opiniones">{t.formulario.fields.opiniones}</label>
            <input
              id="opiniones"
              type="number"
              min="0"
              {...register("opiniones", { min: 0 })}
              className="form-control"
            />
          </div>

          <div className="game-form__field">
            <label htmlFor="ESRB">
              {t.formulario.fields.esrb} <span className="required-mark" aria-hidden="true">*</span>
              <span className="visually-hidden">{t.formulario.requiredSuffix}</span>
            </label>
            <select
              id="ESRB"
              {...register("ESRB", { required: true })}
              className={`form-select ${errors.ESRB ? "is-invalid" : ""}`}
              aria-invalid={errors.ESRB ? "true" : "false"}
              aria-describedby={errors.ESRB ? "esrb-error" : undefined}
            >
              <option value="">{t.formulario.selectRating}</option>
              {Object.entries(t.esrb).map(([codigo, info]) => (
                <option key={codigo} value={codigo}>{info.code} - {info.label}</option>
              ))}
            </select>
            {errors.ESRB && (
              <p id="esrb-error" className="form-error">
                <i className="bi bi-exclamation-circle" aria-hidden="true"></i>
                {t.formulario.errors.esrb}
              </p>
            )}
          </div>
        </fieldset>

        <fieldset className="game-form__section">
          <legend>{t.formulario.sections.links}</legend>
          <div className="game-form__field game-form__field--grow">
            <label htmlFor="urlWeb">{t.formulario.fields.urlWeb}</label>
            <input
              id="urlWeb"
              type="url"
              placeholder={t.formulario.placeholders.urlWeb}
              {...register("urlWeb")}
              className="form-control"
            />
          </div>
        </fieldset>

        <div className="game-form__actions">
          <button type="submit" className="btn btn-primary" disabled={enviando}>
            {enviando ? (
              <>
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                {t.common.saving}
              </>
            ) : (
              <>
                <i className="bi bi-check-circle" aria-hidden="true"></i>
                {t.common.save}
              </>
            )}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate("/juegos/lista")}
          >
            <i className="bi bi-x-circle" aria-hidden="true"></i>
            {t.common.cancel}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioJuego;
