'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

interface FormData {
  nombre: string
  clinica: string
  telefono: string
  email: string
  ciudad: string
  leads: string
  // Honeypot — debe quedar vacío. Si llega con contenido, es un bot.
  website: string
}

// Sanitización defensiva: elimina CR/LF (vector de inyección de cabeceras
// mailto y de splitting en logs) y trunca para evitar payloads enormes.
function sanitizeField(value: string, maxLen: number): string {
  return value.replace(/[\r\n\t\0]/g, ' ').trim().slice(0, maxLen)
}

const LEAD_OPTIONS = ['menos-20', '20-50', '50-100', 'mas-100'] as const

// Distingue qué CTA abrió el modal. Esto cambia copy del modal Y formato
// del mensaje que llega a Telegram (ver functions/api/leads.ts).
export type ModalIntent = 'demo' | 'pro-waitlist'

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
  intent?: ModalIntent
}

// Copy por intent. Todo lo visible al usuario centralizado aquí.
const COPY: Record<ModalIntent, {
  title: string
  subtitle: string
  submit: string
  submitting: string
  successTitle: string
  successSubtitle: string
  successBody: string
}> = {
  'demo': {
    title: 'Solicita tu demo gratuita',
    subtitle: 'Sin compromiso · Primer mes completamente gratis',
    submit: 'Solicitar demo gratuita →',
    submitting: 'Enviando…',
    successTitle: '¡Perfecto! 🎉',
    successSubtitle: 'Te contactamos en menos de 24 horas',
    successBody:
      'Hemos recibido tu solicitud. Te escribimos por WhatsApp en menos de 24 horas para acordar la demo.',
  },
  'pro-waitlist': {
    title: 'Únete a la lista de espera',
    subtitle: 'Te avisamos en cuanto el Plan Pro esté disponible',
    submit: 'Apuntarme a la lista →',
    submitting: 'Apuntando…',
    successTitle: '¡Apuntado! 🚀',
    successSubtitle: 'Serás de los primeros en saberlo',
    successBody:
      'Estás en la lista. Te avisaremos por WhatsApp en cuanto el Plan Pro esté operativo, con condiciones especiales para early-adopters.',
  },
}

export default function DemoModal({ isOpen, onClose, intent = 'demo' }: DemoModalProps) {
  const copy = COPY[intent]
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  function handleClose() {
    onClose()
    setTimeout(() => {
      setSubmitted(false)
      setSubmitError(null)
      reset()
    }, 300)
  }

  async function onSubmit(data: FormData) {
    setSubmitError(null)

    // Honeypot anti-bot: si el campo invisible viene relleno, fingimos éxito
    // y descartamos. El servidor también lo descarta por su cuenta.
    if (data.website && data.website.length > 0) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)

    // Allow-list para el campo enum (defensa frente a manipulación del DOM).
    const leads = (LEAD_OPTIONS as readonly string[]).includes(data.leads)
      ? data.leads
      : ''

    // Sanitización cliente. La sanitización REAL ocurre en el servidor
    // (functions/api/leads.ts) — esto es solo defensa en profundidad para
    // que el payload que viaja por la red ya esté limpio.
    const safe = {
      nombre: sanitizeField(data.nombre, 60),
      clinica: sanitizeField(data.clinica, 80),
      telefono: sanitizeField(data.telefono, 20),
      email: sanitizeField(data.email, 100),
      ciudad: sanitizeField(data.ciudad, 40),
      leads: sanitizeField(leads, 20),
    }

    // POST al endpoint propio (Cloudflare Pages Function en /api/leads).
    // El token de Telegram vive ahí, NUNCA en el navegador.
    // Incluimos `intent` para que el servidor formatee el aviso de Telegram
    // de forma distinta (demo vs lista de espera del Plan Pro).
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...safe, intent }),
      })

      if (!res.ok) {
        // No mostramos detalles del backend al usuario (fail closed).
        setSubmitError(
          'No hemos podido enviar tu solicitud. Inténtalo en unos minutos o escríbenos a hola@citaliaapp.com',
        )
        setSubmitting(false)
        return
      }

      setSubmitting(false)
      setSubmitted(true)
    } catch {
      setSubmitError(
        'Error de conexión. Comprueba tu red e inténtalo de nuevo, o escríbenos a hola@citaliaapp.com',
      )
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full bg-[#0f0e0d] border border-[#2a2520] focus:border-[#c9a96e]/60 rounded-xl px-4 py-3.5 text-[#f5f0e8] text-sm placeholder-[#6b6258] outline-none transition-colors duration-200'

  const errorClass = 'text-red-400 text-xs mt-1'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="demo-modal-title"
              className="bg-[#141210] border border-[#2a2520] rounded-3xl w-full max-w-lg shadow-2xl shadow-black/60 pointer-events-auto max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-8 pb-0">
                <div>
                  <h2 id="demo-modal-title" className="font-serif text-2xl font-semibold text-[#f5f0e8] mb-1">
                    {submitted ? copy.successTitle : copy.title}
                  </h2>
                  <p className="text-[#9a9080] text-sm">
                    {submitted ? copy.successSubtitle : copy.subtitle}
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-[#2a2520] flex items-center justify-center text-[#9a9080] hover:text-[#f5f0e8] transition-colors flex-shrink-0 ml-4"
                  aria-label="Cerrar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8">
                {submitted ? (
                  /* Success state */
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#c9a96e]/20 border border-[#c9a96e]/40 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-[#c9a96e]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <p className="text-[#9a9080] text-sm leading-relaxed max-w-sm mx-auto">
                      {copy.successBody}
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-8 bg-[#c9a96e] text-[#0f0e0d] font-semibold px-8 py-3 rounded-xl text-sm"
                    >
                      Cerrar
                    </button>
                  </div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Honeypot anti-bot: oculto a usuarios reales, los bots lo rellenan.
                        autoComplete="off" + tabIndex=-1 + aria-hidden para que ningún
                        lector de pantalla ni usuario por teclado caiga sobre él. */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        left: '-9999px',
                        top: 'auto',
                        width: '1px',
                        height: '1px',
                        overflow: 'hidden',
                      }}
                    >
                      <label htmlFor="website">No rellenar</label>
                      <input
                        type="text"
                        id="website"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register('website')}
                      />
                    </div>

                    {/* Nombre + Clínica */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Tu nombre *</label>
                        <input
                          {...register('nombre', {
                            required: 'Campo obligatorio',
                            maxLength: { value: 60, message: 'Máximo 60 caracteres' },
                            pattern: {
                              value: /^[\p{L}\s'.-]{2,60}$/u,
                              message: 'Solo letras, espacios, guiones y apóstrofes',
                            },
                          })}
                          placeholder="Ana García"
                          maxLength={60}
                          autoComplete="name"
                          className={inputClass}
                        />
                        {errors.nombre && <p className={errorClass}>{errors.nombre.message}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Nombre de la clínica *</label>
                        <input
                          {...register('clinica', {
                            required: 'Campo obligatorio',
                            maxLength: { value: 80, message: 'Máximo 80 caracteres' },
                            pattern: {
                              value: /^[\p{L}\p{N}\s&.,'-]{2,80}$/u,
                              message: 'Caracteres no permitidos',
                            },
                          })}
                          placeholder="Clínica Estética Belleza"
                          maxLength={80}
                          autoComplete="organization"
                          className={inputClass}
                        />
                        {errors.clinica && <p className={errorClass}>{errors.clinica.message}</p>}
                      </div>
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="text-xs text-[#9a9080] mb-1.5 block">Teléfono (WhatsApp) *</label>
                      <input
                        {...register('telefono', {
                          required: 'Campo obligatorio',
                          maxLength: { value: 20, message: 'Máximo 20 caracteres' },
                          pattern: {
                            value: /^[+\d\s()-]{9,20}$/,
                            message: 'Introduce un teléfono válido',
                          },
                        })}
                        placeholder="+34 600 000 000"
                        type="tel"
                        maxLength={20}
                        inputMode="tel"
                        autoComplete="tel"
                        className={inputClass}
                      />
                      {errors.telefono && <p className={errorClass}>{errors.telefono.message}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="text-xs text-[#9a9080] mb-1.5 block">Email *</label>
                      <input
                        {...register('email', {
                          required: 'Campo obligatorio',
                          maxLength: { value: 100, message: 'Máximo 100 caracteres' },
                          pattern: {
                            value: /^[^\s@<>"'`;()]+@[^\s@<>"'`;()]+\.[^\s@<>"'`;()]{2,}$/,
                            message: 'Introduce un email válido',
                          },
                        })}
                        placeholder="ana@clinicabelleza.es"
                        type="email"
                        maxLength={100}
                        inputMode="email"
                        autoComplete="email"
                        className={inputClass}
                      />
                      {errors.email && <p className={errorClass}>{errors.email.message}</p>}
                    </div>

                    {/* Ciudad + Leads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Ciudad *</label>
                        <input
                          {...register('ciudad', {
                            required: 'Campo obligatorio',
                            maxLength: { value: 40, message: 'Máximo 40 caracteres' },
                            pattern: {
                              value: /^[\p{L}\s'-]{2,40}$/u,
                              message: 'Solo letras y espacios',
                            },
                          })}
                          placeholder="Madrid"
                          maxLength={40}
                          autoComplete="address-level2"
                          className={inputClass}
                        />
                        {errors.ciudad && <p className={errorClass}>{errors.ciudad.message}</p>}
                      </div>
                      <div>
                        <label className="text-xs text-[#9a9080] mb-1.5 block">Consultas/mes por WhatsApp *</label>
                        <select
                          {...register('leads', {
                            required: 'Campo obligatorio',
                            validate: (v) =>
                              (LEAD_OPTIONS as readonly string[]).includes(v) ||
                              'Selecciona una opción válida',
                          })}
                          className={`${inputClass} appearance-none cursor-pointer`}
                          defaultValue=""
                        >
                          <option value="" disabled>Selecciona…</option>
                          <option value="menos-20">Menos de 20</option>
                          <option value="20-50">20 – 50</option>
                          <option value="50-100">50 – 100</option>
                          <option value="mas-100">Más de 100</option>
                        </select>
                        {errors.leads && <p className={errorClass}>{errors.leads.message}</p>}
                      </div>
                    </div>

                    {/* Privacy note */}
                    <p className="text-[#6b6258] text-xs leading-relaxed">
                      Al enviar aceptas nuestra{' '}
                      <a
                        href="/privacidad"
                        className="underline hover:text-[#9a9080]"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Política de Privacidad
                      </a>
                      . Tus datos solo se usarán para contactarte sobre la demo.
                    </p>

                    {/* Submit error (server / red) */}
                    {submitError && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs text-red-300">
                        {submitError}
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#c9a96e] hover:bg-[#dbbe8a] disabled:opacity-60 text-[#0f0e0d] font-semibold py-4 rounded-xl text-base transition-all duration-200 mt-2"
                    >
                      {submitting ? copy.submitting : copy.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
