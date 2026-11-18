# CLAUDE.md


## 1. Reglas de interacción con este archivo

No realices cambios en el código fuente cuando cambie este archivo CLAUDE.md a no ser que el usuario solicite siempre un cambio
El código fuente es su propia documentación.

## 2. Reglas de manejo de archivos
- **Solo lectura:** Este archivo es de solo lectura para el modelo salvo que el usuario solicite explícitamente un cambio (ver Alcance del trabajo).
- **Alcance del trabajo:** Cualquier cambio de código o refactorización que solicite el usuario debe aplicarse exclusivamente al código fuente del proyecto, ignorando este archivo de configuración salvo que el usuario lo solicite explícitamente, y solo tras pedir confirmación.

## 3. Tecnología

- Usa siempre HTML/JS estático, que corra íntegramente en cliente web.
- Para las imágenes genera imágenes SVG o usa imágenes que tengas permiso para utilizar


## 4. Convenciones y precauciones

- Idioma: Mantén el idioma base y la nomenclatura siempre en castellano, mostrando únicamente textos en otras lenguas cuando las asignaturas precisamente enseñen dichas lenguas extranjeras.


## 5. Piensa antes de programar

**No supongas. No ocultes la confusión. Expón las alternativas y sus compromisos.**

Antes de implementar:
- Expón tus suposiciones de forma explícita. Si tienes dudas, pregunta.
- Si existen varias interpretaciones, preséntalas; no elijas una en silencio.
- Si existe un enfoque más sencillo, dilo. Discrepa cuando esté justificado.
- Si algo no está claro, detente. Indica qué es lo que confunde. Pregunta.

## 6. La simplicidad primero

**El mínimo código que resuelva el problema. Nada especulativo.**

- Ninguna funcionalidad más allá de lo solicitado.
- Ninguna abstracción para código de un solo uso.
- Ninguna "flexibilidad" o "configurabilidad" que no se haya pedido.
- Ningún manejo de errores para escenarios imposibles.
- Si escribes 200 líneas y podrían ser 50, reescríbelo.

Pregúntate: "¿Diría un ingeniero sénior que esto está sobrecomplicado?" Si la respuesta es sí, simplifica.

## 7. Cambios quirúrgicos

**Toca solo lo imprescindible. Limpia solo lo que tú hayas ensuciado.**

Al editar código existente:
- No "mejores" código, comentarios o formato adyacentes.
- No refactorices lo que no está roto.
- Respeta el estilo existente, aunque tú lo harías de otra manera.
- Si detectas código muerto no relacionado, menciónalo; no lo borres.

Cuando tus cambios dejen elementos huérfanos:
- Elimina imports/variables/funciones que TUS cambios hayan dejado sin uso.
- No elimines código muerto preexistente salvo que se te pida.

La prueba: cada línea modificada debe poder vincularse directamente con la petición del usuario.

## 8. Ejecución orientada a objetivos

**Define criterios de éxito. Itera hasta verificarlos.**

Transforma las tareas en objetivos verificables:
- "Añadir validación" → "Escribir tests para entradas no válidas y después hacer que pasen"
- "Corregir el bug" → "Escribir un test que lo reproduzca y después hacer que pase"
- "Refactorizar X" → "Asegurar que los tests pasan antes y después"

Para tareas de varios pasos, expón un plan breve:
```
1. [Paso] → verificar: [comprobación]
2. [Paso] → verificar: [comprobación]
3. [Paso] → verificar: [comprobación]
```

Unos criterios de éxito sólidos te permiten iterar de forma autónoma. Unos criterios débiles ("haz que funcione") requieren aclaraciones constantes.


## 9. Interacción con GIT

- Solo se permiten GIT diff y status; nunca realices ninguna otra operación sobre el repositorio GIT salvo que el usuario lo solicite explícitamente
- Nunca hagas ningún commit salvo que el usuario lo solicite explícitamente


---

## Qué es esto

PRIMARIA DIGITAL es una aplicación web educativa destinada a la realización de ejercicios diseñada para niños de primaria con edades comprendidas entre 6 y 9 años, para acompañar con material digital los conocimientos impartidos en el aula.
- Tiene contenidos separados para varios cursos de primaria.
- En cada curso se imparten varias asignaturas.
- Cada asignatura tiene varios temas.
- Cada tema puede tener varios ejercicios asociados.
 
El detalle de la jerarquía de cursos, asignaturas, temas y ejercicios está especificado en el fichero modelo/CURSOS.md


## Directrices de diseño de UI

### Fuentes

Usa las siguientes fuentes cuya licencia permite su uso:
- massallera: para contenido en general, principal fuente.
- Escolar_P: para contenido que indique sobrescribir a mano por encima (de momento no se usa)
- ColeCarreira: para contenido que indique sobrescribir a mano por encima con guías (de momento no se usa)

### Responsive
Los ejercicios van a ser realizados en mayor medida en móviles y tabletas, por lo que los ejercicios deben ser siempre responsive.
Cada ejercicio debe poderse ver bien para la mayoría de móviles en orientación landscape.
En los ejercicios de unir con líneas asegura que hay un margen entre elementos de la izquierda y la derecha por si la orientación es portrait.
Asegura en los ejercicios un mínimo de margen de 2px por la izquierda y por la derecha.

### Estilos homogéneos
Utiliza los mismos estilos en todos los ejercicios.
Usa tonalidades en azules para los componentes generales de la web.
Utiliza una fuente que escriba como los niños en español la r, la b, la p, etcétera.

### Ajustar cada ejercicio al tamaño en orientación landscape
Basa el tamaño de las fuentes y elementos web para que se ajusten al tamaño de la pantalla en orientación landscape.

## Estructura de la interfaz

### Página principal
La interfaz consta de una página principal con el título PRIMARIA DIGITAL con un encabezado de poca altura para maximizar el contenido que se muestra.
En el cuerpo aparecerán los botones correspondientes al nivel 1 de la jerarquía (ver menú).

### Cabecera con Título
El encabezado con el título centrado PRIMARIA DIGITAL es un encabezado de poca altura para maximizar el contenido que se muestra.
Un icono con forma de casa alineado a la izquierda permite volver siempre a la página principal.
  Si está en mitad de un ejercicio se pide confirmación con un pop up amigable del estilo azul de la página.
Un icono con forma de copa alineado a la derecha lleva el número de copas (ejercicios aprobados) de la última sesión.
  Se inicia en 0 y se va sumando 1 por cada ejercicio aprobado.

### Menú
No se usan menús laterales ni superiores, el menú se muestra con botones con un grid centrado en el cuerpo principal de la página.
Pulsando el botón de un nivel, aparecerán las opciones del nivel siguiente.

- Nivel 1: Selección de curso (de todos los cursos posibles)
- Nivel 2: Selección de asignatura del curso (del curso seleccionado en el paso anterior)
- Nivel 3: Selección de tema de la asignatura (de la asignatura seleccionada en el paso anterior)
- Nivel 4: Selección de ejercicio de la asignatura (del tema seleccionado en el paso anterior)
  Los botones de este nivel deben ocupar el 90% de anchura para intentar mostrar el nombre en una sola línea.

Muestra todos los valores posibles aunque no haya datos en el modelo.
Permite volver al nivel anterior, si está en mitad de un ejercicio se pide confirmación con un pop up amigable del estilo azul de la página.





