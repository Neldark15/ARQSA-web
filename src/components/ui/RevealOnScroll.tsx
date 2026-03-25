import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsapConfig'

interface RevealOnScrollProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
  duration?: number
  distance?: number
  once?: boolean
  className?: string
}

export default function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 60,
  once = true,
  className = '',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const offsets = {
      up: { y: distance, x: 0 },
      down: { y: -distance, x: 0 },
      left: { x: distance, y: 0 },
      right: { x: -distance, y: 0 },
    }

    const offset = offsets[direction]

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        x: offset.x,
        y: offset.y,
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: once ? 'play none none none' : 'play reverse play reverse',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === ref.current) t.kill()
      })
    }
  }, [direction, delay, duration, distance, once])

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}
