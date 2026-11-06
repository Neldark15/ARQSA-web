import { useState, useRef, useEffect } from 'react'
import { ArrowUpRight, Mail, Phone, Camera, Pencil } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import { CONTACT } from '@/lib/constants'
import { whatsappLink } from '@/lib/contact'

export default function Contact() {
  const [summary, setSummary] = useState('')
  const [reviewing, setReviewing] = useState(false)
  const summaryRef = useRef<HTMLTextAreaElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (reviewing) {
      summaryRef.current?.focus({ preventScroll: true })
      summaryRef.current?.scrollIntoView({ block: 'center' })
    }
  }, [reviewing])

  function prepareMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const read = (key: string) => String(values.get(key) ?? '').trim()
    for (const [key, minimum] of [['nombre', 2], ['mensaje', 10]] as const) {
      const field = event.currentTarget.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement
      field.setCustomValidity(read(key).length < minimum ? `Escribe al menos ${minimum} caracteres.` : '')
      if (!field.reportValidity()) return
    }
    setSummary([
      'Consulta web - GRUPO ARQSA',
      `Nombre: ${read('nombre')}`,
      `Proyecto: ${read('tipo')}`,
      read('contacto') ? `Contacto: ${read('contacto')}` : '',
      '', read('mensaje'),
    ].filter((line) => line !== '').join('\n'))
    setReviewing(true)
  }

  return (
    <section id="contact" className="bg-brand-black px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading label="Contacto" title="Hablemos de tu proyecto" subtitle="Cuéntanos qué tienes en mente." />
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-24">
          <div>
            <form onSubmit={prepareMessage} onInput={(event) => { const field = event.target; if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) field.setCustomValidity('') }} className={reviewing ? 'hidden' : 'space-y-5'}>
              <div>
                <label htmlFor="contact-name" className="field-label">Nombre completo</label>
                <input ref={nameRef} id="contact-name" name="nombre" autoComplete="name" required minLength={2} maxLength={100} className="field" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-type" className="field-label">Tipo de proyecto</label>
                  <select id="contact-type" name="tipo" required className="field" defaultValue="">
                    <option value="" disabled className="bg-brand-black">Selecciona una opción</option>
                    {['Residencial', 'Comercial', 'Corporativo', 'Interiorismo', 'Otro'].map((type) => <option key={type} className="bg-brand-black">{type}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-detail" className="field-label">Teléfono o correo (opcional)</label>
                  <input id="contact-detail" name="contacto" maxLength={150} className="field" />
                </div>
              </div>
              <div>
                <label htmlFor="contact-message" className="field-label">Sobre tu proyecto</label>
                <textarea id="contact-message" name="mensaje" rows={4} required minLength={10} maxLength={2000} className="field resize-y" placeholder="Ubicación, espacios y lo que necesitas..." />
              </div>
              <button type="submit" className="action-primary">Preparar consulta <ArrowUpRight size={18} aria-hidden="true" /></button>
            </form>
            <div aria-live="polite">
              {reviewing && (
                <div>
                  <h3 className="mb-3 text-xl font-semibold">Tu consulta</h3>
                  <label htmlFor="contact-summary" className="sr-only">Mensaje para WhatsApp</label>
                  <textarea ref={summaryRef} id="contact-summary" className="field min-h-56 resize-y" value={summary} onChange={(event) => setSummary(event.target.value)} maxLength={3000} />
                  <div className="mt-4 flex flex-wrap gap-3">
                    {summary.trim() && <a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer" className="action-primary">Continuar en WhatsApp <ArrowUpRight size={18} aria-hidden="true" /></a>}
                    <button className="action-secondary" type="button" onClick={() => { setReviewing(false); requestAnimationFrame(() => nameRef.current?.focus()) }}><Pencil size={16} aria-hidden="true" /> Volver al formulario</button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <address className="not-italic divide-y divide-white/15">
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex gap-4 py-5">
              <Phone size={22} className="shrink-0 text-brand-sage-light" aria-hidden="true" />
              <span><span className="block font-semibold">WhatsApp</span><span className="text-brand-sage-light">{CONTACT.whatsappFormatted}</span></span>
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex gap-4 py-5 break-all">
              <Mail size={22} className="shrink-0 text-brand-sage-light" aria-hidden="true" />
              <span><span className="block font-semibold">Correo</span><span className="text-brand-sage-light">{CONTACT.email}</span></span>
            </a>
            <a href={CONTACT.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex gap-4 py-5">
              <Camera size={22} className="shrink-0 text-brand-sage-light" aria-hidden="true" />
              <span><span className="block font-semibold">Instagram</span><span className="text-brand-sage-light">{CONTACT.instagram}</span></span>
            </a>
          </address>
        </div>
      </div>
    </section>
  )
}
