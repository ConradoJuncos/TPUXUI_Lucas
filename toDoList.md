1. Navegación con Tab

Lo que ya funciona bien:
- Ningún elemento usa tabindex manual — el orden sigue el DOM, sin saltos artificiales.
- Foco visible y consistente vía :focus-visible (outline naranja de 3px) en index.css.
- NavLink aplica aria-current="page" automáticamente al link activo (confirmado en vivo).
- Botones deshabilitados (disabled={enviando} en FormularioJuego.jsx:231) se saltan correctamente del orden de tabulación.

Problemas encontrados:

1. Orden de foco vs. orden visual en mobile (el más importante). Encabezado.jsx renderiza <nav className="site-nav"> (líneas 64-75) antes que <main> en el DOM, pero en mobile juegos.css lo posiciona como barra fija inferior (position: fixed; bottom: 0). Verificado en vivo: en viewport mobile, tras los dos botones de tema/idioma, el Tab salta directo a "Games / Releases / New game" (que visualmente están al pie de la pantalla) y después llega al formulario de filtros y las tarjetas. Esto viola el criterio WCAG 2.4.3 (Focus Order) para usuarios de teclado con visión: el foco "salta" de arriba hacia abajo y luego vuelve arriba. En desktop no pasa porque el nav se muestra inline arriba.
2. Falta un enlace "Saltar al contenido" (skip link). Como el header + nav se repiten en cada página, un usuario de teclado debe pasar por 5 elementos (2 toggles + 3 links de nav) en cada navegación para llegar al contenido. Un skip-link al <main> es el patrón estándar para esto.
3. Botones "Editar"/"Eliminar" repetidos sin nombre distintivo (Juegos.jsx:230-239). Al tabular por la grilla, hay N botones llamados "Edit" y N llamados "Delete" indistinguibles entre sí salvo por el contexto visual circundante. Para un usuario de teclado que recorre la página linealmente esto es manejable (el <h3> del juego queda inmediatamente antes), pero no tienen un nombre accesible único.

2. Lectores de pantalla

Lo que ya funciona muy bien:
- Estructura de landmarks correcta: <header> (banner), <nav aria-label="...">, <main>, <footer> (contentinfo) — uno de cada, bien etiquetados (Encabezado.jsx:64, App.jsx).
- Formulario excelente: cada campo tiene <label htmlFor> + id, errores vinculados con aria-describedby + aria-invalid, agrupados con <fieldset>/<legend> (FormularioJuego.jsx:50-228). React Hook Form mueve el foco al primer campo inválido al fallar el submit (comportamiento por defecto), lo cual hace que el error se anuncie justo donde aterriza el foco.
- Iconos decorativos con aria-hidden="true" en todos lados; enlaces externos anuncian "(se abre en una pestaña nueva)" vía .visually-hidden (Juegos.jsx:227).
- Estado de carga con role="status" (región viva implícita) en Juegos.jsx:159 y UltimosEstrenos.jsx:48.
- Contador de resultados con aria-live="polite" (Juegos.jsx:177).
- lang del documento se actualiza dinámicamente según el idioma elegido (PreferencesContext.jsx), importante para la pronunciación correcta del lector.

Problemas encontrados:

1. Jerarquía de encabezados inconsistente.
  - En Juegos.jsx: h1 (título página) → h2 "Filtrar juegos" (línea 101) → h3 por cada tarjeta de juego (línea 188). Esto anida semánticamente las tarjetas de juegos dentro de la sección "Filtrar juegos" en el esquema de navegación por encabezados, cuando en realidad son contenido hermano.
  - En UltimosEstrenos.jsx: h1 → h3 directamente (línea 69), saltándose el nivel h2.
  - Para un usuario que navega por encabezados (tecla "h" en NVDA/JAWS), el esquema resultante es confuso/incorrecto. Lo esperable sería que los títulos de las tarjetas fueran h2 en ambas páginas (o agregar un h2 "Resultados"/"Juegos" antes de la grilla).
2. Estado vacío sin región viva. En Juegos.jsx:166-171 y UltimosEstrenos.jsx:55-59, el mensaje "No encontramos juegos…" / "Todavía no hay estrenos…" no tiene role="status" ni aria-live. Si un usuario filtra y obtiene 0 resultados, el lector de pantalla no anuncia el cambio (a diferencia del contador de resultados, que sí está en aria-live="polite").
3. aria-label redundante con <h2> visible en Juegos.jsx:100-103: la <section> tiene aria-label={t.juegos.filtersTitle} y dentro contiene un <h2> con el mismo texto. El lector anuncia el nombre de la región (vía aria-label) y luego, al entrar, vuelve a leer el <h2> — no rompe nada, pero sería más prolijo usar aria-labelledby apuntando al <h2> para evitar la duplicación de fuente.
4. Título del documento estático en una SPA. index.html define <title>GameVault — Catálogo de Juegos</title> una sola vez y nunca se actualiza al navegar entre /juegos/lista, /estrenos, /juegos/nuevo ni al cambiar de idioma. Muchos lectores de pantalla anuncian el <title> (o lo usan como referencia) en cambios de "página"; en una SPA sin recarga, además, el foco no se mueve al contenido nuevo ni se anuncia la navegación de ninguna otra forma — un usuario de lector de pantalla que hace clic en "Estrenos" no recibe ninguna señal de que la "página" cambió salvo que explore manualmente.
5. Botones "Editar"/"Eliminar" sin nombre accesible único (mismo punto que en Tab, pero relevante también para listas de controles): en NVDA/JAWS existe un atajo para listar todos los botones de la página ("Elements List"); ahí aparecerían múltiples "Edit"/"Delete" indistinguibles. Un aria-label como Editar ${juego.nombre} resolvería esto.
6. Campos obligatorios sin aria-required/required. El formulario comunica "obligatorio" solo mediante texto visualmente oculto dentro del <label> (FormularioJuego.jsx:56, etc.). Funciona porque el label se lee al enfocar el campo, pero no todos los lectores/navegadores anuncian "required" de forma consistente solo a partir del texto del label; agregar aria-required="true" (o el atributo nativo required) sería un refuerzo redundante pero más robusto.

---
Resumen de prioridad:
- 🔴 Alto: orden de foco del nav inferior en mobile (#1 de Tab) y jerarquía de encabezados (#1 de lectores).
- 🟡 Medio: skip link, estado vacío sin aria-live, título de documento estático en SPA.
- 🟢 Bajo: nombres accesibles únicos en Editar/Eliminar, aria-labelledby en vez de aria-label duplicado, aria-required redundante.
