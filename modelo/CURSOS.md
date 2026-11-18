# CURSOS.md

## jerarquía de datos

A continuación se indican los cursos, las asignaturas de cada curso y los temas de cada asignatura.

<jerarquia_datos>
cursos:
- curso_id: 1
  nombre: CURSO 1
  asignaturas:
    - asignatura_id: 101
      nombre: LENGUA
      temas:
        - tema_id: 101001
          nombre: Me siento feliz
        - tema_id: 101002
          nombre: Nos cuidamos
        - tema_id: 101003
          nombre: Una familia de sonrisas
    - asignatura_id: 102
      nombre: CONO
      temas:
        - tema_id: 102001
          nombre: Así es nuestro cuerpo
        - tema_id: 102002
          nombre: Cuido mi alimentación y mi salud
        - tema_id: 102003
          nombre: Mi pequeño gran mundo
    - asignatura_id: 103
      nombre: MATES
      temas:
        - tema_id: 103001
          nombre: Me conozco
        - tema_id: 103002
          nombre: Iguales, pero distintos
        - tema_id: 103003
          nombre: Todos a una
    - asignatura_id: 104
      nombre: INGLÉS
      temas:
        - tema_id: 104001
          nombre: Curious
        - tema_id: 104002
          nombre: Classroom
        - tema_id: 104003
          nombre: Family
        - tema_id: 104004
          nombre: Pets
    - asignatura_id: 105
      nombre: MÚSICA
      temas:
        - tema_id: 105001
          nombre: Sounds and silence
        - tema_id: 105002
          nombre: Sounds of my body
        - tema_id: 105003
          nombre: Sounds at home
        - tema_id: 105004
          nombre: Sounds at my school
        - tema_id: 105005
          nombre: Sounds in my city
</jerarquia_datos>

## Ejercicios

Los ejercicios de cada tema se especifican en ficheros separados, estructurados de la siguiente manera:
- Dentro de esta carpeta llamada "modelo", una subcarpeta para cada asignatura llamada como la asignatura_id.
- Dentro de cada subcarpeta de asignatura, un fichero para cada tema llamado como el tema_id.
- No tengas en cuenta los archivos de ejercicios que no existan o que tengan el archivo vacío, se mostrará un mensaje "Todavía no hay ejercicios".

Siempre que se termine el ejercicio permitirá mostrar un botón para ver el resultado del ejercicio mediante un pop up que muestre la puntuación de dicho ejercicio.
- Para el resultado de cada ejercicio, pondera la puntuación basándote en las preguntas o historias secuenciales que contiene cada ejercicio.
Por ejemplo, si el ejercicio tiene 4 preguntas o historias secuenciales, la puntuación máxima sería 4.
En los ejercicios de unir con líneas hay que acertar todas las uniones para que cuente.
- Sin errores: Una copa y fuegos artificiales, con mensaje "¡PERFECTO!" (con estilos en verde simbolizando éxito)
- La mitad o más de puntuación: Una copa sin fuegos artificiales, con mensaje "¡APROBADO!" (con estilos naranjas que simbolicen advertencia)
- Error: Una exclamación y un mensaje que diga ¡Puedes hacerlo mejor! (con estilos rojos que simbolicen error)

Mientras se responde no se debe indicar si acierta, pero al final del ejercicio debe mostrar un botón que permita revisar el ejercicio, permitiendo volver a realizar el ejercicio entero marcando en rojo las respuestas incorrectas señaladas anteriormente y en verde las correctas.
  Se colorea lo que el niño eligió en el intento anterior, en verde si acertó y en rojo si falló.
  En las preguntas falladas tiene que encontrar él la respuesta buena.
  Si es un ejercicio de unir con líneas marcamos las líneas en rojo o en verde.
  El repaso se puntúa otra vez

