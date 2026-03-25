import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTACT } from '@/lib/constants'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
  options?: string[]
  inputType?: 'text'
}

interface UserData {
  nombre: string
  tipoProyecto: string
  descripcion: string
  presupuesto: string
  servicio: string
}

const SERVICE_INFO: Record<string, string> = {
  'Diseño Arquitectónico': 'Creamos proyectos integrales combinando funcionalidad, estética y sostenibilidad, transformando ideas en espacios únicos.',
  'Interiorismo': 'Diseñamos ambientes interiores que reflejan identidad y estilo, optimizando el confort y la experiencia del usuario.',
  'Construcción': 'Ejecutamos obras con altos estándares de calidad, asegurando plazos, costos y resultados confiables.',
  'Supervisión': 'Acompañamos cada etapa del proyecto con control técnico y administrativo.',
  'Tramitología': 'Gestionamos permisos y procesos legales para que cada proyecto cumpla con la normativa vigente.',
  'Metodología BIM': 'Implementamos herramientas digitales que permiten planificar, coordinar y optimizar cada fase del proyecto.',
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState('idle')
  const [userData, setUserData] = useState<UserData>({
    nombre: '',
    tipoProyecto: '',
    descripcion: '',
    presupuesto: '',
    servicio: '',
  })
  const [inputValue, setInputValue] = useState('')
  const [showInput, setShowInput] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const msgIdRef = useRef(0)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const addBotMessage = (text: string, options?: string[], inputType?: 'text') => {
    msgIdRef.current++
    const msg: Message = { id: msgIdRef.current, from: 'bot', text, options, inputType }
    setMessages((prev) => [...prev, msg])
    setShowInput(!!inputType)
  }

  const addUserMessage = (text: string) => {
    msgIdRef.current++
    setMessages((prev) => [...prev, { id: msgIdRef.current, from: 'user', text }])
  }

  const startChat = () => {
    setMessages([])
    setUserData({ nombre: '', tipoProyecto: '', descripcion: '', presupuesto: '', servicio: '' })
    setShowInput(false)
    setStep('welcome')
    setTimeout(() => {
      addBotMessage(
        '¡Hola! Soy el asistente virtual de ARQSA Arquitectos. ¿En qué puedo ayudarte?',
        ['Conocer servicios', 'Cotizar un proyecto', 'Hablar con un arquitecto']
      )
    }, 500)
  }

  const handleOpen = () => {
    setIsOpen(true)
    if (messages.length === 0) startChat()
  }

  const handleOption = (option: string) => {
    addUserMessage(option)
    setShowInput(false)

    setTimeout(() => {
      switch (step) {
        case 'welcome':
          if (option === 'Conocer servicios') {
            setStep('services')
            addBotMessage(
              'Ofrecemos servicios integrales de arquitectura. ¿Cuál te interesa?',
              ['Diseño Arquitectónico', 'Interiorismo', 'Construcción', 'Supervisión', 'Tramitología', 'Metodología BIM']
            )
          } else if (option === 'Cotizar un proyecto') {
            setStep('ask_name')
            addBotMessage('¡Perfecto! Para preparar tu cotización, ¿cuál es tu nombre?', undefined, 'text')
          } else if (option === 'Hablar con un arquitecto') {
            setStep('ask_name_direct')
            addBotMessage('Con gusto te conecto. ¿Cuál es tu nombre?', undefined, 'text')
          }
          break

        case 'services':
          setUserData((prev) => ({ ...prev, servicio: option }))
          const info = SERVICE_INFO[option] || 'Un servicio especializado de nuestra firma.'
          setStep('service_detail')
          addBotMessage(info)
          setTimeout(() => {
            addBotMessage('¿Te gustaría cotizar un proyecto con nosotros?', ['Sí, cotizar', 'No, gracias'])
          }, 800)
          break

        case 'service_detail':
          if (option === 'Sí, cotizar') {
            setStep('ask_name')
            addBotMessage('¡Excelente! ¿Cuál es tu nombre?', undefined, 'text')
          } else {
            setStep('end_thanks')
            addBotMessage('¡Gracias por tu interés! Si necesitas algo más, estamos aquí. También puedes contactarnos directamente:', ['Abrir WhatsApp', 'Volver al inicio'])
          }
          break

        case 'ask_type':
          setUserData((prev) => ({ ...prev, tipoProyecto: option }))
          setStep('ask_desc')
          addBotMessage('Cuéntanos brevemente sobre tu proyecto:', undefined, 'text')
          break

        case 'ask_budget':
          setUserData((prev) => ({ ...prev, presupuesto: option }))
          setStep('send_whatsapp')
          const name = userData.nombre
          addBotMessage(
            `¡Gracias ${name}! Tenemos toda la información. Te conecto con nuestro equipo por WhatsApp para darte seguimiento personalizado.`,
            ['Enviar a WhatsApp', 'Volver al inicio']
          )
          break

        case 'send_whatsapp':
        case 'end_thanks':
        case 'send_direct':
          if (option === 'Abrir WhatsApp' || option === 'Enviar a WhatsApp') {
            openWhatsApp()
          } else if (option === 'Volver al inicio') {
            startChat()
          }
          break
      }
    }, 400)
  }

  const handleTextSubmit = () => {
    if (!inputValue.trim()) return
    const text = inputValue.trim()
    addUserMessage(text)
    setInputValue('')
    setShowInput(false)

    setTimeout(() => {
      switch (step) {
        case 'ask_name':
          setUserData((prev) => ({ ...prev, nombre: text }))
          setStep('ask_type')
          addBotMessage(`¡Mucho gusto ${text}! ¿Qué tipo de proyecto te interesa?`, [
            'Residencial',
            'Comercial',
            'Corporativo',
            'Interiorismo',
            'Otro',
          ])
          break

        case 'ask_name_direct':
          setUserData((prev) => ({ ...prev, nombre: text }))
          setStep('send_direct')
          addBotMessage(
            `Perfecto ${text}, te conecto directamente con nuestro equipo de arquitectos.`,
            ['Abrir WhatsApp', 'Volver al inicio']
          )
          break

        case 'ask_desc':
          setUserData((prev) => ({ ...prev, descripcion: text }))
          setStep('ask_budget')
          addBotMessage('¿Cuál es tu presupuesto aproximado?', [
            'Menos de $10k',
            '$10k - $50k',
            '$50k - $100k',
            'Más de $100k',
            'Prefiero no decir',
          ])
          break
      }
    }, 400)
  }

  const openWhatsApp = () => {
    const parts = ['*Nuevo contacto desde la web ARQSA*']
    if (userData.nombre) parts.push(`*Nombre:* ${userData.nombre}`)
    if (userData.tipoProyecto) parts.push(`*Tipo de proyecto:* ${userData.tipoProyecto}`)
    if (userData.descripcion) parts.push(`*Descripción:* ${userData.descripcion}`)
    if (userData.presupuesto) parts.push(`*Presupuesto:* ${userData.presupuesto}`)
    if (userData.servicio) parts.push(`*Servicio de interés:* ${userData.servicio}`)

    const message = encodeURIComponent(parts.join('\n'))
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
            {/* Chat icon */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F5F4F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
            {/* Pulse ring */}
            <span className="absolute inset-0 rounded-full border border-brand-sage/40 animate-ping" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100dvh-3rem)] rounded-2xl glass-dark shadow-cinematic flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-sage/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 80 80" fill="none">
                    <path d="M40 12L68 64H12L40 12Z" stroke="#95978A" strokeWidth="3" />
                  </svg>
                </div>
                <div>
                  <p className="text-brand-cream text-sm font-semibold">ARQSA</p>
                  <p className="text-brand-sage text-[10px]">Asistente Virtual</p>
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
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scrollbar-thin">
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
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
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

              {/* Quick reply options */}
              {messages.length > 0 && messages[messages.length - 1].options && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
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
            {showInput && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-3 border-t border-white/10"
              >
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleTextSubmit()
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Escribe tu respuesta..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-brand-cream placeholder:text-brand-sage/40 focus:outline-none focus:border-brand-sage/40 transition-colors"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-9 h-9 rounded-full bg-brand-sage/20 flex items-center justify-center text-brand-sage hover:bg-brand-sage/30 hover:text-brand-cream transition-colors"
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
