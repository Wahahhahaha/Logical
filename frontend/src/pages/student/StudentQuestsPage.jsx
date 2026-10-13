import { useEffect, useState } from 'react'
import { Check, Flame } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import { useAuth } from '../../auth.jsx'
import { dailyQuests } from '../../lib/quests.js'
import { formatToday } from '../../lib/greeting.js'

export default function StudentQuestsPage() {
  const { user } = useAuth()
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => { let active = true; apiFetch('/api/student/activities').then(result => { if (active) setProgress(result) }).catch(requestError => { if (active) setError(requestError.message) }); return () => { active = false } }, [])
  const quests = dailyQuests(new Date())
  if (error) return <div className="form-error">{error}</div>
  if (!progress) return <div className="card loading-card">Loading today's quests...</div>
  const doneCount = quests.filter(quest => quest.measure(progress) >= quest.target).length
  const streak = user.profile?.currentStreak || 0
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">{formatToday(user.language)}</p><h1>Today's quests</h1><p className="page-subtitle">{doneCount} of {quests.length} quests completed today.</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{streak} {streak === 1 ? 'day' : 'days'} <small>learning streak</small></strong></div></section><section className="quest-list">{quests.map(quest => { const value = Math.min(quest.measure(progress), quest.target); const complete = value >= quest.target; const percent = value / quest.target * 100; return <div className={`quest-item card ${complete ? 'done' : ''}`} key={quest.id}><span className="quest-check">{complete ? <Check size={14} /> : <i />}</span><div className="quest-item-copy"><b>{quest.title}</b><p>{quest.description}</p>{!complete && <div className="mini-progress"><i style={{ width: `${percent}%` }} /></div>}<small>{complete ? 'Selesai · +' : `${value} / ${quest.target} · +`}{quest.reward} XP</small></div></div> })}</section></div>
}
