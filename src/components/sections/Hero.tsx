import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsapConfig'
import GlassButton from '@/components/ui/GlassButton'
import { CONTACT } from '@/lib/constants'

const HERO_DELAY = 2.5 // After loader finishes

function SplitChars({ text, delay, className }: { text: string; delay: number; className: string }) {
  return (
    <h1 className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

function SplitWords({ text, delay, className }: { text: string; delay: number; className: string }) {
  return (
    <p className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    gsap.to(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '50% top',
        scrub: true,
      },
    })

    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === sectionRef.current) t.kill()
      })
    }
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-black to-brand-dark" />

      {/* Subtle noise/grain texture */}
      <div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E')]" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/30 via-brand-dark/50 to-brand-black/85" />

      {/* Darkening overlay for scroll */}
      <div ref={overlayRef} className="absolute inset-0 bg-brand-black opacity-0" />

      {/* Vignette */}
      <div className="absolute inset-0 vignette pointer-events-none" />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Real ARQSA Logo */}
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: HERO_DELAY, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src="/logo-vertical-transparent.png"
            alt="ARQSA Arquitectos Sevillano Aguilar"
            className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto"
          />
        </motion.div>

        {/* Tagline */}
        <SplitWords
          text="Tu visión, con forma y diseño"
          delay={HERO_DELAY + 0.6}
          className="font-body text-display-sm text-brand-sage tracking-wide"
        />

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: HERO_DELAY + 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <GlassButton
            variant="primary"
            size="lg"
            magnetic
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Ver Proyectos
          </GlassButton>
          <GlassButton
            variant="ghost"
            size="lg"
            href={CONTACT.whatsappUrl}
            target="_blank"
          >
            Contactar
          </GlassButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HERO_DELAY + 2, duration: 0.8 }}
      >
        <div className="relative w-px h-16 bg-brand-sage/20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-3 bg-brand-sage animate-scroll-indicator" />
        </div>
        <span className="text-brand-sage/50 text-[10px] uppercase tracking-[0.2em] font-body">
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
