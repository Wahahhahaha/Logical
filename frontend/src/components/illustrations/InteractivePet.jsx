import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n.jsx'
import { PetIllustration } from './PetIllustration.jsx'
import PixelEmote from './PixelEmote.jsx'

const sequence = [
  { emotion: 'happy', emote: 'love', messageKey: 'pet.react.play' },
  { emotion: 'excited', emote: 'sparkle', messageKey: 'pet.react.fun' },
  { emotion: 'encouraging', emote: 'star', messageKey: 'pet.react.awesome' },
]

export default function InteractivePet({ type, label = 'Companion', reaction: externalReaction = null }) {
  const { t } = useI18n()
  const [reaction, setReaction] = useState(null)
  const [clicks, setClicks] = useState(0)
  const timerRef = useRef(null)
  const lastExternal = useRef(null)
  useEffect(() => () => window.clearTimeout(timerRef.current), [])
  useEffect(() => {
    if (!externalReaction || externalReaction.id === lastExternal.current) return
    lastExternal.current = externalReaction.id
    const emote = externalReaction.emotion === 'happy' ? 'sparkle' : externalReaction.emotion === 'confused' ? 'sweat' : externalReaction.emotion === 'thinking' ? 'thought' : 'star'
    setReaction({ ...externalReaction, emote })
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setReaction(null), externalReaction.duration || 1400)
  }, [externalReaction])
  const interact = () => {
    const next = sequence[clicks % sequence.length]
    setClicks(value => value + 1)
    setReaction({ emotion: next.emotion, emote: next.emote, message: t(next.messageKey), id: Date.now() })
    window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setReaction(null), 1400)
  }
  return <button className={`interactive-pet interactive-${type}${reaction ? ` mood-${reaction.emotion}` : ''}`} type="button" aria-label={t('pet.aria', { pet: label })} onClick={interact}>
    <PetIllustration type={type} emotion={reaction?.emotion || 'idle'} />
    {reaction && <span className="interactive-emote"><PixelEmote kind={reaction.emote} /></span>}
  </button>
}
