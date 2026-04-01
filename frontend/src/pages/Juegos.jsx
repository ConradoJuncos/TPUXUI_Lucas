import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import juegosService from "../services/juegos.service";
import plataformasService from "../services/plataformas.service";

const Juegos = ({ setFilteredGameCount }) => {
  const [juegos, setJuegos] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [filtros, setFiltros] = useState({
    texto: "",
    idPlataforma: "",
    ESRB: ""
  });

  const navigate = useNavigate();

  const cargarPopulares = async () => {
    const data = await juegosService.getMasPopulares();
    setJuegos(data);
  };

  const cargarPlataformas = async () => {
    const data = await plataformasService.obtenerTodas();
    setPlataformas(data);
  };

  const buscar = async () => {
    const data = await juegosService.buscarFiltrado(filtros);
    setJuegos(data);
    const cuenta = await juegosService.contarJuegos(filtros);
    setFilteredGameCount(cuenta);
  };

  const limpiarFiltros = async () => {
    setFiltros({ texto: "", idPlataforma: "" , ESRB: ""});
    const cuenta = await juegosService.contarJuegos();
    setFilteredGameCount(cuenta);
    cargarPopulares();
  };

  const eliminar = async (id) => {
    if (confirm("¿Seguro que desea eliminar este juego?")) {
      await juegosService.eliminar(id);
      buscar();
    }
  };

  function conseguirIconESRB(rating) {
    switch (rating) {
      case 'E':
        return 'fas fa-child text-success';
      case 'E10':
        return 'fas fa-children text-info';
      case 'T':
        return 'fas fa-user-graduate text-primary';
      case 'M':
        return 'fas fa-user-shield text-warning';
      case 'AO':
        return 'fas fa-ban text-danger';
      case 'RP':
        return 'fas fa-hourglass-half text-secondary';
      case 'UR':
        return 'fas fa-question-circle text-muted';
      default:
        return ''; // En caso de que no exista un rating ESRB en particular.
    }
  }

  useEffect(() => {
    cargarPlataformas();
    cargarPopulares();
    setFilteredGameCount();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Listado de Juegos</h2>
      <form className="row g-3 mb-4 align-items-end">
        <div className="col-md-4 col-lg-3">
          <input
            type="text"
            className="form-control rounded-lg"
            placeholder="Buscar por nombre, género o desarrollador"
            value={filtros.texto}
            onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
          />
        </div>

        <div className="col-md-4 col-lg-3">
          <select
            className="form-select rounded-lg"
            value={filtros.idPlataforma}
            onChange={(e) => setFiltros({ ...filtros, idPlataforma: e.target.value })}
          >
            <option value="">Todas las plataformas</option>
            {plataformas.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>

        
        <div className="col-md-4 col-lg-3">
          <label htmlFor="content-rating" className="visually-hidden">Seleccionar rating ESRB:</label>
          <select
            id="content-rating"
            name="content-rating"
            className="form-select rounded-lg"
            value={filtros.ESRB}
            onChange={(e) => setFiltros({ ...filtros, ESRB: e.target.value })}
          >
            <option value="">ESRB</option>
            <option value="E">E - Everyone</option>
            <option value="E10">E10+ - Everyone 10+</option>
            <option value="T">T - Teen</option>
            <option value="M">M - Mature</option>
            <option value="AO">AO - Adults Only</option>
            <option value="RP">RP - Rating Pending</option>
            <option value="UR">UR - Unrated</option>
          </select>
        </div>

        <div className="col-12 col-lg-3 d-flex justify-content-end justify-content-lg-start gap-2 mt-3 mt-lg-0"> {/* Buttons take full width on small screens, align left on large */}
          <button type="button" className="btn btn-primary rounded-lg" onClick={buscar}>Filtrar</button>
          <button type="button" className="btn btn-secondary rounded-lg" onClick={limpiarFiltros}>Limpiar</button>
        </div>
      </form>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Plataforma</th>
            <th>Género</th>
            <th>Fecha Estreno</th>
            <th>Valoración</th>
            <th>Opiniones</th>
            <th>ESRB</th>
            <th>Sitio Web</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => {
            const estrellas = "★".repeat(Math.min(5, Math.max(1, Math.floor(juego.valoracion / 20))));
            return (
              <tr key={juego.id}>
                <td>{juego.nombre}</td>
                <td>{juego.plataforma?.nombre}</td>
                <td>{juego.genero}</td>
                <td>{new Date(juego.fechaEstreno).toLocaleDateString()}</td>
                <td>{estrellas}</td>
                <td>{juego.opiniones}</td>
                <td>{juego.ESRB} <i className = {conseguirIconESRB(juego.ESRB)}></i></td>
                <td>{(juego.urlWeb != null) && (<a href={juego.urlWeb}>{juego.urlWeb}</a>)}</td> 
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/juegos/editar/${juego.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(juego.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Juegos;