import { Helmet } from 'react-helmet-async'
import Loader from '@/components/ui/Loader'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import Services from '@/components/sections/Services'
import Methodology from '@/components/sections/Methodology'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>ARQSA Arquitectos | Tu visión, con forma y diseño</title>
        <meta
          name="description"
          content="ARQSA Arquitectos Sevillano Aguilar - Firma de arquitectura en El Salvador. Diseño arquitectónico, interiorismo, construcción y supervisión con metodología BIM."
        />
        <meta property="og:title" content="ARQSA Arquitectos | Tu visión, con forma y diseño" />
        <meta property="og:description" content="Firma de arquitectura en El Salvador. Diseño arquitectónico, interiorismo, construcción y supervisión." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_SV" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "ARQSA Arquitectos Sevillano Aguilar",
            "url": "https://grupoarqsa.com",
            "logo": "https://grupoarqsa.com/favicon.svg",
            "description": "Firma de arquitectura en El Salvador especializada en diseno arquitectonico, interiorismo, construccion y supervision con metodologia BIM.",
            "email": "proyectos@grupoarqsa.com",
            "telephone": "+50377480743",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "San Salvador",
              "addressCountry": "SV"
            },
            "sameAs": ["https://www.instagram.com/arqsa.sv"],
            "founder": [
              { "@type": "Person", "name": "Rene Sevillano", "jobTitle": "Arquitecto Socio Fundador" },
              { "@type": "Person", "name": "Margarita de Sevillano", "jobTitle": "Arquitecta Socia Fundadora" },
              { "@type": "Person", "name": "Hector Aguilar", "jobTitle": "Arquitecto Socio Fundador" }
            ]
          })}
        </script>
      </Helmet>

      <Loader />

      <Hero />
      <About />
      <ProjectsGrid />
      <Services />
      <Methodology />
      <Team />
      <Contact />
    </>
  )
}
