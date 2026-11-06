import PageMetadata from '@/components/ui/PageMetadata'

export default function NotFoundPage() {
  return <section className="mx-auto max-w-3xl px-6 pt-40 pb-20">
    <PageMetadata title="Página no encontrada" description="Vuelve al sitio de GRUPO ARQSA." path="/404" noindex />
    <h1 className="font-display text-3xl">Esta página no está disponible</h1>
    <a href="/" className="action-primary mt-8">Volver al inicio</a>
  </section>
}
