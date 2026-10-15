import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n.jsx'
import { PetIllustration } from './PetIllustration.jsx'

const reactions = {
  happy: { emotion: 'happy', effect: 'sparkle', messageKey: 'pet.react.happy' },
  love: { emotion: 'excited', effect: 'love', messageKey: 'pet.react.love' },
  confused: { emotion: 'curious', effect: 'sweat', messageKey: 'pet.react.gentle' },
  thinking: { emotion: 'thinking', effect: 'thought', messageKey: 'pet.react.thinking' },
  celebrating: { emotion: 'celebrating', effect: 'confetti', messageKey: 'pet.react.celebrating' },
  sleepy: { emotion: 'sleepy', effect: 'z', messageKey: '' },
  curious: { emotion: 'curious', effect: 'sparkle', messageKey: 'pet.react.curious' },
  frustrated: { emotion: 'sad', effect: 'anger', messageKey: 'pet.react.frustrated' },
}

const priorityFor = name => name === 'celebrating' ? 5 : name === 'thinking' ? 4 : name === 'happy' || name === 'confused' ? 3 : 2

export default function InteractiveFox({ className = '', label = 'Fox', reaction, onReact }) {
  const { t } = useI18n()
  const [current, setCurrent] = useState({ emotion: 'idle', effect: '', id: 0 })
  const [blink, setBlink] = useState(false)
  const [idleMotion, setIdleMotion] = useState('')
  const countRef = useRef({ count: 0, at: 0 })
  const timeoutRef = useRef(null)
  const blinkRef = useRef(null)
  const idleRef = useRef(null)
  const sleepyRef = useRef(null)
  const lastActivity = useRef(Date.now())
  const activePriority = useRef(0)
  const reducedMotion = useRef(false)
  const onReactRef = useRef(onReact)
  onReactRef.current = onReact

  const play = useCallback((name, message, duration = 1500, priority = priorityFor(name)) => {
    if (priority < activePriority.current) return
    activePriority.current = priority
    window.clearTimeout(timeoutRef.current)
    const mood = reactions[name] || reactions.happy
    const text = message ?? (mood.messageKey ? t(mood.messageKey, { pet: label }) : '')
    setCurrent({ emotion: mood.emotion, effect: mood.effect, message: text, id: Date.now() })
    if (text) onReactRef.current?.(text)
    timeoutRef.current = window.setTimeout(() => {
      setCurrent({ emotion: 'idle', effect: '', id: Date.now() })
      activePriority.current = 0
    }, duration)
  }, [t, label])

  useEffect(() => {
    if (!reaction) return
    play(reaction.emotion || 'happy', reaction.message, reaction.duration || 1500, reaction.priority || priorityFor(reaction.emotion || 'happy'))
  }, [reaction, play])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.current = media.matches
    const update = () => { reducedMotion.current = media.matches }
    media.addEventListener?.('change', update)
    const scheduleBlink = () => {
      blinkRef.current = window.setTimeout(() => {
        if (!reducedMotion.current) {
          setBlink(true)
          window.setTimeout(() => setBlink(false), 110)
        }
        scheduleBlink()
      }, 2800 + Math.random() * 3600)
    }
    scheduleBlink()
    const scheduleIdle = () => {
      idleRef.current = window.setTimeout(() => {
        if (activePriority.current === 0) {
          setIdleMotion('ear-twitch')
          window.setTimeout(() => setIdleMotion(''), 500)
        }
        scheduleIdle()
      }, 7000 + Math.random() * 9000)
    }
    scheduleIdle()
    const scheduleSleepy = () => {
      sleepyRef.current = window.setTimeout(() => {
        if (Date.now() - lastActivity.current > 60000 && activePriority.current === 0) play('sleepy', '', 2200, 1)
        scheduleSleepy()
      }, 60000)
    }
    scheduleSleepy()
    return () => {
      media.removeEventListener?.('change', update)
      window.clearTimeout(blinkRef.current)
      window.clearTimeout(idleRef.current)
      window.clearTimeout(sleepyRef.current)
      window.clearTimeout(timeoutRef.current)
    }
  }, [play])

  const interact = event => {
    lastActivity.current = Date.now()
    const now = Date.now()
    const recent = now - countRef.current.at < 2300
    countRef.current = { count: recent ? countRef.current.count + 1 : 1, at: now }
    const count = countRef.current.count
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    if (count >= 5) play('frustrated', undefined, 1200, 2)
    else if (count >= 3) play('love', undefined, 1600, 2)
    else if (x > 0.74 && y > 0.42) play('curious', t('pet.react.tail', { pet: label }), 1300, 2)
    else if (y < 0.48) play(count === 2 ? 'love' : 'happy', undefined, 1400, 2)
    else play(count === 2 ? 'love' : 'happy', undefined, 1300, 2)
  }

  return <button className={`interactive-fox ${className} ${idleMotion} mood-${current.emotion}`} type="button" aria-label={t('pet.aria', { pet: label })} onClick={interact}>
    <PetIllustration type="fox" emotion={blink && current.emotion === 'idle' ? 'blink' : current.emotion} effect={current.effect} />
  </button>
}
