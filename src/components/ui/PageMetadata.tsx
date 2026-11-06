import { Helmet } from 'react-helmet-async'

const SITE = 'https://www.grupoarqsa.com'

export default function PageMetadata({ title, description, path, image = '/og-arqsa.jpg', noindex = false }: {
  title: string; description: string; path: string; image?: string; noindex?: boolean
}) {
  return (
    <Helmet>
      <title>{`${title} | GRUPO ARQSA`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE}${path}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="GRUPO ARQSA" />
      <meta property="og:title" content={`${title} | GRUPO ARQSA`} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`${SITE}${path}`} />
      <meta property="og:image" content={`${SITE}${image}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | GRUPO ARQSA`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE}${image}`} />
      {noindex && <meta name="robots" content="noindex, follow" />}
    </Helmet>
  )
}
