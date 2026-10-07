import { useEffect, useState } from 'react'
import { Flame, Sparkles, Zap } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import { EggIllustration, PetIllustration } from '../../components/illustrations/PetIllustration.jsx'

const petNames = { egg: 'Mochi egg', cat: 'Cat', dog: 'Dog', fox: 'Fox' }

export default function StudentPetPage() {
  const [progress, setProgress] = useState(null); const [error, setError] = useState('')
  useEffect(() => { let active = true; apiFetch('/api/student/pet').then(result => { if (active) setProgress(result) }).catch(requestError => { if (active) setError(requestError.message) }); return () => { active = false } }, [])
  if (error) return <div className="form-error">{error}</div>
  if (!progress) return <div className="card loading-card">Loading your companion...</div>
  const percent = progress.expInLevel / progress.expToNextLevel * 100
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">Your companion</p><h1>{petNames[progress.pet] || 'Your pet'}</h1><p className="page-subtitle">Keep learning to help your companion grow.</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{progress.streak} days <small>check-in streak</small></strong></div></section><section className="pet-progress-layout"><div className="card pet-profile-card"><div className="pet-art-stage">{progress.pet === 'egg' ? <EggIllustration /> : <PetIllustration type={progress.pet} />}</div><h2>{petNames[progress.pet] || 'Companion'}</h2><p>Learning companion</p></div><div className="card pet-stats-card"><div className="section-title-row"><div><label>Growth progress</label><h2>Level {progress.level}</h2></div><div className="level-badge"><Zap size={13} /> {progress.exp} XP</div></div><div className="xp-progress"><div className="xp-progress-label"><span>{progress.expInLevel} / {progress.expToNextLevel} XP</span><b>Level {progress.level + 1}</b></div><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><small>{progress.expToNextLevel - progress.expInLevel} XP until the next level</small></div><div className="pet-rule"><Sparkles size={17} /><span>Complete a learning task for <b>+5 XP</b> and earn your daily check-in reward of <b>+10 XP</b>.</span></div></div></section></div>
}
