import { useEffect, useRef, useState } from 'react'
import { PetIllustration } from './PetIllustration.jsx'

export default function InteractiveCat({ className = '', label = 'Cat' }) {
  const [emotion, setEmotion] = useState('idle')
  const [effect, setEffect] = useState('')
  const [blink, setBlink] = useState(false)
  const resetRef = useRef(null)

  useEffect(() => {
    let blinkTimer
    const schedule = () => {
      blinkTimer = window.setTimeout(() => {
        setBlink(true)
        window.setTimeout(() => setBlink(false), 120)
        schedule()
      }, 3000 + Math.random() * 3200)
    }
    schedule()
    return () => {
      window.clearTimeout(blinkTimer)
      window.clearTimeout(resetRef.current)
    }
  }, [])

  const interact = () => {
    window.clearTimeout(resetRef.current)
    setEmotion('happy')
    setEffect('love')
    resetRef.current = window.setTimeout(() => {
      setEmotion('idle')
      setEffect('')
    }, 1200)
  }

  return <button className={`interactive-cat ${className}`} type="button" aria-label={`${label}, teman belajar. Klik untuk berinteraksi.`} onClick={interact}>
    <PetIllustration type="cat" emotion={blink && emotion === 'idle' ? 'blink' : emotion} effect={effect} />
  </button>
}
