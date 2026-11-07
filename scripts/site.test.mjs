import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { projects, services } from '../dist-ssr/entry-server.js'

const site = 'https://www.grupoarqsa.com'
const routes = ['/', ...projects.map((p) => `/proyectos/${p.slug}`), ...services.map((s) => `/servicios/${s.slug}`)]
const pageAt = (route) => fs.readFileSync(route === '/' ? 'dist/index.html' : path.join('dist', `${route}.html`), 'utf8')
const home = pageAt('/')
const titles = new Set()

for (const route of routes) {
  test(`${route}: complete static HTML, unique SEO and valid local assets`, () => {
    const html = pageAt(route)
    const head = html.split('</head>')[0]
    const title = [...head.matchAll(/<title>(.*?)<\/title>/g)]
    assert.equal(title.length, 1)
    assert.match(title[0][1], /GRUPO ARQSA/)
    assert.ok(!titles.has(title[0][1]), 'title must be unique')
    titles.add(title[0][1])
    assert.equal((head.match(/name="description"/g) || []).length, 1)
    assert.equal((head.match(/rel="canonical"/g) || []).length, 1)
    assert.ok(head.includes(`href="${site}${route}"`))
    assert.match(head, /property="og:image"/)
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1)
    assert.ok(!html.includes('ARQSA Arquitectos'))

    for (const [, src] of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]*)/g)) {
      if (src === '' || src === '/') continue
      const target = path.join('dist', src)
      assert.ok(fs.existsSync(target) || fs.existsSync(`${target}.html`), `Missing ${src}`)
    }
    for (const [, href] of html.matchAll(/href="\/?#([^"?]+)"/g)) {
      const document = href === 'main-content' ? html : home
      assert.ok(document.includes(`id="${href}"`), `Missing anchor ${href}`)
    }
  })
}

test('sitemap includes all public routes and no administration', () => {
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8')
  assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length)
  for (const route of routes) assert.ok(sitemap.includes(`<loc>${site}${route}</loc>`))
  assert.ok(!sitemap.includes('/admin'))
  assert.ok(!fs.existsSync('dist/admin'))
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'))
  assert.ok(!config.rewrites?.length, 'Do not restore the SPA catch-all or old admin proxy')
})

test('contact is an explicit WhatsApp handoff, not a mailto form', () => {
  const source = fs.readFileSync('src/components/sections/Contact.tsx', 'utf8')
  assert.match(source, /Continuar en WhatsApp/)
  assert.match(source, /whatsappLink\(summary\)/)
  assert.ok(!source.includes('window.open'))
  const chat = fs.readFileSync('src/components/ui/ChatBot.tsx', 'utf8')
  assert.ok(!chat.includes('window.open'))
  assert.ok(!chat.includes('En línea'))
  assert.ok(!chat.includes('Se abrio WhatsApp'))
})
