import { useState, useEffect, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { CONTACT, NAV_LINKS } from '@/lib/constants'
import { containDialogTab } from '@/lib/dialog'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isMobileOpen) return
    const dialog = dialogRef.current!
    const opener = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => { if (desktop.matches) setIsMobileOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      dialog.close()
      document.body.style.overflow = previousOverflow
      opener?.focus({ preventScroll: true })
    }
  }, [isMobileOpen])

  return (
    <>
      <nav aria-label="Principal" className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${isScrolled ? 'border-white/10 bg-[#101315] py-3' : 'border-transparent bg-black/30 py-5'}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6">
          <a href="/#hero" aria-label="GRUPO ARQSA, inicio" className="shrink-0">
            <img src="/logo-nav-320.webp" srcSet="/logo-nav-160.webp 160w, /logo-nav-320.webp 320w" sizes="(min-width: 1024px) 147px, 105px" alt="GRUPO ARQSA" width={320} height={122} className="h-10 w-auto lg:h-14" />
          </a>
          <div className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href} className="text-xs text-white/85 hover:text-white xl:text-sm">{link.label}</a>)}
            <a className="rounded-lg bg-brand-cream px-4 py-3 text-sm font-semibold text-brand-black" href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer">Cotizar</a>
          </div>
          <button className="flex size-11 items-center justify-center text-brand-cream lg:hidden" onClick={() => setIsMobileOpen(true)} aria-label="Abrir menú" aria-expanded={isMobileOpen} aria-controls="mobile-menu"><Menu /></button>
        </div>
      </nav>
      {isMobileOpen && (
        <dialog id="mobile-menu" ref={dialogRef} aria-label="Navegación" data-lenis-prevent onKeyDown={containDialogTab} onCancel={(event) => { event.preventDefault(); setIsMobileOpen(false) }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-auto border-0 bg-[#101315] p-6 text-brand-cream">
          <div className="flex items-center justify-between gap-4">
            <span className="font-display text-xl">GRUPO ARQSA</span>
            <button autoFocus onClick={() => setIsMobileOpen(false)} aria-label="Cerrar menú" className="flex size-11 items-center justify-center"><X /></button>
          </div>
          <nav aria-label="Móvil" className="mx-auto mt-8 flex max-w-sm flex-col gap-2">
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setIsMobileOpen(false)} className="border-b border-white/10 py-3 font-display text-xl">{link.label}</a>)}
            <a href={CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="action-primary mt-4">Cotizar mi proyecto</a>
          </nav>
        </dialog>
      )}
    </>
  )
}
