export interface TeamMember {
  name: string
  title: string
  role: string
  description: string
  image?: string
}

export const team: TeamMember[] = [
  {
    name: 'Arq. René Sevillano',
    title: 'Socio Fundador',
    role: 'El puente entre las ideas y las personas',
    description:
      'Personalidad dinámica y carismática que genera confianza desde el primer contacto. Su visión estratégica y energía comercial han sido clave para posicionar a ARQSA en proyectos de alto nivel.',
  },
  {
    name: 'Arq. Margarita de Sevillano',
    title: 'Socia Fundadora',
    role: 'El alma creativa de la firma',
    description:
      'Su sensibilidad estética y visión contemporánea transforman cada proyecto en un espacio funcional, armonioso y sofisticado, cuidando siempre los detalles y la experiencia del usuario final.',
  },
  {
    name: 'Arq. Héctor Aguilar',
    title: 'Socio Fundador',
    role: 'La garantía de orden y precisión',
    description:
      'Con más de 35 años en el campo, aporta estructura, control financiero y calidad a cada proyecto, optimizando recursos y asegurando transparencia en cada presupuesto.',
  },
]
