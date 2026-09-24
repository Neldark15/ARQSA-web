// Genera las variantes livianas de las imágenes del sitio a partir de los originales en public/.
// Uso: node scripts/optimizar-imagenes.mjs  (solo hace falta al agregar o cambiar una foto; la salida se versiona)
//
// - Proyectos: public/images/projects/<slug>/01-800.webp y 01-1600.webp
// - Equipo:    public/images/team/<nombre>-480.webp y <nombre>-960.webp
// - Logos:     public/logo-hero-400.webp, logo-hero-800.webp, logo-nav-320.webp, logo-icon-96.webp
// - Íconos:    public/favicon.ico (16/32/48), icon-192.png, icon-512.png, apple-touch-icon.png
// - Redes:     public/og-arqsa.jpg (1200x630)
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = path.resolve('public')
const out = (p) => path.join(PUBLIC, p)
const kb = (p) => `${Math.round(fs.statSync(p).size / 1024)} KB`

async function webp(src, dest, width, quality = 78) {
  await sharp(src).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(dest)
  console.log(`  ${path.relative(PUBLIC, dest)}  ${kb(dest)}`)
}

// 1. Fotos de proyectos: 01.<ext> → 01-800.webp / 01-1600.webp
console.log('Proyectos')
for (const slug of fs.readdirSync(out('images/projects'))) {
  const dir = out(`images/projects/${slug}`)
  const original = fs.readdirSync(dir).find((f) => /^01\.(png|jpe?g)$/i.test(f))
  if (!original) continue
  for (const w of [800, 1600]) await webp(path.join(dir, original), path.join(dir, `01-${w}.webp`), w)
}

// 2. Fotos del equipo
console.log('Equipo')
for (const f of fs.readdirSync(out('images/team')).filter((f) => /\.(png|jpe?g)$/i.test(f))) {
  const base = f.replace(/\.[^.]+$/, '')
  for (const w of [480, 960]) await webp(out(`images/team/${f}`), out(`images/team/${base}-${w}.webp`), w)
}

// 3. Logos
console.log('Logos')
await webp(out('logo-vertical-transparent.png'), out('logo-hero-400.webp'), 400, 90)
await webp(out('logo-vertical-transparent.png'), out('logo-hero-800.webp'), 800, 90)
await webp(out('logo-nav.png'), out('logo-nav-320.webp'), 320, 90)
await webp(out('logo-vertical-transparent.png'), out('logo-icon-96.webp'), 96, 90)

// 4. Íconos: solo el símbolo (triángulo con "AS") recortado del logo sobre fondo de marca,
//    porque a 16-48 px el texto "ARQSA" no se lee.
console.log('Íconos')
const simbolo = await sharp(out('logo-vertical-dark.png')).extract({ left: 300, top: 95, width: 950, height: 950 }).toBuffer()
const icono = (size) => sharp(simbolo).resize(size, size).png({ compressionLevel: 9 }).toBuffer()
const completo = (size) => sharp(out('logo-vertical-dark.png')).resize(size, size).png({ compressionLevel: 9 }).toBuffer()

fs.writeFileSync(out('icon-192.png'), await completo(192))
fs.writeFileSync(out('icon-512.png'), await completo(512))
fs.writeFileSync(out('apple-touch-icon.png'), await completo(180))

// favicon.ico con PNG embebidos (16, 32, 48): cabecera ICONDIR + una entrada por tamaño + los PNG
const tamanos = [16, 32, 48]
const pngs = await Promise.all(tamanos.map(icono))
const header = Buffer.alloc(6 + 16 * tamanos.length)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2)
header.writeUInt16LE(tamanos.length, 4)
let offset = header.length
tamanos.forEach((s, i) => {
  const e = 6 + 16 * i
  header.writeUInt8(s, e)
  header.writeUInt8(s, e + 1)
  header.writeUInt8(0, e + 2)
  header.writeUInt8(0, e + 3)
  header.writeUInt16LE(1, e + 4)
  header.writeUInt16LE(32, e + 6)
  header.writeUInt32LE(pngs[i].length, e + 8)
  header.writeUInt32LE(offset, e + 12)
  offset += pngs[i].length
})
fs.writeFileSync(out('favicon.ico'), Buffer.concat([header, ...pngs]))
for (const f of ['favicon.ico', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png']) console.log(`  ${f}  ${kb(out(f))}`)

// 5. Imagen para compartir en redes / WhatsApp: fachada de Casa Perdomo + logo sobre franja de marca
console.log('Redes')
const W = 1200, H = 630, PANEL = 300
const foto = await sharp(out('images/projects/casa-perdomo/01.png')).resize(W, H, { fit: 'cover' }).toBuffer()
const logo = await sharp(out('logo-vertical-transparent.png')).resize(220, 220).toBuffer()
const panel = Buffer.from(
  `<svg width="${PANEL}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#17384D" fill-opacity="0.94"/></svg>`,
)
await sharp(foto)
  .composite([
    { input: panel, left: W - PANEL, top: 0 },
    { input: logo, left: W - PANEL + (PANEL - 220) / 2, top: (H - 220) / 2 },
  ])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(out('og-arqsa.jpg'))
console.log(`  og-arqsa.jpg  ${kb(out('og-arqsa.jpg'))}`)
