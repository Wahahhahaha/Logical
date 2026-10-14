import { useEffect, useState } from 'react'
import { Check, Flame, Pencil, Sparkles, X, Zap } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import { EggIllustration, PetIllustration } from '../../components/illustrations/PetIllustration.jsx'
import InteractiveCat from '../../components/illustrations/InteractiveCat.jsx'
import InteractiveFox from '../../components/illustrations/InteractiveFox.jsx'

const petNames = { egg: 'Mochi egg', cat: 'Cat', dog: 'Dog', fox: 'Fox', bird: 'Bird' }

export default function StudentPetPage() {
  const [progress, setProgress] = useState(null); const [error, setError] = useState(''); const [editing, setEditing] = useState(false); const [draftName, setDraftName] = useState(''); const [saveError, setSaveError] = useState('')
  useEffect(() => { let active = true; apiFetch('/api/student/pet').then(result => { if (active) setProgress(result) }).catch(requestError => { if (active) setError(requestError.message) }); return () => { active = false } }, [])
  if (error) return <div className="form-error">{error}</div>
  if (!progress) return <div className="card loading-card">Loading your companion...</div>
  const displayName = progress.petName || petNames[progress.pet] || 'Companion'
  const startEdit = () => { setDraftName(displayName); setSaveError(''); setEditing(true) }
  const cancelEdit = () => { setEditing(false); setSaveError('') }
  const saveName = async () => { const petName = draftName.trim(); if (!petName) { setSaveError('Pet name cannot be empty.'); return } setSaveError(''); try { const result = await apiFetch('/api/student/pet/name', { method: 'PUT', body: JSON.stringify({ petName }) }); setProgress({ ...progress, petName: result.user.profile?.petName || petName }); setEditing(false) } catch (requestError) { setSaveError(requestError.message) } }
  const percent = progress.expInLevel / progress.expToNextLevel * 100
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">Your companion</p><h1>{displayName}</h1><p className="page-subtitle">Keep learning to help your companion grow.</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{progress.streak} days <small>check-in streak</small></strong></div></section><section className="pet-progress-layout"><div className="card pet-profile-card"><div className="pet-art-stage">{progress.pet === 'egg' ? <EggIllustration /> : progress.pet === 'fox' ? <InteractiveFox label={displayName} /> : progress.pet === 'cat' ? <InteractiveCat label={displayName} /> : <PetIllustration type={progress.pet} />}</div><h2>{displayName}</h2><p>Learning companion</p>{!editing ? <button className="pet-rename-button" onClick={startEdit}><Pencil size={14} /> Rename</button> : <div className="pet-rename-form"><input className="text-input" type="text" value={draftName} maxLength={40} autoFocus onChange={(event) => setDraftName(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') saveName(); if (event.key === 'Escape') cancelEdit() }} /><div className="pet-rename-actions"><button className="primary-button small" onClick={saveName}><Check size={14} /> Save</button><button className="ghost-button small" onClick={cancelEdit}><X size={14} /> Cancel</button></div>{saveError && <div className="form-error">{saveError}</div>}</div>}</div><div className="card pet-stats-card"><div className="section-title-row"><div><label>Growth progress</label><h2>Level {progress.level}</h2></div><div className="level-badge"><Zap size={13} /> {progress.exp} XP</div></div><div className="xp-progress"><div className="xp-progress-label"><span>{progress.expInLevel} / {progress.expToNextLevel} XP</span><b>Level {progress.level + 1}</b></div><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><small>{progress.expToNextLevel - progress.expInLevel} XP until the next level</small></div><div className="pet-rule"><Sparkles size={17} /><span>Complete a learning quest for <b>+5 XP</b> and earn your daily check-in reward of <b>+10 XP</b>.</span></div></div></section></div>
  }
