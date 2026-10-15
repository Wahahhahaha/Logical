import { useEffect, useRef, useState } from 'react'
import { EggIllustration, EggShellBottom, EggShellTop, OnboardingPixelPet } from '../illustrations/PetIllustration.jsx'

export function PetEggArt({ type = 'cat' }) {
  return <EggIllustration className="egg-svg" type={type} />
}
export function HatchingExperience({ type, onComplete }) {
  const [stage, setStage] = useState(0)
  const petVisible = stage >= 4
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => {
    let cancelled = false
    let timer
    // Keep one pet instance mounted through reveal, shell fade, and emergence.
    const timeline = [[1, 520], [2, 760], [3, 620], [4, 650], [5, 360], [6, 1120]]
    const advance = index => {
      if (cancelled) return
      if (index >= timeline.length) { onCompleteRef.current(); return }
      const [nextStage, duration] = timeline[index]
      setStage(nextStage)
      timer = window.setTimeout(() => advance(index + 1), duration)
    }
    timer = window.setTimeout(() => advance(0), 180)
    return () => { cancelled = true; window.clearTimeout(timer) }
  }, [])
  return <div className={`hatching-view hatch-stage-${stage}`} aria-live="polite"><div className="hatching-art"><div className="pixel-spark spark-one">✦</div><div className="pixel-spark spark-two">✦</div><div className="egg-glow" aria-hidden="true" /><div className="egg-shell"><div className="egg-shell-top"><EggShellTop type={type} /></div><span className="crack crack-one" /><span className="crack crack-two" /></div><div className="egg-shell-bottom"><EggShellBottom type={type} /></div><div className="hatching-pet" aria-hidden={!petVisible}><PetReveal type={type} /></div><span className="shell-bit bit-one" /><span className="shell-bit bit-two" /></div></div>
}
export function PetReveal({ type }) { return <div className={`pet-reveal pet-${type}`}><OnboardingPixelPet type={type} className="reveal-pet-art" /></div> }
