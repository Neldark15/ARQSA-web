// Entrada del prerender: se compila con `vite build --ssr` y la usa scripts/prerender.mjs
// para escribir el HTML completo en dist/index.html (lo que ven Google, Bing, las IA y WhatsApp sin ejecutar JS).
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'

export { projects } from './data/projects'

export function render(url: string) {
  return renderToString(
    <HelmetProvider>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>,
  )
}
