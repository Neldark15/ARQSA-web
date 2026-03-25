import { CONTACT } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="relative bg-brand-black pt-32 pb-8">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-sage/30 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Col 1 - Brand */}
          <div>
            <h3 className="font-display text-3xl text-brand-cream mb-3">ARQSA</h3>
            <p className="text-brand-sage text-sm font-body">
              Tu visión, con forma y diseño
            </p>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <h4 className="text-brand-cream text-sm uppercase tracking-[0.15em] mb-4 font-body">
              Navegación
            </h4>
            <nav className="flex flex-col gap-2">
              {['Inicio', 'Nosotros', 'Proyectos', 'Servicios', 'Metodología', 'Equipo', 'Contacto'].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => {
                      const id = item.toLowerCase()
                      document.querySelector(`#${id === 'inicio' ? 'hero' : id === 'nosotros' ? 'about' : id}`)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="text-brand-sage/70 hover:text-brand-cream text-sm transition-colors duration-300 text-left font-body"
                  >
                    {item}
                  </button>
                )
              )}
            </nav>
          </div>

          {/* Col 3 - Contact */}
          <div>
            <h4 className="text-brand-cream text-sm uppercase tracking-[0.15em] mb-4 font-body">
              Contacto
            </h4>
            <div className="flex flex-col gap-3 text-sm text-brand-sage/70 font-body">
              <a
                href={`mailto:${CONTACT.email}`}
                className="hover:text-brand-cream transition-colors duration-300"
              >
                {CONTACT.email}
              </a>
              <a
                href={CONTACT.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cream transition-colors duration-300"
              >
                {CONTACT.whatsappFormatted}
              </a>
              <a
                href={CONTACT.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-cream transition-colors duration-300"
              >
                {CONTACT.instagram}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-sage/10 pt-6 flex flex-col items-center gap-3">
          <p className="text-brand-sage/40 text-xs text-center font-body">
            &copy; {new Date().getFullYear()} ARQSA Arquitectos Sevillano Aguilar. Todos los derechos reservados.
          </p>
          <p className="text-brand-sage/30 text-[10px] uppercase tracking-[0.2em] font-body">
            Diseñado por <span className="text-brand-sage/50">NOCTURA</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
