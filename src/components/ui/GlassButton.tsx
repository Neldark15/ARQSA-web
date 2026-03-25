import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface GlassButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  magnetic?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

const sizeClasses = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-4 text-base',
}

const variantClasses = {
  primary:
    'bg-brand-dark/80 backdrop-blur-xl border border-white/10 text-brand-cream hover:bg-brand-dark/95',
  secondary:
    'glass border border-brand-sage/20 text-brand-cream hover:border-brand-sage/40',
  ghost:
    'bg-transparent border border-white/20 text-brand-cream hover:bg-white/5 hover:border-white/30',
}

export default function GlassButton({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  magnetic = false,
  onClick,
  type = 'button',
  className = '',
}: GlassButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!magnetic || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = Math.max(-8, Math.min(8, (e.clientX - centerX) * 0.15))
    const y = Math.max(-8, Math.min(8, (e.clientY - centerY) * 0.15))
    setMagneticOffset({ x, y })
  }

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 })
  }

  const classes = `
    inline-flex items-center justify-center font-body uppercase tracking-[0.1em]
    rounded-full transition-all duration-300
    ${sizeClasses[size]} ${variantClasses[variant]} ${className}
  `.trim()

  const motionProps = magnetic
    ? {
        animate: magneticOffset,
        transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
      }
    : {}

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      className={classes}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
