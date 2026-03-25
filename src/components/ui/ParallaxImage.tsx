import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsapConfig'

interface ParallaxImageProps {
  src: string
  alt: string
  speed?: number
  scale?: number
  className?: string
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.15,
  scale = 1.15,
  className = '',
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return

    gsap.set(imageRef.current, { scale })

    gsap.to(imageRef.current, {
      y: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === containerRef.current) t.kill()
      })
    }
  }, [speed, scale])

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
        loading="lazy"
      />
    </div>
  )
}
