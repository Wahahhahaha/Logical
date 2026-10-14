import { useMemo, useState } from 'react'
import { Check, Heart, RotateCcw, Sparkles } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { apiFetch } from '../../lib/api.js'
import { HatchingExperience, PetEggArt, PetReveal } from '../../components/onboarding/HatchingExperience.jsx'

const pets = [
  { id: 'cat', name: 'Cat', description: 'Curious, cozy, and ready to learn.', color: '#e88c46' },
  { id: 'dog', name: 'Dog', description: 'Loyal, playful, and always cheering.', color: '#b8794d' },
  { id: 'fox', name: 'Fox', description: 'Clever, bright, and full of adventure.', color: '#ed631d' },
  { id: 'bird', name: 'Bird', description: 'Cheerful, curious, and quick to sing.', color: '#65b9dc' },
]

export default function StudentOnboardingPage() {
  const { user, updateUser } = useAuth()
  const [chosen, setChosen] = useState(null)
  const [phase, setPhase] = useState('select')
  const [selectionLocked, setSelectionLocked] = useState(false)
  const [petName, setPetName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const selectedPet = useMemo(() => pets.find(item => item.id === chosen), [chosen])
  const hatch = id => { if (selectionLocked || phase === 'hatching') return; setChosen(id); setPhase('hatching') }
  const finish = async () => {
    if (!selectedPet) return
    setLoading(true); setError('')
    try { const payload = { pet: selectedPet.id }; if (petName.trim()) payload.petName = petName.trim(); const result = await apiFetch('/api/student/onboarding', { method: 'PUT', body: JSON.stringify(payload) }); setSelectionLocked(true); updateUser(result.user); window.location.assign('/dashboard') }
    catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }
  return <main className="onboarding-page hatch-onboarding"><section className="onboarding-card hatch-card card">
    <div className="hatch-progress" aria-label="Onboarding progress"><span className="active" /><span className={phase !== 'select' ? 'active' : ''} /><span className={phase === 'revealed' ? 'active' : ''} /></div>
    <p className="eyebrow">Welcome to Logical, {user.fullName}</p><h1>Choose Your Companion</h1><p className="onboarding-copy">Tap an egg to discover your new learning companion!</p>
    <div className={`pet-selection-layout phase-${phase}`}>
      {phase !== 'select' && <div className="preview-slot preview-slot-active" aria-live="polite">
        {phase === 'hatching' && selectedPet && <HatchingExperience type={selectedPet.id} onComplete={() => setPhase('revealed')} />}
        {phase === 'revealed' && selectedPet && <><div className="reveal-stage"><div className="reveal-glow" /><PetReveal type={selectedPet.id} /></div><p className="eyebrow">You found a {selectedPet.name}!</p><h2>Meet Your New Companion</h2><p className="onboarding-copy">Preview another egg or continue with this friend.</p><div className="inline-preview"><div className="onboarding-field"><label className="field-label" htmlFor="pet-name">Give your friend a name <small>(optional)</small></label><input id="pet-name" className="text-input" type="text" value={petName} maxLength={40} placeholder={`e.g. ${selectedPet.id === 'bird' ? 'Sunny' : 'Mochi'}`} onChange={event => setPetName(event.target.value)} /></div><div className="hatch-actions"><button className="primary-button" disabled={loading || selectionLocked} onClick={finish}>{loading ? 'Saving...' : 'Choose This Pet'} <Check size={16} /></button><button className="ghost-button" disabled={loading || selectionLocked} onClick={() => { setChosen(null); setPhase('select') }}><RotateCcw size={15} /> Try Another Egg</button></div>{error && <div className="form-error">{error}</div>}<div className="care-note"><Heart size={18} /><span>Complete learning tasks to help {selectedPet.name} grow with you.</span></div></div></>}
      </div>}
      <div className={`egg-grid ${phase === 'hatching' ? 'egg-grid-previewing' : ''}`} role="list" aria-label="Companion eggs">{pets.map(pet => <article className={`egg-card ${chosen === pet.id ? 'egg-card-selected' : ''}`} key={pet.id} role="listitem" tabIndex={selectionLocked || phase === 'hatching' ? -1 : 0} aria-disabled={selectionLocked || phase === 'hatching'} style={{ '--egg-accent': pet.color }} onClick={() => hatch(pet.id)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); hatch(pet.id) } }}><span className="egg-art"><PetEggArt type={pet.id} /></span><strong>{pet.name}</strong><small>{pet.description}</small></article>)}</div>
    </div><p className="hatch-tip"><Sparkles size={15} /> You can preview every egg before choosing.</p>
  </section></main>
}
