Guías de diseño de UX/UI
Requisitos de finalización
1. Principios Fundamentales
•     Usabilidad: Diseña interfaces que permitan al usuario lograr sus objetivos sin fricción.
•     Utilidad: Asegura que cada elemento tenga una función real y relevante.
•     Deseabilidad: Crea experiencias visualmente atractivas y emocionalmente positivas.
•     Accesibilidad: Diseña para todos los usuarios, considerando diversidad funcional.
•     Consistencia: Mantén coherencia visual y funcional en toda la experiencia.
•     Feedback: Informa al usuario sobre resultados, acciones o errores.

2. Arquitectura de la Información
•    Estructura el contenido de forma lógica y jerárquica.
•    Usa etiquetas claras, simples y familiares.
•    Prioriza lo más importante en las primeras vistas.
•    Aplica card sorting y tree testing para validar la estructura de navegación.

3. Diseño de Interfaz (UI)
•    Usa jerarquía visual clara (color, tamaño, espaciado).
•    Respeta márgenes y espacios en blanco.
•    Aplica patrones comunes (botones, modales, iconos familiares).
•    Integra microinteracciones (hover, scroll, click).

4. Diseño Responsive
•    Diseña con enfoque Mobile First.
•    Usa rejillas flexibles y unidades relativas.
•    Testea en múltiples resoluciones y dispositivos.
•    Optimiza imágenes y tipografías según pantalla.

5. Accesibilidad (WCAG 2.1)
•    Contraste mínimo 4.5:1 para texto.
•    Texto alternativo en imágenes.
•    Navegación completa por teclado.
•    Evita depender del color como único indicador.
•    Etiquetas claras y mensajes de error comprensibles.
6. Internacionalización y Localización
•    Usa Unicode UTF-8 para todos los idiomas.
•    Soporta LTR (izquierda a derecha) y RTL (derecha a izquierda).
•    Evita texto incrustado en imágenes.
•    Ajusta formatos de fecha, hora y moneda según región.

7. Ética y Responsabilidad
•    Evita patrones oscuros (dark patterns).
•    Transparencia en la recopilación de datos.
•    Diseña sin sesgos de género, edad o cultura.
•    Prioriza la confianza y la autonomía del usuario.

8. Evaluación y Pruebas
•    Realiza pruebas de usabilidad con usuarios reales.
•    Usa métodos cualitativos (think aloud) y cuantitativos (SUS).
•    Documenta resultados y aplica mejoras iterativas.


UX/UI Checklist
Requisitos de finalización

1.    Estructura y Navegación
☐ El flujo de usuario es claro y eficiente.
☐ El contenido está jerárquicamente organizado.
☐ Los menús son consistentes y fáciles de explorar.
☐ Hay rutas o breadcrumbs visibles.

2.    Interfaz Visual
☐ Hay jerarquía clara en color, tamaño y espaciado.
☐ Los textos son legibles en todas las pantallas.
☐ Los elementos interactivos tienen estados (hover, active, error).
☐ Las microinteracciones aportan claridad y dinamismo.


3.    Responsive
☐ El diseño se adapta a móvil, tablet y escritorio.
☐ Los botones tienen tamaño adecuado para touch.
☐ Las imágenes y tipografías se ajustan fluidamente.

4.    Accesibilidad
☐ El contraste cumple el mínimo recomendado.
☐ Todo el contenido es navegable con teclado.
☐ Las imágenes tienen texto alternativo.
☐ Los formularios incluyen etiquetas claras.

5.    Internacionalización
☐ El texto se visualiza correctamente en todos los idiomas.
☐ Se soportan idiomas LTR y RTL.
☐ No hay texto incrustado en imágenes.

6.    Ética y Equidad
☐ No se emplean patrones oscuros.
☐ El diseño evita sesgos o estereotipos.
☐ Se comunica claramente el uso de datos personales.

7.    Pruebas y Validación
☐ Se realizaron pruebas de usabilidad reales.
☐ Se aplicó la escala SUS o métricas similares.
☐ Se documentaron los hallazgos y mejoras.


Resumen para un buen diseño de UXUI
1. Principios Fundamentales de Diseño
Simplicidad: Reducir al mínimo lo innecesario para evitar sobrecargar al usuario
- Se deben priorizar las funcionalidades esenciales y utilizar espacios en blanco para dar "aire" a la interfaz

Consistencia: Mantener patrones y comportamientos uniformes en toda la interfaz (mismo estilo de botones, iconografía, terminología y colores)
- Se recomienda seguir guías establecidas como Material Design o Human Interface Guidelines

Jerarquía Visual: Organizar la información según su importancia para dirigir la atención del usuario
- Se debe usar contraste de tamaño, color y posición para destacar los elementos de acción o CTA (Call to Action)

Retroalimentación: El sistema debe mostrar cambios de estado ante interacciones del usuario (como hovers, estados de carga, éxito o error)

2. Diseño de Layout y Composición
Rejillas (Grids): Utilizar rejillas para mantener la consistencia en todas las pantallas (comúnmente de 12 columnas para web)

Patrones de Lectura: Aplicar disposiciones de contenido en “F” o “Z”, colocando los botones principales donde la vista termina naturalmente (parte baja de la Z o columna izquierda en la F)

Escaneabilidad: El contenido debe ser fácil de escanear mediante el uso de títulos grandes, párrafos cortos e íconos descriptivos

3. Color y Tipografía
Tipografía: Se debe usar una tipografía legible con un tamaño mínimo de 16px para el cuerpo de texto
- Se recomienda limitar el diseño a 1 o 2 fuentes, variando el grosor y tamaño para crear jerarquía
- El interlineado debe ser de 1.5x el tamaño de la fuente para facilitar la lectura

Paleta de Colores: Definir 1 o 2 colores de marca y usarlos con intención, no por moda
- Se deben evitar los clichés de género (como rosa/azul) y priorizar la legibilidad y accesibilidad

Contraste: Es imperativo mantener una relación de contraste mínima de 4.5:1 para texto normal y 3:1 para textos grandes
- El color nunca debe ser el único canal para transmitir información (por ejemplo, los errores deben incluir íconos o texto, no solo color rojo)

4. Diferencias entre Plataformas: Desktop vs. Mobile
El diseño móvil no es simplemente una versión achicada del escritorio; requiere un enfoque "Mobile-First" centrado en el contexto de uso (movilidad, distracciones, tiempo limitado)

Característica
Desktop (Escritorio)
Mobile (Móvil)
Input Principal
Mouse, teclado y atajos

Touch (dedos) y voz

Navegación
Menús desplegables, barras de herramientas

Bottom navigation (menú inferior) o tabs

Complejidad
Interfaces ricas para productividad

Simplicidad extrema y rapidez

Layout
Múltiples paneles y 12 columnas

Vertical, scroll y tarjetas

Requerimientos Técnicos Mobile:
Áreas Táctiles: Los botones deben tener un tamaño mínimo de 48x48 dp o un recomendado de 44x44 px para ser operables con los dedos
- El mínimo estricto es de 24x24 px

Separación: Los elementos interactivos deben estar lo suficientemente separados para evitar toques accidentales

Zona del Pulgar: Las acciones principales y los CTAs deben ubicarse en zonas alcanzables cómodamente con el pulgar cuando se usa el dispositivo con una sola mano

5. Accesibilidad y UX Writing
Accesibilidad (WCAG): Garantizar que la interfaz sea Perceptible (alt text en imágenes), Operable (navegación por teclado), Comprensible (lenguaje claro) y Robusto

Microcopy: Utilizar textos cortos y concisos para guiar al usuario
- Los enlaces y botones deben ser descriptivos: usar "Descargar guía PDF" en lugar de un genérico "Haz clic aquí"

Prevención de Errores: El diseño debe intentar evitar que ocurran problemas antes de que sucedan y ofrecer "salidas de emergencia" claras (como deshacer/rehacer)
