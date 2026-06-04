import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GlassCard from '@/components/ui/GlassCard'
import { team } from '@/data/team'

export default function Team() {
  return (
    <section id="team" className="relative bg-brand-black py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          label="Equipo"
          title="Quiénes Somos"
          subtitle="Tres visiones, un solo compromiso con la excelencia"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <RevealOnScroll key={member.name} delay={i * 0.15}>
              <GlassCard variant="dark" hover className="overflow-hidden group">
                {/* Photo */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover
                      filter grayscale-[80%] group-hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-sage/40
                        filter grayscale-[80%] group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-5xl text-brand-cream/20 group-hover:text-brand-cream/30 transition-colors duration-700">
                          {member.name.split(' ').slice(-1)[0][0]}{member.name.split(' ').slice(-2)[0]?.[0] || ''}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-display text-xl text-brand-cream">
                    {member.name}
                  </h3>
                  <p className="text-brand-sage text-xs uppercase tracking-[0.15em] mt-1 font-body">
                    {member.title}
                  </p>
                  <p className="text-brand-cream/50 text-sm italic mt-2 font-body">
                    &ldquo;{member.role}&rdquo;
                  </p>
                  <p className="text-brand-cream/60 text-sm mt-4 leading-relaxed font-body">
                    {member.description}
                  </p>
                </div>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}
