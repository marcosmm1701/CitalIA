'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const messages = [
  {
    from: 'user',
    text: 'Hola! Me interesa el bótox, cuánto cuesta?',
    time: '22:14',
  },
  {
    from: 'agent',
    text: 'Hola ✨ ¡Claro! Estamos encantadas de ayudarte. El tratamiento de bótox tiene un precio según las zonas a tratar. ¿Es la primera vez que te lo haces o ya tienes experiencia con el tratamiento?',
    time: '22:14',
  },
  {
    from: 'user',
    text: 'Sería la primera vez, quiero tratar el entrecejo y la frente',
    time: '22:15',
  },
  {
    from: 'agent',
    text: 'Perfecto, esas dos zonas son las más habituales 🎯 Para darte un presupuesto personalizado, ¿preferirías tener la consulta antes de fin de semana o la semana que viene te va mejor?',
    time: '22:15',
  },
  {
    from: 'user',
    text: 'La semana que viene mejor, martes o miércoles',
    time: '22:16',
  },
  {
    from: 'agent',
    text: 'Anotado 📅 Tenemos disponibilidad el martes a las 18:00h y el miércoles a las 17:30h. ¿Te confirmo alguna de las dos citas? Solo necesito tu nombre completo.',
    time: '22:16',
  },
  {
    from: 'user',
    text: 'El martes a las 18h me viene perfecto. Me llamo Laura García',
    time: '22:17',
  },
  {
    from: 'agent',
    text: '✅ ¡Perfecto, Laura! Cita confirmada para el martes a las 18:00h. Te llegará un recordatorio por aquí 24h antes. ¡Nos vemos pronto! 💛',
    time: '22:17',
  },
]

function WhatsAppMessage({
  message,
  visible,
}: {
  message: (typeof messages)[0]
  visible: boolean
}) {
  const isUser = message.from === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}
    >
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/30 flex items-center justify-center text-xs font-semibold text-[#c9a96e] mr-2 mt-auto mb-1 flex-shrink-0">
          A
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 ${
          isUser
            ? 'bg-[#2d5a27] text-white rounded-br-sm'
            : 'bg-[#1f1e1d] border border-[#2a2520] text-[#f5f0e8] rounded-bl-sm'
        }`}
      >
        <p className="text-sm leading-relaxed">{message.text}</p>
        <p className={`text-[10px] mt-1 text-right ${isUser ? 'text-green-300/60' : 'text-[#6b6258]'}`}>
          {message.time}
          {isUser && (
            <span className="ml-1 text-blue-300">✓✓</span>
          )}
        </p>
      </div>
    </motion.div>
  )
}

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleCount(i)
      if (i >= messages.length) clearInterval(interval)
    }, 900)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section id="como-funciona" className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
              Cómo funciona
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight mb-6">
              Convierte mensajes en
              <br />
              <span className="italic text-gradient-gold">pacientes mientras duermes</span>
            </h2>
            <p className="text-[#9a9080] leading-relaxed mb-8">
              El agente atiende el mensaje en segundos, identifica el tratamiento de
              interés, cualifica al interesado y cierra la cita — o lo transfiere a tu
              equipo cuando está listo para reservar.
            </p>

            <div className="space-y-5">
              {[
                { num: '01', title: 'Conecta tus 3 canales', desc: 'WhatsApp Business, Instagram DMs y tu formulario web (WordPress, Webflow o el que uses). Todo en un único flujo.' },
                { num: '02', title: 'Respuesta inmediata', desc: 'En segundos, a cualquier hora. 24h, 7 días a la semana.' },
                { num: '03', title: 'Cualificación con vocabulario estético', desc: 'Bótox, rellenos, rinomodelación, hilos tensores… el agente conoce el sector.' },
                { num: '04', title: 'Cierre o transferencia inteligente', desc: 'Confirma citas directo en tu agenda o escala a tu equipo cuando es el momento.' },
              ].map((step) => (
                <div key={step.num} className="flex gap-4">
                  <span className="font-serif text-2xl text-[#c9a96e]/40 font-medium w-8 flex-shrink-0">
                    {step.num}
                  </span>
                  <div>
                    <h4 className="text-[#f5f0e8] font-medium mb-1">{step.title}</h4>
                    <p className="text-[#9a9080] text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: WhatsApp mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex justify-center"
          >
            {/* Anchura tipo iPhone (340px) para que la proporción ancho:alto
                final del móvil quede cercana a 1:1.85 — móvil real, no tablet. */}
            <div className="w-full max-w-[340px]">
              {/* Phone frame */}
              <div className="bg-[#0a0a0a] rounded-[2.5rem] p-3 border border-[#2a2520] shadow-2xl shadow-black/50">
                {/* Phone inner */}
                <div className="bg-[#111b21] rounded-[2rem] overflow-hidden">
                  {/* WhatsApp header */}
                  <div className="bg-[#202c33] px-4 py-3 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/30 flex items-center justify-center text-sm font-semibold text-[#c9a96e]">
                      A
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Citalia · Clínica Belleza</p>
                      <p className="text-[#8696a0] text-[11px]">en línea</p>
                    </div>
                    <div className="ml-auto flex gap-4 text-[#8696a0]">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                    </div>
                  </div>

                  {/* Chat background — altura aumentada para que el aspect
                      ratio final del móvil se parezca a un dispositivo real. */}
                  <div className="h-[540px] overflow-y-auto p-3 bg-[#0b141a] relative"
                    style={{
                      backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.01'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                  >
                    {/* Date chip */}
                    <div className="flex justify-center mb-3">
                      <span className="bg-[#182229] text-[#8696a0] text-[10px] px-3 py-1 rounded-full">
                        HOY
                      </span>
                    </div>

                    {messages.map((msg, i) => (
                      <WhatsAppMessage
                        key={i}
                        message={msg}
                        visible={i < visibleCount}
                      />
                    ))}
                  </div>

                  {/* Input bar */}
                  <div className="bg-[#202c33] px-3 py-2.5 flex items-center gap-2">
                    <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2">
                      <p className="text-[#8696a0] text-xs">Escribe un mensaje</p>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#00a884] flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Label */}
              <p className="text-center text-xs text-[#6b6258] mt-4">
                Conversación real simulada · Las respuestas son automáticas
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
