import { useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { services } from '@/data/services'
import { projects } from '@/data/projects'
import { whatsappLink } from '@/lib/contact'
import { responsiveImage, PROJECT_WIDTHS } from '@/lib/images'
import PageMetadata from '@/components/ui/PageMetadata'
import NotFoundPage from './NotFoundPage'

export default function ServicePage() {
  const { slug } = useParams()
  const service = services.find((item) => item.slug === slug)
  if (!service) return <NotFoundPage />
  const related = projects.filter((item) => item.services.includes(service.title)).slice(0, 3)
  return <article className="mx-auto max-w-7xl px-6 pt-32 pb-16">
    <PageMetadata title={`${service.title} en El Salvador`} description={service.description} path={`/servicios/${service.slug}`} />
    <a href="/#services" className="inline-flex items-center gap-2 text-sm text-brand-sage-light"><ArrowLeft size={18} aria-hidden="true" /> Todos los servicios</a>
    <header className="max-w-3xl py-10">
      <p className="mb-3 text-sm text-brand-sage-light">GRUPO ARQSA · El Salvador</p>
      <h1 className="font-display text-3xl md:text-5xl leading-tight text-balance">{service.title}</h1>
      <p className="mt-6 text-lg leading-relaxed text-brand-sage-light">{service.description}</p>
    </header>
    <section className="grid gap-10 border-y border-white/15 py-10 md:grid-cols-2">
      <div>
        <h2 className="mb-5 text-2xl font-semibold">Alcance del servicio</h2>
        <ul className="space-y-4">{service.deliverables.map((item) => <li key={item} className="flex items-start gap-3"><Check size={20} className="mt-1 shrink-0 text-brand-sage-light" aria-hidden="true" /><span>{item}</span></li>)}</ul>
      </div>
      <div>
        <h2 className="mb-5 text-2xl font-semibold">Tu proyecto empieza aquí</h2>
        <p className="max-w-lg leading-relaxed text-brand-sage-light">Cuéntanos la ubicación, el tipo de espacio y lo que necesitas resolver. Definimos el alcance, los entregables y los tiempos de acuerdo con tu proyecto.</p>
        <a className="action-primary mt-6" href={whatsappLink(`Hola, GRUPO ARQSA. Me interesa el servicio de ${service.title}.`)} target="_blank" rel="noopener noreferrer">Consultar este servicio <ArrowUpRight size={18} aria-hidden="true" /></a>
      </div>
    </section>
    {related.length > 0 && <section className="pt-12">
      <h2 className="mb-6 text-2xl font-semibold">Proyectos relacionados</h2>
      <div className="grid gap-6 sm:grid-cols-3">{related.map((item) => <a key={item.slug} href={`/proyectos/${item.slug}`} className="group">
        <img {...responsiveImage(item.heroImage, PROJECT_WIDTHS)} sizes="(min-width: 640px) 33vw, 100vw" alt={item.title} className="aspect-[4/3] w-full rounded-lg object-cover" loading="lazy" />
        <h3 className="mt-3 font-semibold group-hover:underline">{item.title}</h3>
      </a>)}</div>
    </section>}
  </article>
}
