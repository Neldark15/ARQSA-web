import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedTextProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
  animation?: 'splitChars' | 'splitWords' | 'fadeUp' | 'clipReveal'
  delay?: number
  stagger?: number
  className?: string
  once?: boolean
}

export default function AnimatedText({
  text,
  as: Tag = 'h2',
  animation = 'fadeUp',
  delay = 0,
  stagger,
  className = '',
  once = true,
}: AnimatedTextProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, amount: 0.1 })

  if (animation === 'splitChars') {
    const chars = text.split('')
    const charStagger = stagger ?? 0.03
    return (
      <Tag ref={ref} className={`${className}`} aria-label={text}>
        {chars.map((char, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: delay + i * charStagger,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  if (animation === 'splitWords') {
    const words = text.split(' ')
    const wordStagger = stagger ?? 0.08
    return (
      <Tag ref={ref} className={`${className}`} aria-label={text}>
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', opacity: 0 }}
              animate={isInView ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: 0.5,
                delay: delay + i * wordStagger,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    )
  }

  if (animation === 'clipReveal') {
    return (
      <Tag ref={ref} className={`${className}`}>
        <motion.span
          className="block"
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : { clipPath: 'inset(0 100% 0 0)' }}
          transition={{
            duration: 1.2,
            delay,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          {text}
        </motion.span>
      </Tag>
    )
  }

  // fadeUp default
  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <Tag className={className}>{text}</Tag>
    </motion.div>
  )
}
