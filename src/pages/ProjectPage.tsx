import { useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { projects } from '@/data/projects'
import { services } from '@/data/services'
import { responsiveImage, PROJECT_WIDTHS, webpVariant } from '@/lib/images'
import { projectInquiry } from '@/lib/contact'
import PageMetadata from '@/components/ui/PageMetadata'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  if (!project) return <NotFoundPage />
  const gallery = project.gallery.filter((image) => image.src !== project.heroImage)
  const related = projects.filter((item) => item.slug !== slug && item.category === project.category).slice(0, 3)

  return (
    <article className="px-6 pt-32 pb-16">
      <PageMetadata title={project.title} description={project.description} path={`/proyectos/${project.slug}`} image={webpVariant(project.heroImage, 1600)} />
      <div className="mx-auto max-w-7xl">
        <a href="/#projects" className="inline-flex items-center gap-2 text-sm text-brand-sage-light"><ArrowLeft size={18} aria-hidden="true" /> Todos los proyectos</a>
        <header className="py-8 md:py-12">
          <p className="mb-3 text-sm text-brand-sage-light">{project.categoryLabel}</p>
          <h1 className="max-w-4xl font-display text-3xl md:text-5xl leading-tight text-balance">{project.title}</h1>
        </header>
        <img {...responsiveImage(project.heroImage, PROJECT_WIDTHS)} sizes="(min-width: 1280px) 1280px, 100vw" alt={project.title} className="max-h-[80svh] w-full object-contain bg-white/5" fetchPriority="high" />
        <section className="grid gap-10 py-12 md:grid-cols-[2fr_1fr]">
          <div>
            <h2 className="mb-4 text-xl font-semibold">El proyecto</h2>
            <p className="max-w-2xl leading-relaxed text-brand-sage-light">{project.description}</p>
            <a className="action-primary mt-7" href={projectInquiry(project.title)} target="_blank" rel="noopener noreferrer">Consultar por un proyecto similar <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-semibold">Servicios</h2>
            <ul className="divide-y divide-white/15">
              {project.services.map((name) => {
                const service = services.find((item) => item.title === name)
                return <li key={name} className="py-3">{service ? <a href={`/servicios/${service.slug}`} className="inline-flex items-center gap-2 underline underline-offset-4">{name}<ArrowUpRight size={16} aria-hidden="true" /></a> : name}</li>
              })}
            </ul>
          </div>
        </section>
        {gallery.length > 0 && <section aria-label="Galería del proyecto" className="grid gap-6 md:grid-cols-2">
          {gallery.map((image) => <figure key={image.src} className={image.layout === 'full' ? 'md:col-span-2' : ''}>
            <img src={image.src} alt={image.caption || project.title} loading="lazy" className="w-full h-auto" />
            {image.caption && <figcaption className="mt-2 text-sm text-brand-sage-light">{image.caption}</figcaption>}
          </figure>)}
        </section>}
        {related.length > 0 && <section className="border-t border-white/15 pt-10">
          <h2 className="mb-6 text-2xl font-semibold">Más proyectos {project.category === 'residencial' ? 'residenciales' : project.category === 'comercial' ? 'comerciales' : 'corporativos'}</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((item) => <a key={item.slug} href={`/proyectos/${item.slug}`} className="group">
              <img {...responsiveImage(item.heroImage, PROJECT_WIDTHS)} sizes="(min-width: 640px) 33vw, 100vw" alt={item.title} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
              <h3 className="mt-3 font-semibold group-hover:underline">{item.title}</h3>
            </a>)}
          </div>
        </section>}
      </div>
    </article>
  )
}
