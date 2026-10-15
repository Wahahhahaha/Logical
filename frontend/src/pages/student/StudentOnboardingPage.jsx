import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, Languages } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { apiFetch } from '../../lib/api.js'
import AuthScenery from '../../components/auth/AuthScenery.jsx'
import { HatchingExperience, PetEggArt } from '../../components/onboarding/HatchingExperience.jsx'

const pets = [
  { id: 'cat', nameKey: 'onb.pet.cat', descKey: 'onb.pet.cat.desc', color: '#e88c46' },
  { id: 'dog', nameKey: 'onb.pet.dog', descKey: 'onb.pet.dog.desc', color: '#b8794d' },
  { id: 'fox', nameKey: 'onb.pet.fox', descKey: 'onb.pet.fox.desc', color: '#ed631d' },
  { id: 'bird', nameKey: 'onb.pet.bird', descKey: 'onb.pet.bird.desc', color: '#65b9dc' },
]

export default function StudentOnboardingPage() {
  const { user, updateUser } = useAuth()
  const { t, language, setLanguage, translateError } = useI18n()
  const navigate = useNavigate()
  const [step, setStep] = useState('language')
  const [chosen, setChosen] = useState(null)
  const [phase, setPhase] = useState('select')
  const [selectionLocked, setSelectionLocked] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [petName, setPetName] = useState('')
  const [hatchKey, setHatchKey] = useState(0)
  const selectedPet = useMemo(() => pets.find(item => item.id === chosen), [chosen])
  const selectedName = selectedPet ? t(selectedPet.nameKey) : ''
  const hatch = id => { if (selectionLocked) return; setChosen(id); setPhase('hatching'); setPetName(''); setHatchKey(prev => prev + 1) }
  const chooseLanguage = code => { Promise.resolve(setLanguage(code)).catch(() => { /* keep the local choice */ }); setStep('pet') }
  const finish = async () => {
    if (!selectedPet) return
    const trimmedName = petName.trim()
    if (!trimmedName) {
      setError('pet.nameEmpty')
      return
    }
    setLoading(true); setError('')
    try {
      const payload = {
        pet: selectedPet.id,
        petName: trimmedName
      }
      const result = await apiFetch('/api/student/onboarding', { method: 'PUT', body: JSON.stringify(payload) })
      setSelectionLocked(true)
      updateUser(result.user)
      navigate('/dashboard', { replace: true })
    }
    catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }
  if (step === 'language') return <main className="onboarding-page hatch-onboarding"><AuthScenery /><section className="onboarding-card hatch-card card onboarding-language">
    <div className="language-badge"><Languages size={22} /></div>
    <p className="eyebrow">{t('onb.welcome', { name: user.fullName })}</p>
    <h1>{t('onb.chooseLanguage')}</h1><p className="onboarding-copy">{t('onb.languageCopy')}</p>
    <div className="language-grid">
      <button type="button" className={`language-option ${language === 'id-ID' ? 'active' : ''}`} onClick={() => chooseLanguage('id-ID')}><span className="language-name">{t('onb.lang.id')}</span>{language === 'id-ID' && <Check size={16} />}</button>
      <button type="button" className={`language-option ${language === 'en-US' ? 'active' : ''}`} onClick={() => chooseLanguage('en-US')}><span className="language-name">{t('onb.lang.en')}</span>{language === 'en-US' && <Check size={16} />}</button>
    </div>
  </section></main>
  return <main className="onboarding-page hatch-onboarding"><AuthScenery /><section className="onboarding-card hatch-card card">
    <div className="hatch-progress" aria-label={t('onb.progress')}><span className="active" /><span className={phase !== 'select' ? 'active' : ''} /><span className={phase === 'revealed' ? 'active' : ''} /></div>
    <p className="eyebrow">{t('onb.welcome', { name: user.fullName })}</p>
    <h1>{t('onb.choose')}</h1>
    <p className="onboarding-copy">{t('onb.tapEgg')}</p>

    <div className={`pet-selection-layout phase-${phase}`}>
       {phase !== 'select' && selectedPet && <div className={`preview-slot preview-slot-active ${phase === 'revealed' ? 'preview-slot-revealed' : ''}`} aria-live="polite">
         <HatchingExperience key={`${selectedPet.id}-${hatchKey}`} type={selectedPet.id} onComplete={() => setPhase('revealed')} />
         <div className="inline-preview">
           <div className="hatching-name-field" style={{ margin: '12px 0', textAlign: 'left' }}>
             <label className="field-label" htmlFor="onboarding-pet-name">
                <span>{t('onb.giveName')} <span style={{ color: '#e0666d' }}>*</span></span>
             </label>
             <input
               id="onboarding-pet-name"
               className="text-input"
               type="text"
               value={petName}
               maxLength={20}
               placeholder={selectedPet ? t('onb.exampleName', { name: selectedName }) : t('onb.exampleName', { name: 'Milo' })}
               onChange={event => { setPetName(event.target.value); if (error) setError('') }}
               disabled={loading || selectionLocked}
               onKeyDown={event => { if (event.key === 'Enter' && selectedPet) finish() }}
             />
             {error && <div className="form-error" style={{ marginTop: '6px' }}>{translateError(error)}</div>}
           </div>
           <div className="hatch-actions">
             <button className="primary-button" disabled={loading || selectionLocked || !petName.trim()} onClick={finish}>
               {loading ? t('common.saving') : t('onb.chooseThisPet')} <Check size={16} />
             </button>
           </div>
         </div>
       </div>}
      <div className={`egg-grid ${phase === 'hatching' ? 'egg-grid-previewing' : ''}`} role="list" aria-label={t('onb.everyEgg')}>
        {pets.map(pet => <article className={`egg-card ${chosen === pet.id ? 'egg-card-selected' : ''}`} key={pet.id} role="listitem" tabIndex={selectionLocked ? -1 : 0} aria-disabled={selectionLocked} style={{ '--egg-accent': pet.color }} onClick={() => hatch(pet.id)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); hatch(pet.id) } }}><span className="egg-art"><PetEggArt type={pet.id} /></span><strong>{t(pet.nameKey)}</strong><small>{t(pet.descKey)}</small></article>)}
      </div>
    </div>
  </section></main>
}
