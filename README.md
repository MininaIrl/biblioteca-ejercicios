# La biblioteca de la Kata ♡

Blog estático de ejercicios resueltos, con estilo pastel, gatitos, buscador, filtro por asignatura, páginas individuales y descargas de PDF. No necesita bases de datos, compiladores ni instalación de dependencias.

## Publicarlo gratis en GitHub Pages

1. Crea un repositorio público llamado `biblioteca-ejercicios` (o el nombre que quieras).
2. Sube **el contenido de esta carpeta** a la raíz del repositorio: `index.html`, `styles.css`, `script.js`, `assets/` y `pdfs/`. No subas la carpeta contenedora como un nivel extra.
3. En el repositorio, entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**. Elige `main` y `/ (root)` y guarda.
5. La dirección será `https://TU-USUARIO.github.io/biblioteca-ejercicios/` (ajusta el nombre si tu repositorio es distinto). La primera publicación puede tomar algunos minutos.

## Añadir una entrada

1. Guarda el PDF en `pdfs/`, por ejemplo `pdfs/integrales.pdf`.
2. Abre `script.js` y busca `const publicaciones = [`.
3. Copia uno de los objetos de ejemplo, separado del anterior con una coma, y reemplaza `slug`, `titulo`, `categoria`, `fecha`, `descripcion`, `simbolo`, `color`, `pdf` y `sections`.
4. Usa un `slug` diferente para cada entrada, por ejemplo `integrales-por-partes`. `color` puede ser `pink`, `lavender`, `mint` o `peach`.
5. Guarda los cambios y súbelos a GitHub. La nueva entrada aparecerá sola en la biblioteca y tendrá su URL compartible `?post=integrales-por-partes`.

Ejemplo:

```js
{
  slug: 'integrales-por-partes',
  titulo: 'Integración por partes',
  categoria: 'Cálculo',
  fecha: '18 de noviembre de 2026',
  descripcion: 'Un ejercicio explicado desde cero.',
  simbolo: '∫',
  color: 'mint',
  pdf: 'pdfs/integrales.pdf',
  sections: [
    { titulo: 'Enunciado', texto: 'Resolver la integral de x por e elevado a x.' },
    { titulo: 'Procedimiento', formula: '∫x eˣ dx = x eˣ − eˣ + C', texto: 'Aplicamos integración por partes.' }
  ]
}
```

## Personalización

- Nombre y texto inicial: `index.html`.
- Colores, tipografías y aspecto: `styles.css`, sección `:root`.
- Publicaciones, sus explicaciones, y rutas a PDF: `script.js`.
- Logo/ícono de gatito: `assets/gatito.svg`.
- Aviso de contacto: reemplaza el texto del bloque "sobre el blog" por tu correo o enlace, si lo deseas (no se inventó ninguno).

## Notas

- Los dos PDF incluidos son **ejemplos originales generados para demostrar la web**, no tus ejercicios personales.
- Google Fonts necesita conexión; si falla, se emplean fuentes de sistema.
- Los PDF se alojan en el propio repositorio. GitHub Pages es adecuado para una biblioteca pequeña o mediana; si acumulas muchos PDF pesados, puedes usar almacenamiento externo.
- Publica solo materiales que hayas creado o que tengas permiso para redistribuir. Revisa los ejercicios antes de presentarlos como propios o definitivos.
- El blog funciona sin servicios externos y sus enlaces a publicaciones usan `?post=slug`, por lo que GitHub Pages no necesita reglas de redirección.
