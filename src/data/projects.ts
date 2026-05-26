export interface Project {
  slug: string
  title: string
  category: 'residencial' | 'comercial' | 'corporativo'
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
    ],
    services: ['Interiorismo', 'Diseño Arquitectónico', 'Supervisión'],
  },
  {
    slug: 'torre-nest',
    title: 'APTO Torre Nest',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2025',
    description:
      'Diseño interior de apartamento en torre residencial contemporánea. Ambientes pensados para maximizar la luz natural y el confort.',
    heroImage: '/images/projects/torre-nest/01.png',
    thumbImage: '/images/projects/torre-nest/01.png',
    gallery: [
      { src: '/images/projects/torre-nest/01.png', layout: 'full' },
    ],
    services: ['Interiorismo', 'Diseño Arquitectónico'],
  },
  {
    slug: 'casa-artiga',
    title: 'Casa Artiga',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Proyecto residencial con enfoque en espacios funcionales y estética contemporánea integrada al entorno.',
    heroImage: '/images/projects/casa-artiga/01.png',
    thumbImage: '/images/projects/casa-artiga/01.png',
    gallery: [
      { src: '/images/projects/casa-artiga/01.png', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Construcción'],
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
    heroImage: '/images/projects/casa-fernandez/01.png',
    thumbImage: '/images/projects/casa-fernandez/01.png',
    gallery: [
      { src: '/images/projects/casa-fernandez/01.png', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Construcción', 'Supervisión'],
  },
  {
    slug: 'casa-peraza',
    title: 'Casa Peraza',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2018',
    description:
      'Residencia diseñada con un lenguaje arquitectónico que prioriza la funcionalidad y la armonía con su contexto.',
    heroImage: '/images/projects/casa-peraza/01.jpg',
    thumbImage: '/images/projects/casa-peraza/01.jpg',
    gallery: [
      { src: '/images/projects/casa-peraza/01.jpg', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Construcción'],
  },
  {
    slug: 'casa-perdomo',
    title: 'Casa Perdomo',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Proyecto residencial con diseño contemporáneo que busca optimizar cada espacio con materiales de alta calidad.',
    heroImage: '/images/projects/casa-perdomo/01.png',
    thumbImage: '/images/projects/casa-perdomo/01.png',
    gallery: [
      { src: '/images/projects/casa-perdomo/01.png', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Construcción'],
  },
  {
    slug: 'residencia-bonilla',
    title: 'Residencia Bonilla',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2026',
    description:
      'Residencia contemporánea con acabados premium. Diseño que equilibra privacidad y apertura hacia el entorno.',
    heroImage: '/images/projects/residencia-bonilla/01.jpeg',
    thumbImage: '/images/projects/residencia-bonilla/01.jpeg',
    gallery: [
      { src: '/images/projects/residencia-bonilla/01.jpeg', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Interiorismo', 'Supervisión'],
  },
  {
    slug: 'residencia-reyes',
    title: 'Residencia Reyes',
    category: 'residencial',
    categoryLabel: 'Residencial',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Proyecto residencial con líneas limpias y espacios abiertos que priorizan la convivencia familiar.',
    heroImage: '/images/projects/residencia-reyes/01.png',
    thumbImage: '/images/projects/residencia-reyes/01.png',
    gallery: [
      { src: '/images/projects/residencia-reyes/01.png', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Construcción'],
  },
  {
    slug: 'clinica-1802',
    title: 'Clínica 1802 Torre Humana',
    category: 'comercial',
    categoryLabel: 'Comercial',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Propuesta de diseño para clínica médica en torre corporativa. Un espacio que transmite profesionalismo y confianza, con atención al detalle en cada ambiente.',
    heroImage: '/images/projects/clinica-1802/01.jpg',
    thumbImage: '/images/projects/clinica-1802/01.jpg',
    gallery: [
      { src: '/images/projects/clinica-1802/01.jpg', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Interiorismo'],
  },
  {
    slug: 'doggie-spa',
    title: 'Doggie Spa',
    category: 'comercial',
    categoryLabel: 'Comercial',
    location: 'San Salvador, El Salvador',
    year: '2026',
    description:
      'Diseño de espacio comercial dedicado al cuidado y bienestar de mascotas. Ambientes funcionales con estética moderna.',
    heroImage: '/images/projects/doggie-spa/01.png',
    thumbImage: '/images/projects/doggie-spa/01.png',
    gallery: [
      { src: '/images/projects/doggie-spa/01.png', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Interiorismo'],
  },
  {
    slug: 'restaurante-los-olivos',
    title: 'Restaurante Los Olivos',
    category: 'comercial',
    categoryLabel: 'Comercial',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Diseño integral de restaurante que combina calidez y sofisticación. Espacios pensados para una experiencia gastronómica memorable.',
    heroImage: '/images/projects/restaurante-los-olivos/01.png',
    thumbImage: '/images/projects/restaurante-los-olivos/01.png',
    gallery: [
      { src: '/images/projects/restaurante-los-olivos/01.png', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Interiorismo', 'Construcción'],
  },
  {
    slug: 'cafeteria-aeroman',
    title: 'Cafetería Aeroman',
    category: 'corporativo',
    categoryLabel: 'Corporativo',
    location: 'San Salvador, El Salvador',
    year: '2024',
    description:
      'Diseño de cafetería corporativa para empresa aeronáutica. Espacios de descanso y alimentación con identidad institucional.',
    heroImage: '/images/projects/cafeteria-aeroman/01.png',
    thumbImage: '/images/projects/cafeteria-aeroman/01.png',
    gallery: [
      { src: '/images/projects/cafeteria-aeroman/01.png', layout: 'full' },
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
    heroImage: '/images/projects/oficinas-gea/01.png',
    thumbImage: '/images/projects/oficinas-gea/01.png',
    gallery: [
      { src: '/images/projects/oficinas-gea/01.png', layout: 'full' },
    ],
    services: ['Diseño Arquitectónico', 'Interiorismo', 'Metodología BIM'],
  },
]

export const categories = [
  { value: 'all', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'corporativo', label: 'Corporativo' },
]
