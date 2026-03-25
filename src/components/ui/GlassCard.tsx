import { motion } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  variant?: 'light' | 'dark' | 'sage'
  hover?: boolean
  className?: string
  onClick?: () => void
}

const variantClasses = {
  light: 'glass',
  dark: 'glass-dark',
  sage: 'glass-sage',
}

export default function GlassCard({
  children,
  variant = 'light',
  hover = false,
  className = '',
  onClick,
}: GlassCardProps) {
  const baseClass = `${variantClasses[variant]} rounded-2xl shadow-glass ${
    hover ? 'cursor-pointer hover:shadow-glass-hover transition-shadow duration-400' : ''
  } ${className}`

  if (hover) {
    return (
      <motion.div
        className={baseClass}
        onClick={onClick}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClass} onClick={onClick}>
      {children}
    </div>
  )
}
