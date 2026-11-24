'use strict';

const app = document.getElementById('app');
const volver = document.querySelector('.volver');
const contadorCopas = document.querySelector('.copas span');
let copas = Number(sessionStorage.getItem('copas')) || 0;   // ejercicios aprobados mientras la pestaña siga abierta
document.querySelector('.copas svg').innerHTML = IMG.copa;
contadorCopas.textContent = copas;
let redibujar = null;   // vuelve a dibujar las líneas de unir al cambiar el tamaño de la pantalla
let estado = null;      // estado del ejercicio en curso
const REPRODUCTOR = '<div class="reproductor"><button class="escuchar">▶ Escuchar</button><span class="luces"><i></i><i></i><i></i><i></i></span></div>';

window.addEventListener('resize', () => redibujar && redibujar());
window.addEventListener('hashchange', mostrarRuta);
document.querySelectorAll('.inicio, .volver').forEach(enlace => enlace.addEventListener('click', ev => {
  if (app.querySelector('.ejercicio')) { ev.preventDefault(); confirmarSalida(enlace.getAttribute('href')); }
}));
mostrarRuta();

// ---------- Menú ----------

// Rutas: #/curso/1/asignatura/101/tema/101001/ejercicio/1
function mostrarRuta() {
  redibujar = null;
  cerrarResultado();
  const p = location.hash.replace(/^#\/?/, '').split('/');
  const curso = CURSOS.find(c => String(c.id) === p[1]);
  const asignatura = curso && curso.asignaturas.find(a => String(a.id) === p[3]);
  const tema = asignatura && asignatura.temas.find(t => String(t.id) === p[5]);
  const ejercicios = (tema && EJERCICIOS[tema.id]) || [];
  const ejercicio = ejercicios[p[7] - 1];
  const base = tema && `#/curso/${curso.id}/asignatura/${asignatura.id}/tema/${tema.id}`;

  volver.hidden = !curso;
  volver.href = ejercicio ? base : tema ? `#/curso/${curso.id}/asignatura/${asignatura.id}` : asignatura ? `#/curso/${curso.id}` : '#/';

  if (ejercicio) return iniciarEjercicio(ejercicio, base, null);
  if (tema) {
    return menu(`${asignatura.nombre} · ${tema.nombre}`,
      ejercicios.map((e, i) => ({ texto: `${i + 1}. ${e.titulo}`, enlace: `${base}/ejercicio/${i + 1}` })), 'ejercicios');
  }
  if (asignatura) {
    return menu(`${curso.nombre} · ${asignatura.nombre}`,
      asignatura.temas.map(t => ({ texto: t.nombre, enlace: `#/curso/${curso.id}/asignatura/${asignatura.id}/tema/${t.id}` })));
  }
  if (curso) {
    return menu(curso.nombre, curso.asignaturas.map(a => ({ texto: a.nombre, enlace: `#/curso/${curso.id}/asignatura/${a.id}` })));
  }
  menu('Elige tu curso', CURSOS.map(c => ({ texto: c.nombre, enlace: `#/curso/${c.id}` })));
}

function menu(titulo, opciones, clase = '') {
  app.innerHTML = `<h2 class="titulo-menu">${titulo}</h2>` + (opciones.length
    ? `<nav class="menu ${clase}">${opciones.map(o => `<a class="boton-menu" href="${o.enlace}">${o.texto}</a>`).join('')}</nav>`
    : '<p class="aviso">Todavía no hay ejercicios</p>');
}

// ---------- Ejercicio ----------

// "anterior" son las respuestas del intento previo cuando se revisa el ejercicio
function iniciarEjercicio(ejercicio, volver, anterior) {
  estado = { ejercicio, volver, anterior, indice: 0, verHistoria: true, respuestas: [], actual: null };
  pintarPaso();
}

function pintarPaso() {
  redibujar = null;
  const { ejercicio, indice } = estado;
  const total = ejercicio.preguntas.length;

  if (indice === total) {
    app.innerHTML = `<section class="fin"><p class="pregunta">¡Has terminado el ejercicio!</p>
      <div class="botones"><button class="boton-secundario">Anterior</button><button class="boton-principal">Ver resultado</button></div></section>`;
    app.querySelector('.boton-secundario').onclick = retroceder;
    app.querySelector('.boton-principal').onclick = mostrarResultado;
    return;
  }

  const p = ejercicio.preguntas[indice];
  const esPrimero = indice === 0 && (!p.historia || estado.verHistoria);
  app.innerHTML = `<section class="ejercicio">
      <div class="barra"><span>${ejercicio.titulo}${estado.anterior ? ' · Revisión' : ''}</span><span>${indice + 1} / ${total}</span></div>
      <div class="zona"></div>
      <div class="acciones"><button class="boton-secundario"${esPrimero ? ' hidden' : ''}>Anterior</button><button class="boton-principal"></button></div>
    </section>`;
  const zona = app.querySelector('.zona');
  const boton = app.querySelector('.boton-principal');
  app.querySelector('.boton-secundario').onclick = retroceder;

  if (p.historia && estado.verHistoria) {
    zona.innerHTML = `<div class="historia">${p.historia.map(v => `<div class="vineta">${ESCENA[v]}</div>`).join('')}</div>`;
    boton.textContent = 'Continuar';
    boton.onclick = () => { estado.verHistoria = false; pintarPaso(); };
    return;
  }

  boton.textContent = indice === total - 1 ? 'Terminar' : 'Siguiente';
  boton.disabled = true;
  estado.actual = null;
  const listo = respuesta => { estado.actual = respuesta; boton.disabled = respuesta === null; };
  const previa = estado.anterior ? estado.anterior[indice] : undefined;
  const guardada = estado.respuestas[indice];   // respuesta dada antes de volver atrás
  if (ejercicio.tipo === 'unir') pintarUnir(zona, p, previa, guardada, listo);
  else if (ejercicio.tipo === 'colorear') pintarColorear(zona, p, previa, guardada, listo);
  else pintarElegir(zona, p, previa, guardada, listo, ejercicio.apiladas);

  boton.onclick = () => {
    estado.respuestas[indice] = estado.actual;
    estado.indice++;
    estado.verHistoria = true;
    pintarPaso();
  };
}

// Vuelve al paso anterior de la secuencia (de la pregunta a su historia, o a la pregunta anterior)
function retroceder() {
  const { ejercicio, indice } = estado;
  const enPregunta = indice < ejercicio.preguntas.length && !(ejercicio.preguntas[indice].historia && estado.verHistoria);
  if (enPregunta) estado.respuestas[indice] = estado.actual;
  if (enPregunta && ejercicio.preguntas[indice].historia) estado.verHistoria = true;
  else { estado.indice--; estado.verHistoria = false; }
  pintarPaso();
}

function esCorrecta(tipo, p, respuesta) {
  if (tipo === 'unir') return p.izquierda.every(e => respuesta[e.id] === e.pareja);
  if (tipo === 'colorear') return respuesta.every((marca, i) => marca === p.pulsos[i]);
  if (p.correctas) return respuesta.length === p.correctas.length && p.correctas.every(i => respuesta.includes(i));
  return respuesta === p.correcta;
}

// Pregunta de elegir: una o varias opciones, con imágenes, con texto o con ritmos
function pintarElegir(zona, p, previa, guardada, listo, apiladas) {
  const varias = Array.isArray(p.correctas);
  const esBuena = i => varias ? p.correctas.includes(i) : i === p.correcta;
  const marcada = (respuesta, i) => varias ? (respuesta || []).includes(i) : respuesta === i;
  const conImagen = Boolean(p.opciones[0].img);
  const conRitmo = Array.isArray(p.opciones[0]);
  zona.innerHTML = `<p class="pregunta">${p.pregunta}</p>
    ${p.pulsos ? REPRODUCTOR : ''}
    ${p.frase ? `<p class="frase">${p.frase.replace('X', '<span class="hueco"></span>')}</p>` : ''}
    <div class="opciones${conImagen ? ' con-imagen' : ''}${apiladas ? ' apiladas' : ''}">${p.opciones.map((o, i) => {
      const marca = marcada(previa, i) ? (esBuena(i) ? ' acierto' : ' fallo') : '';
      const contenido = conImagen ? `<svg viewBox="0 0 100 100" role="img" aria-label="${o.texto}">${IMG[o.img]}</svg>`
        : conRitmo ? `<span class="ritmo">${o.map(s => `<svg viewBox="0 0 100 100" aria-hidden="true">${IMG[s ? 'negra' : 'silencioNegra']}</svg>`).join('')}</span>`
        : o;
      return `<button class="opcion${marca}" data-i="${i}">${contenido}</button>`;
    }).join('')}</div>`;
  if (p.pulsos) activarReproductor(zona, p);

  const hueco = zona.querySelector('.hueco');
  const botones = zona.querySelectorAll('.opcion');
  botones.forEach(b => b.onclick = () => {
    if (varias) b.classList.toggle('elegida');
    else botones.forEach(x => x.classList.toggle('elegida', x === b));
    if (hueco) hueco.textContent = p.opciones[b.dataset.i];
    const elegidas = [...botones].filter(x => x.classList.contains('elegida')).map(x => Number(x.dataset.i));
    listo(varias ? (elegidas.length ? elegidas : null) : Number(b.dataset.i));
  });
  if (varias && guardada) guardada.forEach(i => botones[i].click());
  else if (!varias && guardada != null) botones[guardada].click();
}

// Pregunta de escuchar y colorear: cuadrado verde es sonido y cuadrado hueco es silencio
function pintarColorear(zona, p, previa, guardada, listo) {
  // Al revisar se parte de lo que se eligió en el intento anterior
  const marcas = [...(guardada || previa || p.pulsos.map(() => 0))];
  zona.innerHTML = `<p class="pregunta">${p.pregunta}</p>${REPRODUCTOR}
    <div class="cuadrados">${p.pulsos.map((pulso, i) => {
      const marca = previa ? (previa[i] === pulso ? ' acierto' : ' fallo') : '';
      return `<button class="cuadrado${marca}" aria-label="Pulso ${i + 1}"></button>`;
    }).join('')}</div>`;
  activarReproductor(zona, p);

  const cuadrados = zona.querySelectorAll('.cuadrado');
  const pintar = () => {
    cuadrados.forEach((c, i) => c.classList.toggle('sonido', marcas[i] === 1));
    listo([...marcas]);
  };
  cuadrados.forEach((c, i) => c.onclick = () => { marcas[i] = 1 - marcas[i]; pintar(); });
  pintar();
}

// Pregunta de unir con líneas: se pulsa un elemento y después su pareja, o se arrastra de uno a otro
function pintarUnir(zona, p, previa, guardada, listo) {
  const tarjeta = (e, lado) => {
    const punto = '<i class="punto"></i>';
    const cuerpo = (e.img ? `<svg viewBox="0 0 100 100" aria-hidden="true">${IMG[e.img]}</svg>` : '') + (e.texto ? `<span>${e.texto}</span>` : '');
    return `<button class="elemento" data-lado="${lado}" data-id="${e.id}">${lado === 'izq' ? cuerpo + punto : punto + cuerpo}</button>`;
  };
  zona.innerHTML = `<p class="pregunta">${p.pregunta}</p>
    <div class="unir">
      <div class="columna">${p.izquierda.map(e => tarjeta(e, 'izq')).join('')}</div>
      <div class="columna">${p.derecha.map(e => tarjeta(e, 'der')).join('')}</div>
      <svg class="lineas"></svg>
    </div>`;

  const caja = zona.querySelector('.unir');
  const lienzo = zona.querySelector('.lineas');
  const elemento = (lado, id) => caja.querySelector(`[data-lado="${lado}"][data-id="${id}"]`);
  const conexiones = { ...guardada };   // id izquierda → id derecha
  let origen = null;       // elemento pulsado pendiente de unir
  let puntero = null;      // posición del dedo mientras se arrastra

  const posicion = (x, y) => { const c = caja.getBoundingClientRect(); return [x - c.left, y - c.top]; };
  const centro = el => { const r = el.querySelector('.punto').getBoundingClientRect(); return posicion(r.left + r.width / 2, r.top + r.height / 2); };
  const linea = ([x1, y1], [x2, y2], clase) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="${clase}"/>`;

  function dibujar() {
    let s = '';
    if (previa) {
      for (const e of p.izquierda) {
        s += linea(centro(elemento('izq', e.id)), centro(elemento('der', previa[e.id])), previa[e.id] === e.pareja ? 'acierto' : 'fallo');
      }
    }
    for (const iz in conexiones) s += linea(centro(elemento('izq', iz)), centro(elemento('der', conexiones[iz])), 'nueva');
    if (origen && puntero) s += linea(centro(origen), puntero, 'nueva');
    lienzo.innerHTML = s;
    caja.querySelectorAll('.elemento').forEach(el => el.classList.toggle('elegida', el === origen));
  }

  function unir(a, b) {
    const iz = a.dataset.lado === 'izq' ? a : b;
    const de = iz === a ? b : a;
    for (const k in conexiones) if (conexiones[k] === de.dataset.id) delete conexiones[k];
    conexiones[iz.dataset.id] = de.dataset.id;
    listo(Object.keys(conexiones).length === p.izquierda.length ? { ...conexiones } : null);
  }

  caja.addEventListener('pointerdown', ev => {
    const el = ev.target.closest('.elemento');
    if (!el) return;
    ev.preventDefault();
    if (origen && origen.dataset.lado !== el.dataset.lado) { unir(origen, el); origen = null; }
    else origen = el;
    puntero = null;
    dibujar();
  });
  caja.addEventListener('pointermove', ev => {
    if (!origen || !ev.buttons) return;
    puntero = posicion(ev.clientX, ev.clientY);
    dibujar();
  });
  caja.addEventListener('pointerup', ev => {
    if (origen && puntero) {
      const destino = document.elementFromPoint(ev.clientX, ev.clientY);
      const el = destino && destino.closest('.elemento');
      if (el && el.dataset.lado !== origen.dataset.lado) { unir(origen, el); origen = null; }
    }
    puntero = null;
    dibujar();
  });

  redibujar = dibujar;
  dibujar();
  if (guardada) listo(guardada);
}

// ---------- Sonido sintetizado ----------

const PASO_PULSO = 0.7;   // segundos entre pulsos
let audio = null;

// Las luces se encienden en cada pulso (también en los silencios) para poder seguir el ritmo
function activarReproductor(zona, p) {
  const boton = zona.querySelector('.escuchar');
  const luces = zona.querySelectorAll('.luces i');
  boton.onclick = () => {
    audio = audio || new (window.AudioContext || window.webkitAudioContext)();
    audio.resume();
    const inicio = audio.currentTime + 0.15;
    boton.disabled = true;
    p.pulsos.forEach((pulso, i) => {
      if (pulso) (p.sonido === 'palmada' ? palmada : claqueta)(inicio + i * PASO_PULSO);
      setTimeout(() => luces.forEach((l, j) => l.classList.toggle('activa', j === i)), (0.15 + i * PASO_PULSO) * 1000);
    });
    setTimeout(() => { luces.forEach(l => l.classList.remove('activa')); boton.disabled = false; }, (0.15 + p.pulsos.length * PASO_PULSO) * 1000);
  };
}

// Palmada: ruido corto filtrado que se apaga muy rápido
function palmada(t) {
  const muestras = Math.floor(audio.sampleRate * 0.2);
  const buffer = audio.createBuffer(1, muestras, audio.sampleRate);
  const datos = buffer.getChannelData(0);
  for (let i = 0; i < muestras; i++) datos[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / muestras, 8);
  const fuente = audio.createBufferSource();
  const filtro = audio.createBiquadFilter();
  filtro.type = 'bandpass';
  filtro.frequency.value = 1500;
  filtro.Q.value = 0.7;
  fuente.buffer = buffer;
  fuente.connect(filtro).connect(audio.destination);
  fuente.start(t);
}

// Claqueta: golpe seco de madera
function claqueta(t) {
  const oscilador = audio.createOscillator();
  const volumen = audio.createGain();
  oscilador.type = 'triangle';
  oscilador.frequency.setValueAtTime(1300, t);
  oscilador.frequency.exponentialRampToValueAtTime(800, t + 0.05);
  volumen.gain.setValueAtTime(0.9, t);
  volumen.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
  oscilador.connect(volumen).connect(audio.destination);
  oscilador.start(t);
  oscilador.stop(t + 0.1);
}

// ---------- Resultado ----------

const FUEGOS = '<div class="fuegos">' + [[12, 18, '#ff5252', 0], [86, 14, '#ffd23f', .5], [18, 78, '#40c4ff', .9], [84, 76, '#69f0ae', .3], [50, 8, '#ff80ab', 1.2]]
  .map(([x, y, color, retardo]) => `<svg viewBox="-50 -50 100 100" style="left:${x}%;top:${y}%;animation-delay:${retardo}s">` +
    Array.from({ length: 12 }, (_, i) => `<line x1="0" y1="-16" x2="0" y2="-44" stroke="${color}" stroke-width="6" stroke-linecap="round" transform="rotate(${i * 30})"/>`).join('') +
    '</svg>').join('') + '</div>';

function mostrarResultado() {
  const { ejercicio, respuestas, volver } = estado;
  const total = ejercicio.preguntas.length;
  const puntos = ejercicio.preguntas.filter((p, i) => esCorrecta(ejercicio.tipo, p, respuestas[i])).length;
  const nivel = puntos === total ? 'perfecto' : puntos >= total / 2 ? 'aprobado' : 'mejorar';
  const mensaje = { perfecto: '¡PERFECTO!', aprobado: '¡APROBADO!', mejorar: '¡Puedes hacerlo mejor!' }[nivel];
  if (nivel !== 'mejorar') {
    copas++;
    sessionStorage.setItem('copas', copas);
    contadorCopas.textContent = copas;
  }

  const fondo = document.createElement('div');
  fondo.className = 'fondo-resultado';
  fondo.innerHTML = `${nivel === 'perfecto' ? FUEGOS : ''}
    <div class="resultado ${nivel}" role="dialog" aria-modal="true" aria-label="Resultado">
      <svg class="icono-resultado" viewBox="0 0 100 100" aria-hidden="true">${nivel === 'mejorar' ? IMG.exclamacion : IMG.copa}</svg>
      <p class="mensaje">${mensaje}</p>
      <p class="puntos">${puntos} de ${total}</p>
      <div class="botones"><button class="boton-principal revisar">Revisar</button><a class="boton-secundario" href="${volver}">Salir</a></div>
    </div>`;
  document.body.append(fondo);
  fondo.querySelector('.revisar').onclick = () => { cerrarResultado(); iniciarEjercicio(ejercicio, volver, respuestas); };
}

function confirmarSalida(destino) {
  const fondo = document.createElement('div');
  fondo.className = 'fondo-resultado';
  fondo.innerHTML = `<div class="resultado confirmacion" role="dialog" aria-modal="true" aria-label="Salir del ejercicio">
      <p class="mensaje">¿Seguro que quieres salir del ejercicio?</p>
      <div class="botones"><button class="boton-principal">Seguir</button><a class="boton-secundario" href="${destino}">Salir</a></div>
    </div>`;
  document.body.append(fondo);
  fondo.querySelector('button').onclick = cerrarResultado;
}

function cerrarResultado() {
  const fondo = document.querySelector('.fondo-resultado');
  if (fondo) fondo.remove();
}
