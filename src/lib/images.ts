// Variantes WebP generadas por scripts/optimizar-imagenes.mjs junto a cada original:
// /images/projects/<slug>/01.png → 01-800.webp y 01-1600.webp; /images/team/<nombre>.png → <nombre>-480.webp y -960.webp
export function webpVariant(src: string, width: number) {
  return src.replace(/\.(png|jpe?g)$/i, `-${width}.webp`)
}

export function responsiveImage(src: string, widths: number[]) {
  return {
    src: webpVariant(src, widths[0]),
    srcSet: widths.map((w) => `${webpVariant(src, w)} ${w}w`).join(', '),
  }
}

export const PROJECT_WIDTHS = [800, 1600]
export const TEAM_WIDTHS = [480, 960]
