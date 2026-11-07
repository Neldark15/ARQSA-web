import { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'
import ProjectPage from '@/pages/ProjectPage'
import ServicePage from '@/pages/ServicePage'
import NotFoundPage from '@/pages/NotFoundPage'

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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-white focus:px-5 focus:py-3 focus:text-black">Saltar al contenido</a>
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/proyectos/:slug" element={<ProjectPage />} />
            <Route path="/servicios/:slug" element={<ServicePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <DeferredChatBot />
      </SmoothScroll>
    </MotionConfig>
  )
}
