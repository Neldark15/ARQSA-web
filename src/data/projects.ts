export interface Project {
  slug: string
  title: string
  category: 'residencial' | 'comercial' | 'corporativo' | 'salud'
  categoryLabel: string
  location: string
  year: string
  area?: string
  description: string
  heroImage: string
  thumbImage: string
  gallery: { src: string; layout: 'full' | 'half'; caption?: string }[]
  services: string[]
}

export const projects: Project[] = [
  {
    slug: 'park-tower',
    title: 'APTO Park Tower',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2024',
    area: '180 m²',
    description:
      'Diseño interior completo de apartamento en torre residencial premium. Espacios sociales, dormitorios y baños concebidos con un lenguaje contemporáneo que equilibra elegancia y funcionalidad.',
    heroImage: '/images/projects/park-tower/01.jpg',
    thumbImage: '/images/projects/park-tower/01.jpg',
    gallery: [
      { src: '/images/projects/park-tower/01.jpg', layout: 'full' },
      { src: '/images/projects/park-tower/02.jpg', layout: 'half' },
      { src: '/images/projects/park-tower/03.jpg', layout: 'half' },
      { src: '/images/projects/park-tower/04.jpg', layout: 'full' },
    ],
    services: ['Interiorismo', 'Diseño Arquitectónico', 'Supervisión'],
  },
  {
    slug: 'clinica-1802',
    title: 'Clínica 1802 Torre Humana',
    category: 'salud',
    categoryLabel: 'Salud',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Propuesta de diseño para clínica médica en torre corporativa. Un espacio que transmite profesionalismo y confianza, con atención al detalle en cada ambiente clínico.',
    heroImage: '/images/projects/clinica-1802/01.jpg',
    thumbImage: '/images/projects/clinica-1802/01.jpg',
    gallery: [
      { src: '/images/projects/clinica-1802/01.jpg', layout: 'full' },
      { src: '/images/projects/clinica-1802/02.jpg', layout: 'half' },
      { src: '/images/projects/clinica-1802/03.jpg', layout: 'half' },
    ],
    services: ['Diseño Arquitectónico', 'Interiorismo'],
  },
  {
    slug: 'fedecredito',
    title: 'Fedecrédito',
    category: 'corporativo',
    categoryLabel: 'Corporativo',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Intervención en espacios corporativos para institución financiera. Diseño que refleja solidez institucional con un lenguaje visual moderno y acogedor.',
    heroImage: '/images/projects/fedecredito/01.jpg',
    thumbImage: '/images/projects/fedecredito/01.jpg',
    gallery: [
      { src: '/images/projects/fedecredito/01.jpg', layout: 'full' },
      { src: '/images/projects/fedecredito/02.jpg', layout: 'half' },
      { src: '/images/projects/fedecredito/03.jpg', layout: 'half' },
      { src: '/images/projects/fedecredito/04.jpg', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Construcción', 'Supervisión'],
  },
  {
    slug: 'oficinas-gea',
    title: 'Oficinas GEA',
    category: 'corporativo',
    categoryLabel: 'Corporativo',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Diseño de oficinas corporativas con enfoque en productividad y bienestar. Espacios abiertos, salas de reunión y áreas colaborativas con identidad propia.',
    heroImage: '/images/projects/oficinas-gea/01.jpg',
    thumbImage: '/images/projects/oficinas-gea/01.jpg',
    gallery: [
      { src: '/images/projects/oficinas-gea/01.jpg', layout: 'full' },
      { src: '/images/projects/oficinas-gea/02.jpg', layout: 'half' },
      { src: '/images/projects/oficinas-gea/03.jpg', layout: 'half' },
    ],
    services: ['Diseño Arquitectónico', 'Interiorismo', 'Metodología BIM'],
  },
  {
    slug: 'casa-fernandez',
    title: 'Casa Fernández',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Proyecto residencial que integra arquitectura contemporánea con el entorno natural. Espacios amplios y luminosos que priorizan la experiencia de habitar.',
    heroImage: '/images/projects/casa-fernandez/01.jpg',
    thumbImage: '/images/projects/casa-fernandez/01.jpg',
    gallery: [
      { src: '/images/projects/casa-fernandez/01.jpg', layout: 'full' },
      { src: '/images/projects/casa-fernandez/02.jpg', layout: 'half' },
      { src: '/images/projects/casa-fernandez/03.jpg', layout: 'half' },
    ],
    services: ['Diseño Arquitectónico', 'Construcción', 'Supervisión'],
  },
]

export const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'corporativo', label: 'Corporativo' },
  { value: 'salud', label: 'Salud' },
]
