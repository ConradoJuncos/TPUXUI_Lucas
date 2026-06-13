import { plataformas } from "./mockPlataformas";

// Datos de relleno (no provienen de una API real).
// Son una selección de registros reales de api/data/dbJuegos.sqlite,
// usados únicamente para que la demo visual tenga contenido con el
// que armar la jerarquía visual, las tarjetas, badges, etc.
const datosBase = [
  { id: 28026, nombre: "Super Mario Odyssey", fechaEstreno: "2017-10-26", genero: "Arcade", dearrollador: "Nintendo", valoracion: 97, opiniones: 468, ESRB: "E10", urlWeb: "https://www.nintendo.com/games/detail/super-mario-odyssey-switch", idPlataforma: 9 },
  { id: 28, nombre: "Red Dead Redemption 2", fechaEstreno: "2018-10-26", genero: "Adventure", dearrollador: "Rockstar Games", valoracion: 96, opiniones: 645, ESRB: "M", urlWeb: "https://www.rockstargames.com/reddeadredemption2/", idPlataforma: 10 },
  { id: 4286, nombre: "BioShock", fechaEstreno: "2007-08-21", genero: "Action", dearrollador: "Digital Extremes", valoracion: 96, opiniones: 654, ESRB: "M", urlWeb: "https://2k.com/en-US/game/bioshock/", idPlataforma: 23 },
  { id: 13537, nombre: "Half-Life 2", fechaEstreno: "2004-11-16", genero: "Action", dearrollador: "Valve Software", valoracion: 96, opiniones: 581, ESRB: "M", urlWeb: "http://www.half-life2.com", idPlataforma: 1 },
  { id: 18080, nombre: "Half-Life", fechaEstreno: "1998-11-19", genero: "Action", dearrollador: "Valve Software", valoracion: 96, opiniones: 514, ESRB: "M", urlWeb: "http://www.half-life.com/", idPlataforma: 10 },
  { id: 22513, nombre: "Uncharted 2: Among Thieves", fechaEstreno: "2009-10-13", genero: "Adventure", dearrollador: "Naughty Dog", valoracion: 96, opiniones: 655, ESRB: "T", urlWeb: "http://www.unchartedps3.com", idPlataforma: 16 },
  { id: 3990, nombre: "The Last Of Us", fechaEstreno: "2013-06-14", genero: "Adventure", dearrollador: "Naughty Dog", valoracion: 95, opiniones: 638, ESRB: "M", urlWeb: "http://www.thelastofus.playstation.com/", idPlataforma: 15 },
  { id: 4200, nombre: "Portal 2", fechaEstreno: "2011-04-18", genero: "Shooter", dearrollador: "Valve Software", valoracion: 95, opiniones: 589, ESRB: "E10", urlWeb: "http://www.thinkwithportals.com/", idPlataforma: 23 },
  { id: 4459, nombre: "Grand Theft Auto IV", fechaEstreno: "2008-04-29", genero: "Adventure", dearrollador: "Rockstar North", valoracion: 95, opiniones: 509, ESRB: "M", urlWeb: "http://www.rockstargames.com/iv", idPlataforma: 10 },
  { id: 4544, nombre: "Red Dead Redemption", fechaEstreno: "2010-05-18", genero: "Action", dearrollador: "Rockstar North", valoracion: 95, opiniones: 525, ESRB: "M", urlWeb: "http://www.rockstargames.com/reddeadredemption/", idPlataforma: 23 },
  { id: 30799, nombre: "Baldur's Gate II: Shadows of Amn", fechaEstreno: "2000-09-21", genero: "RPG", dearrollador: "BioWare", valoracion: 95, opiniones: 545, ESRB: "UR", urlWeb: "http://forum.baldursgate.com/", idPlataforma: 1 },
  { id: 3469, nombre: "Metal Gear Solid 4: Guns of the Patriots", fechaEstreno: "2008-06-12", genero: "Action", dearrollador: "Konami Digital Entertainment", valoracion: 94, opiniones: 597, ESRB: "M", urlWeb: "http://www.konami.jp/mgs4/global/index.html", idPlataforma: 15 },
  { id: 4062, nombre: "BioShock Infinite", fechaEstreno: "2013-03-26", genero: "Action", dearrollador: "Aspyr Media", valoracion: 94, opiniones: 599, ESRB: "M", urlWeb: "http://www.bioshockinfinite.com/", idPlataforma: 10 },
  { id: 4806, nombre: "Mass Effect 2", fechaEstreno: "2010-01-26", genero: "Action", dearrollador: "BioWare", valoracion: 94, opiniones: 624, ESRB: "M", urlWeb: "http://masseffect.bioware.com/", idPlataforma: 23 },
  { id: 53562, nombre: "SSX 3", fechaEstreno: "2003-10-21", genero: "Sports", dearrollador: "Electronic Arts Canada", valoracion: 93, opiniones: 828, ESRB: "E", urlWeb: null, idPlataforma: 21 },
  { id: 3272, nombre: "Rocket League", fechaEstreno: "2015-07-07", genero: "Action", dearrollador: "Psyonix", valoracion: 86, opiniones: 603, ESRB: "E", urlWeb: "http://www.rocketleaguegame.com", idPlataforma: 26 },

  // Últimos estrenos (fechas más recientes del dataset original)
  { id: 41494, nombre: "Cyberpunk 2077", fechaEstreno: "2020-12-10", genero: "Action", dearrollador: "CD PROJEKT RED", valoracion: 65, opiniones: 629, ESRB: "AO", urlWeb: "https://www.cyberpunk.net/", idPlataforma: 30 },
  { id: 481910, nombre: "Call of Duty: Black Ops Cold War", fechaEstreno: "2020-11-13", genero: "Shooter", dearrollador: "Raven Software", valoracion: 76, opiniones: 605, ESRB: "M", urlWeb: "https://www.callofduty.com/ru/blackopscoldwar", idPlataforma: 16 },
  { id: 452648, nombre: "Demon's Souls", fechaEstreno: "2020-11-12", genero: "Action", dearrollador: "Bluepoint Games", valoracion: 92, opiniones: 571, ESRB: "M", urlWeb: null, idPlataforma: 17 },
  { id: 452634, nombre: "Marvel's Spider-Man: Miles Morales", fechaEstreno: "2020-11-12", genero: "Action", dearrollador: "Insomniac Games", valoracion: 85, opiniones: 619, ESRB: "T", urlWeb: null, idPlataforma: 16 },
  { id: 398402, nombre: "Godfall", fechaEstreno: "2020-11-12", genero: "Action", dearrollador: "Counterplay Games", valoracion: 61, opiniones: 712, ESRB: "UR", urlWeb: "https://www.godfall.com/", idPlataforma: 17 },
  { id: 437059, nombre: "Assassin's Creed Valhalla", fechaEstreno: "2020-11-10", genero: "Adventure", dearrollador: "Ubisoft Montreal", valoracion: 83, opiniones: 458, ESRB: "M", urlWeb: "https://www.ubisoft.com/en-us/game/assassins-creed/valhalla", idPlataforma: 23 },
  { id: 389851, nombre: "The Falconeer", fechaEstreno: "2020-11-10", genero: "Simulation", dearrollador: "Tomas Sala", valoracion: 65, opiniones: 511, ESRB: "T", urlWeb: "http://www.thefalconeer.com", idPlataforma: 10 },
  { id: 324992, nombre: "Watch Dogs: Legion", fechaEstreno: "2020-10-29", genero: "Adventure", dearrollador: "Ubisoft", valoracion: 72, opiniones: 558, ESRB: "M", urlWeb: "https://watchdogs.ubisoft.com/game/", idPlataforma: 30 },
  { id: 326238, nombre: "Microsoft Flight Simulator 2020", fechaEstreno: "2020-08-18", genero: "Simulation", dearrollador: "Asobo Studio", valoracion: 91, opiniones: 717, ESRB: "E", urlWeb: "https://www.xbox.com/flightsimulator", idPlataforma: 23 },
  { id: 61218, nombre: "9 Monkeys of Shaolin", fechaEstreno: "2020-10-16", genero: "Adventure", dearrollador: "Sobaka Studio", valoracion: 71, opiniones: 500, ESRB: "T", urlWeb: "http://9monkeysofshaolin.com", idPlataforma: 10 }
];

const buscarPlataforma = (idPlataforma) =>
  plataformas.find((p) => p.id === idPlataforma) || null;

// "Hidratamos" cada juego con el objeto plataforma completo, tal como
// lo hacía el backend con el include de Sequelize.
export const juegos = datosBase.map((juego) => ({
  ...juego,
  plataforma: buscarPlataforma(juego.idPlataforma)
}));

export default juegos;
