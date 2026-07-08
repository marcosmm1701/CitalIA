'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Channel {
  name: string
  emoji: string
  description: string
  bgColor: string
  borderColor: string
  textColor: string
  icon: React.ReactNode
}

const channels: Channel[] = [
  {
    name: 'WhatsApp',
    emoji: '💬',
    description: 'Responde 24/7 a cada mensaje. Agenda citas, resuelve dudas, cualifica al paciente. Todo automatizado.',
    bgColor: 'bg-[#25D366]/10',
    borderColor: 'border-[#25D366]/25',
    textColor: 'text-[#25D366]',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.255.949c-.168.071-.327.17-.475.284C6.817 6.711 4 10.978 4 15.794c0 1.149.266 2.257.748 3.236l-1.537 5.6 5.752-1.496c.054.027.108.054.162.08h.004c.852.343 1.757.535 2.687.535 5.226 0 9.584-4.233 9.584-9.441 0-2.52-.963-4.922-2.71-6.72-1.745-1.799-4.068-2.784-6.552-2.784" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    emoji: '📸',
    description: 'Contesta directamente en los DMs. La misma rapidez y calidad que en WhatsApp. Sin cambiar de app.',
    bgColor: 'bg-[#E4405F]/10',
    borderColor: 'border-[#E4405F]/25',
    textColor: 'text-[#E4405F]',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'Formularios web',
    emoji: '📝',
    description: 'Cada vez que un cliente rellena el formulario de interés en tu web, citalia le responde la duda concreta por la que preguntó el whatsapp del cliente, todo ello en segundos..., cualifica al paciente y deriva casos complejos a tu equipo.',
    bgColor: 'bg-[#c9a96e]/10',
    borderColor: 'border-[#c9a96e]/25',
    textColor: 'text-[#c9a96e]',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
]

function ChannelCard({
  channel,
  index,
}: {
  channel: Channel
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative group"
    >
      <div className={`border border-[#2a2520] ${channel.borderColor} group-hover:border-opacity-50 rounded-2xl p-8 bg-[#141210] transition-all duration-300 h-full flex flex-col`}>
        <div className={`w-12 h-12 rounded-xl ${channel.bgColor} border ${channel.borderColor} flex items-center justify-center ${channel.textColor} mb-6`}>
          {channel.icon}
        </div>

        <h3 className={`font-semibold text-lg ${channel.textColor} mb-2`}>
          {channel.name}
        </h3>

        <p className="text-[#9a9080] text-sm leading-relaxed flex-grow">
          {channel.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function Channels() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-padding px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs text-[#c9a96e] font-medium tracking-widest uppercase mb-4 block">
            Los 3 canales
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#f5f0e8] leading-tight">
            Donde te escriban,
            <br />
            <span className="italic text-gradient-gold">ahí responde Citalia.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {channels.map((channel, i) => (
            <ChannelCard key={i} channel={channel} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="relative border border-[#c9a96e]/20 rounded-2xl p-8 md:p-10 bg-[#141210] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-radial from-[#c9a96e]/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10 text-center">
            <p className="font-serif text-[#f5f0e8] text-lg md:text-2xl font-medium leading-relaxed max-w-5xl mx-auto">
              Todo ello, adaptado a tu WhatsApp, tu Instagram, tu calendario (sea cual sea) y tu web.
              <br />
              <span className="italic text-gradient-gold">Citalia se adapta a lo que tú ya tienes.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
