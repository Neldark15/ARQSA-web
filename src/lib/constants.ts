export const BRAND = {
  colors: {
    dark: '#17384D',
    sage: '#95978A',
    sageLight: '#B5B7AA',
    sageDark: '#7A7C6F',
    cream: '#F5F4F0',
    black: '#0A0A0A',
  },
  fonts: {
    display: 'Archivo Black, sans-serif',
    body: 'Inter, sans-serif',
  },
} as const

export const CONTACT = {
  whatsapp: '+50377480743',
  whatsappFormatted: '+503 7748-0743',
  email: 'proyectos@grupoarqsa.com',
  instagram: '@arqsa.sv',
  instagramUrl: 'https://www.instagram.com/arqsa.sv',
  whatsappUrl: 'https://wa.me/50377480743',
} as const

export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.8,
    cinematic: 1.2,
  },
  ease: {
    smooth: [0.25, 0.1, 0.25, 1],
    cinematic: [0.76, 0, 0.24, 1],
    out: 'power3.out',
    inOut: 'power4.inOut',
  },
  stagger: {
    fast: 0.03,
    normal: 0.08,
    slow: 0.15,
  },
} as const
