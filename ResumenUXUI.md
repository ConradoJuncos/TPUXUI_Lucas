# Resumen de cambios de UX/UI

Versión resumida de [`UXUI_Mejoras.md`](./UXUI_Mejoras.md), con **solo los cambios que
afectan la interfaz visual o la experiencia de usuario** (se omiten correcciones
puramente técnicas sin impacto visual, como imports o el origen de los datos).

---

## 1. Sistema de diseño global

- Se eliminó el tema oscuro residual de la plantilla de Vite (fondo `#242424`, texto
  blanco) que no se usaba en el resto de la app y generaba una base inconsistente.
- Nueva paleta de marca con **1 color primario (índigo `#4338ca`) + 1 acento (naranja
  `#ea580c`)**, más colores semánticos (éxito, info, advertencia, peligro, neutro), cada
  uno pensado para cumplir un contraste mínimo de **4.5:1**.
- Tipografía unificada en una sola familia, tamaño base **16px** y **interlineado
  1.5**.
- Escala de espaciado consistente (4px a 48px) y radios/sombras consistentes para
  tarjetas, botones y badges.
- **Tamaño táctil mínimo de 48px** aplicado globalmente a botones, inputs y selects.
- **Foco de teclado visible** (`:focus-visible`) en todos los elementos interactivos.

## 2. Layout general

- Antes, `#root` tenía `max-width: 1280px` + `text-align: center` aplicado a **toda**
  la app (incluido el header y el footer), heredado de la plantilla por defecto y sin
  uso real.
- Ahora el header y el footer ocupan **todo el ancho** de la pantalla (fondo de marca
  de punta a punta), mientras que el contenido principal se centra en una columna
  legible de hasta 1280px.
- Se unificó la app a un único landmark `<main>` (antes había `<main>` anidados en
  algunas páginas), mejorando la estructura para lectores de pantalla.

## 3. Encabezado y navegación

- Se le dio identidad de marca al sitio: **"GameVault"** + ícono de control, antes el
  header no tenía nombre.
- **Navegación mobile-first**:
  - En **mobile**, el menú (Juegos / Estrenos / Nuevo juego) se convierte en una
    **barra de navegación inferior fija**, con ícono + etiqueta, en la "zona del
    pulgar" para fácil alcance con una mano.
  - En **escritorio**, la navegación es una barra horizontal centrada con píldoras más
    grandes.
  - El estado "activo" del menú ahora se ve correctamente (antes el atributo usado no
    aplicaba ningún estilo) y se marca con **color + fondo + borde**, no solo color.
- El banner de fondo (neón temático de gaming) ahora tiene un degradado oscuro
  superpuesto para garantizar contraste suficiente del texto blanco.
- La "píldora" de usuario incorpora avatar + nombre con buen contraste.
- Se reservó espacio (`padding-bottom`) para que la barra inferior fija no tape
  contenido en mobile.

## 4. Pie de página

- Se eliminó el texto **"Odio esta materia"** y la imagen de un personaje de anime sin
  relación con el producto.
- Nuevo footer profesional y consistente con la marca: nombre del sitio + ícono,
  cantidad de juegos en el catálogo (con estado "Cargando catálogo…"), cantidad de
  resultados filtrados cuando corresponde, y una leyenda que aclara que es un proyecto
  académico con datos de demostración.
- Usa el mismo color oscuro de marca que el header, creando un "marco" visual
  consistente para toda la página.

## 5. Página "Juegos" (listado y filtros)

### De tabla a tarjetas
- El listado pasó de una **tabla de 9 columnas** (mala para mobile, scroll horizontal,
  texto chico) a una **grilla de tarjetas responsive**: 1 columna en mobile, 2 desde
  640px, 3 desde 1100px.
- Cada tarjeta tiene una jerarquía visual clara: **nombre + plataforma** primero,
  luego género/desarrollador/fecha, **valoración** (estrellas + puntaje + opiniones),
  **clasificación ESRB** (ícono + código + descripción, nunca solo color), enlace al
  sitio oficial y, al final, las acciones Editar/Eliminar.
- Microinteracción: las tarjetas se elevan levemente al pasar el mouse, indicando que
  son interactivas.

### Filtros
- Se agruparon en una **tarjeta de filtros** con título e ícono.
- **Todos los campos tienen `<label>` visibles** (antes solo había `placeholder`).
- El formulario ahora se puede enviar con **Enter**, no solo haciendo clic.
- En mobile los campos se apilan a ancho completo; en pantallas más grandes se
  acomodan en fila.
- Los botones "Filtrar" y "Limpiar" incluyen ícono + texto y ocupan ancho completo en
  mobile.

### Estados de carga, vacío y feedback
- Se agregó un **estado de carga** ("Cargando juegos…" con spinner).
- Se agregó un **estado vacío** ("No encontramos juegos que coincidan con tu
  búsqueda" + botón para limpiar filtros).
- Se agregó un **contador de resultados** ("Mostrando N juegos") anunciado a lectores
  de pantalla.
- Las fechas ahora se muestran en formato localizado (ej. "26 oct 2018").
- La confirmación de borrado ahora menciona el **nombre del juego** a eliminar.

## 6. Página "Últimos Estrenos"

- Pasó de una lista de texto plano (`Nombre – Plataforma – Fecha`) al mismo lenguaje
  visual de tarjetas que "Juegos", para mantener consistencia entre páginas.
- Se agregó una insignia **"Nuevo"** en las tarjetas más recientes.
- Se agregaron estados de carga y vacío, igual que en "Juegos".

## 7. Formulario de juego (alta / edición)

- **Cada campo tiene un `<label>` asociado** mediante `htmlFor`/`id` (antes no estaban
  vinculados, por lo que hacer clic en la etiqueta no enfocaba el campo).
- Los campos obligatorios muestran un asterisco **más** un texto "(obligatorio)" para
  lectores de pantalla, sin depender solo del color.
- Cada campo obligatorio tiene su **propio mensaje de error** específico (antes solo
  dos campos mostraban "Campo obligatorio").
- El campo **ESRB** pasó de ser un `input type="number"` (no se puede escribir "M" en
  un campo numérico) a un **select con las mismas 7 opciones que el filtro** de la
  página "Juegos", manteniendo consistencia visual y de interacción.
- Los campos se reorganizaron en **3 secciones temáticas** ("Información general",
  "Valoración y clasificación", "Enlaces"), cada una como una tarjeta con su título.
- Se agregó un **botón "Cancelar"** que vuelve al listado sin guardar (antes solo
  existía "Guardar").
- El botón "Guardar" muestra un **spinner + "Guardando…"** mientras se procesa el
  envío.
- Los campos numéricos (valoración, opiniones) ahora tienen límites mínimos/máximos.
- "Guardar" y "Cancelar" ocupan el ancho completo en mobile y se acomodan en fila en
  pantallas más grandes.
- Se corrigió el flujo posterior a guardar: antes redirigía a una pantalla en blanco;
  ahora vuelve correctamente al listado de juegos.

## 8. Accesibilidad transversal

- Paleta con contraste ≥4.5:1 en texto normal, tanto en fondos claros como en el
  header/footer oscuros.
- Foco de teclado visible en todos los elementos interactivos.
- Imágenes decorativas con `alt=""` e íconos con `aria-hidden="true"`.
- Enlaces externos abren en pestaña nueva con aviso accesible.
- Idioma del documento corregido a español (`lang="es"`) y título de pestaña
  actualizado a "GameVault — Catálogo de Juegos".

## 9. Checklist de `lineamientos.md`

| Punto del checklist | Estado |
| --- | --- |
| Flujo de usuario claro y eficiente | ✅ |
| Contenido jerárquicamente organizado | ✅ |
| Menús consistentes y fáciles de explorar | ✅ |
| Jerarquía clara en color, tamaño y espaciado | ✅ |
| Textos legibles en todas las pantallas | ✅ |
| Estados hover/active/error en interactivos | ✅ |
| Microinteracciones | ✅ |
| Adaptación móvil/tablet/escritorio | ✅ |
| Botones con tamaño adecuado para touch | ✅ |
| Contraste mínimo recomendado | ✅ |
| Navegable con teclado | ✅ |
| Imágenes con texto alternativo | ✅ |
| Formularios con etiquetas claras | ✅ |
| Texto visible correctamente (idioma) | ✅ |
| Sin patrones oscuros | ✅ |
| Pruebas y validación con usuarios reales | ⚠️ Fuera de alcance de esta demo visual |
