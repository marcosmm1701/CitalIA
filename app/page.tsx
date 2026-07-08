'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problems from '@/components/Problems'
import HowItWorks from '@/components/HowItWorks'
import Results from '@/components/Results'
import ForWho from '@/components/ForWho'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Channels from '@/components/Channels'
import Footer from '@/components/Footer'
import DemoModal, { type ModalIntent } from '@/components/DemoModal'
import VideoModal from '@/components/VideoModal'

export default function Home() {
  // null = cerrado. Cuando se abre, guardamos el intent que disparó la
  // apertura para que el modal y el aviso a Telegram sean coherentes.
  const [modalIntent, setModalIntent] = useState<ModalIntent | null>(null)
  const [videoOpen, setVideoOpen] = useState(false)

  const openDemo = () => setModalIntent('demo')
  const openCustomQuote = () => setModalIntent('custom-quote')
  const closeModal = () => setModalIntent(null)
  const openVideo = () => setVideoOpen(true)
  const closeVideo = () => setVideoOpen(false)

  return (
    <main>
      <Navbar onOpenModal={openDemo} />
      <Hero onOpenModal={openDemo} onOpenVideo={openVideo} />
      <Problems />
      <HowItWorks />
      <Results />
      <ForWho />
      <Pricing onOpenModal={openDemo} onOpenCustomQuote={openCustomQuote} />
      <FAQ />
      <Channels />
      <Footer />
      <DemoModal
        isOpen={modalIntent !== null}
        intent={modalIntent ?? 'demo'}
        onClose={closeModal}
      />
      <VideoModal isOpen={videoOpen} onClose={closeVideo} />
    </main>
  )
}
