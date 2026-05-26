import { useState, useEffect, useCallback } from 'react'
import type { Project } from '@/data/projects'

interface Props {
  projects: Project[]
  initialIndex: number
  onClose: () => void
}

export default function ProjectViewer({ projects, initialIndex, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const project = projects[currentIndex]

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : projects.length - 1))
  }, [projects.length])

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i < projects.length - 1 ? i + 1 : 0))
  }, [projects.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose, goPrev, goNext])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black/95"
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center max-w-5xl w-full mx-4 md:mx-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-cream">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image */}
        <div className="w-full rounded-2xl overflow-hidden bg-black/50">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-auto max-h-[75vh] object-contain"
          />
        </div>

        {/* Bottom bar: prev, title, next */}
        <div className="flex items-center justify-between w-full mt-6">
          <button
            data-action="prev"
            onClick={goPrev}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-cream">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="flex flex-col items-center">
            <h2 className="font-display text-2xl md:text-3xl text-brand-cream">
              {project.title}
            </h2>
            <span className="text-brand-cream/40 text-sm font-body mt-1">
              {currentIndex + 1} / {projects.length}
            </span>
          </div>

          <button
            data-action="next"
            onClick={goNext}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-cream">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
