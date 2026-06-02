'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Tres promesas de producto, verificables y reales (no estadísticas).
// Cada una corresponde a una característica concreta del servicio:
//  - Respuesta automática 24/7
//  - Cualificación con vocabulario del sector
//  - Onboarding gratuito en 48h
const promises = [
  {
    headline: '<1 min',
    label: 'Tiempo de respuesta a cada mensaje',
    description: 'Cada mensaje recibe respuesta en menos de un minuto. Garantizado. Da igual la hora, el día o el volumen.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    headline: '24/7',
    label: 'Disponibilidad sin parar',
    description: 'Noches, festivos, domingos a las 3 de la mañana. Tu clínica nunca se queda sin atender un mensaje.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    headline: '0€',
    label: 'Coste de setup · activo en 48h',
    description: 'Te configuramos el agente, lo entrenamos con tus tratamientos y tu tono, y queda funcionando. Sin inversión inicial.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
]

function PromiseCard({
  promise,
  index,
  inView,
}: {
  promise: (typeof promises)[0]
  index: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="text-center px-4"
    >
      <div className="inline-flex w-14 h-14 rounded-2xl bg-[#c9a96e]/10 border border-[#c9a96e]/20 items-center justify-center text-[#c9a96e] mb-6">
        {promise.icon}
      </div>

      <div className="font-serif text-5xl md:text-6xl font-semibold text-gradient-gold mb-2">
        {promise.headline}
      </div>

      <p className="text-[#f5f0e8] font-medium text-base md:text-lg mb-3 max-w-[240px] mx-auto leading-tight">
        {promise.label}
      </p>

      <p className="text-[#9a9080] text-sm max-w-[260px] mx-auto leading-relaxed">
        {promise.description}
      </p>
    </motion.div>
  )
}

export default function Results() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="resultados" className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
            La diferencia
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Sin promesas vacías.
            <br />
            <span className="italic text-gradient-gold">Lo que dice, lo hace.</span>
          </h2>
        </motion.div>

        <div className="border border-[#2a2520] rounded-2xl bg-[#141210] px-6 py-14 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative">
            {promises.map((promise, i) => (
              <div key={i} className="relative">
                <PromiseCard promise={promise} index={i} inView={isInView} />
                {i < promises.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-[#2a2520]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
