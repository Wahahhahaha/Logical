import { useMemo, useState } from 'react'
import { Check, Heart, Languages, RotateCcw, Sparkles } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { apiFetch } from '../../lib/api.js'
import { HatchingExperience, PetEggArt, PetReveal } from '../../components/onboarding/HatchingExperience.jsx'

const pets = [
  { id: 'cat', nameKey: 'onb.pet.cat', descKey: 'onb.pet.cat.desc', color: '#e88c46' },
  { id: 'dog', nameKey: 'onb.pet.dog', descKey: 'onb.pet.dog.desc', color: '#b8794d' },
  { id: 'fox', nameKey: 'onb.pet.fox', descKey: 'onb.pet.fox.desc', color: '#ed631d' },
  { id: 'bird', nameKey: 'onb.pet.bird', descKey: 'onb.pet.bird.desc', color: '#65b9dc' },
]

export default function StudentOnboardingPage() {
  const { user, updateUser } = useAuth()
  const { t, language, setLanguage, translateError } = useI18n()
  const [step, setStep] = useState('language')
  const [chosen, setChosen] = useState(null)
  const [phase, setPhase] = useState('select')
  const [selectionLocked, setSelectionLocked] = useState(false)
  const [petName, setPetName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const selectedPet = useMemo(() => pets.find(item => item.id === chosen), [chosen])
  const selectedName = selectedPet ? t(selectedPet.nameKey) : ''
  const hatch = id => { if (selectionLocked || phase === 'hatching') return; setChosen(id); setPhase('hatching') }
  const chooseLanguage = code => { setLanguage(code); setStep('pet') }
  const finish = async () => {
    if (!selectedPet) return
    setLoading(true); setError('')
    try { const payload = { pet: selectedPet.id }; if (petName.trim()) payload.petName = petName.trim(); const result = await apiFetch('/api/student/onboarding', { method: 'PUT', body: JSON.stringify(payload) }); setSelectionLocked(true); updateUser(result.user); window.location.assign('/dashboard') }
    catch (requestError) { setError(requestError.message) } finally { setLoading(false) }
  }
  if (step === 'language') return <main className="onboarding-page hatch-onboarding"><section className="onboarding-card hatch-card card onboarding-language">
    <div className="language-badge"><Languages size={22} /></div>
    <p className="eyebrow">{t('onb.welcome', { name: user.fullName })}</p>
    <h1>{t('onb.chooseLanguage')}</h1><p className="onboarding-copy">{t('onb.languageCopy')}</p>
    <div className="language-grid">
      <button type="button" className={`language-option ${language === 'id-ID' ? 'active' : ''}`} onClick={() => chooseLanguage('id-ID')}><span className="language-name">{t('onb.lang.id')}</span>{language === 'id-ID' && <Check size={16} />}</button>
      <button type="button" className={`language-option ${language === 'en-US' ? 'active' : ''}`} onClick={() => chooseLanguage('en-US')}><span className="language-name">{t('onb.lang.en')}</span>{language === 'en-US' && <Check size={16} />}</button>
    </div>
  </section></main>
  return <main className="onboarding-page hatch-onboarding"><section className="onboarding-card hatch-card card">
    <div className="hatch-progress" aria-label={t('onb.progress')}><span className="active" /><span className={phase !== 'select' ? 'active' : ''} /><span className={phase === 'revealed' ? 'active' : ''} /></div>
    <p className="eyebrow">{t('onb.welcome', { name: user.fullName })}</p><h1>{t('onb.choose')}</h1><p className="onboarding-copy">{t('onb.tapEgg')}</p>
    <div className={`pet-selection-layout phase-${phase}`}>
      {phase !== 'select' && <div className="preview-slot preview-slot-active" aria-live="polite">
        {phase === 'hatching' && selectedPet && <HatchingExperience type={selectedPet.id} onComplete={() => setPhase('revealed')} />}
        {phase === 'revealed' && selectedPet && <><div className="reveal-stage"><div className="reveal-glow" /><PetReveal type={selectedPet.id} /></div><p className="eyebrow">{t('onb.found', { pet: selectedName })}</p><h2>{t('onb.meet')}</h2><p className="onboarding-copy">{t('onb.previewAnother')}</p><div className="inline-preview"><div className="onboarding-field"><label className="field-label" htmlFor="pet-name">{t('onb.giveName')} <small>{t('onb.optional')}</small></label><input id="pet-name" className="text-input" type="text" value={petName} maxLength={40} placeholder={t('onb.exampleName', { name: selectedPet.id === 'bird' ? 'Sunny' : 'Mochi' })} onChange={event => setPetName(event.target.value)} /></div><div className="hatch-actions"><button className="primary-button" disabled={loading || selectionLocked} onClick={finish}>{loading ? t('common.saving') : t('onb.chooseThisPet')} <Check size={16} /></button><button className="ghost-button" disabled={loading || selectionLocked} onClick={() => { setChosen(null); setPhase('select') }}><RotateCcw size={15} /> {t('onb.tryAnother')}</button></div>{error && <div className="form-error">{translateError(error)}</div>}<div className="care-note"><Heart size={18} /><span>{t('onb.care', { pet: selectedName })}</span></div></div></>}
      </div>}
      <div className={`egg-grid ${phase === 'hatching' ? 'egg-grid-previewing' : ''}`} role="list" aria-label={t('onb.everyEgg')}>{pets.map(pet => <article className={`egg-card ${chosen === pet.id ? 'egg-card-selected' : ''}`} key={pet.id} role="listitem" tabIndex={selectionLocked || phase === 'hatching' ? -1 : 0} aria-disabled={selectionLocked || phase === 'hatching'} style={{ '--egg-accent': pet.color }} onClick={() => hatch(pet.id)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); hatch(pet.id) } }}><span className="egg-art"><PetEggArt type={pet.id} /></span><strong>{t(pet.nameKey)}</strong><small>{t(pet.descKey)}</small></article>)}</div>
    </div><p className="hatch-tip"><Sparkles size={15} /> {t('onb.everyEggTip')}</p>
  </section></main>
}
