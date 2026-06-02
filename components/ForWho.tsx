'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const checkItems = [
  'Tienes clínica de medicina estética o cirugía estética',
  'Recibes consultas por WhatsApp, Instagram o el formulario de tu web',
  'Pierdes consultas porque no puedes responder a todas horas',
  'Quieres escalar sin contratar más personal de recepción',
  'Tu ticket medio por paciente supera los 200€',
]

const notForItems = [
  'Clínicas que ya tienen recepcionista 24/7',
  'Centros con menos de 10 mensajes al mes',
  'Negocios fuera del sector estético y de salud',
]

export default function ForWho() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="section-padding px-6 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
            Para quién es
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Diseñado para clínicas
            <br />
            <span className="italic text-gradient-gold">que quieren crecer</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Is for you */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="border border-[#c9a96e]/30 rounded-2xl p-8 bg-[#c9a96e]/5"
          >
            <h3 className="font-serif text-xl font-semibold text-[#f5f0e8] mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#c9a96e]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </span>
              Es para ti si…
            </h3>

            <ul className="space-y-4">
              {checkItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-[#e8dcc8] text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Is NOT for you */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border border-[#2a2520] rounded-2xl p-8 bg-[#141210]"
          >
            <h3 className="font-serif text-xl font-semibold text-[#9a9080] mb-6 flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-[#2a2520] flex items-center justify-center">
                <svg className="w-4 h-4 text-[#6b6258]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
              Probablemente no es para ti si…
            </h3>

            <ul className="space-y-4">
              {notForItems.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-[#2a2520] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-[#6b6258]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <span className="text-[#6b6258] text-sm leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-[#2a2520]">
              <p className="text-[#6b6258] text-xs leading-relaxed">
                Somos honestos sobre para quién funciona. Si dudas, cuéntanos tu caso en la demo y lo vemos juntos.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
