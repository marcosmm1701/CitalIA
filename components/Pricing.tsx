'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface PricingProps {
  onOpenModal: () => void
  onOpenCustomQuote: () => void
}

interface Feature {
  text: string
  highlight?: boolean
}

interface Plan {
  name: string
  price: number
  tagline: string
  features: Feature[]
  featured?: boolean
}

const plans: Plan[] = [
  {
    name: 'Starter',
    price: 199,
    tagline: 'Para clínicas pequeñas que no quieren perder ni un paciente.',
    features: [
      { text: 'Hasta 500 mensajes de pacientes al mes' },
      { text: 'Respuesta automática 24/7 por WhatsApp' },
      { text: 'Respuesta a formularios web' },
      { text: 'Agenda de citas conectada a tu calendario (Google Calendar)' },
      { text: 'Derivación a tu equipo de casos que necesitan un humano' },
      { text: 'Panel de conversaciones y citas' },
      { text: 'Identificación como IA (cumplimiento EU AI Act)' },
      { text: 'Soporte por email' },
    ],
  },
  {
    name: 'Esencial',
    price: 299,
    tagline: 'Para clínicas con actividad constante en redes y mensajería.',
    featured: true,
    features: [
      { text: 'Hasta 1.200 mensajes de pacientes al mes' },
      { text: 'Todo lo del Starter, más:', highlight: true },
      { text: 'Respuesta automática también por Instagram DMs' },
      { text: 'Confirmaciones y recordatorios de cita automáticos a cualquier hora (también fines de semana)' },
      { text: 'Cualificación inteligente de cada lead (tratamiento, presupuesto, intención)' },
      { text: 'Panel con métricas de conversión' },
      { text: 'Cumplimiento RGPD con datos alojados en la UE' },
      { text: 'Soporte prioritario por WhatsApp' },
    ],
  },
  {
    name: 'Pro',
    price: 449,
    tagline: 'Para clínicas de alto volumen o varias sedes con un mismo WhatsApp.',
    features: [
      { text: 'Hasta 3.000 mensajes de pacientes al mes' },
      { text: 'Todo lo del Esencial, más:', highlight: true },
      { text: 'Multi-sede con un mismo número de WhatsApp incluido' },
      { text: 'Integración con tu software de gestión (p. ej. flowww)' },
      { text: 'Personalización avanzada del tono y catálogo de tratamientos de tu clínica' },
      { text: 'Informe mensual de rendimiento' },
      { text: 'Onboarding guiado' },
      { text: 'Soporte prioritario y acceso directo al equipo' },
    ],
  },
  {
    name: 'Clinic+',
    price: 649,
    tagline: 'Para clínicas de gran volumen que no pueden perder ningún lead.',
    features: [
      { text: 'Hasta 6.000 mensajes de pacientes al mes' },
      { text: 'Todo lo del Pro, más:', highlight: true },
      { text: 'Volumen ampliado para picos de campañas' },
      { text: 'Prioridad máxima de respuesta' },
      { text: 'Onboarding personalizado y configuración a medida' },
      { text: 'Gestor de cuenta dedicado' },
    ],
  },
]

export default function Pricing({ onOpenModal, onOpenCustomQuote }: PricingProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="precios" className="section-padding px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
            Precios
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Precio simple,
            <br />
            <span className="italic text-gradient-gold">sin sorpresas</span>
          </h2>
        </motion.div>

        {/* Grid de planes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
              className={plan.featured ? 'xl:-translate-y-3' : ''}
            >
              <div
                className={`relative rounded-3xl p-7 overflow-hidden h-full flex flex-col ${
                  plan.featured
                    ? 'border-2 border-[#c9a96e] bg-[#141210]'
                    : 'border border-[#2a2520] bg-[#141210]/60'
                }`}
              >
                {plan.featured && (
                  <div className="absolute inset-0 bg-gradient-radial from-[#c9a96e]/5 via-transparent to-transparent pointer-events-none" />
                )}

                {plan.featured && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-[#c9a96e] text-[#0f0e0d] text-xs font-bold px-3 py-1 rounded-full">
                      ⭐ Más popular
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <div className="mb-2 relative z-10">
                  <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase">
                    Plan {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-4 relative z-10">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-serif text-5xl font-semibold text-gradient-gold leading-[1.15] pb-1">
                      {plan.price}
                    </span>
                    <span className="text-lg text-[#9a9080] font-medium">€<span className="text-sm">/mes</span></span>
                  </div>
                  <p className="text-[#6b6258] text-xs leading-relaxed">
                    {plan.tagline}
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-[#2a2520] mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          feature.highlight
                            ? 'bg-[#c9a96e] text-[#0f0e0d]'
                            : 'bg-[#c9a96e]/15 border border-[#c9a96e]/30'
                        }`}
                      >
                        <svg className="w-2.5 h-2.5 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span
                        className={`text-xs leading-relaxed ${
                          feature.highlight ? 'text-[#c9a96e] font-medium' : 'text-[#9a9080]'
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={onOpenModal}
                  className={`w-full font-semibold py-3.5 rounded-2xl text-sm transition-all duration-200 relative z-10 ${
                    plan.featured
                      ? 'bg-[#c9a96e] hover:bg-[#dbbe8a] text-[#0f0e0d] hover:shadow-xl hover:shadow-[#c9a96e]/25 hover:-translate-y-0.5'
                      : 'border border-[#2a2520] hover:border-[#c9a96e]/40 text-[#9a9080] hover:text-[#f5f0e8]'
                  }`}
                >
                  Solicitar demo →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* === Plan A MEDIDA === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-6"
        >
          <div className="relative border border-dashed border-[#3a352e] rounded-3xl p-8 md:p-10 bg-[#0f0e0d] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                <span className="text-xs text-[#c9a96e]/70 font-medium tracking-widest uppercase">
                  Plan a medida
                </span>
                <span className="font-serif text-2xl font-semibold text-[#c9a96e]/80">
                  desde 800€/mes
                </span>
              </div>
              <p className="text-[#9a9080] text-sm max-w-xl">
                Cadenas grandes, +6.000 mensajes/mes, necesidades especiales. Presupuesto personalizado.
              </p>
            </div>
            <button
              onClick={onOpenCustomQuote}
              className="w-full md:w-auto flex-shrink-0 border border-[#2a2520] hover:border-[#c9a96e]/40 text-[#9a9080] hover:text-[#f5f0e8] font-medium px-8 py-3.5 rounded-2xl text-sm transition-all duration-200"
            >
              Solicitar presupuesto →
            </button>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-10"
        >
          <p className="text-[#6b6258] text-sm">
            ¿Necesitas una propuesta personalizada para tu clínica?{' '}
            <button onClick={onOpenModal} className="text-[#c9a96e] hover:underline">
              Hablemos
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  )
}
