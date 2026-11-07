import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { whatsappLink } from '@/lib/contact'

export default function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[660px] h-[88svh] max-h-[950px] items-end overflow-hidden">
      <img
        src="/images/projects/casa-peraza/01-1600.webp"
        srcSet="/images/projects/casa-peraza/01-800.webp 800w, /images/projects/casa-peraza/01-1600.webp 1600w"
        sizes="100vw" width={1600} height={900} fetchPriority="high"
        alt="Casa Peraza, proyecto residencial de GRUPO ARQSA"
        className="absolute inset-0 -z-20 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-black/95 to-transparent" />
      <div className="mx-auto w-full max-w-7xl px-6 pb-10 md:pb-14">
        <p className="mb-3 text-sm font-medium text-white">Arquitectura, construcción e interiorismo en El Salvador</p>
        <h1 className="max-w-3xl font-display text-4xl sm:text-5xl lg:text-7xl leading-tight text-white">GRUPO ARQSA</h1>
        <p className="mt-3 text-lg md:text-2xl text-white">Tu visión, con forma y diseño.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a className="action-primary" href={whatsappLink('Hola, GRUPO ARQSA. Me gustaría cotizar un proyecto.')} target="_blank" rel="noopener noreferrer">
            Cotizar mi proyecto <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="action-secondary" href="#projects">Ver proyectos <ArrowDown size={18} aria-hidden="true" /></a>
        </div>
        <a href="/proyectos/casa-peraza" className="mt-7 inline-flex items-center gap-2 text-sm text-white underline underline-offset-4">
          Casa Peraza · Residencial <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
