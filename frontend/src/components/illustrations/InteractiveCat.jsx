import { useCallback, useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n.jsx'
import { PetIllustration } from './PetIllustration.jsx'
import PixelEmote from './PixelEmote.jsx'

const reactions = {
  happy: { emotion: 'happy', effect: 'sparkle', messageKey: 'pet.react.happy' },
  celebrating: { emotion: 'happy', effect: 'confetti', messageKey: 'pet.react.celebrating' },
  thinking: { emotion: 'thinking', effect: 'thought', messageKey: 'pet.react.thinking' },
  confused: { emotion: 'sad', effect: '', messageKey: 'pet.react.confused' },
  encouraging: { emotion: 'happy', effect: 'love', messageKey: 'pet.react.encouraging' },
}
const priorityFor = name => name === 'celebrating' ? 5 : name === 'thinking' ? 4 : name === 'happy' || name === 'confused' ? 3 : 2

export default function InteractiveCat({ className = '', label = 'Cat', reaction, onReact }) {
  const { t } = useI18n()
  const [current, setCurrent] = useState({ emotion: 'idle', effect: '', id: 0 })
  const [blink, setBlink] = useState(false)
  const resetRef = useRef(null)
  const blinkRef = useRef(null)
  const activePriority = useRef(0)
  const lastReaction = useRef(null)
  const onReactRef = useRef(onReact)
  useEffect(() => { onReactRef.current = onReact }, [onReact])

  const play = useCallback((name, message, duration = 1500, priority = priorityFor(name)) => {
    if (priority < activePriority.current) return
    activePriority.current = priority
    window.clearTimeout(resetRef.current)
    const mood = reactions[name] || reactions.happy
    const text = message ?? (mood.messageKey ? t(mood.messageKey, { pet: label }) : '')
    setCurrent({ emotion: mood.emotion, effect: mood.effect, message: text, id: Date.now() })
    if (text) onReactRef.current?.(text)
    resetRef.current = window.setTimeout(() => {
      setCurrent({ emotion: 'idle', effect: '', id: Date.now() })
      activePriority.current = 0
    }, duration)
  }, [t, label])

  useEffect(() => {
    if (!reaction || reaction.id === lastReaction.current) return
    lastReaction.current = reaction.id
    play(reaction.emotion || 'happy', reaction.message, reaction.duration || 1500, reaction.priority || priorityFor(reaction.emotion || 'happy'))
  }, [reaction, play])

  useEffect(() => {
    const schedule = () => {
      blinkRef.current = window.setTimeout(() => {
        if (activePriority.current === 0) {
          setBlink(true)
          window.setTimeout(() => setBlink(false), 120)
        }
        schedule()
      }, 3000 + Math.random() * 3200)
    }
    schedule()
    return () => {
      window.clearTimeout(blinkRef.current)
      window.clearTimeout(resetRef.current)
    }
  }, [])

  const interact = () => {
    play('encouraging', undefined, 1300, 2)
  }

  return <button className={`interactive-cat ${className} mood-${current.emotion}`} type="button" aria-label={t('pet.aria', { pet: label })} onClick={interact}>
    <PetIllustration type="cat" emotion={blink && current.emotion === 'idle' ? 'blink' : current.emotion} effect={current.effect} />
    {current.effect && <span className="interactive-emote"><PixelEmote kind={current.effect === 'confetti' ? 'star' : current.effect} /></span>}
  </button>
}
