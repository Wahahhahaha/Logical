import { useCallback, useEffect, useRef, useState } from 'react'
import { PetIllustration } from './PetIllustration.jsx'

const reactions = {
  happy: { emotion: 'happy', effect: 'sparkle', message: 'Fox ikut senang!' },
  love: { emotion: 'excited', effect: 'love', message: 'Fox senang sekali!' },
  confused: { emotion: 'curious', effect: 'sweat', message: 'Kita coba pelan-pelan, yuk!' },
  thinking: { emotion: 'thinking', effect: 'thought', message: 'Hmm, coba lihat petunjuknya!' },
  celebrating: { emotion: 'celebrating', effect: 'confetti', message: 'Kerja bagus! Fox ikut merayakan!' },
  sleepy: { emotion: 'sleepy', effect: 'z', message: '' },
  curious: { emotion: 'curious', effect: 'sparkle', message: 'Ada yang menarik!' },
  frustrated: { emotion: 'sad', effect: 'anger', message: 'Wah, Fox jadi sedikit bingung!' },
}

const priorityFor = name => name === 'celebrating' ? 5 : name === 'thinking' ? 4 : name === 'happy' || name === 'confused' ? 3 : 2

export default function InteractiveFox({ className = '', label = 'Fox', reaction, onReact }) {
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
    setCurrent({ ...mood, message: message ?? mood.message, id: Date.now() })
    if (message || mood.message) onReactRef.current?.(message ?? mood.message)
    timeoutRef.current = window.setTimeout(() => {
      setCurrent({ emotion: 'idle', effect: '', id: Date.now() })
      activePriority.current = 0
    }, duration)
  }, [])

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
    if (count >= 5) play('frustrated', 'Wah, Fox jadi sedikit bingung!', 1200, 2)
    else if (count >= 3) play('love', 'Fox senang sekali!', 1600, 2)
    else if (x > 0.74 && y > 0.42) play('curious', 'Ekor Fox geli!', 1300, 2)
    else if (y < 0.48) play(count === 2 ? 'love' : 'happy', count === 2 ? 'Fox senang sekali!' : 'Fox ikut senang!', 1400, 2)
    else play(count === 2 ? 'love' : 'happy', undefined, 1300, 2)
  }

  return <button className={`interactive-fox ${className} ${idleMotion} mood-${current.emotion}`} type="button" aria-label={`Fox, teman belajarmu. Klik untuk berinteraksi dengan ${label}.`} onClick={interact}>
    <PetIllustration type="fox" emotion={blink && current.emotion === 'idle' ? 'blink' : current.emotion} effect={current.effect} />
  </button>
}
