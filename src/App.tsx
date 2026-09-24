import { Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import ChatBot from '@/components/ui/ChatBot'
import HomePage from '@/pages/HomePage'

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
        <ChatBot />
      </SmoothScroll>
    </MotionConfig>
  )
}
