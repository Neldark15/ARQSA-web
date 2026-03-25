import AnimatedText from '@/components/ui/AnimatedText'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GlassCard from '@/components/ui/GlassCard'
import SectionHeading from '@/components/ui/SectionHeading'

const values = [
  {
    title: 'Excelencia',
    description: 'Compromiso de superar estándares de calidad en cada proyecto.',
    icon: 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z',
  },
  {
    title: 'Precisión',
    description: 'Rigor técnico y atención al detalle en cada ejecución.',
    icon: 'M12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22ZM12 6V12L16 14',
  },
  {
    title: 'Innovación',
    description: 'Nuevas ideas y tecnologías que enriquecen cada diseño.',
    icon: 'M9 21H15M12 3C8 3 5 6 5 9.5C5 12.5 7 14 8 15.5C8.5 16.5 9 17 9 18H15C15 17 15.5 16.5 16 15.5C17 14 19 12.5 19 9.5C19 6 16 3 12 3Z',
  },
  {
    title: 'Integridad',
    description: 'Ética, responsabilidad y transparencia en cada relación.',
    icon: 'M12 22S20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z',
  },
]

export default function About() {
  return (
    <section id="about" className="relative bg-brand-black overflow-hidden">
      {/* Decorative triangle SVG */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] opacity-[0.02] pointer-events-none">
        <svg viewBox="0 0 800 800" className="w-full h-full" style={{ transform: 'rotate(10deg)' }}>
          <path d="M400 50L750 700H50L400 50Z" stroke="#95978A" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Block A - Manifesto */}
      <div className="relative py-32 md:py-40 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText
            text="Creamos espacios que trascienden lo funcional, donde cada línea, cada material y cada decisión de diseño responde a una visión compartida entre nosotros y quienes confían en nuestro trabajo."
            as="h2"
            animation="clipReveal"
            className="font-display text-display-md text-brand-cream leading-tight"
          />
          <RevealOnScroll delay={0.4}>
            <p className="mt-8 text-brand-sage text-sm uppercase tracking-[0.15em] font-body">
              René Sevillano &mdash; Margarita de Sevillano &mdash; Héctor Aguilar
            </p>
          </RevealOnScroll>
        </div>
      </div>

      {/* Block B - History */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            label="Nosotros"
            title="Nuestra Historia"
            subtitle="Un proyecto familiar impulsado por la pasión por la arquitectura"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left - Text */}
            <div className="lg:col-span-7 space-y-6">
              <RevealOnScroll>
                <p className="text-brand-cream/80 text-lg leading-relaxed font-body">
                  ARQSA nació como un proyecto familiar impulsado por la pasión por la arquitectura
                  y una visión común: crear espacios funcionales, bien pensados y con carácter.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.15}>
                <p className="text-brand-cream/70 leading-relaxed font-body">
                  Evolucionamos de pequeñas colaboraciones a proyectos consolidados, siempre
                  basándonos en el respeto, la disciplina y la creatividad. Nos establecimos como
                  respuesta al deseo de trabajar juntos y ofrecer un servicio integral con estilo propio.
                </p>
              </RevealOnScroll>
              <RevealOnScroll delay={0.3}>
                <p className="text-brand-cream/70 leading-relaxed font-body">
                  Nuestra misión es ofrecer soluciones de arquitectura e ingeniería que superen las
                  expectativas del cliente, desarrollando proyectos civiles, eléctricos y mecánicos con
                  altos estándares de calidad, precisión técnica y cumplimiento normativo.
                </p>
              </RevealOnScroll>
            </div>

            {/* Right - Stats panel */}
            <div className="lg:col-span-5 flex items-center">
              <GlassCard variant="dark" className="p-8 w-full">
                <div className="space-y-8">
                  {[
                    { value: '35+', label: 'Proyectos Realizados' },
                    { value: '35+', label: 'Años de Experiencia Combinada' },
                    { value: 'BIM', label: 'Metodología de Trabajo' },
                  ].map((stat, i) => (
                    <RevealOnScroll key={stat.label} delay={i * 0.1}>
                      <div className="flex items-baseline gap-4">
                        <span className="font-display text-display-sm text-brand-sage">
                          {stat.value}
                        </span>
                        <span className="text-brand-cream/60 text-sm font-body">
                          {stat.label}
                        </span>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <RevealOnScroll key={value.title} delay={i * 0.1}>
                <GlassCard variant="sage" className="p-6 h-full">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#95978A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mb-4"
                  >
                    <path d={value.icon} />
                  </svg>
                  <h4 className="font-display text-lg text-brand-cream mb-2">
                    {value.title}
                  </h4>
                  <p className="text-brand-sage text-sm font-body">
                    {value.description}
                  </p>
                </GlassCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
