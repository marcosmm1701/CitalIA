'use client'

import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: '¿El agente dice cosas médicas que no debe?',
    a: 'No. El agente está entrenado para no dar diagnósticos, dosis ni indicaciones médicas. Su rol es informar sobre tratamientos de forma general, cualificar al interesado y derivarlo a la clínica. Para cualquier consulta médica, el agente redirige al equipo de profesionales.',
  },
  {
    q: '¿Mis pacientes van a saber que es IA?',
    a: 'Eso lo decides tú. El agente puede presentarse como "la asistente de [nombre de tu clínica]" sin mencionar explícitamente que es IA. La conversación es tan natural que la mayoría de usuarios no lo detecta. Por transparencia, te recomendamos incluir una mención en tu política de privacidad.',
  },
  {
    q: '¿Funciona con mi WhatsApp Business actual?',
    a: 'Sí. El agente se conecta a tu número de WhatsApp Business actual mediante la API oficial de WhatsApp. No necesitas cambiar de número ni de línea. La integración se realiza en menos de 48 horas sin que el número quede fuera de servicio.',
  },
  {
    q: '¿Se integra con el formulario de mi web?',
    a: 'Sí. Citalia conecta con el formulario de tu web independientemente de la plataforma: WordPress, Webflow, Squarespace, Shopify o un desarrollo a medida. Cada vez que alguien rellena tu formulario, el agente le contesta al instante por el canal que prefieras (email o WhatsApp si dejó número). Así centralizas las tres fuentes de consultas — WhatsApp, Instagram y web — en un único flujo.',
  },
  {
    q: '¿Qué pasa si quiero cancelar?',
    a: 'Puedes cancelar en cualquier momento sin penalización. Sin permanencias ni letras pequeñas. Cuando cancelas, el agente deja de funcionar al final del periodo de facturación. Tus datos y conversaciones quedan disponibles durante 30 días antes de eliminarse.',
  },
  {
    q: '¿Cuánto tarda en estar activo?',
    a: 'En 48 horas hábiles desde que nos envías los datos de tu clínica. Ese tiempo lo usamos para personalizar las respuestas con tu vocabulario, tus tratamientos, tus precios orientativos y el tono de comunicación que usas habitualmente.',
  },
  {
    q: '¿Puedo personalizar cómo responde?',
    a: 'Completamente. Durante el setup revisamos contigo los tratamientos que ofreces, el tono (más formal o más cercano), las preguntas de cualificación y las condiciones de derivación. Además, puedes solicitar ajustes en cualquier momento a través del soporte por WhatsApp.',
  },
]

function FAQItem({ faq, index, isInView }: { faq: typeof faqs[0]; index: number; isInView: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="border border-[#2a2520] rounded-2xl overflow-hidden bg-[#141210]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left group"
      >
        <span className="text-[#f5f0e8] font-medium text-sm md:text-base pr-4 group-hover:text-[#c9a96e] transition-colors">
          {faq.q}
        </span>
        <span
          className={`flex-shrink-0 w-7 h-7 rounded-full border border-[#2a2520] flex items-center justify-center text-[#9a9080] transition-all duration-200 ${
            open ? 'rotate-45 border-[#c9a96e]/40 text-[#c9a96e]' : ''
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="px-6 pb-5 border-t border-[#2a2520]">
              <p className="text-[#9a9080] text-sm leading-relaxed pt-4">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="faq" className="section-padding px-6 bg-[#0a0a0a]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
            FAQ
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Preguntas{' '}
            <span className="italic text-gradient-gold">frecuentes</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
