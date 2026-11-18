// Dibujos SVG propios de la aplicación. Cada dibujo de IMG ocupa una caja de 100 x 100.
// Las viñetas de ESCENA ocupan una caja de 160 x 100.

const TRAZO = 'fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"';

function estrella(cx, cy, r, color) {
  const puntos = [];
  for (let i = 0; i < 10; i++) {
    const radio = i % 2 ? r * 0.45 : r, angulo = Math.PI / 5 * i - Math.PI / 2;
    puntos.push((cx + radio * Math.cos(angulo)).toFixed(1) + ',' + (cy + radio * Math.sin(angulo)).toFixed(1));
  }
  return `<polygon points="${puntos.join(' ')}" fill="${color}"/>`;
}

function gota(x, y) {
  return `<path d="M${x} ${y} q-4 7 0 9 q4 -2 0 -9Z" fill="#3a7bd5"/>`;
}

// Cara para la cabeza centrada en (50, 32)
function cara(animo) {
  let s = '<circle cx="44" cy="31" r="2" fill="#333"/><circle cx="56" cy="31" r="2" fill="#333"/>';
  if (animo === 'contento') s += `<path d="M43 37 Q50 44 57 37" ${TRAZO}/><circle cx="39" cy="37" r="2.5" fill="#f4a3a3"/><circle cx="61" cy="37" r="2.5" fill="#f4a3a3"/>`;
  if (animo === 'risa') s += '<path d="M43 36 Q50 46 57 36Z" fill="#a33" stroke="#333" stroke-width="1.5"/><circle cx="39" cy="37" r="2.5" fill="#f4a3a3"/><circle cx="61" cy="37" r="2.5" fill="#f4a3a3"/>';
  if (animo === 'triste') s += `<path d="M44 41 Q50 36 56 41" ${TRAZO}/><path d="M40 27 L46 25 M60 27 L54 25" ${TRAZO}/>` + '<path d="M57 34 q-2 4 0 5 q2 -1 0 -5Z" fill="#6cc3f5"/>';
  if (animo === 'enfadado') s += `<path d="M44 40 L56 40" ${TRAZO}/><path d="M39 25 L47 28.5 M61 25 L53 28.5" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>` + '<circle cx="39" cy="37" r="3" fill="#f07070"/><circle cx="61" cy="37" r="3" fill="#f07070"/>';
  return s;
}

function persona({ ropa, piel = '#f6c9a0', detras = '', pelo = '', delante = '', animo = 'contento' }) {
  return `${detras}
    <rect x="40" y="76" width="8" height="18" rx="3" fill="#35495e"/><rect x="52" y="76" width="8" height="18" rx="3" fill="#35495e"/>
    <path d="M37 54 L28 70 M63 54 L72 70" stroke="${ropa}" stroke-width="7" stroke-linecap="round"/>
    <path d="M36 52 Q50 45 64 52 L67 80 L33 80 Z" fill="${ropa}"/>
    <circle cx="28" cy="71" r="3.5" fill="${piel}"/><circle cx="72" cy="71" r="3.5" fill="${piel}"/>
    <circle cx="50" cy="32" r="15" fill="${piel}"/>
    ${pelo}${cara(animo)}${delante}`;
}

const PELO_NINO = '<path d="M35 31 Q34 15 50 16 Q66 15 65 31 Q60 22 50 22 Q42 21 35 31Z" fill="#6b3e1e"/>';
const nino = animo => persona({ ropa: '#3a7bd5', pelo: PELO_NINO, animo });

const CERDO = `
  <rect x="36" y="66" width="6" height="14" rx="2" fill="#f08fa8"/><rect x="46" y="68" width="6" height="14" rx="2" fill="#f08fa8"/>
  <rect x="62" y="68" width="6" height="14" rx="2" fill="#f08fa8"/><rect x="72" y="66" width="6" height="14" rx="2" fill="#f08fa8"/>
  <path d="M83 56 q9 -3 5 -9 q-4 -3 -4 3" fill="none" stroke="#f08fa8" stroke-width="2.5" stroke-linecap="round"/>
  <ellipse cx="56" cy="60" rx="28" ry="18" fill="#f9a8c0"/>
  <path d="M27 38 L31 28 L37 39Z" fill="#f08fa8"/>
  <circle cx="30" cy="50" r="15" fill="#f9a8c0"/>
  <ellipse cx="18" cy="54" rx="6" ry="5" fill="#f08fa8"/><circle cx="16" cy="54" r="1.2" fill="#333"/><circle cx="20" cy="54" r="1.2" fill="#333"/>
  <circle cx="28" cy="46" r="2" fill="#333"/>
  <path d="M22 61 Q27 65 32 60" ${TRAZO}/>
  <path d="M56 46 Q60 18 88 20 Q78 28 82 36 Q72 32 66 46Z" fill="#fff" stroke="#9fb3c8" stroke-width="1.5"/>
  <path d="M66 32 Q72 28 80 28 M64 38 Q70 34 78 35" fill="none" stroke="#9fb3c8" stroke-width="1.2"/>`;

const IMG = {
  nino: nino('contento'),
  ninoTriste: nino('triste'),
  ninoEnfadado: nino('enfadado'),

  bruja: persona({
    ropa: '#6a3d9a',
    detras: '<path d="M34 30 Q28 50 36 58 L40 34Z M66 30 Q72 50 64 58 L60 34Z" fill="#e8742a"/>',
    pelo: '<path d="M27 22 Q50 26 73 22 L73 18 Q50 22 27 18Z" fill="#2d1b4e"/><path d="M37 20 L58 0 L63 20Z" fill="#2d1b4e"/>',
    animo: 'risa'
  }),

  mago: persona({
    ropa: '#2b4ea2',
    pelo: '<path d="M29 21 L71 21 L67 17 L33 17Z" fill="#1e3a8a"/><path d="M36 18 L52 -2 L64 18Z" fill="#1e3a8a"/>' + estrella(51, 9, 4, '#ffd23f'),
    delante: '<path d="M37 34 Q38 58 50 62 Q62 58 63 34 Q57 41 50 41 Q43 41 37 34Z" fill="#eee"/>' +
      '<path d="M76 92 L76 30" stroke="#8d5524" stroke-width="3" stroke-linecap="round"/><circle cx="76" cy="28" r="5" fill="#6cc3f5"/>' +
      '<circle cx="72" cy="71" r="3.5" fill="#f6c9a0"/>'
  }),

  duende: persona({
    ropa: '#2e9e4f',
    detras: '<path d="M36 30 L22 22 L37 40Z M64 30 L78 22 L63 40Z" fill="#f6c9a0"/>',
    pelo: '<path d="M33 25 Q50 14 67 25 L60 2 Z" fill="#1f7a3a"/><circle cx="60" cy="2" r="3" fill="#ffd23f"/><circle cx="50" cy="35" r="2.5" fill="#e88"/>'
  }),

  hada: persona({
    ropa: '#ff7eb6',
    detras: '<ellipse cx="30" cy="50" rx="13" ry="22" fill="#bfe7ff" opacity=".9" transform="rotate(-30 30 50)"/>' +
      '<ellipse cx="70" cy="50" rx="13" ry="22" fill="#bfe7ff" opacity=".9" transform="rotate(30 70 50)"/>' +
      '<path d="M33 32 Q32 14 50 15 Q68 14 67 32 L66 52 L34 52Z" fill="#f2c94c"/>',
    pelo: '<path d="M36 28 Q42 18 50 19 Q58 18 64 28 Q56 23 50 24 Q44 23 36 28Z" fill="#f2c94c"/>' + estrella(50, 17, 4, '#ff7eb6'),
    delante: '<path d="M72 71 L84 48" stroke="#8d5524" stroke-width="2.5" stroke-linecap="round"/>' + estrella(85, 45, 7, '#ffd23f')
  }),

  cerdo: CERDO,

  puerta: `<rect x="22" y="5" width="56" height="92" rx="3" fill="#5d3a1a"/><rect x="26" y="9" width="48" height="88" rx="2" fill="#8d5524"/>
    <rect x="32" y="16" width="36" height="30" rx="3" fill="#a0632e"/><rect x="32" y="54" width="36" height="34" rx="3" fill="#a0632e"/>
    <circle cx="66" cy="52" r="3.5" fill="#f2c94c"/>`,

  ventana: `<rect x="12" y="14" width="76" height="70" rx="3" fill="#bfe7ff" stroke="#8d5524" stroke-width="6"/>
    <circle cx="30" cy="34" r="6" fill="#fff"/><circle cx="37" cy="32" r="7" fill="#fff"/>
    <path d="M50 17 V81 M15 49 H85" stroke="#8d5524" stroke-width="4"/>
    <path d="M15 17 Q26 40 16 66 L15 66Z M85 17 Q74 40 84 66 L85 66Z" fill="#e74c3c"/>
    <rect x="6" y="84" width="88" height="7" rx="2" fill="#8d5524"/>`,

  tortuga: `<ellipse cx="32" cy="74" rx="7" ry="9" fill="#7cc576"/><ellipse cx="68" cy="74" rx="7" ry="9" fill="#7cc576"/>
    <path d="M14 66 L6 70 L16 70Z" fill="#7cc576"/>
    <circle cx="84" cy="56" r="11" fill="#7cc576"/><circle cx="87" cy="53" r="2" fill="#333"/><path d="M83 61 Q87 64 91 60" ${TRAZO}/>
    <path d="M16 70 Q18 30 50 30 Q82 30 84 70Z" fill="#3e8e41"/>
    <path d="M38 42 L50 36 L62 42 L62 56 L50 62 L38 56Z" fill="#5fb85f"/>
    <path d="M22 60 L30 50 M78 60 L70 50" stroke="#5fb85f" stroke-width="4" stroke-linecap="round"/>
    <rect x="14" y="66" width="72" height="7" rx="3" fill="#2e6b30"/>`,

  conejo: `<ellipse cx="40" cy="20" rx="6" ry="17" fill="#f4f4f4" stroke="#bbb"/><ellipse cx="40" cy="22" rx="3" ry="12" fill="#f9b4c8"/>
    <ellipse cx="60" cy="20" rx="6" ry="17" fill="#f4f4f4" stroke="#bbb"/><ellipse cx="60" cy="22" rx="3" ry="12" fill="#f9b4c8"/>
    <ellipse cx="50" cy="72" rx="20" ry="21" fill="#f4f4f4" stroke="#bbb"/><ellipse cx="50" cy="76" rx="11" ry="13" fill="#fff"/>
    <ellipse cx="38" cy="93" rx="8" ry="4" fill="#f4f4f4" stroke="#bbb"/><ellipse cx="62" cy="93" rx="8" ry="4" fill="#f4f4f4" stroke="#bbb"/>
    <circle cx="50" cy="44" r="15" fill="#f4f4f4" stroke="#bbb"/>
    <circle cx="44" cy="41" r="2" fill="#333"/><circle cx="56" cy="41" r="2" fill="#333"/>
    <ellipse cx="50" cy="47" rx="2.5" ry="2" fill="#f08fa8"/>
    <path d="M47 51 Q50 53 53 51" ${TRAZO}/><rect x="48" y="52" width="4" height="4" fill="#fff" stroke="#bbb" stroke-width=".8"/>
    <path d="M42 48 L30 46 M42 50 L30 52 M58 48 L70 46 M58 50 L70 52" stroke="#999" stroke-width="1"/>`,

  rapido: `<path d="M8 32 H24 M4 50 H20 M10 68 H26" stroke="#3a7bd5" stroke-width="5" stroke-linecap="round"/>
    <path d="M58 6 L30 54 L50 54 L42 94 L80 40 L58 40 L70 6Z" fill="#ffd23f" stroke="#e0a800" stroke-width="2.5" stroke-linejoin="round"/>`,

  inteligente: `<path d="M50 4 V10 M20 16 L25 21 M80 16 L75 21 M8 42 H15 M85 42 H92" stroke="#e0a800" stroke-width="4" stroke-linecap="round"/>
    <path d="M50 16 Q26 16 26 40 Q26 54 38 62 L38 70 L62 70 L62 62 Q74 54 74 40 Q74 16 50 16Z" fill="#ffe066" stroke="#e0a800" stroke-width="2.5"/>
    <path d="M44 62 L44 48 L50 54 L56 48 L56 62" fill="none" stroke="#e08a00" stroke-width="2"/>
    <rect x="38" y="70" width="24" height="14" rx="3" fill="#9aa5b1"/><path d="M38 75 H62 M38 80 H62" stroke="#6b7682" stroke-width="2"/>
    <path d="M44 84 Q50 92 56 84Z" fill="#6b7682"/>`,

  hechizos: `<path d="M18 88 L60 46" stroke="#333" stroke-width="7" stroke-linecap="round"/><path d="M54 52 L60 46" stroke="#fff" stroke-width="7" stroke-linecap="round"/>
    ${estrella(68, 36, 18, '#ffd23f')}${estrella(34, 22, 9, '#b06ce0')}${estrella(86, 70, 8, '#ff7eb6')}${estrella(22, 56, 6, '#6cc3f5')}
    <path d="M84 12 V22 M79 17 H89 M48 76 V84 M44 80 H52" stroke="#b06ce0" stroke-width="2.5" stroke-linecap="round"/>`,

  lluvia: `<g fill="#9fb3c8"><circle cx="34" cy="38" r="15"/><circle cx="54" cy="30" r="20"/><circle cx="72" cy="42" r="14"/><rect x="20" y="38" width="66" height="18" rx="9"/></g>
    ${gota(30, 64)}${gota(48, 70)}${gota(66, 64)}${gota(38, 82)}${gota(58, 84)}${gota(76, 80)}`,

  gusano: `<circle cx="16" cy="72" r="9" fill="#8bc34a"/><circle cx="28" cy="66" r="10" fill="#7cb342"/><circle cx="41" cy="71" r="10" fill="#8bc34a"/>
    <circle cx="54" cy="66" r="11" fill="#7cb342"/>
    <circle cx="70" cy="58" r="15" fill="#8bc34a"/>
    <circle cx="65" cy="54" r="2.2" fill="#333"/><circle cx="76" cy="54" r="2.2" fill="#333"/><path d="M64 62 Q70 67 77 62" ${TRAZO}/>
    <path d="M64 44 Q62 34 56 32 M76 44 Q78 34 84 32" ${TRAZO}/>`,

  mariposa: `<ellipse cx="31" cy="38" rx="22" ry="17" fill="#ff8a3d" transform="rotate(-20 31 38)"/><ellipse cx="69" cy="38" rx="22" ry="17" fill="#ff8a3d" transform="rotate(20 69 38)"/>
    <ellipse cx="36" cy="66" rx="14" ry="12" fill="#ffb74d"/><ellipse cx="64" cy="66" rx="14" ry="12" fill="#ffb74d"/>
    <circle cx="27" cy="36" r="6" fill="#fff"/><circle cx="73" cy="36" r="6" fill="#fff"/><circle cx="36" cy="68" r="4" fill="#fff"/><circle cx="64" cy="68" r="4" fill="#fff"/>
    <ellipse cx="50" cy="54" rx="5" ry="24" fill="#4a2c1a"/><circle cx="50" cy="28" r="6" fill="#4a2c1a"/>
    <path d="M48 23 Q42 10 36 8 M52 23 Q58 10 64 8" fill="none" stroke="#4a2c1a" stroke-width="2" stroke-linecap="round"/>`,

  suelo: `<rect x="2" y="34" width="96" height="62" rx="8" fill="#8d6e4a"/><rect x="2" y="30" width="96" height="12" rx="5" fill="#6abf4b"/>
    <path d="M10 30 L13 20 L16 30 M30 30 L34 18 L37 30 M58 30 L61 21 L64 30 M80 30 L84 19 L87 30" fill="#6abf4b" stroke="#4e9a34" stroke-width="1.5"/>
    <ellipse cx="24" cy="62" rx="8" ry="5" fill="#a98b66"/><ellipse cx="66" cy="76" rx="10" ry="6" fill="#a98b66"/><ellipse cx="78" cy="54" rx="5" ry="3" fill="#a98b66"/>`,

  aire: `<rect x="2" y="2" width="96" height="96" rx="10" fill="#d6efff"/>
    <g fill="#fff"><circle cx="30" cy="30" r="10"/><circle cx="42" cy="26" r="12"/><rect x="20" y="28" width="34" height="12" rx="6"/></g>
    <path d="M10 58 H58 Q72 58 72 48 Q72 40 64 40 Q57 40 59 48" fill="none" stroke="#3a7bd5" stroke-width="4" stroke-linecap="round"/>
    <path d="M22 74 H76 Q88 74 88 82 Q88 90 80 90 Q74 90 75 84" fill="none" stroke="#3a7bd5" stroke-width="4" stroke-linecap="round"/>`,

  tenedor: `<g fill="#aab4be"><rect x="34" y="6" width="5" height="30" rx="2"/><rect x="43" y="6" width="5" height="30" rx="2"/>
    <rect x="52" y="6" width="5" height="30" rx="2"/><rect x="61" y="6" width="5" height="30" rx="2"/>
    <path d="M34 32 H66 Q66 50 54 52 L54 92 Q50 97 46 92 L46 52 Q34 50 34 32Z"/></g>`,

  escudo: `<path d="M50 6 L86 18 Q86 66 50 94 Q14 66 14 18Z" fill="#3a7bd5" stroke="#1d4f91" stroke-width="4"/>
    <path d="M50 18 L74 26 Q74 60 50 80 Q26 60 26 26Z" fill="#f2c94c"/><path d="M50 22 V76 M30 40 H70" stroke="#e74c3c" stroke-width="6"/>`,

  flecha: `<path d="M18 82 L80 20" stroke="#8d5524" stroke-width="5" stroke-linecap="round"/>
    <path d="M72 12 L92 8 L88 28Z" fill="#7a8794"/>
    <path d="M22 78 L8 74 L14 68 L28 72Z" fill="#e74c3c"/><path d="M22 78 L26 92 L32 86 L28 72Z" fill="#c0392b"/>`,

  espada: `<circle cx="50" cy="44" r="42" fill="#fff3b0"/>
    ${estrella(22, 22, 6, '#ffd23f')}${estrella(80, 30, 7, '#ffd23f')}${estrella(76, 76, 5, '#ffd23f')}${estrella(22, 68, 5, '#ffd23f')}
    <path d="M45 68 L45 14 L50 3 L55 14 L55 68Z" fill="#e8eef4" stroke="#7a8794" stroke-width="2"/><path d="M50 8 V66" stroke="#b8c4cf" stroke-width="1.5"/>
    <rect x="30" y="66" width="40" height="8" rx="3" fill="#f2c94c" stroke="#c99a06"/><circle cx="50" cy="70" r="3" fill="#e74c3c"/>
    <rect x="46" y="74" width="8" height="15" fill="#8d5524"/><circle cx="50" cy="92" r="5" fill="#f2c94c" stroke="#c99a06"/>`,

  arana: `<path d="M50 4 V34" stroke="#bbb" stroke-width="1.2"/>
    <path d="M40 54 Q24 38 12 46 M40 60 Q22 54 8 62 M40 66 Q24 70 12 82 M42 70 Q32 82 26 94
      M60 54 Q76 38 88 46 M60 60 Q78 54 92 62 M60 66 Q76 70 88 82 M58 70 Q68 82 74 94" fill="none" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="50" cy="64" rx="17" ry="16" fill="#333"/><circle cx="50" cy="42" r="11" fill="#444"/>
    <circle cx="45" cy="40" r="3.5" fill="#fff"/><circle cx="55" cy="40" r="3.5" fill="#fff"/><circle cx="45" cy="41" r="1.6" fill="#222"/><circle cx="55" cy="41" r="1.6" fill="#222"/>`,

  perro: `<path d="M76 56 Q90 44 88 32" fill="none" stroke="#a86b32" stroke-width="5" stroke-linecap="round"/>
    <rect x="40" y="70" width="7" height="18" rx="3" fill="#a86b32"/><rect x="64" y="70" width="7" height="18" rx="3" fill="#a86b32"/>
    <ellipse cx="56" cy="64" rx="24" ry="14" fill="#c68642"/>
    <circle cx="32" cy="44" r="17" fill="#c68642"/>
    <ellipse cx="19" cy="44" rx="6" ry="12" fill="#7a4a1f"/><ellipse cx="45" cy="44" rx="6" ry="12" fill="#7a4a1f"/>
    <circle cx="27" cy="40" r="2.2" fill="#333"/><circle cx="37" cy="40" r="2.2" fill="#333"/>
    <ellipse cx="32" cy="47" rx="3.5" ry="2.5" fill="#333"/>
    <path d="M26 52 Q32 58 38 52Z" fill="#a33"/><path d="M30 54 Q32 62 35 55Z" fill="#f08fa8"/>`,

  platano: `<path d="M24 26 Q28 84 86 70 Q90 64 84 64 Q44 70 34 24Z" fill="#ffd23f" stroke="#d4a017" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M28 28 L24 14" stroke="#6b4f1d" stroke-width="5" stroke-linecap="round"/>`,

  manzanaRoja: manzana('#e53935'),
  manzanaVerde: manzana('#8bc34a'),

  limon: `<ellipse cx="50" cy="54" rx="34" ry="25" fill="#fff176" stroke="#e0c000" stroke-width="2.5"/>
    <ellipse cx="14" cy="54" rx="5" ry="4" fill="#fff176" stroke="#e0c000" stroke-width="2"/><ellipse cx="86" cy="54" rx="5" ry="4" fill="#fff176" stroke="#e0c000" stroke-width="2"/>
    <path d="M56 30 Q66 14 80 18 Q72 32 56 30Z" fill="#4caf50"/><ellipse cx="38" cy="46" rx="8" ry="4" fill="#fff" opacity=".6"/>`,

  copa: `<path d="M30 20 Q12 20 14 34 Q16 46 32 48 M70 20 Q88 20 86 34 Q84 46 68 48" fill="none" stroke="#e0b000" stroke-width="6"/>
    <path d="M28 12 H72 V30 Q72 60 50 64 Q28 60 28 30Z" fill="#f2c94c" stroke="#c99a06" stroke-width="2"/>
    ${estrella(50, 34, 12, '#fff3b0')}
    <rect x="44" y="63" width="12" height="14" fill="#e0b000"/><rect x="30" y="76" width="40" height="12" rx="3" fill="#c99a06"/>`,

  exclamacion: `<circle cx="50" cy="50" r="44" fill="#d63c3c"/><rect x="43" y="18" width="14" height="44" rx="7" fill="#fff"/><circle cx="50" cy="76" r="8" fill="#fff"/>`
};

function manzana(color) {
  return `<path d="M50 30 Q30 16 18 36 Q8 60 26 82 Q38 96 50 88 Q62 96 74 82 Q92 60 82 36 Q70 16 50 30Z" fill="${color}"/>
    <path d="M50 30 Q50 18 56 8" fill="none" stroke="#6b4f1d" stroke-width="4" stroke-linecap="round"/>
    <path d="M55 18 Q66 6 78 12 Q68 24 55 18Z" fill="#2e7d32"/><ellipse cx="32" cy="46" rx="5" ry="10" fill="#fff" opacity=".5"/>`;
}

// ---------- Viñetas de las historias (160 x 100) ----------

// Coloca un dibujo de IMG en la escena; "girar" lo voltea horizontalmente
function poner(img, x, y, tam, girar) {
  const dibujo = `<svg x="0" y="0" width="${tam}" height="${tam}" viewBox="0 0 100 100">${IMG[img]}</svg>`;
  return girar ? `<g transform="translate(${x + tam} ${y}) scale(-1 1)">${dibujo}</g>` : `<g transform="translate(${x} ${y})">${dibujo}</g>`;
}

function textoLineas(cx, y, lineas, tam) {
  return `<text x="${cx}" y="${y}" text-anchor="middle" font-size="${tam}" fill="#222">` +
    lineas.map((l, i) => `<tspan x="${cx}" dy="${i ? tam * 1.2 : 0}">${l}</tspan>`).join('') + '</text>';
}

// Bocadillo de diálogo con la cola apuntando a (px, py)
function bocadillo(x, y, an, al, lineas, px, py) {
  const cola = Math.min(Math.max(px - 5, x + 6), x + an - 16);
  return `<rect x="${x}" y="${y}" width="${an}" height="${al}" rx="8" fill="#fff" stroke="#333"/>
    <path d="M${cola} ${y + al - 1} L${px} ${py} L${cola + 10} ${y + al - 1}" fill="#fff" stroke="#333"/>
    ${textoLineas(x + an / 2, y + al / 2 - (lineas.length - 1) * 3.6 + 2.2, lineas, 6)}`;
}

// Recuadro de narración en la parte superior de la viñeta
function narracion(lineas) {
  return `<rect x="4" y="4" width="152" height="${6 + lineas.length * 7.2}" rx="3" fill="#fff6c2" stroke="#d4a017"/>
    ${textoLineas(80, 11.5, lineas, 6)}`;
}

function vineta(contenido) {
  return `<svg viewBox="0 0 160 100" role="img">
    <rect x="0.5" y="0.5" width="159" height="99" rx="4" fill="#d6efff" stroke="#1d4f91"/>
    <path d="M1 76 H159 V95 Q159 99 155 99 H5 Q1 99 1 95Z" fill="#8fd16a"/>
    ${contenido}</svg>`;
}

const ESCENA = {
  historia1a: vineta(`
    <rect x="68" y="48" width="80" height="30" fill="#f6d8a8" stroke="#c9a46b"/>
    <path d="M62 50 L108 28 L154 50Z" fill="#d9534f"/>
    ${poner('puerta', 76, 50, 28)}${poner('ventana', 112, 52, 22)}
    ${poner('nino', 48, 47, 32)}${poner('cerdo', 124, 40, 26, true)}
    ${narracion(['El niño entra por la puerta y', 'el cerdo volador entra por la ventana.'])}`),
  historia1b: vineta(`
    ${poner('nino', 18, 40, 52)}${poner('cerdo', 92, 40, 52, true)}
    ${bocadillo(4, 5, 72, 24, ['¡Me gusta entrar', 'por la puerta!'], 42, 44)}
    ${bocadillo(84, 3, 72, 30, ['¡A mí me gusta', 'entrar por', 'la ventana!'], 130, 50)}`),

  historia2a: vineta(`
    <path d="M70 76 L62 99" stroke="#fff" stroke-width="3" stroke-dasharray="4 3"/>
    <path d="M142 40 V78" stroke="#8d5524" stroke-width="2"/><path d="M142 40 H156 V50 H142Z" fill="#e74c3c"/>
    ${poner('tortuga', 26, 52, 36)}${poner('conejo', 76, 40, 40)}
    ${narracion(['La tortuga y el conejo', 'empiezan una carrera.'])}`),
  historia2b: vineta(`
    ${poner('conejo', 22, 40, 50)}${poner('tortuga', 94, 52, 44, true)}
    ${bocadillo(4, 5, 70, 22, ['¡Soy muy rápido!'], 46, 46)}
    ${bocadillo(82, 5, 74, 24, ['¡Y yo soy', 'muy inteligente!'], 112, 58)}`),

  historia3a: vineta(`
    ${poner('bruja', 20, 30, 58)}${poner('cerdo', 92, 40, 50, true)}
    ${textoLineas(22, 44, ['¡JA, JA!'], 7)}${textoLineas(138, 44, ['¡JA, JA!'], 7)}
    ${narracion(['La bruja y el cerdo volador se ríen.'])}`),
  historia3b: vineta(`
    ${poner('bruja', 16, 36, 54)}${poner('cerdo', 94, 42, 50, true)}
    ${bocadillo(4, 4, 72, 24, ['¡Me gustan', 'los hechizos!'], 42, 44)}
    ${bocadillo(84, 4, 72, 24, ['¡A mí me gusta', 'la lluvia!'], 130, 52)}`),

  historia4a: vineta(`
    ${poner('gusano', 18, 50, 36)}${poner('mariposa', 100, 30, 34, true)}
    ${narracion(['El gusano y la mariposa se miran.'])}`),
  historia4b: vineta(`
    ${poner('gusano', 14, 54, 40)}${poner('mariposa', 104, 40, 40, true)}
    ${bocadillo(4, 5, 72, 24, ['Yo me arrastro', 'por el suelo.'], 42, 66)}
    ${bocadillo(84, 5, 72, 24, ['¡Volar es', 'maravilloso!'], 124, 46)}`)
};
