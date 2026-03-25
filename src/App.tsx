import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import HomePage from '@/pages/HomePage'

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SmoothScroll>
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </SmoothScroll>
      </BrowserRouter>
    </HelmetProvider>
  )
}
