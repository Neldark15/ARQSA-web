import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/archivo-black/400.css'
import '@/lib/gsapConfig'
import '@/styles/index.css'
import App from './App'

const root = document.getElementById('root')!
const tree = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// En producción el HTML viene prerenderizado (scripts/prerender.mjs): se hidrata. En `vite dev` el #root llega vacío.
if (root.hasChildNodes()) hydrateRoot(root, tree)
else createRoot(root).render(tree)
