# Mejoras de UX/UI aplicadas al frontend

Este documento detalla, archivo por archivo, los cambios visuales realizados sobre el
frontend del TP original con el objetivo de aplicar los lineamientos de
[`lineamientos.md`](./lineamientos.md). La demo es **100% visual**: no se modificó el
backend ni la lógica de negocio real; donde hacía falta mostrar datos se usaron datos
de relleno (mock data) basados en registros reales de la base de ejemplo.

> Convención: cada sección indica **Qué se cambió**, **Por qué (lineamiento)** y, cuando
> corresponde, **Antes / Después**.

---

## 0. Datos de relleno (la lista de juegos estaba vacía)

**Archivos:** `frontend/src/data/mockJuegos.js`, `frontend/src/data/mockPlataformas.js`,
`frontend/src/services/juegos.service.js`, `frontend/src/services/plataformas.service.js`

**Qué se cambió:**
- Se creó `src/data/mockPlataformas.js` con las 30 plataformas reales de
  `api/data/dbJuegos.sqlite` (tabla `PLATAFORMAS`).
- Se creó `src/data/mockJuegos.js` con 24 juegos reales extraídos de la tabla
  `INFO_JUEGOS` (nombre, género, desarrollador, fecha, valoración, opiniones, ESRB,
  URL y plataforma), elegidos para cubrir variedad de plataformas, géneros y
  clasificaciones ESRB (E, E10+, T, M, AO, UR).
- Se reescribieron `juegos.service.js` y `plataformas.service.js`: en vez de llamar a
  `axios` contra `http://localhost:3000/api` (backend que no corre en esta demo),
  devuelven los datos de relleno desde memoria, replicando exactamente la misma forma
  (`getMasPopulares`, `getUltimosEstrenos`, `buscarFiltrado`, `contarJuegos`, `crear`,
  `actualizar`, `eliminar`, etc.), por lo que **ningún componente cambió su forma de
  consumir los servicios**.
- `crear` / `actualizar` / `eliminar` ahora mutan el array en memoria, así que el
  formulario y los botones de "Eliminar" funcionan de forma realista durante la demo
  (sin persistencia real, como se pidió).
- Se agregó un pequeño delay artificial (`delay()`) en cada función del servicio para
  poder mostrar estados de "Cargando…" (ver punto de **Feedback**).

**Por qué (lineamiento):**
- *Principios fundamentales – Utilidad y Feedback*: una lista vacía no permite evaluar
  ninguna pantalla; con datos reales se puede revisar jerarquía visual, densidad de
  información, truncado de textos largos, etc.
- *Evaluación y pruebas*: para hacer una demo o prueba de usabilidad se necesita
  contenido representativo (texto largo y corto, distintos ratings, con/sin sitio web).

---

## 1. Sistema de diseño global

**Archivos:** `frontend/src/index.css`, `frontend/src/App.css`, `frontend/src/App.jsx`

### 1.1 Paleta de colores y tipografía (`index.css`)

**Qué se cambió:**
- Se eliminó el tema oscuro que traía la plantilla por defecto de Vite
  (`color-scheme: light dark`, fondo `#242424`, texto blanco) que **no se usaba en el
  resto de la app** (los componentes Bootstrap eran claros), generando una base
  inconsistente.
- Se definió un sistema de **variables CSS (`:root`)** con:
  - **Tipografía**: una sola familia (`'Segoe UI', system-ui, ...`), tamaño base
    `1rem` (16px) y `line-height: 1.5`.
  - **Paleta de marca** (1 color primario + 1 acento, como recomienda el resumen):
    - Primario: índigo `#4338ca` (contraste ~8.6:1 sobre blanco).
    - Acento: naranja `#ea580c`, usado para CTAs y elementos destacados ("Nuevo").
  - **Colores semánticos** (éxito, info, advertencia, peligro, neutro) cada uno con
    su versión "bg" clara, usados siempre junto con ícono + texto.
  - **Escala de espaciado** de 4px a 48px (`--space-1` … `--space-7`).
  - **Radios y sombras** consistentes (`--radius-sm/md/lg/pill`, `--shadow-sm/md/lg`).
  - **`--touch-target: 48px`**, usado como `min-height` global de botones, inputs y
    selects.
- Se agregaron estilos globales de **foco visible** (`:focus-visible`) con contorno
  naranja de 3px en links, botones, inputs, selects y enlaces de navegación.

**Por qué (lineamiento):**
- *Consistencia*: "mantener patrones uniformes... mismo estilo de botones, colores".
  Antes había una paleta "fantasma" (tema oscuro) que no se aplicaba a casi nada.
- *Color y Tipografía (resumen)*: "tipografía legible, mínimo 16px, interlineado 1.5x",
  "definir 1 o 2 colores de marca", "contraste mínimo 4.5:1".
- *Accesibilidad (WCAG 2.1)*: "navegación completa por teclado" requiere un indicador de
  foco visible consistente, que antes no existía de forma global.
- *Requerimientos técnicos mobile*: "botones con tamaño mínimo 44-48px" → se centralizó
  en `--touch-target` y se aplica a **todos** los controles (`.btn`, `input`,
  `select`), no solo a algunos.

### 1.2 Layout general (`App.css` + `App.jsx`)

**Antes:** `#root { max-width: 1280px; margin: 0 auto; padding: 2rem; text-align: center; }`
envolvía **todo**, incluyendo el header y el footer, y centraba todo el texto de la app
(restos de la plantilla default de Vite, ni siquiera estaba importado el archivo).

**Después:**
- `App.css` ahora se importa realmente desde `App.jsx`.
- `#root` es un contenedor flex en columna de alto completo (`min-height: 100vh`), para
  que el footer quede siempre al final aunque la página tenga poco contenido.
- Se agregó `.app-main`, que limita el contenido principal a 1280px y centra solo el
  **contenido**, dejando que el header y el footer ocupen **todo el ancho** de la
  pantalla (fondo de marca de punta a punta).
- En `App.jsx` se eliminó el `<div className="container-md mt-5">` que envolvía todo y
  se reemplazó por: `<Encabezado />`, `<main className="app-main"><Routes>...</Routes></main>`,
  `<PiePagina />`. Esto además corrige un problema de accesibilidad: antes
  `UltimosEstrenos` y `FormularioJuego` renderizaban su propio `<main>`, generando dos
  landmarks `<main>` anidados en la misma página (ahora hay un único `<main>` provisto
  por `App`).

**Por qué (lineamiento):**
- *Diseño de Layout y Composición*: "usar rejillas para mantener consistencia... 12
  columnas para web" y *Diseño Responsive*: una columna de contenido centrada con
  ancho máximo mejora la legibilidad (líneas de texto no demasiado largas) en pantallas
  grandes.
- *Accesibilidad*: un solo landmark `<main>` por página es requisito de "Robusto" en
  WCAG (estructura semántica correcta para lectores de pantalla).

---

## 2. Encabezado y navegación

**Archivos:** `frontend/src/components/Encabezado.jsx`,
`frontend/src/assets/css/juegos.css`

**Qué se cambió:**
- Se le dio identidad de marca al sitio: **"GameVault"** + ícono `bi-controller`, en
  vez de un header sin nombre.
- Se corrigió un bug: el componente original usaba `activeclassname="active"` en los
  `NavLink`, que **no es una prop válida** en React Router v6/v7 (la forma correcta es
  `className={({isActive}) => ...}`), por lo que el estado "activo" del menú nunca se
  aplicaba. Ahora se usa `className={({ isActive }) => `site-nav__link${isActive ? ' is-active' : ''}`}`.
- **Navegación mobile-first**:
  - En **mobile**, el menú (`Juegos`, `Estrenos`, `Nuevo juego`) se convierte en una
    **barra de navegación inferior fija** (*bottom navigation*), con ícono + etiqueta,
    `min-height: 48px` por ítem y separación entre ítems (cada `<li>` ocupa `flex: 1`).
    Esta barra queda en la "zona del pulgar", de fácil alcance con una sola mano.
  - En **escritorio** (`min-width: 992px`), la navegación pasa a ser una barra
    horizontal centrada dentro del header, con píldoras más grandes (`min-width: 160px`,
    `padding: 0.5rem 1.5rem`).
  - El estado activo se indica con **color + fondo + borde superior** (no solo color),
    para cumplir con "no depender del color como único indicador".
- El banner (`banner.jpg`, un neón temático de control de PlayStation) se mantiene como
  fondo del header, pero ahora con un **degradado oscuro superpuesto**
  (`linear-gradient(rgba(30,27,51,.82), rgba(30,27,51,.95))`) para garantizar contraste
  suficiente del texto blanco sobre la imagen (antes el texto se apoyaba directamente
  sobre la imagen, sin garantía de contraste).
- La "píldora" de usuario (`Nombre Apellido`) se mantiene como elemento decorativo del
  encabezado (la demo no tiene login real), pero ahora incluye el avatar
  `user-placeholder.png` y mantiene contraste alto (texto índigo sobre fondo blanco).
- Se agregó `padding-bottom` al `body` en mobile para que el contenido y el footer no
  queden tapados por la barra de navegación inferior fija.

**Por qué (lineamiento):**
- *Diferencias Desktop vs Mobile (resumen)*: "Bottom navigation (menú inferior) o tabs"
  para mobile vs. menús/barras de herramientas en desktop; "Zona del Pulgar: las
  acciones principales deben ubicarse en zonas alcanzables con el pulgar".
- *Requerimientos técnicos mobile*: tamaño táctil mínimo 44-48px y separación entre
  elementos interactivos para evitar toques accidentales.
- *Accesibilidad*: "evitar depender del color como único indicador" (estado activo con
  fondo + borde, no solo cambio de color) y "navegación completa por teclado"
  (`:focus-visible` en los links).
- *Consistencia*: la marca (nombre + ícono + colores) aparece igual en header y footer.

---

## 3. Pie de página

**Archivo:** `frontend/src/components/PiePagina.jsx`, `frontend/src/assets/css/juegos.css`

**Antes:** el footer mostraba el texto **"© 2025 Odio esta materia."** junto a una
imagen externa de un personaje de anime (`alfabetajuega.com`), sin relación con el
producto, además de una lógica rota: `juegosFiltrado.cantidad !== null` siempre era
`true` (esa propiedad nunca existía), por lo que el texto de "juegos filtrados" se
mostraba siempre, incluso con valor `undefined`.

**Qué se cambió:**
- Se quitó el texto/imagen poco profesional y se reemplazó por un footer acorde a la
  identidad de marca: nombre del sitio + ícono, cantidad de juegos en el catálogo (con
  estado de carga "Cargando catálogo…"), cantidad de resultados filtrados (solo cuando
  corresponde) y una leyenda de cierre que aclara que es un **proyecto académico con
  datos de demostración** (transparencia).
- Se corrigió la firma del componente: antes recibía todas las props como un objeto
  (`function PiePagina(juegosFiltrado)`) y leía `juegosFiltrado.juegosFiltradoCount`;
  ahora se desestructura `{ juegosFiltradoCount }` y se valida con
  `typeof juegosFiltradoCount === "number"` antes de mostrarlo.
- El footer usa el mismo color oscuro de marca que el header (`--color-dark`), creando
  un "marco" visual consistente de la página.

**Por qué (lineamiento):**
- *Ética y Responsabilidad*: "transparencia", evitar contenido irrelevante o que reste
  seriedad a la interfaz; "diseño sin sesgos".
- *Feedback*: mostrar "Cargando catálogo…" mientras se obtiene el dato, en vez de un
  `0` momentáneo que confunde al usuario.
- *Consistencia*: mismos colores/marca que el header.

---

## 4. Página "Juegos" (listado + filtros)

**Archivos:** `frontend/src/pages/Juegos.jsx`, `frontend/src/pages/Page.css`

### 4.1 De tabla a tarjetas (`games-grid` / `game-card`)

**Antes:** un `<table>` de 9 columnas (`table table-striped table-bordered`). Las
tablas anchas son una de las peores opciones para mobile: obligan a hacer scroll
horizontal, el texto queda muy chico y se pierde la jerarquía visual.

**Después:** cada juego se muestra como una **tarjeta** (`.game-card`) dentro de una
grilla responsive (`.games-grid`):
- 1 columna en mobile, 2 columnas desde 640px, 3 columnas desde 1100px
  (`grid-template-columns` + `auto-fit` mental model, mobile-first).
- Jerarquía visual dentro de la tarjeta (de más a menos importante):
  1. **Nombre del juego** (título, `h3`) + **badge de plataforma**.
  2. Metadatos secundarios: género, desarrollador y fecha (con íconos).
  3. **Valoración**: estrellas (`★★★★☆`) + puntaje numérico (`97/100`) + cantidad de
     opiniones.
  4. **Badge ESRB** con ícono + código + descripción en texto plano (ej. *"M ·
     Contenido maduro"*), nunca solo un color.
  5. Enlace "Visitar sitio oficial" (cuando existe `urlWeb`), con ícono de
     "abre en otra pestaña" y texto accesible oculto que lo aclara.
  6. Acciones **Editar** / **Eliminar** al pie, como dos botones grandes de igual ancho.
- Microinteracción: en dispositivos con mouse (`@media (hover: hover)`), la tarjeta se
  eleva levemente (`translateY(-4px)` + sombra) al pasar el cursor, dando feedback de
  que es interactiva.
- Se usa `<article>` por tarjeta (cada juego es una pieza de contenido independiente).

**Por qué (lineamiento):**
- *Diseño Responsive / Requerimientos mobile*: "el diseño móvil no es una versión
  achicada del escritorio"; las tarjetas se adaptan naturalmente al ancho disponible,
  mientras que una tabla de 9 columnas no.
- *Jerarquía visual*: "usar contraste de tamaño, color y posición para destacar los
  elementos de acción"; el nombre y la valoración son lo primero que se lee, las
  acciones quedan al final (patrón de lectura en "Z"/"F").
- *Microinteracciones*: "hover, scroll, click" aportan claridad y dinamismo.
- *Accesibilidad*: la clasificación ESRB ahora se comunica con ícono + texto, no solo
  con un color de fondo.

### 4.2 Barra de filtros (`filters-card` / `filters-form`)

**Antes:** un `<form>` sin `<label>` visibles (solo `placeholder`), con un único
`<label>` oculto (`visually-hidden`) para el select de ESRB, y los botones "Filtrar" /
"Limpiar" alineados de forma distinta según el tamaño de pantalla mediante clases de
Bootstrap ad-hoc.

**Después:**
- Los filtros viven dentro de una **tarjeta** (`filters-card`) con título e ícono
  (`bi-funnel`), separada visualmente del listado.
- **Cada campo tiene un `<label>` visible** (`Nombre, género o desarrollador`,
  `Plataforma`, `Clasificación ESRB`), cumpliendo "etiquetas claras, simples y
  familiares" y el checklist de "formularios con etiquetas claras".
- El formulario ahora maneja `onSubmit` (antes los botones eran `type="button"` con
  `onClick`), por lo que también se puede confirmar la búsqueda presionando **Enter**
  desde el teclado.
- En mobile los campos se apilan a ancho completo (fáciles de tocar); desde 768px se
  acomodan en fila, con el campo de texto ocupando el doble de espacio
  (`filters-form__field--grow`) ya que es el más usado.
- Los botones "Filtrar" y "Limpiar" ahora incluyen ícono + texto (`bi-search`,
  `bi-x-circle`) y ocupan ancho completo en mobile (fácil de tocar, "microcopy"
  descriptivo).

**Por qué (lineamiento):**
- *Arquitectura de la información*: "etiquetas claras, simples y familiares".
- *Accesibilidad (checklist)*: "los formularios incluyen etiquetas claras".
- *Prevención de errores*: poder enviar el formulario con Enter es el comportamiento
  esperado por el usuario; antes solo funcionaba con clic.

### 4.3 Estados de carga, vacío y resultados (Feedback)

**Antes:** no existía ningún estado de carga ni de "sin resultados"; si el filtro no
encontraba nada, la tabla quedaba simplemente sin filas, sin explicación.

**Después:**
- **Estado de carga**: mientras se obtienen los datos (`cargando === true`) se muestra
  un *spinner* de Bootstrap + texto "Cargando juegos…" (con `role="status"` para
  lectores de pantalla).
- **Estado vacío**: si no hay resultados, se muestra un ícono, el mensaje "No
  encontramos juegos que coincidan con tu búsqueda" y un botón para limpiar los
  filtros (salida de emergencia ante un callejón sin salida).
- **Contador de resultados**: "Mostrando N juegos" arriba de la grilla, con
  `aria-live="polite"` para que se anuncie el cambio a usuarios de lectores de
  pantalla al filtrar.
- Las fechas se formatean con `toLocaleDateString("es-AR", { day: "2-digit", month:
  "short", year: "numeric" })` en lugar del formato por defecto del navegador, para un
  formato de fecha localizado y consistente (ej. "26 oct 2018").
- El diálogo de confirmación de borrado ahora incluye el **nombre del juego**
  ("¿Seguro que deseas eliminar "Cyberpunk 2077"?...") en vez de un mensaje genérico,
  reduciendo el riesgo de borrar el ítem equivocado.

**Por qué (lineamiento):**
- *Principios fundamentales – Feedback*: "informar al usuario sobre resultados,
  acciones o errores".
- *Internacionalización*: "ajustar formatos de fecha según región".
- *Prevención de errores*: mensajes de confirmación específicos y salidas de emergencia
  (botón "Limpiar filtros" en el estado vacío).

---

## 5. Página "Últimos Estrenos"

**Archivo:** `frontend/src/pages/UltimosEstrenos.jsx`, `frontend/src/pages/Page.css`

**Antes:** una lista (`<ul className="list-group">`) de una sola línea por juego
(`Nombre – Plataforma – Fecha`), visualmente muy pobre comparada con el resto del sitio,
sin estado de carga ni vacío, y con un `<main>` propio (landmark duplicado, ver punto 1.2).

**Después:**
- Reutiliza el mismo lenguaje visual que "Juegos" (`games-grid` / `game-card`):
  título, badge de plataforma, género/desarrollador/fecha, valoración, badge ESRB y
  enlace al sitio oficial.
- Se agregó una insignia **"Nuevo"** (`badge-nuevo`, fondo color de acento) en las 3
  tarjetas más recientes, para reforzar el propósito de la página ("lo último que
  llegó al catálogo").
- Estados de carga ("Cargando estrenos…") y vacío, igual que en "Juegos".
- Encabezado de página con título y bajada explicando el orden del listado.

**Por qué (lineamiento):**
- *Consistencia*: "mantener patrones y comportamientos uniformes en toda la interfaz".
  Antes esta página parecía de "otro sitio" comparada con el listado principal.
- *Jerarquía visual / Escaneabilidad*: tarjetas con títulos grandes e iconografía
  descriptiva en vez de una lista de texto plano.

---

## 6. Formulario de juego (alta / edición)

**Archivo:** `frontend/src/pages/FormularioJuego.jsx`, `frontend/src/pages/Page.css`

**Cambios y por qué:**

1. **Bug de navegación corregido**: al guardar, el formulario llamaba a
   `navigate("/juegos")`, una ruta que **no existe** en `App.jsx` (las rutas son
   `/juegos/lista`, `/juegos/nuevo`, `/juegos/editar/:id`), por lo que tras guardar el
   usuario llegaba a una pantalla en blanco. Ahora navega a `/juegos/lista`.
   → *Usabilidad*: "permitir al usuario lograr sus objetivos sin fricción".

2. **Import corregido**: `useNavigate`/`useParams` se importaban desde `"react-router"`
   en vez de `"react-router-dom"` (inconsistente con el resto de la app); se unificó.

3. **Labels asociados a inputs (`htmlFor` + `id`)**: antes los `<label>` no tenían
   `htmlFor`, por lo que hacer clic en la etiqueta no enfocaba el campo y los lectores
   de pantalla no podían asociarlos. Ahora cada campo tiene `id` único y su `<label
   htmlFor="...">` correspondiente.
   → *Accesibilidad (WCAG)*: "los formularios incluyen etiquetas claras"; "navegación
   completa por teclado".

4. **Campos obligatorios señalizados**: los campos requeridos muestran un asterisco
   visual (`<span class="required-mark">*</span>`) **más** un texto
   `(obligatorio)` oculto para lectores de pantalla (`visually-hidden`), en vez de
   depender solo del color rojo del asterisco.
   → *Accesibilidad*: "el color nunca debe ser el único canal para transmitir
   información".

5. **Mensajes de error específicos por campo**: cada campo obligatorio muestra su
   propio mensaje ("Ingresá el nombre del juego.", "Seleccioná una plataforma.", etc.)
   con ícono `bi-exclamation-circle`, vinculado mediante `aria-describedby` y marcado
   con `aria-invalid`. Antes solo "Nombre" y "Género" mostraban "Campo obligatorio" (un
   mensaje genérico repetido).
   → *UX Writing / Microcopy*: "mensajes de error comprensibles y específicos".

6. **Bug de tipo de dato corregido — campo ESRB**: el campo `ESRB` (que guarda valores
   como `"E"`, `"T"`, `"M"`, `"AO"`...) estaba implementado como
   `<input type="number">`, lo cual es **incorrecto** (no se puede escribir "M" en un
   campo numérico) y además quedaba inconsistente con el filtro de la página "Juegos",
   que sí ofrece un `<select>` con las 7 categorías. Ahora es un `<select>` con las
   mismas 7 opciones (`E`, `E10+`, `T`, `M`, `AO`, `RP`, `UR`), cada una con su
   descripción.
   → *Consistencia*: mismo control para el mismo dato en toda la app.
   → *Prevención de errores*: ya no se puede ingresar un valor inválido para ESRB.

7. **Agrupación en secciones (`<fieldset>` / `<legend>`)**: los 9 campos sueltos en una
   grilla de 12 columnas se reorganizaron en **3 grupos temáticos**: "Información
   general" (nombre, género, desarrollador, fecha, plataforma), "Valoración y
   clasificación" (valoración, opiniones, ESRB) y "Enlaces" (sitio web). Cada grupo es
   una tarjeta con su propio título.
   → *Arquitectura de la información*: "estructurar el contenido de forma lógica y
   jerárquica"; *Escaneabilidad*: "títulos grandes, párrafos cortos".

8. **Botón "Cancelar" agregado**: antes el único botón era "Guardar"; si el usuario
   entraba por error o cambiaba de opinión, no tenía forma de volver sin guardar. Se
   agregó un botón secundario "Cancelar" que vuelve al listado sin enviar el
   formulario.
   → *Ética y Responsabilidad / Prevención de errores*: "ofrecer salidas de emergencia
   claras".

9. **Feedback de envío**: mientras se procesa el guardado (`enviando === true`), el
   botón "Guardar" se deshabilita y muestra un *spinner* + "Guardando…", evitando
   doble envío y comunicando que la acción está en curso.
   → *Feedback*: "informar al usuario sobre resultados o acciones en curso".

10. **Inputs numéricos acotados**: `valoración` ahora tiene `min="0" max="100"` y
    `opiniones` `min="0"`, evitando valores fuera de rango desde el propio control.

11. **Botones de ancho completo en mobile**: "Guardar" y "Cancelar" ocupan el 100% del
    ancho en mobile (fáciles de tocar) y se acomodan en fila desde 640px.
    → *Requerimientos técnicos mobile*: tamaño táctil mínimo.

---

## 7. Accesibilidad transversal (resumen)

- **Contraste**: la paleta nueva fue elegida para cumplir ≥4.5:1 en texto normal sobre
  fondo claro (`--color-text: #1e293b` sobre `--color-bg/--color-surface`) y sobre el
  header/footer oscuros (`--color-text-on-dark` sobre `--color-dark`).
- **Foco de teclado visible** en todos los elementos interactivos (`:focus-visible`).
- **Texto alternativo**: el avatar de usuario (`user-placeholder.png`) usa `alt=""`
  porque es puramente decorativo (el nombre ya está en texto al lado); los íconos
  decorativos llevan `aria-hidden="true"`.
- **Enlaces externos**: todos los enlaces "Visitar sitio oficial" usan
  `target="_blank" rel="noopener noreferrer"` (seguridad) y avisan mediante texto
  accesible que se abren en una pestaña nueva.
- **Idioma del documento**: `index.html` pasó de `lang="en"` a `lang="es"`, ya que todo
  el contenido está en español (requisito básico de "Internacionalización" /
  accesibilidad para lectores de pantalla).
- **Título de la pestaña**: de `"Vite + React"` (placeholder) a
  `"GameVault — Catálogo de Juegos"`.

---

## 8. Resumen de cumplimiento del checklist de `lineamientos.md`

| Punto del checklist | Estado | Dónde |
| --- | --- | --- |
| Flujo de usuario claro y eficiente | ✅ | Filtros con feedback, formulario con cancelar/guardar |
| Contenido jerárquicamente organizado | ✅ | Tarjetas de juego, formulario en secciones |
| Menús consistentes y fáciles de explorar | ✅ | Encabezado: bottom nav (mobile) / top nav (desktop) |
| Jerarquía clara en color, tamaño y espaciado | ✅ | Sistema de diseño (`index.css`), tarjetas |
| Textos legibles en todas las pantallas | ✅ | Base 16px, line-height 1.5, escala tipográfica |
| Estados hover/active/error en interactivos | ✅ | `.game-card:hover`, `.is-active`, `.is-invalid`, `:focus-visible` |
| Microinteracciones | ✅ | Elevación de tarjetas al hover |
| Adaptación móvil/tablet/escritorio | ✅ | Grillas responsive, nav inferior/superior |
| Botones con tamaño adecuado para touch | ✅ | `--touch-target: 48px` global |
| Contraste mínimo recomendado | ✅ | Paleta con ratios ≥4.5:1 |
| Navegable con teclado | ✅ | `:focus-visible`, `<form onSubmit>` |
| Imágenes con texto alternativo | ✅ | `alt=""` en decorativas, iconografía `aria-hidden` |
| Formularios con etiquetas claras | ✅ | `<label htmlFor>` en todos los campos |
| Texto visible correctamente (idioma) | ✅ | `lang="es"`, formatos de fecha localizados |
| Sin patrones oscuros | ✅ | Confirmaciones específicas, sin texto/imágenes ajenas al producto |
| Pruebas y validación | ⚠️ | Fuera del alcance de esta demo visual (requeriría usuarios reales) |

---

## 9. Archivos modificados/creados

- `frontend/index.html` — idioma `es`, título de la pestaña.
- `frontend/src/index.css` — sistema de diseño (paleta, tipografía, espaciado, foco).
- `frontend/src/App.css` / `frontend/src/App.jsx` — layout general, landmarks.
- `frontend/src/components/Encabezado.jsx` — marca, navegación mobile-first.
- `frontend/src/components/PiePagina.jsx` — footer profesional y consistente.
- `frontend/src/pages/Juegos.jsx` — tarjetas, filtros accesibles, estados de feedback.
- `frontend/src/pages/UltimosEstrenos.jsx` — tarjetas consistentes con "Juegos".
- `frontend/src/pages/FormularioJuego.jsx` — formulario accesible y corregido.
- `frontend/src/pages/Page.css` — estilos compartidos de tarjetas, filtros y formulario.
- `frontend/src/assets/css/juegos.css` — estilos de header, navegación y footer.
- `frontend/src/data/mockJuegos.js`, `frontend/src/data/mockPlataformas.js` — datos de
  relleno.
- `frontend/src/services/juegos.service.js`,
  `frontend/src/services/plataformas.service.js` — servicios mock (misma interfaz que
  los originales basados en `axios`).

> Nota: `frontend/src/services/axios.config.js` quedó sin uso (ningún servicio lo
> importa), pero se dejó en el repositorio por si se quiere reconectar con el backend
> real en el futuro.
