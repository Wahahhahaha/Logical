import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n.jsx'
import { OnboardingPixelPet } from '../illustrations/PetIllustration.jsx'

export function PetEggArt({ type }) {
  const { t } = useI18n()
  const colors = { cat: ['#9c8f8c', '#d9cbc1'], dog: ['#b8794d', '#ddae76'], fox: ['#ed631d', '#f7a34e'], bird: ['#65b9dc', '#bde7ed'] }; const [accent, light] = colors[type] || colors.cat
  return <svg viewBox="0 0 96 112" className="egg-svg" role="img" aria-label={t('hatch.eggLabel', { pet: t(`pet.type.${type}`) })} shapeRendering="crispEdges"><path d="M48 7C27 7 14 39 14 64c0 26 14 41 34 41s34-15 34-41C82 39 69 7 48 7Z" fill="#fff5d9" stroke="#51352f" strokeWidth="4" />{type === 'cat' && <><path d="M20 45h15v9H20zM61 48h16v9H61z" fill={accent}/><path d="M28 20h11v9H28z" fill={light}/></>}{type === 'dog' && <><path d="M16 42h18v19H16zM62 54h17v15H62z" fill={accent}/><path d="M40 76h16v13H40z" fill={light}/></>}{type === 'fox' && <><path d="M18 38h21v11H18zM57 34h20v12H57z" fill={accent}/><path d="M40 14h16v10H40z" fill={light}/></>}{type === 'bird' && <><path d="M18 48h18v13H18zM59 35h18v13H59z" fill={accent}/><path d="M39 76h18v12H39z" fill={light}/></>}<path d="M25 70h14v5H25zm30 0h16v5H55z" fill={accent}/><path d="M34 89h27" stroke={light} strokeWidth="5" /></svg>
}
export function HatchingExperience({ type, onComplete }) {
  const { t } = useI18n()
  const [stage, setStage] = useState(0)
  const onCompleteRef = useRef(onComplete)
  useEffect(() => { onCompleteRef.current = onComplete }, [onComplete])
  useEffect(() => {
    let cancelled = false
    let timer
    const timeline = [[1, 420], [2, 560], [3, 640]]
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
  return <div className={`hatching-view hatch-stage-${stage}`} aria-live="polite"><div className="hatching-art"><div className="pixel-spark spark-one">✦</div><div className="pixel-spark spark-two">✦</div><div className="egg-shell"><PetEggArt type={type} /><span className="crack crack-one" /><span className="crack crack-two" /></div><div className="hatching-pet"><PetReveal type={type} /></div><span className="shell-bit bit-one" /><span className="shell-bit bit-two" /></div><p className="eyebrow">{t('hatch.inside')}</p><h1>{t(`hatch.${type}`)}</h1><p className="onboarding-copy">{t('hatch.almost')}</p><div className="hatching-dots"><i /><i /><i /></div></div>
}
export function PetReveal({ type }) { return <div className={`pet-reveal pet-${type}`}><OnboardingPixelPet type={type} className="reveal-pet-art" /></div> }
