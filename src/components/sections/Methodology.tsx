import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsapConfig'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import { methodology } from '@/data/methodology'

function DesktopMethodology() {
  const containerRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !panelsRef.current) return

    const panels = panelsRef.current
    const totalWidth = panels.scrollWidth - window.innerWidth

    const tween = gsap.to(panels, {
      x: -totalWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth}`,
        anticipatePin: 1,
      },
    })

    return () => {
      tween.kill()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill()
      })
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      <div ref={panelsRef} className="flex h-full">
        {methodology.map((step, i) => (
          <div
            key={step.number}
            className="flex-shrink-0 w-screen h-full flex items-center justify-center px-6"
          >
            <GlassCard variant="dark" className="max-w-lg p-12 relative">
              {/* Large number background */}
              <span className="absolute top-6 right-8 font-display text-[8rem] leading-none text-brand-sage/10">
                {step.number}
              </span>

              <span className="text-brand-sage text-xs uppercase tracking-[0.2em] font-body">
                Paso {step.number}
              </span>
              <h3 className="font-display text-display-sm text-brand-cream mt-3 mb-4">
                {step.title}
              </h3>
              <p className="text-brand-cream/70 leading-relaxed font-body">
                {step.description}
              </p>

              {/* Connector line */}
              {i < methodology.length - 1 && (
                <div className="absolute right-0 top-1/2 w-[calc(50vw-16rem)] h-px bg-brand-sage/20 translate-x-full" />
              )}
            </GlassCard>
          </div>
        ))}
      </div>
    </div>
  )
}

function MobileMethodology() {
  return (
    <div className="relative pl-8">
      {/* Vertical timeline line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-brand-sage/20" />

      <div className="space-y-8">
        {methodology.map((step, i) => (
          <RevealOnScroll key={step.number} delay={i * 0.1}>
            <div className="relative">
              {/* Timeline dot */}
              <div className="absolute -left-[21px] top-8 w-3 h-3 rounded-full border-2 border-brand-sage bg-brand-black" />

              <GlassCard variant="dark" className="p-6">
                <span className="text-brand-sage text-xs uppercase tracking-[0.2em] font-body">
                  Paso {step.number}
                </span>
                <h3 className="font-display text-xl text-brand-cream mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-brand-cream/70 text-sm leading-relaxed font-body">
                  {step.description}
                </p>
              </GlassCard>
            </div>
          </RevealOnScroll>
        ))}
      </div>
    </div>
  )
}

export default function Methodology() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section id="methodology" className="relative bg-brand-black">
      <div className={isDesktop ? '' : 'py-32 px-6'}>
        {!isDesktop && (
          <div className="max-w-7xl mx-auto mb-12">
            <SectionHeading
              label="Proceso"
              title="Metodología"
              subtitle="Cómo transformamos tu visión en realidad"
            />
          </div>
        )}

        {isDesktop && (
          <div className="absolute top-8 left-6 z-10 max-w-md">
            <SectionHeading
              label="Proceso"
              title="Metodología"
            />
          </div>
        )}

        {isDesktop ? <DesktopMethodology /> : <MobileMethodology />}
      </div>
    </section>
  )
}
