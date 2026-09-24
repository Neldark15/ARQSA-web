// Prerender en build (SSG propio, sin navegador): toma dist/index.html (el shell de Vite),
// le mete el HTML que genera React en el servidor y escribe dist/sitemap.xml.
// Se ejecuta al final de `npm run build`, después de `vite build --ssr src/entry-server.tsx --outDir dist-ssr`.
import fs from 'node:fs'
import { render, projects } from '../dist-ssr/entry-server.js'

const SITE = 'https://www.grupoarqsa.com'
const template = fs.readFileSync('dist/index.html', 'utf8')

let html = render('/')

// React 19 + react-helmet-async v3 dejan <title>, <meta> y <link> dentro del árbol renderizado:
// se sacan de ahí y se suben al <head>. El JSON-LD (<script type="application/ld+json">) queda en el body, que Google acepta.
const head = []
html = html.replace(/<title>[\s\S]*?<\/title>|<meta [^>]*\/>|<link [^>]*\/>/g, (tag) => {
  head.push(tag)
  return ''
})
if (!head.some((t) => t.startsWith('<title>'))) throw new Error('prerender: el render no produjo <title>')

const page = template
  // el <title> y la description de index.html son solo el respaldo para `vite dev`
  .replace(/\s*<!-- Respaldo para `vite dev`[\s\S]*?-->/, '')
  .replace(/<title>[\s\S]*?<\/title>\s*/, '')
  .replace(/<meta name="description"[^>]*>\s*/, '')
  .replace('</head>', `${head.join('\n    ')}\n  </head>`)
  .replace('<div id="root"></div>', `<div id="root">${html}</div>`)

fs.writeFileSync('dist/index.html', page)

// Sitemap con la home y las fotos del portafolio (extensión de imágenes de Google)
const hoy = new Date().toISOString().slice(0, 10)
const imagenes = projects
  .map((p) => p.heroImage.replace(/\.(png|jpe?g)$/i, '-1600.webp'))
  .map((src) => `    <image:image><image:loc>${SITE}${src}</image:loc></image:image>`)
  .join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${hoy}</lastmod>
${imagenes}
  </url>
</urlset>
`
fs.writeFileSync('dist/sitemap.xml', sitemap)

console.log(`prerender: dist/index.html ${Math.round(page.length / 1024)} KB, ${head.length} etiquetas al <head>; sitemap con ${projects.length} imágenes`)
