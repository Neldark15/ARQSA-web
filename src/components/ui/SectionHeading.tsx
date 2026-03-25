import AnimatedText from './AnimatedText'
import RevealOnScroll from './RevealOnScroll'

interface SectionHeadingProps {
  label: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

export default function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-4 mb-16 ${alignClass} ${className}`}>
      <RevealOnScroll>
        <div className="flex items-center gap-3">
          <span className="block h-px w-10 bg-brand-sage" />
          <span className="text-brand-sage text-xs uppercase tracking-[0.2em] font-body">
            {label}
          </span>
        </div>
      </RevealOnScroll>

      <AnimatedText
        text={title}
        as="h2"
        animation="clipReveal"
        className="font-display text-display-md text-brand-cream"
      />

      {subtitle && (
        <AnimatedText
          text={subtitle}
          as="p"
          animation="fadeUp"
          delay={0.3}
          className="text-brand-sage text-lg max-w-2xl font-body"
        />
      )}
    </div>
  )
}
