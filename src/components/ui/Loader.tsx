import { useState, useEffect } from 'react'

export default function Loader() {
  const [phase, setPhase] = useState<'enter' | 'visible' | 'exiting' | 'done'>('enter')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('visible'), 100)
    const t2 = setTimeout(() => setPhase('exiting'), 2400)
    const t3 = setTimeout(() => setPhase('done'), 3200)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={`fixed inset-0 z-[100] bg-brand-black flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        phase === 'exiting' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Real ARQSA Logo with animation */}
      <div
        className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          phase === 'enter'
            ? 'opacity-0 scale-90 blur-sm'
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        <img
          src="/logo-vertical-transparent.png"
          alt="ARQSA"
          className="w-40 sm:w-48 md:w-56 h-auto"
        />
      </div>

      {/* Progress bar */}
      <div className="w-40 h-px bg-brand-sage/20 overflow-hidden mt-8">
        <div
          className={`h-full bg-brand-sage/60 transition-all ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
            phase === 'enter' ? 'w-0 duration-0' : 'w-full duration-[2000ms]'
          }`}
        />
      </div>
    </div>
  )
}
