PRIMARIA DIGITAL
================

Aplicación web educativa con ejercicios para niños de primaria de 6 a 9 años,
pensada para acompañar con material digital lo que se trabaja en el aula.
Está diseñada sobre todo para móviles y tabletas en horizontal.

Prueba de concepto
------------------
Es una prueba de concepto para programar html estático usando IA.
Así aprovecho a que mi hijo repase algún ejercicio de clase, y me haga de tester.


Cómo se usa
-----------

Es una página estática (HTML, CSS y JavaScript) que funciona entera en el
navegador: no necesita servidor de aplicaciones, base de datos ni instalación.

- Con Apache: copiar la carpeta en htdocs y abrir
  http://localhost/primaria-digital/
- Con cualquier otro servidor web estático: servir la carpeta y abrir index.html.

Abrir index.html directamente como fichero (file://) no está probado.


Qué incluye
-----------

- Menú en cuatro niveles con botones: curso > asignatura > tema > ejercicio.
  Se muestran todos los temas aunque no tengan ejercicios; en ese caso aparece
  "Todavía no hay ejercicios".
- Cabecera con:
  - la casa, que vuelve al inicio;
  - la flecha, que vuelve al nivel anterior;
  - la copa, con el número de ejercicios aprobados mientras la pestaña siga
    abierta.
  Si se sale a mitad de un ejercicio, se pide confirmación.
- Ejercicios por pasos, con los botones "Anterior" y "Siguiente". Al volver
  atrás se conservan las respuestas dadas.
- Al terminar, una ventana con la puntuación:
  - ¡PERFECTO!: todo bien, con copa y fuegos artificiales.
  - ¡APROBADO!: la mitad o más.
  - ¡Puedes hacerlo mejor!: menos de la mitad.
- Botón "Revisar": repite el ejercicio marcando en verde o en rojo lo que se
  respondió en el intento anterior.

Tipos de ejercicio:

- Unir con líneas: tocando un elemento y luego su pareja, o arrastrando. Puede
  ir precedido de una historia de dos viñetas.
- Elegir una respuesta: con imágenes, con frases o completando un hueco.
- Elegir varias respuestas: hay que marcar todas las correctas y ninguna
  incorrecta.
- Escuchar y colorear: se escuchan 4 pulsos (palmadas y silencios) y se
  colorean los cuadrados donde hay sonido.
- Escuchar y elegir: se escuchan 4 pulsos (claqueta y silencios) y se elige
  el ritmo escrito con negras y silencios de negra.

Los sonidos se generan en el navegador con Web Audio, sin ficheros de audio.
Todas las imágenes son dibujos SVG propios hechos en código.


Estructura
----------

index.html          Página única de la aplicación.
css/estilos.css     Estilos comunes (tonos azules, fuente massallera, diseño
                    adaptado a horizontal y vertical).
js/datos.js         Cursos, asignaturas, temas y ejercicios.
js/imagenes.js      Dibujos SVG y viñetas de las historias.
js/app.js           Menú, motor de ejercicios, sonido y resultados.
fuentes/            Fuentes tipográficas (massallera es la principal).
modelo/             Especificación de contenidos en Markdown:
                      CURSOS.md     jerarquía de cursos, asignaturas y temas,
                                    y reglas generales de los ejercicios;
                      <asignatura>/<tema>.md   ejercicios de cada tema.
CLAUDE.md           Directrices de diseño y de trabajo del proyecto.


Añadir o cambiar ejercicios
---------------------------

Los ficheros de modelo/ describen los ejercicios, pero la aplicación no los lee
al abrirse. Los datos que usa están en js/datos.js, así que cada cambio en
modelo/ hay que trasladarlo también a js/datos.js:

- Un tema nuevo va en CURSOS dentro de su asignatura.
- Sus ejercicios van en EJERCICIOS, con el número del tema como clave.
- El formato de cada tipo de ejercicio está explicado al principio de
  EJERCICIOS, en js/datos.js.
- Si un ejercicio necesita imágenes nuevas, se añaden en js/imagenes.js.


Contenido actual
----------------

CURSO 1:
- LENGUA: ejercicios en los tres temas.
- MÚSICA: ejercicios en Sounds and silence, Sounds of my body y Sounds at home.
- CONO, MATES e INGLÉS: todavía sin ejercicios.
