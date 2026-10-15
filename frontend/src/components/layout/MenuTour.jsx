import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, Check, X } from 'lucide-react'
import { useI18n } from '../../i18n.jsx'

const STEPS = [
  { selector: 'nav.dashboard', desc: 'tour.dashboard' },
  { selector: 'nav.learn', desc: 'tour.learn' },
  { selector: 'nav.quests', desc: 'tour.quests' },
  { selector: 'nav.pet', desc: 'tour.pet' },
  { selector: 'nav.progress', desc: 'tour.progress' },
  { selector: 'shell.profile', desc: 'tour.profile' },
]

export default function MenuTour({ onDone }) {
  const { t } = useI18n()
  const [index, setIndex] = useState(0)
  const [rect, setRect] = useState(null)
  const step = STEPS[index]

  useLayoutEffect(() => {
    const element = document.querySelector(`[data-tour="${step.selector}"]`)
    if (!element) return undefined
    const update = () => setRect(element.getBoundingClientRect())
    update()
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [step])

  if (!rect) return null

  const last = index === STEPS.length - 1
  const next = () => (last ? onDone() : setIndex(current => current + 1))

  const pad = 6
  const holeStyle = { left: rect.left - pad, top: rect.top - pad, width: rect.width + pad * 2, height: rect.height + pad * 2 }
  const tipTop = Math.min(Math.max(rect.top + rect.height / 2 - 70, 16), window.innerHeight - 200)
  const tipLeft = Math.max(16, Math.min(rect.right + 18, window.innerWidth - 286))

  return createPortal(<div className="tour-root" role="dialog" aria-label={t('tour.title')}>
    <div className="tour-hole" style={holeStyle} />
    <div className="tour-tip" style={{ top: tipTop, left: tipLeft }}>
      <div className="tour-tip-head">
        <span className="tour-step">{t('tour.step', { i: index + 1, n: STEPS.length })}</span>
        <button className="tour-skip" onClick={onDone} aria-label={t('tour.skip')}><X size={15} /></button>
      </div>
      <h3>{t(step.selector)}</h3>
      <p>{t(`${step.desc}.desc`)}</p>
      <div className="tour-actions">
        <button className="ghost-button" onClick={onDone}>{t('tour.skip')}</button>
        <button className="primary-button" onClick={next}>{last ? <>{t('tour.finish')} <Check size={15} /></> : <>{t('tour.next')} <ArrowRight size={14} /></>}</button>
      </div>
    </div>
  </div>, document.body)
}
