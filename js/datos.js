// Datos de la aplicación, extraídos de modelo/CURSOS.md y de los ficheros de ejercicios de cada tema.

const CURSOS = [
  {
    id: 1, nombre: 'CURSO 1', asignaturas: [
      {
        id: 101, nombre: 'LENGUA', temas: [
          { id: 101001, nombre: 'Me siento feliz' },
          { id: 101002, nombre: 'Nos cuidamos' },
          { id: 101003, nombre: 'Una familia de sonrisas' }
        ]
      },
      {
        id: 102, nombre: 'CONO', temas: [
          { id: 102001, nombre: 'Así es nuestro cuerpo' },
          { id: 102002, nombre: 'Cuido mi alimentación y mi salud' },
          { id: 102003, nombre: 'Mi pequeño gran mundo' }
        ]
      },
      {
        id: 103, nombre: 'MATES', temas: [
          { id: 103001, nombre: 'Me conozco' },
          { id: 103002, nombre: 'Iguales, pero distintos' },
          { id: 103003, nombre: 'Todos a una' }
        ]
      },
      {
        id: 104, nombre: 'INGLÉS', temas: [
          { id: 104001, nombre: 'Curious' },
          { id: 104002, nombre: 'Classroom' },
          { id: 104003, nombre: 'Family' },
          { id: 104004, nombre: 'Pets' }
        ]
      },
      {
        id: 105, nombre: 'MÚSICA', temas: [
          { id: 105001, nombre: 'Sounds and silence' },
          { id: 105002, nombre: 'Sounds of my body' },
          { id: 105003, nombre: 'Sounds at home' },
          { id: 105004, nombre: 'Sounds at my school' },
          { id: 105005, nombre: 'Sounds in my city' }
        ]
      }
    ]
  }
];

// Ejercicios por tema. Los temas sin entrada muestran "Todavía no hay ejercicios".
// tipo 'unir': cada elemento de la izquierda indica en "pareja" el id del elemento de la derecha que le corresponde.
// tipo 'elegir': "correcta" es la posición (empezando en 0) de la opción correcta;
//   si hay varias correctas se indican en "correctas". Con "pulsos" se puede escuchar un ritmo
//   y cada opción es un ritmo (1 = negra, 0 = silencio de negra).
// "apiladas": las opciones de texto largas van una debajo de otra ocupando el 96% de la anchura.
// tipo 'colorear': se escuchan los "pulsos" (1 = sonido, 0 = silencio) y se colorean los cuadrados.
// "sonido" indica el sonido sintetizado de los pulsos: 'palmada' o 'claqueta'.
// tipo 'ordenar': se arrastran las "silabas" (en el orden en que se muestran) a las casillas
//   hasta formar la "solucion". Con "img" se muestra el dibujo de la palabra.
// tipo 'separar': se arrastran espacios entre las letras de "frase"; en "solucion" cada "-" es un espacio.
const EJERCICIOS = {
  101001: [
    {
      titulo: 'Lectura comprensiva', tipo: 'unir', preguntas: [
        {
          historia: ['historia1a', 'historia1b'],
          pregunta: '¿Por dónde entra cada personaje? Une con líneas.',
          izquierda: [
            { id: 'nino', img: 'nino', texto: 'Niño', pareja: 'puerta' },
            { id: 'cerdo', img: 'cerdo', texto: 'Cerdo volador', pareja: 'ventana' }
          ],
          derecha: [
            { id: 'ventana', img: 'ventana', texto: 'Ventana' },
            { id: 'puerta', img: 'puerta', texto: 'Puerta' }
          ]
        },
        {
          historia: ['historia2a', 'historia2b'],
          pregunta: '¿Cómo es cada personaje? Une con líneas.',
          izquierda: [
            { id: 'tortuga', img: 'tortuga', texto: 'Tortuga', pareja: 'inteligente' },
            { id: 'conejo', img: 'conejo', texto: 'Conejo', pareja: 'rapido' }
          ],
          derecha: [
            { id: 'rapido', img: 'rapido', texto: 'Rápido' },
            { id: 'inteligente', img: 'inteligente', texto: 'Inteligente' }
          ]
        },
        {
          historia: ['historia3a', 'historia3b'],
          pregunta: '¿Qué le gusta a cada personaje? Une con líneas.',
          izquierda: [
            { id: 'bruja', img: 'bruja', texto: 'Bruja', pareja: 'hechizos' },
            { id: 'cerdo', img: 'cerdo', texto: 'Cerdo volador', pareja: 'lluvia' }
          ],
          derecha: [
            { id: 'hechizos', img: 'hechizos', texto: 'Hechizos' },
            { id: 'lluvia', img: 'lluvia', texto: 'La lluvia' }
          ]
        },
        {
          historia: ['historia4a', 'historia4b'],
          pregunta: '¿Por dónde se mueve cada personaje? Une con líneas.',
          izquierda: [
            { id: 'gusano', img: 'gusano', texto: 'Gusano', pareja: 'suelo' },
            { id: 'mariposa', img: 'mariposa', texto: 'Mariposa', pareja: 'aire' }
          ],
          derecha: [
            { id: 'suelo', img: 'suelo', texto: 'Suelo' },
            { id: 'aire', img: 'aire', texto: 'Aire' }
          ]
        }
      ]
    },
    {
      titulo: 'Encuentra el objeto', tipo: 'elegir', preguntas: [
        {
          pregunta: 'Encuentra la espada del destino', correcta: 3,
          opciones: [
            { img: 'tenedor', texto: 'Un tenedor' }, { img: 'escudo', texto: 'Un escudo' },
            { img: 'flecha', texto: 'Una flecha' }, { img: 'espada', texto: 'Una espada poderosa' }
          ]
        },
        {
          pregunta: 'Encuentra el hada mágica', correcta: 2,
          opciones: [
            { img: 'mago', texto: 'Un mago' }, { img: 'duende', texto: 'Un duende' },
            { img: 'hada', texto: 'Un hada con varita mágica' }, { img: 'arana', texto: 'Una araña' }
          ]
        },
        {
          pregunta: 'Encuentra el niño contento', correcta: 3,
          opciones: [
            { img: 'ninoTriste', texto: 'Un niño triste' }, { img: 'ninoEnfadado', texto: 'Un niño enfadado' },
            { img: 'perro', texto: 'Un perro contento' }, { img: 'nino', texto: 'Un niño contento' }
          ]
        },
        {
          pregunta: 'Encuentra la manzana roja', correcta: 1,
          opciones: [
            { img: 'platano', texto: 'Un plátano' }, { img: 'manzanaRoja', texto: 'Una manzana roja' },
            { img: 'manzanaVerde', texto: 'Una manzana verde' }, { img: 'limon', texto: 'Un limón' }
          ]
        }
      ]
    }
  ],

  101002: [
    {
      titulo: 'Mayúsculas', tipo: 'elegir', apiladas: true, preguntas: [
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 2,
          opciones: ['el hijo de nacho es muy pequeño.', 'el hijo de Nacho es muy pequeño.', 'El hijo de Nacho es muy pequeño.', 'El hijo de nacho es muy pequeño.']
        },
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 3,
          opciones: ['Yo voy al colegio llamado agustinas.', 'yo voy al colegio llamado agustinas.', 'yo voy al colegio llamado Agustinas.', 'Yo voy al colegio llamado Agustinas.']
        },
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 1,
          opciones: ['he jugado con Aitor y con Alma.', 'He jugado con Aitor y con Alma.', 'He jugado con aitor y con Alma.', 'He jugado con Aitor y con alma.']
        },
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 2,
          opciones: ['Mi amigo Rodrigo vive en logroño.', 'Mi amigo rodrigo vive en logroño.', 'Mi amigo Rodrigo vive en Logroño.', 'mi amigo Rodrigo vive en Logroño.']
        }
      ]
    },
    {
      titulo: 'Determinantes', tipo: 'elegir', preguntas: [
        { pregunta: 'Completa con el determinante correcto:', frase: 'X manzana', opciones: ['Un', 'Una', 'Unos', 'Unas'], correcta: 1 },
        { pregunta: 'Completa con el determinante correcto:', frase: 'X niños', opciones: ['El', 'La', 'Los', 'Las'], correcta: 2 },
        { pregunta: 'Completa con el determinante correcto:', frase: 'X flores', opciones: ['El', 'La', 'Los', 'Las'], correcta: 3 },
        { pregunta: 'Completa con el determinante correcto:', frase: 'X lápiz', opciones: ['Un', 'Una', 'Unos', 'Unas'], correcta: 0 },
        { pregunta: 'Completa con el determinante correcto:', frase: 'X estuche', opciones: ['Los', 'Las', 'El', 'La'], correcta: 2 }
      ]
    }
  ],

  101003: [
    {
      titulo: 'Mayúsculas', tipo: 'elegir', apiladas: true, preguntas: [
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 3,
          opciones: ['llama a Daiana. ¡rápido!', 'llama a Daiana. ¡Rápido!', 'Llama a Daiana. ¡rápido!', 'Llama a Daiana. ¡Rápido!']
        },
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 2,
          opciones: ['ayer Edu vino a clase. hoy no.', 'Ayer Edu vino a clase. hoy no.', 'Ayer Edu vino a clase. Hoy no.', 'Ayer edu vino a clase. hoy no.']
        },
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 3,
          opciones: ['¿juegas conmigo? es muy divertido.', '¿Juegas conmigo? es muy divertido.', '¿juegas conmigo? Es muy divertido.', '¿Juegas conmigo? Es muy divertido.']
        },
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 1,
          opciones: ['ahora voy, Nacho. Llego tarde.', 'Ahora voy, Nacho. Llego tarde.', 'Ahora voy, nacho. LLego tarde.', 'ahora voy, Nacho. llego tarde.']
        },
        {
          pregunta: 'Revisa las mayúsculas y elige la frase correcta:', correcta: 2,
          opciones: ['¡te quiero! cada día más.', '¡Te quiero! cada día más.', '¡Te quiero! Cada día más.', '¡te quiero! Cada día más.']
        }
      ]
    },
    {
      titulo: 'Contar letras', tipo: 'elegir', preguntas: [
        { pregunta: 'Cuenta el número de letras y elige la respuesta correcta:', frase: 'burro', opciones: ['2', '3', '5', '7'], correcta: 2 },
        { pregunta: 'Cuenta el número de letras y elige la respuesta correcta:', frase: 'armario', opciones: ['3', '5', '7', '9'], correcta: 2 },
        { pregunta: 'Cuenta el número de letras y elige la respuesta correcta:', frase: 'escaleras', opciones: ['6', '7', '8', '9'], correcta: 3 },
        { pregunta: 'Cuenta el número de letras y elige la respuesta correcta:', frase: 'flor', opciones: ['2', '3', '4', '5'], correcta: 2 },
        { pregunta: 'Cuenta el número de letras y elige la respuesta correcta:', frase: 'astronauta', opciones: ['8', '9', '10', '11'], correcta: 2 }
      ]
    },
    {
      titulo: 'Ordenar sílabas', tipo: 'ordenar', preguntas: [
        { pregunta: 'Ordena las sílabas:', img: 'galleta', silabas: ['ta', 'ga', 'lle'], solucion: ['ga', 'lle', 'ta'] },
        { pregunta: 'Ordena las sílabas:', img: 'zapato', silabas: ['pa', 'to', 'za'], solucion: ['za', 'pa', 'to'] },
        { pregunta: 'Ordena las sílabas:', img: 'estrella', silabas: ['es', 'lla', 'tre'], solucion: ['es', 'tre', 'lla'] },
        { pregunta: 'Ordena las sílabas:', img: 'regalo', silabas: ['lo', 're', 'ga'], solucion: ['re', 'ga', 'lo'] }
      ]
    },
    {
      titulo: 'Contar las sílabas', tipo: 'elegir', preguntas: [
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'adorno', opciones: ['1', '2', '3', '4'], correcta: 2 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'estanque', opciones: ['1', '2', '3', '4'], correcta: 2 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'gato', opciones: ['1', '2', '3', '4'], correcta: 1 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'sol', opciones: ['1', '2', '3', '4'], correcta: 0 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'profesor', opciones: ['1', '2', '3', '4'], correcta: 2 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'árbol', opciones: ['1', '2', '3', '4'], correcta: 1 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'abuela', opciones: ['1', '2', '3', '4'], correcta: 2 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'dulce', opciones: ['1', '2', '3', '4'], correcta: 1 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'estuche', opciones: ['1', '2', '3', '4'], correcta: 2 },
        { pregunta: 'Cuenta el número de sílabas y elige la respuesta correcta:', frase: 'papelera', opciones: ['1', '2', '3', '4'], correcta: 3 }
      ]
    },
    {
      titulo: 'Forma la palabra', tipo: 'ordenar', preguntas: [
        { pregunta: 'Ordena las sílabas y encuentra la palabra secreta:', silabas: ['rro', 'pe'], solucion: ['pe', 'rro'] },
        { pregunta: 'Ordena las sílabas y encuentra la palabra secreta:', silabas: ['la', 'mo', 'chi'], solucion: ['mo', 'chi', 'la'] },
        { pregunta: 'Ordena las sílabas y encuentra la palabra secreta:', silabas: ['sa', 'yu', 'no', 'de'], solucion: ['de', 'sa', 'yu', 'no'] },
        { pregunta: 'Ordena las sílabas y encuentra la palabra secreta:', silabas: ['der', 'cua', 'no'], solucion: ['cua', 'der', 'no'] },
        { pregunta: 'Ordena las sílabas y encuentra la palabra secreta:', silabas: ['ser', 'cio', 'vi'], solucion: ['ser', 'vi', 'cio'] }
      ]
    },
    {
      titulo: 'Separa las palabras', tipo: 'separar', preguntas: [
        { pregunta: 'Separa las palabras poniendo espacios:', frase: 'Megustajugar', solucion: 'Me-gusta-jugar' },
        { pregunta: 'Separa las palabras poniendo espacios:', frase: 'Yoleobien', solucion: 'Yo-leo-bien' },
        { pregunta: 'Separa las palabras poniendo espacios:', frase: 'Comomuchafruta', solucion: 'Como-mucha-fruta' },
        { pregunta: 'Separa las palabras poniendo espacios:', frase: 'Anaduermepoco', solucion: 'Ana-duerme-poco' },
        { pregunta: 'Separa las palabras poniendo espacios:', frase: 'Bajolasescaleras', solucion: 'Bajo-las-escaleras' }
      ]
    }
  ],

  105001: [
    {
      titulo: 'Negra o Silencio', tipo: 'elegir', preguntas: [
        {
          pregunta: '¿Cuál es el símbolo de la negra?', correcta: 3,
          opciones: [
            { img: 'claveSol', texto: 'Clave de sol' }, { img: 'silencioNegra', texto: 'Silencio de negra' },
            { img: 'sostenido', texto: 'Sostenido' }, { img: 'negra', texto: 'Nota negra' }
          ]
        },
        {
          pregunta: '¿Cuál es el símbolo del silencio?', correcta: 1,
          opciones: [
            { img: 'claveSol', texto: 'Clave de sol' }, { img: 'silencioNegra', texto: 'Silencio de negra' },
            { img: 'sostenido', texto: 'Sostenido' }, { img: 'negra', texto: 'Nota negra' }
          ]
        }
      ]
    },
    {
      titulo: 'Crotchet and crotchet rest', tipo: 'unir', preguntas: [
        {
          pregunta: 'Crotchet or crotchet rest',
          izquierda: [
            { id: 'negra', img: 'negra', pareja: 'crotchet' },
            { id: 'silencio', img: 'silencioNegra', pareja: 'rest' }
          ],
          derecha: [
            { id: 'crotchet', texto: 'Crotchet' },
            { id: 'rest', texto: 'Crotchet rest' }
          ]
        },
        {
          pregunta: 'Sound or silence?',
          izquierda: [
            { id: 'negra', img: 'negra', pareja: 'sound' },
            { id: 'silencio', img: 'silencioNegra', pareja: 'silence' }
          ],
          derecha: [
            { id: 'sound', texto: 'Sound' },
            { id: 'silence', texto: 'Silence' }
          ]
        }
      ]
    }
  ],

  105002: [
    {
      titulo: 'Seleccionar sonidos del cuerpo', tipo: 'elegir', preguntas: [
        {
          pregunta: 'Making sounds with my body. Choose correct.', correctas: [0, 2],
          opciones: [
            { img: 'manos', texto: 'Manos aplaudiendo' }, { img: 'ninoCallado', texto: 'Niño callado' },
            { img: 'ninoGritando', texto: 'Niño gritando' }, { img: 'coche', texto: 'Coche' }
          ]
        },
        {
          pregunta: 'What parts of your body can make sounds?', correctas: [0, 2],
          opciones: [
            { img: 'manos', texto: 'Manos aplaudiendo' }, { img: 'oreja', texto: 'Oreja' },
            { img: 'boca', texto: 'Voz de la boca' }, { img: 'ojos', texto: 'Ojos' }
          ]
        }
      ]
    },
    {
      titulo: 'Escuchar y colorear', tipo: 'colorear', preguntas: [
        { pregunta: 'Listen and draw', sonido: 'palmada', pulsos: [1, 0, 1, 0] },
        { pregunta: 'Listen and draw', sonido: 'palmada', pulsos: [1, 1, 0, 1] },
        { pregunta: 'Listen and draw', sonido: 'palmada', pulsos: [1, 0, 0, 1] },
        { pregunta: 'Listen and draw', sonido: 'palmada', pulsos: [1, 1, 1, 0] }
      ]
    }
  ],

  105003: [
    {
      titulo: 'Seleccionar sonidos en casa', tipo: 'elegir', preguntas: [
        {
          pregunta: 'Making sounds at home. Choose correct.', correctas: [0, 2],
          opciones: [
            { img: 'grifo', texto: 'Grifo con agua' }, { img: 'tren', texto: 'Tren' },
            { img: 'television', texto: 'Televisión' }, { img: 'coche', texto: 'Coche' }
          ]
        },
        {
          pregunta: 'Choose soft sounds', correctas: [1, 2],
          opciones: [
            { img: 'lavadora', texto: 'Lavadora' }, { img: 'tostador', texto: 'Tostador' },
            { img: 'grifo', texto: 'Grifo' }, { img: 'altavoz', texto: 'Altavoz musical' }
          ]
        },
        {
          pregunta: 'Choose loud sounds', correctas: [0, 3],
          opciones: [
            { img: 'lavadora', texto: 'Lavadora' }, { img: 'tostador', texto: 'Tostador' },
            { img: 'grifo', texto: 'Grifo' }, { img: 'altavoz', texto: 'Altavoz musical' }
          ]
        }
      ]
    },
    {
      titulo: 'Escuchar y elegir', tipo: 'elegir', preguntas: [
        {
          pregunta: 'Listen and choose correct symbols', sonido: 'claqueta', pulsos: [1, 0, 1, 1], correcta: 1,
          opciones: [[1, 1, 0, 1], [1, 0, 1, 1], [1, 0, 0, 1], [1, 1, 1, 0]]
        },
        {
          pregunta: 'Listen and choose correct symbols', sonido: 'claqueta', pulsos: [1, 1, 0, 0], correcta: 0,
          opciones: [[1, 1, 0, 0], [1, 0, 1, 0], [1, 0, 0, 1], [1, 1, 1, 0]]
        },
        {
          pregunta: 'Listen and choose correct symbols', sonido: 'claqueta', pulsos: [1, 0, 0, 1], correcta: 3,
          opciones: [[1, 0, 1, 1], [1, 1, 0, 1], [1, 1, 1, 1], [1, 0, 0, 1]]
        },
        {
          pregunta: 'Listen and choose correct symbols', sonido: 'claqueta', pulsos: [1, 1, 1, 0], correcta: 1,
          opciones: [[1, 0, 1, 0], [1, 1, 1, 0], [1, 1, 0, 1], [1, 0, 1, 1]]
        }
      ]
    }
  ]
};
