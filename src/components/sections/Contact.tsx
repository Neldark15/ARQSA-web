import { useState } from 'react'
import SectionHeading from '@/components/ui/SectionHeading'
import RevealOnScroll from '@/components/ui/RevealOnScroll'
import GlassCard from '@/components/ui/GlassCard'
import GlassButton from '@/components/ui/GlassButton'
import { CONTACT } from '@/lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: '',
    mensaje: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build mailto or integrate with form service
    const subject = `Consulta Web - ${formData.tipo || 'General'}`
    const body = `Nombre: ${formData.nombre}\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}\nTipo: ${formData.tipo}\n\nMensaje:\n${formData.mensaje}`
    window.open(
      `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    )
  }

  const inputClasses =
    'w-full bg-transparent border-b border-brand-sage/30 py-3 text-brand-cream font-body text-sm focus:border-brand-sage focus:outline-none transition-colors duration-300 placeholder:text-brand-sage/40'

  return (
    <section id="contact" className="relative bg-brand-black py-32 px-6">
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,56,77,0.15)_0%,_transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeading
          label="Contacto"
          title="Hablemos de tu Proyecto"
          subtitle="Estamos a un plano de distancia"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Form */}
          <RevealOnScroll direction="left">
            <GlassCard variant="light" className="p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="nombre"
                    placeholder="Nombre completo"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                  <input
                    type="tel"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className={`${inputClasses} cursor-pointer`}
                  >
                    <option value="" className="bg-brand-black">Tipo de proyecto</option>
                    <option value="Residencial" className="bg-brand-black">Residencial</option>
                    <option value="Comercial" className="bg-brand-black">Comercial</option>
                    <option value="Corporativo" className="bg-brand-black">Corporativo</option>
                    <option value="Interiorismo" className="bg-brand-black">Interiorismo</option>
                    <option value="Otro" className="bg-brand-black">Otro</option>
                  </select>
                </div>
                <div>
                  <textarea
                    name="mensaje"
                    placeholder="Cuéntanos sobre tu proyecto..."
                    rows={4}
                    required
                    value={formData.mensaje}
                    onChange={handleChange}
                    className={`${inputClasses} resize-none`}
                  />
                </div>
                <GlassButton variant="primary" size="lg" type="submit" magnetic className="w-full">
                  Enviar Mensaje
                </GlassButton>
              </form>
            </GlassCard>
          </RevealOnScroll>

          {/* Right - Info */}
          <RevealOnScroll direction="right" delay={0.2}>
            <div className="space-y-6 lg:pl-8">
              {/* WhatsApp CTA */}
              <GlassCard variant="dark" className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <h4 className="font-display text-lg text-brand-cream">WhatsApp</h4>
                    <p className="text-brand-sage text-sm font-body">{CONTACT.whatsappFormatted}</p>
                  </div>
                </div>
                <GlassButton
                  variant="primary"
                  size="md"
                  href={CONTACT.whatsappUrl}
                  target="_blank"
                  magnetic
                  className="w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border-[#25D366]/30"
                >
                  Escríbenos por WhatsApp
                </GlassButton>
              </GlassCard>

              {/* Email */}
              <GlassCard variant="dark" className="p-8">
                <h4 className="font-display text-lg text-brand-cream mb-2">Email</h4>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-brand-sage hover:text-brand-cream transition-colors duration-300 font-body"
                >
                  {CONTACT.email}
                </a>
              </GlassCard>

              {/* Social */}
              <GlassCard variant="dark" className="p-8">
                <h4 className="font-display text-lg text-brand-cream mb-2">Instagram</h4>
                <a
                  href={CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-sage hover:text-brand-cream transition-colors duration-300 font-body"
                >
                  {CONTACT.instagram}
                </a>
              </GlassCard>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}
