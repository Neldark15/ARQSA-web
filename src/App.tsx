import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'

const ChatBot = lazy(() => import('@/components/ui/ChatBot'))

// El chatbot no aporta nada al primer pintado: su código se descarga cuando el navegador queda libre
function DeferredChatBot() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2500 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(() => setReady(true), 1500)
    return () => clearTimeout(t)
  }, [])

  return ready ? (
    <Suspense fallback={null}>
      <ChatBot />
    </Suspense>
  ) : null
}

// HelmetProvider y el router viven en main.tsx (cliente) y en entry-server.tsx (prerender).
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <DeferredChatBot />
      </SmoothScroll>
    </MotionConfig>
  )
}
