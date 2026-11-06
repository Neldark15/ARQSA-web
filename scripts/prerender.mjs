import fs from 'node:fs'
import path from 'node:path'
import { render, projects, services } from '../dist-ssr/entry-server.js'

const SITE = 'https://www.grupoarqsa.com'
const template = fs.readFileSync('dist/index.html', 'utf8')
const routes = [
  '/',
  ...projects.map((project) => `/proyectos/${project.slug}`),
  ...services.map((service) => `/servicios/${service.slug}`),
]

for (const route of routes) {
  const head = []
  // React 19 hoists these tags out of Helmet; move them into the static document head.
  const html = render(route).replace(/<title>[\s\S]*?<\/title>|<meta [^>]*\/>|<link [^>]*\/>/g, (tag) => {
    head.push(tag)
    return ''
  })
  if (!head.some((tag) => tag.startsWith('<title>'))) throw new Error(`Missing title: ${route}`)
  const page = template
    .replace(/\s*<!-- Respaldo para `vite dev`[\s\S]*?-->/, '')
    .replace(/<title>[\s\S]*?<\/title>\s*/, '')
    .replace(/<meta name="description"[^>]*>\s*/, '')
    .replace('</head>', `${head.join('\n    ')}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
  const filename = route === '/' ? 'dist/index.html' : path.join('dist', `${route}.html`)
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(filename, page)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes.map((route) => {
  const project = projects.find((item) => route === `/proyectos/${item.slug}`)
  const images = route === '/' ? projects : project ? [project] : []
  return `  <url>
    <loc>${SITE}${route}</loc>
${images.map((item) => `    <image:image><image:loc>${SITE}${item.heroImage.replace(/\.(png|jpe?g)$/i, '-1600.webp')}</image:loc></image:image>`).join('\n')}
  </url>`
}).join('\n')}
</urlset>
`
fs.writeFileSync('dist/sitemap.xml', sitemap)
console.log(`Prerender: ${routes.length} pages and sitemap generated.`)
