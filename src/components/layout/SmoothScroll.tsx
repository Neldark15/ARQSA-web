import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from '@/lib/gsapConfig'
import { gsap } from 'gsap'

interface SmoothScrollProps {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = reduceMotion
      ? null
      : new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          touchMultiplier: 2,
        })

    const raf = (time: number) => {
      lenis?.raf(time * 1000)
    }

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(raf)
      gsap.ticker.lagSmoothing(0)
    }

    // Enlaces directos a una sección (grupoarqsa.com/#contact): el salto nativo ocurre antes de que
    // ScrollTrigger agregue el espacio de las secciones fijadas, así que se vuelve a ubicar al asentarse el layout
    const hashTimer = window.setTimeout(() => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = id ? document.getElementById(id) : null
      if (!target) return
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true })
      else target.scrollIntoView()
    }, 800)

    return () => {
      window.clearTimeout(hashTimer)
      if (lenis) {
        gsap.ticker.remove(raf)
        lenis.destroy()
      }
    }
  }, [])

  return <>{children}</>
}
