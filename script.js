/*
  EDITA TUS PUBLICACIONES AQUÍ.
  Para agregar un post, copia un objeto de esta lista, cambia el slug (único),
  el título, texto, categoría y ruta del PDF. Después sube el PDF a /pdfs.
  El contenido de `sections` admite párrafos y fórmulas en texto plano.
*/
const publicaciones = [
  {
    slug: 'guia-calculo-diferencial-integral',
    titulo: 'Guía de cálculo diferencial e integral: ejercicios resueltos',
    categoria: 'Cálculo',
    fecha: '17 de noviembre de 2026',
    descripcion: 'Una guía de ejercicios de integración, áreas, derivación implícita y aplicaciones de cálculo en economía, con procedimientos desarrollados.',
    simbolo: '∫', color: 'mint',
    pdf: 'pdfs/ejercicios-resueltos-calculo.pdf',
    sections: [
      { titulo: '¿Qué contiene esta guía?', texto: 'Reuní ejercicios de cálculo diferencial e integral con sus enunciados y procedimientos, para tenerlos ordenados en un solo documento.' },
      { titulo: 'Integrales y aplicaciones', texto: 'Incluye integración por sustitución y por partes, cálculo de áreas bajo la curva y reconstrucción de funciones a partir de sus derivadas.' },
      { titulo: 'Aplicaciones en economía', texto: 'También aparecen problemas de costo e ingreso marginal, optimización de utilidad y minimización de costos de producción.' },
      { titulo: 'Derivación implícita', texto: 'Hay ejercicios sobre rectas tangentes, razones de cambio relacionadas y aproximaciones con más de una variable. Puedes abrir el PDF para revisar el desarrollo completo.' },
      { titulo: 'Nota', texto: 'Estos son apuntes de estudio: revisa los procedimientos y las condiciones de cada problema antes de reutilizar los resultados.' }
    ]
  }
];

const $ = (selector) => document.querySelector(selector);
const home = $('#home-view');
const article = $('#article-view');
const list = $('#posts');
const categories = $('#categories');
const search = $('#search');
const empty = $('#empty-state');
let categoriaActiva = 'Todas';
const sanitize = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safePdf = (path) => /^pdfs\/[\w./-]+\.pdf$/i.test(path) && !path.includes('..') ? path : '#';
const count = $('#results-count');

function drawCategories(){
  const names = ['Todas', ...new Set(publicaciones.map(p => p.categoria))];
  categories.innerHTML = names.map(name => `<button type="button" class="chip" aria-pressed="${name === categoriaActiva}" data-category="${sanitize(name)}">${sanitize(name)}</button>`).join('');
}
function drawPosts(){
  const query = search.value.trim().toLocaleLowerCase('es');
  const matches = publicaciones.filter(p => (categoriaActiva === 'Todas' || p.categoria === categoriaActiva) && [p.titulo, p.descripcion, p.categoria, ...p.sections.map(s => s.titulo + ' ' + (s.texto || ''))].join(' ').toLocaleLowerCase('es').includes(query));
  count.textContent = `${matches.length} ${matches.length === 1 ? 'archivo encontrado' : 'archivos encontrados'} en las catacumbas`;
  empty.hidden = matches.length !== 0;
  list.innerHTML = matches.map(p => `
    <article class="post-card">
      <a href="?post=${encodeURIComponent(p.slug)}" data-post="${sanitize(p.slug)}" aria-label="Leer ${sanitize(p.titulo)}">
        <div class="card-cover ${sanitize(p.color)}"><span class="cover-symbol">${sanitize(p.simbolo)}</span></div>
      </a>
      <div class="card-body"><span class="card-meta">✦ ${sanitize(p.categoria)} · ${sanitize(p.fecha)}</span>
        <h3><a href="?post=${encodeURIComponent(p.slug)}" data-post="${sanitize(p.slug)}">${sanitize(p.titulo)}</a></h3>
        <p>${sanitize(p.descripcion)}</p>
        <div class="card-bottom"><span>♡ PDF invocado</span><a class="card-read" href="?post=${encodeURIComponent(p.slug)}" data-post="${sanitize(p.slug)}">abrir cosa ↗</a></div>
      </div>
    </article>`).join('');
}
function renderArticle(post){
  const pdf = safePdf(post.pdf);
  article.innerHTML = `
    <a href="./#archivo" data-archive class="back-link">← volver a los ejercicios</a>
    <div class="article-meta">✦ ${sanitize(post.categoria)} · ${sanitize(post.fecha)}</div>
    <h1>${sanitize(post.titulo)}</h1>
    <p class="article-lead">${sanitize(post.descripcion)}</p>
    <div class="article-banner" aria-hidden="true">${sanitize(post.simbolo)} ♡</div>
    <div class="article-body">${post.sections.map(s => `
      <section><h2>${sanitize(s.titulo)}</h2>${s.texto ? `<p>${sanitize(s.texto)}</p>` : ''}${s.formula ? `<div class="formula">${sanitize(s.formula)}</div>` : ''}</section>`).join('')}</div>
    <div class="download-panel"><div><strong>♡ Un PDF para ti</strong><small>Ábrelo cuando quieras o guárdalo para después. Prometo que no muerde, ¿o sí? ♡</small></div>
    <div class="hero-actions"><a class="button button-secondary" href="${pdf}" target="_blank" rel="noopener">ver PDF ↗</a><a class="button button-primary" href="${pdf}" download>↓ descargar PDF</a></div></div>
    <div class="article-tools"><button type="button" id="share-post">✦ copiar este link sospechoso</button></div>`;
  $('#share-post').addEventListener('click', async event => {
    const url = new URL(window.location.href).href;
    try {
      if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(url);
      else { const input = document.createElement('textarea'); input.value = url; document.body.appendChild(input); input.select(); document.execCommand('copy'); input.remove(); }
      event.currentTarget.textContent = '✓ enlace copiado';
    } catch (_) { event.currentTarget.textContent = 'Copia la dirección desde tu navegador'; }
  });
}
function route(){
  const slug = new URLSearchParams(location.search).get('post');
  const post = publicaciones.find(p => p.slug === slug);
  const showPost = Boolean(slug);
  home.hidden = showPost;
  article.hidden = !showPost;
  if(showPost){
    if(post){renderArticle(post);document.title = `${post.titulo} | La biblioteca de la Kata ♡`;}
    else {article.innerHTML = '<h1>Este ejercicio no existe ฅ^•ﻌ•^ฅ</h1><p>Quizás cambió de dirección.</p><a class="button button-secondary" href="./" data-home>volver al inicio</a>';document.title = 'No encontrado | La biblioteca de la Kata';}
  } else {document.title = 'La biblioteca de la Kata ♡ | Ejercicios resueltos';drawPosts();}
  if (!location.hash || showPost) window.scrollTo({top:0,behavior:'instant'});
  else {const anchor = document.getElementById(decodeURIComponent(location.hash.slice(1)));if(anchor) anchor.scrollIntoView();}
}
function navigate(url){history.pushState({},'',url);route();}
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  if (link && (link.matches('[data-post]') || link.matches('[data-home]') || link.matches('[data-archive]') || link.matches('[data-about]'))) {
    if(event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();navigate(link.getAttribute('href'));
  }
  const chip = event.target.closest('[data-category]');
  if(chip){categoriaActiva = chip.dataset.category;drawCategories();drawPosts();}
});
search.addEventListener('input',drawPosts);
$('#clear-filters').addEventListener('click',()=>{categoriaActiva='Todas';search.value='';drawCategories();drawPosts();search.focus();});
window.addEventListener('popstate',route);
$('#year').textContent = new Date().getFullYear();
const welcome = $('#tenor-welcome');
const themeToggle = $('#theme-toggle');
function syncThemeToggle(){
  const dark = document.documentElement.dataset.theme === 'dark';
  const label = dark ? 'Activar modo claro' : 'Activar modo oscuro';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  themeToggle.querySelector('span').textContent = dark ? '☀' : '◐';
}
themeToggle.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('kata-theme', next); } catch (_) {}
  syncThemeToggle();
});
syncThemeToggle();
$('#welcome-close').addEventListener('click', () => {
  welcome.classList.add('is-leaving');
  window.setTimeout(() => { welcome.hidden = true; }, 220);
});
drawCategories();route();
