'use strict';

const app = document.getElementById('app');
const volver = document.querySelector('.volver');
let redibujar = null;   // vuelve a dibujar las líneas de unir al cambiar el tamaño de la pantalla
let estado = null;      // estado del ejercicio en curso

window.addEventListener('resize', () => redibujar && redibujar());
window.addEventListener('hashchange', mostrarRuta);
volver.addEventListener('click', ev => {
  if (app.querySelector('.ejercicio') && !confirm('¿Seguro que quieres salir del ejercicio?')) ev.preventDefault();
});
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
      ejercicios.map((e, i) => ({ texto: `${i + 1}. ${e.titulo}`, enlace: `${base}/ejercicio/${i + 1}` })));
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

function menu(titulo, opciones) {
  app.innerHTML = `<h2 class="titulo-menu">${titulo}</h2>` + (opciones.length
    ? `<nav class="menu">${opciones.map(o => `<a class="boton-menu" href="${o.enlace}">${o.texto}</a>`).join('')}</nav>`
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
    app.innerHTML = '<section class="fin"><p class="pregunta">¡Has terminado el ejercicio!</p><button class="boton-principal">Ver resultado</button></section>';
    app.querySelector('button').onclick = mostrarResultado;
    return;
  }

  const p = ejercicio.preguntas[indice];
  app.innerHTML = `<section class="ejercicio">
      <div class="barra"><span>${ejercicio.titulo}${estado.anterior ? ' · Revisión' : ''}</span><span>${indice + 1} / ${total}</span></div>
      <div class="zona"></div>
      <div class="acciones"><button class="boton-principal"></button></div>
    </section>`;
  const zona = app.querySelector('.zona');
  const boton = app.querySelector('.boton-principal');

  if (p.historia && estado.verHistoria) {
    zona.innerHTML = `<div class="historia">${p.historia.map(v => `<div class="vineta">${ESCENA[v]}</div>`).join('')}</div>`;
    boton.textContent = 'Continuar';
    boton.onclick = () => { estado.verHistoria = false; pintarPaso(); };
    return;
  }

  boton.textContent = indice === total - 1 ? 'Terminar' : 'Siguiente';
  boton.disabled = true;
  const listo = respuesta => { estado.actual = respuesta; boton.disabled = respuesta === null; };
  const previa = estado.anterior ? estado.anterior[indice] : undefined;
  if (ejercicio.tipo === 'unir') pintarUnir(zona, p, previa, listo);
  else pintarElegir(zona, p, previa, listo);

  boton.onclick = () => {
    estado.respuestas.push(estado.actual);
    estado.indice++;
    estado.verHistoria = true;
    pintarPaso();
  };
}

function esCorrecta(tipo, p, respuesta) {
  return tipo === 'unir' ? p.izquierda.every(e => respuesta[e.id] === e.pareja) : respuesta === p.correcta;
}

// Pregunta de elegir una opción (con imágenes o con texto)
function pintarElegir(zona, p, previa, listo) {
  const conImagen = typeof p.opciones[0] === 'object';
  zona.innerHTML = `<p class="pregunta">${p.pregunta}</p>
    ${p.frase ? `<p class="frase">${p.frase.replace('X', '<span class="hueco"></span>')}</p>` : ''}
    <div class="opciones${conImagen ? ' con-imagen' : ''}">${p.opciones.map((o, i) => {
      const marca = previa === i ? (i === p.correcta ? ' acierto' : ' fallo') : '';
      const contenido = conImagen ? `<svg viewBox="0 0 100 100" role="img" aria-label="${o.texto}">${IMG[o.img]}</svg>` : o;
      return `<button class="opcion${marca}" data-i="${i}">${contenido}</button>`;
    }).join('')}</div>`;

  const hueco = zona.querySelector('.hueco');
  const botones = zona.querySelectorAll('.opcion');
  botones.forEach(b => b.onclick = () => {
    botones.forEach(x => x.classList.toggle('elegida', x === b));
    if (hueco) hueco.textContent = p.opciones[b.dataset.i];
    listo(Number(b.dataset.i));
  });
}

// Pregunta de unir con líneas: se pulsa un elemento y después su pareja, o se arrastra de uno a otro
function pintarUnir(zona, p, previa, listo) {
  const tarjeta = (e, lado) => {
    const punto = '<i class="punto"></i>';
    const cuerpo = `<svg viewBox="0 0 100 100" aria-hidden="true">${IMG[e.img]}</svg><span>${e.texto}</span>`;
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
  const conexiones = {};   // id izquierda → id derecha
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

function cerrarResultado() {
  const fondo = document.querySelector('.fondo-resultado');
  if (fondo) fondo.remove();
}
