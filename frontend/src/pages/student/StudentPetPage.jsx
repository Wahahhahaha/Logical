import { useEffect, useState } from 'react'
import { Check, Pencil, X, Zap } from 'lucide-react'
import { useI18n } from '../../i18n.jsx'
import { apiFetch } from '../../lib/api.js'
import InteractiveCat from '../../components/illustrations/InteractiveCat.jsx'
import InteractiveFox from '../../components/illustrations/InteractiveFox.jsx'
import InteractivePet from '../../components/illustrations/InteractivePet.jsx'
import { PetPageSkeleton } from '../../components/Skeleton.jsx'

export default function StudentPetPage() {
  const { t, translateError } = useI18n()
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState('')
  const [saveError, setSaveError] = useState('')
  useEffect(() => {
    let active = true
    apiFetch('/api/student/pet').then(result => { if (active) setProgress(result) }).catch(requestError => { if (active) setError(requestError.message) })
    return () => { active = false }
  }, [])
  if (error) return <div className="form-error">{translateError(error)}</div>
  if (!progress) return <PetPageSkeleton />
  const petType = progress.pet && progress.pet !== 'egg' ? progress.pet : 'cat'
  const defaultName = t(`pet.type.${petType}`)
  const displayName = progress.petName || defaultName || t('common.companion')
  const startEdit = () => { setDraftName(displayName); setSaveError(''); setEditing(true) }
  const cancelEdit = () => { setEditing(false); setSaveError('') }
  const saveName = async () => {
    const petName = draftName.trim()
    if (!petName) { setSaveError('pet.nameEmpty'); return }
    setSaveError('')
    try { const result = await apiFetch('/api/student/pet/name', { method: 'PUT', body: JSON.stringify({ petName }) }); setProgress({ ...progress, petName: result.user.profile?.petName || petName }); setEditing(false) } catch (requestError) { setSaveError(requestError.message) }
  }
  const percent = progress.expInLevel / progress.expToNextLevel * 100
  const petArt = petType === 'cat' ? <InteractiveCat label={displayName} /> : petType === 'fox' ? <InteractiveFox label={displayName} /> : <InteractivePet type={petType} label={displayName} />
  return <div className="page-stack">
    <section className="welcome-row"><div><p className="eyebrow">{t('pet.companion')}</p><h1>{displayName}</h1><p className="page-subtitle">{t('pet.keepLearning')}</p></div></section>
    <section className="pet-progress-layout">
      <div className="card pet-profile-card"><div className="pet-art-stage">{petArt}</div><div className="pet-profile-caption">{editing ? <div className="pet-name-row pet-name-editing"><input className="text-input pet-name-input" type="text" value={draftName} maxLength={15} autoFocus aria-label={t('common.rename')} onChange={event => setDraftName(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') saveName(); if (event.key === 'Escape') cancelEdit() }} /><button className="icon-button pet-name-confirm" onClick={saveName} aria-label={t('common.save')}><Check size={16} /></button><button className="icon-button pet-name-cancel" onClick={cancelEdit} aria-label={t('common.cancel')}><X size={16} /></button></div> : <div className="pet-name-row"><h2>{displayName}</h2><button className="icon-button pet-rename-icon" onClick={startEdit} aria-label={t('common.rename')} title={t('common.rename')}><Pencil size={14} /></button></div>}<p>{t('pet.learningCompanion')}</p>{editing && saveError && <div className="form-error">{translateError(saveError)}</div>}</div></div>
      <div className="card pet-stats-card"><div className="section-title-row"><div><label>{t('pet.growth')}</label><h2>{t('dash.level', { n: progress.level })}</h2></div><div className="level-badge"><Zap size={13} /> {progress.exp} XP</div></div><div className="xp-progress"><div className="xp-progress-label"><span>{progress.expInLevel} / {progress.expToNextLevel} XP</span><b>{t('dash.level', { n: progress.level + 1 })}</b></div><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><small>{t('pet.xpUntil', { n: progress.expToNextLevel - progress.expInLevel })}</small></div></div>
    </section>
  </div>
}
