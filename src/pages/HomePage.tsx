import { Helmet } from 'react-helmet-async'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import Services from '@/components/sections/Services'
import Methodology from '@/components/sections/Methodology'
import Team from '@/components/sections/Team'
import Contact from '@/components/sections/Contact'
import { CONTACT } from '@/lib/constants'
import { services } from '@/data/services'
import { team } from '@/data/team'
import { projects } from '@/data/projects'
import { webpVariant } from '@/lib/images'

// Host canónico: grupoarqsa.com (sin www) redirige aquí.
const SITE = 'https://www.grupoarqsa.com'
const TITLE = 'Arquitectos en El Salvador | Diseño y construcción | ARQSA'
const DESCRIPTION =
  'Firma de arquitectos en San Salvador: diseño de casas, interiorismo, construcción, supervisión y permisos de obra. Mira nuestros proyectos y cotiza por WhatsApp.'
const OG_IMAGE = `${SITE}/og-arqsa.jpg`
const ORG_ID = `${SITE}/#organization`

const slug = (name: string) =>
  name.replace(/^Arq\.\s*/, '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, '-')

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HomeAndConstructionBusiness',
      '@id': ORG_ID,
      name: 'ARQSA Arquitectos Sevillano Aguilar',
      alternateName: ['ARQSA', 'ARQSA Arquitectos', 'Arquitectos Sevillano Aguilar', 'Grupo ARQSA'],
      description:
        'Firma de arquitectura en San Salvador, El Salvador: diseño arquitectónico, interiorismo, construcción, supervisión de obra y trámite de permisos, con metodología BIM.',
      slogan: 'Tu visión, con forma y diseño',
      url: `${SITE}/`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE}/#logo`,
        url: `${SITE}/logo-vertical-dark.png`,
        width: 1501,
        height: 1501,
        caption: 'ARQSA Arquitectos Sevillano Aguilar',
      },
      image: [OG_IMAGE, ...projects.slice(0, 4).map((p) => `${SITE}${webpVariant(p.heroImage, 1600)}`)],
      telephone: CONTACT.whatsappFormatted,
      email: CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Salvador',
        addressRegion: 'San Salvador',
        addressCountry: 'SV',
      },
      areaServed: { '@type': 'Country', name: 'El Salvador' },
      sameAs: [CONTACT.instagramUrl],
      knowsAbout: services.map((s) => s.title),
      founder: team.map((m) => ({ '@id': `${SITE}/#${slug(m.name)}` })),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de ARQSA',
        itemListElement: services.map((s) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: s.title, description: s.description, areaServed: 'SV' },
        })),
      },
    },
    ...team.map((m) => ({
      '@type': 'Person',
      '@id': `${SITE}/#${slug(m.name)}`,
      name: m.name.replace(/^Arq\.\s*/, ''),
      honorificPrefix: 'Arq.',
      jobTitle: m.title,
      ...(m.image ? { image: `${SITE}${webpVariant(m.image, 960)}` } : {}),
      worksFor: { '@id': ORG_ID },
    })),
    {
      '@type': 'WebSite',
      '@id': `${SITE}/#website`,
      url: `${SITE}/`,
      name: 'ARQSA Arquitectos',
      alternateName: ['ARQSA', 'Grupo ARQSA'],
      inLanguage: 'es-SV',
      publisher: { '@id': ORG_ID },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'es-SV',
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': ORG_ID },
      primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE, width: 1200, height: 630 },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={`${SITE}/`} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="ARQSA Arquitectos" />
        <meta property="og:locale" content="es_SV" />
        <meta property="og:url" content={`${SITE}/`} />
        <meta property="og:title" content="ARQSA Arquitectos | Arquitectura y construcción en El Salvador" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Casa Perdomo, residencia diseñada por ARQSA Arquitectos" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ARQSA Arquitectos | Arquitectura y construcción en El Salvador" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

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
