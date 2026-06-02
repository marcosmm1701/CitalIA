'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  onOpenModal: () => void
  onOpenVideo: () => void
}

export default function Hero({ onOpenModal, onOpenVideo }: HeroProps) {
  return (
    // pt-* solo en portátiles cortos (ancho >= 768px y alto <= 900px) para
    // que el badge no quede pisado por la navbar fija. En móvil y en
    // monitores grandes (alto > 900) el centrado vertical funciona bien.
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 [@media(min-width:768px)_and_(max-height:900px)]:pt-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#0f0e0d]">
        <div className="absolute inset-0 bg-gradient-radial from-[#c9a96e]/8 via-transparent to-transparent" />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(201,169,110,0.25) 0%, rgba(201,169,110,0.05) 50%, transparent 70%)',
          }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,169,110,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 border border-[#c9a96e]/30 rounded-full px-4 py-1.5 mb-10 bg-[#c9a96e]/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a96e] animate-pulse" />
          <span className="text-xs text-[#c9a96e] font-medium tracking-wider uppercase">
            Especializado en medicina estética
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl font-semibold leading-[1.1] mb-6"
        >
          Tu clínica vende
          <br />
          <span className="text-gradient-gold italic">mientras tú duermes.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg md:text-xl text-[#9a9080] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          El primer agente de IA especializado en medicina estética que convierte
          mensajes de WhatsApp, Instagram y tu formulario web en pacientes, a cualquier hora.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={onOpenModal}
            className="group relative w-full sm:w-auto bg-[#c9a96e] hover:bg-[#dbbe8a] text-[#0f0e0d] font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:shadow-xl hover:shadow-[#c9a96e]/25 hover:-translate-y-0.5"
          >
            Quiero una demo gratis
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </button>

          <button
            onClick={onOpenVideo}
            className="group w-full sm:w-auto border border-[#2a2520] hover:border-[#c9a96e]/40 text-[#9a9080] hover:text-[#f5f0e8] font-medium px-8 py-4 rounded-full text-base transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            {/* Icono play — refuerza visualmente que abre un vídeo */}
            <svg className="w-4 h-4 fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
            Ver Vídeo · 1 min
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#6b6258]"
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#c9a96e]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Activo en 48 horas
          </span>
          <span className="hidden sm:block w-px h-4 bg-[#2a2520]" />
          <span>Primer mes completamente gratis</span>
          <span className="hidden sm:block w-px h-4 bg-[#2a2520]" />
          <span>Sin permanencia</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#6b6258] tracking-widest uppercase">Descubre</span>
          <svg
            className="w-4 h-4 text-[#6b6258]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
