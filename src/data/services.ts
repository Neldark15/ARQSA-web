export interface Service {
  id: string
  title: string
  description: string
  icon: string // SVG path data
}

export const services: Service[] = [
  {
    id: 'architectural-design',
    title: 'Diseño Arquitectónico',
    description:
      'Creamos proyectos integrales combinando funcionalidad, estética y sostenibilidad, transformando ideas en espacios únicos.',
    icon: 'M12 2L22 20H2L12 2ZM12 6L18 18H6L12 6Z', // Triangle/compass
  },
  {
    id: 'tramitologia',
    title: 'Tramitología',
    description:
      'Gestionamos permisos y procesos legales necesarios para asegurar que cada proyecto cumpla con la normativa vigente.',
    icon: 'M4 4H16V20H4V4ZM6 6V18H14V6H6ZM8 10H12M8 13H12M14 2L18 6V20H16V7H13V4H6V2H14Z', // Document
  },
  {
    id: 'interiorismo',
    title: 'Interiorismo',
    description:
      'Diseñamos ambientes interiores que reflejan identidad y estilo, optimizando el confort y la experiencia del usuario.',
    icon: 'M2 20L2 8L12 2L22 8V20H2ZM6 20V12H10V20M14 20V14H18V20', // Room perspective
  },
  {
    id: 'bim',
    title: 'Metodología BIM',
    description:
      'Implementamos herramientas digitales que permiten planificar, coordinar y optimizar cada fase del proyecto con precisión.',
    icon: 'M12 2L20 7V17L12 22L4 17V7L12 2ZM12 2V22M4 7L20 17M20 7L4 17', // 3D cube
  },
  {
    id: 'construction',
    title: 'Construcción',
    description:
      'Ejecutamos obras con altos estándares de calidad, asegurando plazos, costos y resultados confiables.',
    icon: 'M12 2L22 20H2L12 2ZM7 14H17M9 10H15M5 18H19M2 20H22', // Triangle + grid
  },
  {
    id: 'supervision',
    title: 'Supervisión',
    description:
      'Acompañamos cada etapa del proyecto con control técnico y administrativo, garantizando que la obra cumpla lo planificado.',
    icon: 'M12 4C7 4 2.7 8.7 1 12C2.7 15.3 7 20 12 20C17 20 21.3 15.3 23 12C21.3 8.7 17 4 12 4ZM12 8A4 4 0 110 8A4 4 0 010 0Z', // Eye
  },
]
