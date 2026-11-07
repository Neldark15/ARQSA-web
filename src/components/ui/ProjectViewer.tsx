import { useState, useEffect, useRef } from 'react'
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Project } from '@/data/projects'
import { responsiveImage, PROJECT_WIDTHS } from '@/lib/images'
import { containDialogTab } from '@/lib/dialog'

interface Props {
  projects: Project[]
  initialIndex: number
  onClose: () => void
}

export default function ProjectViewer({ projects, initialIndex, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const project = projects[currentIndex]
  const move = (offset: number) => setCurrentIndex((i) => (i + offset + projects.length) % projects.length)

  useEffect(() => {
    const dialog = dialogRef.current!
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      opener?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-viewer-title"
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose() }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose() }}
      onKeyDown={(event) => {
        containDialogTab(event)
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1) }
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1) }
      }}
      className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto rounded-lg border border-white/20 bg-[#151719] p-0 text-brand-cream backdrop:bg-black/85"
    >
      <div className="p-4 sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0" aria-live="polite">
            <p className="mb-1 text-xs text-brand-sage-light">{project.categoryLabel} · {currentIndex + 1} / {projects.length}</p>
            <h2 id="project-viewer-title" className="font-display text-xl sm:text-2xl break-words">{project.title}</h2>
          </div>
          <button autoFocus onClick={onClose} aria-label="Cerrar visor" title="Cerrar visor" className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"><X size={22} /></button>
        </div>
        <img
          key={project.slug}
          {...responsiveImage(project.heroImage, PROJECT_WIDTHS)}
          sizes="(min-width: 1024px) 976px, 100vw"
          alt={project.title}
          className="h-[48dvh] w-full object-contain bg-black"
        />
        <p className="mt-4 text-sm leading-relaxed text-brand-sage-light">{project.description}</p>
        <div className="mt-5 grid grid-cols-[44px_minmax(0,1fr)_44px] items-center gap-3">
          <button onClick={() => move(-1)} aria-label="Proyecto anterior" title="Proyecto anterior" className="flex size-11 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"><ChevronLeft /></button>
          <a href={`/proyectos/${project.slug}`} className="flex min-h-11 items-center justify-center gap-2 text-center text-sm underline underline-offset-4">Ver proyecto completo <ArrowUpRight size={16} className="shrink-0" /></a>
          <button onClick={() => move(1)} aria-label="Proyecto siguiente" title="Proyecto siguiente" className="flex size-11 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20"><ChevronRight /></button>
        </div>
      </div>
    </dialog>
  )
}
