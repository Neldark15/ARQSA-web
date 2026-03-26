import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT } from '@/lib/constants'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
  options?: string[]
  inputType?: 'text' | 'email' | 'tel'
  inputPlaceholder?: string
  typing?: boolean
}

interface UserData {
  nombre: string
  email: string
  telefono: string
  tipoProyecto: string
  descripcion: string
  ubicacion: string
  tamano: string
  presupuesto: string
  plazo: string
  servicio: string
  comoNosEncontro: string
}

const EMPTY_DATA: UserData = {
  nombre: '', email: '', telefono: '', tipoProyecto: '',
  descripcion: '', ubicacion: '', tamano: '', presupuesto: '',
  plazo: '', servicio: '', comoNosEncontro: '',
}

const SERVICES: Record<string, { desc: string; examples: string }> = {
  'Diseño Arquitectónico': {
    desc: 'Creamos proyectos integrales combinando funcionalidad, estética y sostenibilidad. Desde el concepto inicial hasta los planos ejecutivos.',
    examples: 'Incluye: anteproyecto, planos arquitectónicos, renders 3D, especificaciones técnicas y coordinación con ingenierías.',
  },
  'Interiorismo': {
    desc: 'Diseñamos ambientes interiores que reflejan tu identidad y estilo, optimizando el confort y la experiencia de cada espacio.',
    examples: 'Incluye: diseño de mobiliario, paleta de materiales, iluminación, acabados y decoración integral.',
  },
  'Construcción': {
    desc: 'Ejecutamos obras con altos estándares de calidad, asegurando plazos, costos y resultados confiables.',
    examples: 'Incluye: presupuesto detallado, cronograma de obra, control de calidad y entrega llave en mano.',
  },
  'Supervisión': {
    desc: 'Acompañamos cada etapa del proyecto con control técnico y administrativo, garantizando que la obra cumpla lo planificado.',
    examples: 'Incluye: visitas de obra, reportes de avance, control de presupuesto y verificación de calidad.',
  },
  'Tramitología': {
    desc: 'Gestionamos todos los permisos y procesos legales necesarios para que tu proyecto cumpla con la normativa vigente.',
    examples: 'Incluye: permisos de construcción, factibilidades, revisión de planos y aprobaciones municipales.',
  },
  'Metodología BIM': {
    desc: 'Implementamos tecnología BIM para planificar, coordinar y optimizar cada fase del proyecto con máxima precisión.',
    examples: 'Incluye: modelado 3D paramétrico, detección de interferencias, cuantificación automática y coordinación multidisciplinaria.',
  },
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState('idle')
  const [userData, setUserData] = useState<UserData>(EMPTY_DATA)
  const [inputValue, setInputValue] = useState('')
  const [showInput, setShowInput] = useState(false)
  const [inputConfig, setInputConfig] = useState<{ type: string; placeholder: string }>({ type: 'text', placeholder: '' })
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const msgIdRef = useRef(0)

  const scrollToBottom = () => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showInput])

  const addBotMsg = useCallback((text: string, options?: string[], input?: { type: string; placeholder: string }) => {
    setIsTyping(true)
    const delay = Math.min(text.length * 15, 1200) + 300

    setTimeout(() => {
      setIsTyping(false)
      msgIdRef.current++
      setMessages((prev) => [...prev, { id: msgIdRef.current, from: 'bot', text, options }])
      if (input) {
        setShowInput(true)
        setInputConfig(input)
      } else {
        setShowInput(false)
      }
    }, delay)
  }, [])

  const addUserMsg = (text: string) => {
    msgIdRef.current++
    setMessages((prev) => [...prev, { id: msgIdRef.current, from: 'user', text }])
    setShowInput(false)
  }

  const startChat = () => {
    setMessages([])
    setUserData(EMPTY_DATA)
    setShowInput(false)
    setIsTyping(false)
    setStep('welcome')
    setTimeout(() => {
      addBotMsg(
        'Hola, bienvenido a ARQSA Arquitectos. Soy el asistente virtual y estoy aquí para ayudarte con tu proyecto.',
        ['Conocer nuestros servicios', 'Cotizar un proyecto', 'Ver proyectos realizados', 'Hablar con un arquitecto']
      )
    }, 400)
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (messages.length === 0) startChat()
  }

  const handleOption = (option: string) => {
    addUserMsg(option)

    setTimeout(() => {
      switch (step) {
        // ========== WELCOME ==========
        case 'welcome':
          if (option === 'Conocer nuestros servicios') {
            setStep('services_menu')
            addBotMsg(
              'En ARQSA ofrecemos un servicio integral de arquitectura. Estos son nuestros servicios principales:',
              Object.keys(SERVICES)
            )
          } else if (option === 'Cotizar un proyecto') {
            setStep('quote_name')
            addBotMsg('¡Excelente! Vamos a preparar tu cotización. Primero, ¿cuál es tu nombre completo?', undefined, { type: 'text', placeholder: 'Tu nombre completo...' })
          } else if (option === 'Ver proyectos realizados') {
            setStep('projects_info')
            addBotMsg('Hemos trabajado en mas de 35 proyectos incluyendo residencias, oficinas corporativas, clinicas y mas. Algunos destacados:')
            setTimeout(() => {
              addBotMsg('- APTO Park Tower / Diseno interior residencial premium\n- Clinica 1802 Torre Humana / Espacio de salud moderno\n- Fedecredito / Oficinas corporativas\n- Casa Fernandez / Residencia contemporanea\n- Oficinas GEA / Espacio corporativo', ['Cotizar un proyecto', 'Conocer nuestros servicios', 'Hablar con un arquitecto'])
            }, 1500)
          } else if (option === 'Hablar con un arquitecto') {
            setStep('direct_name')
            addBotMsg('Con gusto te conecto con nuestro equipo. ¿Cuál es tu nombre?', undefined, { type: 'text', placeholder: 'Tu nombre...' })
          }
          break

        // ========== SERVICES ==========
        case 'services_menu':
          if (SERVICES[option]) {
            setUserData((prev) => ({ ...prev, servicio: option }))
            setStep('service_detail')
            const svc = SERVICES[option]
            addBotMsg(`*${option}*\n\n${svc.desc}`)
            setTimeout(() => {
              addBotMsg(svc.examples, ['Cotizar este servicio', 'Ver otro servicio', 'Volver al inicio'])
            }, 1500)
          }
          break

        case 'service_detail':
          if (option === 'Cotizar este servicio') {
            setStep('quote_name')
            addBotMsg('¡Perfecto! Vamos a preparar tu cotización. ¿Cuál es tu nombre completo?', undefined, { type: 'text', placeholder: 'Tu nombre completo...' })
          } else if (option === 'Ver otro servicio') {
            setStep('services_menu')
            addBotMsg('¿Qué otro servicio te gustaría conocer?', Object.keys(SERVICES))
          } else if (option === 'Volver al inicio') {
            startChat()
          }
          break

        // ========== PROJECTS INFO ==========
        case 'projects_info':
          if (option === 'Cotizar un proyecto') {
            setStep('quote_name')
            addBotMsg('¡Genial! Comencemos. ¿Cuál es tu nombre completo?', undefined, { type: 'text', placeholder: 'Tu nombre completo...' })
          } else if (option === 'Conocer nuestros servicios') {
            setStep('services_menu')
            addBotMsg('Estos son nuestros servicios:', Object.keys(SERVICES))
          } else if (option === 'Hablar con un arquitecto') {
            setStep('direct_name')
            addBotMsg('¿Cuál es tu nombre?', undefined, { type: 'text', placeholder: 'Tu nombre...' })
          }
          break

        // ========== QUOTE FLOW ==========
        case 'quote_type':
          setUserData((prev) => ({ ...prev, tipoProyecto: option }))
          setStep('quote_service')
          addBotMsg('¿Qué servicio necesitas para tu proyecto?', [
            'Diseño Arquitectónico',
            'Interiorismo',
            'Construcción',
            'Diseño + Construcción',
            'Supervisión',
            'No estoy seguro',
          ])
          break

        case 'quote_service':
          setUserData((prev) => ({ ...prev, servicio: option }))
          setStep('quote_desc')
          addBotMsg('Cuéntanos sobre tu proyecto. ¿Qué tienes en mente? (Describe libremente lo que imaginas)', undefined, { type: 'text', placeholder: 'Describe tu proyecto...' })
          break

        case 'quote_size':
          setUserData((prev) => ({ ...prev, tamano: option }))
          setStep('quote_budget')
          addBotMsg('¿Cuál es tu presupuesto aproximado para este proyecto?', [
            'Menos de $10,000',
            '$10,000 - $50,000',
            '$50,000 - $100,000',
            '$100,000 - $500,000',
            'Más de $500,000',
            'Necesito orientación',
          ])
          break

        case 'quote_budget':
          setUserData((prev) => ({ ...prev, presupuesto: option }))
          setStep('quote_timeline')
          addBotMsg('¿Cuándo te gustaría iniciar el proyecto?', [
            'Lo antes posible',
            'En 1-3 meses',
            'En 3-6 meses',
            'En más de 6 meses',
            'Solo estoy explorando',
          ])
          break

        case 'quote_timeline':
          setUserData((prev) => ({ ...prev, plazo: option }))
          setStep('quote_email')
          addBotMsg('Casi terminamos. ¿Cuál es tu correo electrónico? (para enviarte información)', undefined, { type: 'email', placeholder: 'tu@email.com' })
          break

        case 'quote_howfound':
          setUserData((prev) => ({ ...prev, comoNosEncontro: option }))
          setStep('quote_summary')
          const d = userData
          addBotMsg(
            `Excelente ${d.nombre}! Aqui esta el resumen:\n\n- Proyecto: ${d.tipoProyecto}\n- Servicio: ${d.servicio}\n- Ubicacion: ${d.ubicacion}\n- Tamano: ${d.tamano}\n- Presupuesto: ${d.presupuesto}\n- Plazo: ${d.plazo}\n- Email: ${d.email}\n- Telefono: ${d.telefono}\n\nTodo esta correcto?`,
            ['Sí, enviar a WhatsApp', 'Corregir información', 'Volver al inicio']
          )
          break

        case 'quote_summary':
          if (option === 'Sí, enviar a WhatsApp') {
            openWhatsApp()
            addBotMsg('Listo! Se abrio WhatsApp con toda tu informacion. Nuestro equipo te contactara pronto. Gracias por confiar en ARQSA.', ['Volver al inicio'])
            setStep('end')
          } else if (option === 'Corregir información') {
            setStep('quote_name')
            addBotMsg('Sin problema. Empecemos de nuevo. ¿Cuál es tu nombre?', undefined, { type: 'text', placeholder: 'Tu nombre completo...' })
          } else {
            startChat()
          }
          break

        // ========== DIRECT CONTACT ==========
        case 'direct_phone':
          break

        // ========== END ==========
        case 'end':
          if (option === 'Volver al inicio') startChat()
          break
      }
    }, 300)
  }

  const handleTextSubmit = () => {
    if (!inputValue.trim()) return
    const text = inputValue.trim()
    addUserMsg(text)
    setInputValue('')
    setShowInput(false)

    setTimeout(() => {
      switch (step) {
        // ========== QUOTE FLOW TEXT INPUTS ==========
        case 'quote_name':
          setUserData((prev) => ({ ...prev, nombre: text }))
          setStep('quote_type')
          addBotMsg(`¡Mucho gusto ${text}! ¿Qué tipo de proyecto te interesa?`, [
            'Residencial (casa)',
            'Apartamento / Penthouse',
            'Comercial (tienda, restaurante)',
            'Corporativo (oficinas)',
            'Salud (clínica, consultorio)',
            'Remodelación',
            'Otro',
          ])
          break

        case 'quote_desc':
          setUserData((prev) => ({ ...prev, descripcion: text }))
          setStep('quote_location')
          addBotMsg('¿En qué zona o ciudad se ubicará el proyecto?', undefined, { type: 'text', placeholder: 'Ej: San Salvador, Santa Tecla...' })
          break

        case 'quote_location':
          setUserData((prev) => ({ ...prev, ubicacion: text }))
          setStep('quote_size')
          addBotMsg('¿Cuál es el tamaño aproximado que necesitas?', [
            'Menos de 100 m²',
            '100 - 300 m²',
            '300 - 500 m²',
            '500 - 1,000 m²',
            'Más de 1,000 m²',
            'No estoy seguro',
          ])
          break

        case 'quote_email':
          setUserData((prev) => ({ ...prev, email: text }))
          setStep('quote_phone')
          addBotMsg('¿Y tu número de teléfono? (para WhatsApp)', undefined, { type: 'tel', placeholder: '+503 7777-7777' })
          break

        case 'quote_phone':
          setUserData((prev) => ({ ...prev, telefono: text }))
          setStep('quote_howfound')
          addBotMsg('Última pregunta: ¿cómo nos encontraste?', [
            'Instagram',
            'Google',
            'Recomendación',
            'Pasé por un proyecto suyo',
            'Otro',
          ])
          break

        // ========== DIRECT CONTACT ==========
        case 'direct_name':
          setUserData((prev) => ({ ...prev, nombre: text }))
          setStep('direct_phone')
          addBotMsg(`Gracias ${text}. ¿Cuál es tu número de teléfono o email para que te contactemos?`, undefined, { type: 'text', placeholder: 'Teléfono o email...' })
          break

        case 'direct_phone':
          setUserData((prev) => ({ ...prev, telefono: text }))
          setStep('direct_reason')
          addBotMsg('¿Sobre qué tema deseas hablar con un arquitecto?', undefined, { type: 'text', placeholder: 'Cuéntanos brevemente...' })
          break

        case 'direct_reason':
          setUserData((prev) => ({ ...prev, descripcion: text }))
          setStep('end')
          openWhatsAppDirect(text)
          addBotMsg(`Perfecto ${userData.nombre}, se abrio WhatsApp para que hables directamente con nuestro equipo. Te atenderemos lo antes posible.`, ['Volver al inicio'])
          break
      }
    }, 300)
  }

  const openWhatsApp = () => {
    const d = userData
    const lines = [
      '*NUEVA SOLICITUD - Web ARQSA*',
      '-----------------------------------',
      '',
      `*Nombre:* ${d.nombre}`,
      `*Email:* ${d.email}`,
      `*Telefono:* ${d.telefono}`,
      '',
      `*Tipo de proyecto:* ${d.tipoProyecto}`,
      `*Servicio:* ${d.servicio}`,
      `*Ubicacion:* ${d.ubicacion}`,
      `*Tamano:* ${d.tamano}`,
      `*Presupuesto:* ${d.presupuesto}`,
      `*Plazo:* ${d.plazo}`,
      '',
      `*Descripcion:*`,
      d.descripcion,
      '',
      `*Nos encontro por:* ${d.comoNosEncontro}`,
      '',
      '-----------------------------------',
      '_Enviado desde grupoarqsa.com_',
    ]
    const message = encodeURIComponent(lines.join('\n'))
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, '_blank')
  }

  const openWhatsAppDirect = (reason: string) => {
    const lines = [
      '*CONTACTO DIRECTO - Web ARQSA*',
      '-----------------------------------',
      '',
      `*Nombre:* ${userData.nombre}`,
      `*Contacto:* ${userData.telefono}`,
      `*Motivo:* ${reason}`,
      '',
      '-----------------------------------',
      '_Enviado desde grupoarqsa.com_',
    ]
    const message = encodeURIComponent(lines.join('\n'))
    window.open(`${CONTACT.whatsappUrl}?text=${message}`, '_blank')
  }

  return (
    <>
      {/* FAB Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-dark shadow-cinematic flex items-center justify-center group"
            onClick={handleOpen}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Abrir asistente virtual"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F4F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            <span className="absolute inset-0 rounded-full border border-brand-sage/40 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[560px] max-h-[calc(100dvh-3rem)] rounded-2xl glass-dark shadow-cinematic flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-sage/20 flex items-center justify-center">
                  <img src="/logo-vertical-transparent.png" alt="" className="w-6 h-6 object-contain" />
                </div>
                <div>
                  <p className="text-brand-cream text-sm font-semibold">ARQSA Arquitectos</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <p className="text-green-400/80 text-[10px]">En línea</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-brand-sage hover:text-brand-cream hover:bg-white/5 transition-colors"
                aria-label="Cerrar chat"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              <AnimatePresence mode="popLayout">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13px] leading-relaxed whitespace-pre-line ${
                        msg.from === 'bot'
                          ? 'bg-brand-sage/15 text-brand-cream rounded-tl-sm'
                          : 'bg-brand-dark/80 text-brand-cream rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-brand-sage/15 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                    <span className="w-2 h-2 bg-brand-sage/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-brand-sage/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-brand-sage/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

              {/* Quick reply options */}
              {!isTyping && messages.length > 0 && messages[messages.length - 1].from === 'bot' && messages[messages.length - 1].options && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {messages[messages.length - 1].options!.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOption(option)}
                      className="px-3 py-1.5 text-xs rounded-full border border-brand-sage/30 text-brand-sage hover:bg-brand-sage/15 hover:text-brand-cream hover:border-brand-sage/50 transition-all duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {showInput && !isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 border-t border-white/10 shrink-0"
              >
                <form
                  onSubmit={(e) => { e.preventDefault(); handleTextSubmit() }}
                  className="flex gap-2"
                >
                  <input
                    ref={inputRef}
                    type={inputConfig.type}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={inputConfig.placeholder || 'Escribe tu respuesta...'}
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-brand-cream placeholder:text-brand-sage/40 focus:outline-none focus:border-brand-sage/40 transition-colors"
                  />
                  <button
                    type="submit"
                    className="w-10 h-10 rounded-full bg-brand-sage/20 flex items-center justify-center text-brand-sage hover:bg-brand-sage/30 hover:text-brand-cream transition-colors shrink-0"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                    </svg>
                  </button>
                </form>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
