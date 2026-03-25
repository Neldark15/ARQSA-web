import { useRef, useEffect } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface VideoBackgroundProps {
  src: string
  poster: string
  overlay?: string
  className?: string
}

export default function VideoBackground({
  src,
  poster,
  overlay,
  className = '',
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')

  useEffect(() => {
    if (!videoRef.current || isMobile) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play()
        } else {
          videoRef.current?.pause()
        }
      },
      { threshold: 0.25 }
    )

    observer.observe(containerRef.current!)
    return () => observer.disconnect()
  }, [isMobile])

  const defaultOverlay =
    'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(23,56,77,0.5) 50%, rgba(10,10,10,0.85) 100%)'

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      {isMobile ? (
        <img
          src={poster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: overlay || defaultOverlay }}
      />
    </div>
  )
}
