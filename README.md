# La biblioteca de la Kata ♡

> archivos encontrados en una carpeta sospechosa. ejercicios resueltos, apuntes y pdf gratis. gatos incluidos ฅ

Una pequeña biblioteca personal donde comparto ejercicios de matemáticas y material que voy encontrando mientras aprendo sobre ciencia de datos. La idea es mostrar el procedimiento, no solamente el resultado, para que otras personas puedan seguir los pasos y descargar los apuntes.

**[✦ Visitar la biblioteca](https://mininairl.github.io/biblioteca-ejercicios/)** · [Ver los ejercicios](https://mininairl.github.io/biblioteca-ejercicios/#archivo)

## ¿Qué hay aquí?

- Ejercicios resueltos con explicaciones paso a paso.
- Publicaciones organizadas por asignatura y un buscador por tema.
- PDF que se pueden abrir en el navegador o descargar.
- Enlaces individuales para compartir cada ejercicio.
- Una web estática, ligera y sin registro de usuarios. Con gatitos, obviamente.

Por ahora hay dos **ejercicios de demostración**: derivadas parciales y regla de la cadena. Los PDF son ejemplos preparados para probar el sitio, no apuntes personales definitivos. Iré reemplazándolos y agregando material.

## Cómo está hecha

La página está desarrollada con **HTML, CSS y JavaScript**, sin frameworks, bases de datos ni proceso de compilación. Se puede publicar gratuitamente con GitHub Pages.

```text
.
├── index.html       # estructura y textos de la página
├── styles.css       # diseño, colores y adaptación a pantallas
├── script.js        # entradas del blog, filtros y enlaces a PDF
├── assets/
│   └── gatito.svg
└── pdfs/            # documentos descargables
```

## Añadir un ejercicio

1. Guarda el archivo en `pdfs/`, con un nombre sencillo, por ejemplo `integrales-por-partes.pdf`.
2. Abre `script.js` y busca `const publicaciones = [`.
3. Duplica una entrada existente y cambia los datos del nuevo ejercicio.
4. Comprueba que el campo `pdf` apunte al archivo correcto y que cada `slug` sea único.
5. Guarda los cambios, revísalos en el navegador y súbelos a GitHub.

Ejemplo de entrada:

```js
{
  slug: 'integrales-por-partes',
  titulo: 'Integración por partes',
  categoria: 'Cálculo',
  fecha: '18 de noviembre de 2026',
  descripcion: 'Un ejemplo explicado sin saltarse los pasos.',
  simbolo: '∫',
  color: 'mint',
  pdf: 'pdfs/integrales-por-partes.pdf',
  sections: [
    {
      titulo: 'El problema',
      texto: 'Queremos resolver una integral usando integración por partes.'
    },
    {
      titulo: 'Procedimiento',
      formula: '∫x eˣ dx = x eˣ − eˣ + C',
      texto: 'Elegimos u y dv, aplicamos la fórmula y simplificamos.'
    }
  ]
}
```

Los colores de tarjeta disponibles en el proyecto son `pink`, `lavender`, `mint` y `peach`. Cada publicación tiene una dirección compartible como `?post=integrales-por-partes`.

## Probar la página en tu computador

Desde la carpeta del proyecto:

```bash
python -m http.server 8000
```

Después abre `http://localhost:8000`. No se necesita instalar dependencias.

## Actualizar la página publicada

```bash
git add .
git commit -m "docs: agregar nuevos ejercicios"
git push origin main
```

En GitHub, la publicación se configura en **Settings → Pages → Deploy from a branch**, seleccionando `main` y `/ (root)`.

## Algunas notas

- Los PDF están alojados dentro del repositorio y son públicos.
- El sitio utiliza recursos externos para algunas fuentes y animaciones; esos elementos pueden necesitar conexión a Internet.
- Si encuentras un error en un ejercicio, revisa el procedimiento con cuidado. Estoy aprendiendo y también puedo equivocarme.
- Publica únicamente material propio o que tengas permiso para compartir.

---

hecho con cariño, café y una cantidad cuestionable de pestañas abiertas ♡
