import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GlassCard from '@/components/ui/GlassCard'
import { services } from '@/data/services'

export default function Services() {
  return (
    <section id="services" className="relative bg-brand-black py-32 px-6">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#95978A" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          label="Servicios"
          title="Lo Que Hacemos"
          subtitle="Soluciones integrales para cada fase de tu proyecto"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <RevealOnScroll key={service.id} delay={i * 0.1}>
              <GlassCard variant="light" hover className="p-8 h-full group">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="mb-6 transition-all duration-600"
                >
                  <path
                    d={service.icon}
                    stroke="#95978A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-all duration-600"
                    style={{
                      strokeDasharray: 100,
                      strokeDashoffset: 0,
                    }}
                  />
                </svg>
                <h3 className="font-display text-xl text-brand-cream mb-3">
                  {service.title}
                </h3>
                <p className="text-brand-sage text-sm leading-relaxed font-body">
                  {service.description}
                </p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
