export interface MethodologyStep {
  number: string
  title: string
  description: string
}

export const methodology: MethodologyStep[] = [
  {
    number: '01',
    title: 'Descubrimiento',
    description:
      'Escuchamos tus necesidades, entendemos tu visión y analizamos el contexto para definir las bases del proyecto.',
  },
  {
    number: '02',
    title: 'Conceptualización',
    description:
      'Desarrollamos el concepto de diseño que guiará todo el proyecto, fusionando creatividad con funcionalidad.',
  },
  {
    number: '03',
    title: 'Diseño',
    description:
      'Creamos planos, renders y documentación técnica con precisión BIM, materializando la visión en un proyecto ejecutable.',
  },
  {
    number: '04',
    title: 'Coordinación Técnica',
    description:
      'Integramos todas las disciplinas: arquitectura, estructura, instalaciones eléctricas y mecánicas en un modelo coordinado.',
  },
  {
    number: '05',
    title: 'Ejecución y Seguimiento',
    description:
      'Supervisamos la construcción asegurando calidad, plazos y presupuesto. Tu proyecto se hace realidad con precisión.',
  },
]
