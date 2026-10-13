import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight, Flame, PawPrint, Target } from 'lucide-react'
import { EggIllustration, PetIllustration } from '../../components/illustrations/PetIllustration.jsx'
import { useAuth } from '../../auth.jsx'
import { apiFetch } from '../../lib/api.js'
import { formatToday, greetingFor } from '../../lib/greeting.js'
import { allLessons } from '../../lib/curriculum.js'
import { dailyQuests } from '../../lib/quests.js'

const petNames = { egg: 'Mochi', cat: 'Cat', dog: 'Dog', fox: 'Fox' }
const EXP_PER_LEVEL = 100

function Activity({ icon, title, detail, value, tone }) { return <div className="activity"><div className={`activity-icon ${tone}`}>{icon}</div><div><b>{title}</b><span>{detail}</span></div><strong className={tone}>{value}</strong></div> }

export default function StudentDashboard() {
  const { user } = useAuth()
  const [activities, setActivities] = useState(null)
  useEffect(() => { let active = true; apiFetch('/api/student/activities').then(result => { if (active) setActivities(result) }).catch(() => {}); return () => { active = false } }, [])
  const streak = user.profile?.currentStreak || 0
  const exp = user.profile?.currentExp || 0
  const level = Math.floor(exp / EXP_PER_LEVEL)
  const expInLevel = exp % EXP_PER_LEVEL
  const petType = user.profile?.petType || 'egg'
  const petLabel = petNames[petType] || 'Companion'
  const petProgress = expInLevel / EXP_PER_LEVEL * 100
  const milestone = level >= 7 ? 'Advanced Mathematics' : level >= 3 ? 'Intermediate Mathematics' : 'Basic Mathematics'
  const lessons = allLessons(user.profile?.grade)
  const completedSet = new Set(activities?.completedLessons || [])
  const doneCount = lessons.filter(lesson => completedSet.has(lesson.key)).length
  const nextLesson = lessons.find(lesson => !completedSet.has(lesson.key)) || null
  const learnTarget = nextLesson ? `/student/learn/${nextLesson.key}` : '/student/learn'
  const quests = dailyQuests(new Date())
  const questDone = activities ? quests.filter(quest => quest.measure(activities) >= quest.target).length : 0
  const nextQuest = activities ? quests.find(quest => quest.measure(activities) < quest.target) : quests[0]
  const questPercent = questDone / quests.length * 100
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">{formatToday(user.language)}</p><h1>{greetingFor()}, {user.fullName || 'there'} <span>👋</span></h1><p className="page-subtitle">Ready to make a little progress today?</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{streak} {streak === 1 ? 'day' : 'days'} <small>learning streak</small></strong></div></section>
    <section className="student-grid"><div className="hero-card card"><div className="hero-copy"><label>Your learning companion</label><h2>Every question is a step forward.</h2><p>{petLabel} is cheering you on while you build your Mathematics skills.</p><Link className="primary-button" to={learnTarget}>Continue learning <ArrowRight size={16} /></Link></div><div className="pet-display"><div className="pet-glow" />{petType === 'egg' ? <EggIllustration className="dashboard-pet-art" /> : <PetIllustration type={petType} className="dashboard-pet-art" />}<div className="pet-name"><PawPrint size={13} /> {petLabel} <span>Level {level}</span></div></div></div><div className="progress-card card"><div className="split"><div><label>Pet level</label><h3>Level {level}</h3></div><span className="level-badge">{exp} XP</span></div><div className="progress-track"><i style={{ width: `${petProgress}%` }} /></div><p className="muted-text">{EXP_PER_LEVEL - expInLevel} EXP until the next level</p><div className="milestone-row"><div className="round-icon purple"><Target size={17} /></div><div><span>Current milestone</span><b>{milestone}</b></div></div></div></section>
    <section className="section-block"><div className="section-title-row"><div><label>Your plan</label><h2>Keep your momentum</h2></div><Link className="text-link" to="/student/progress">View progress <ArrowRight size={14} /></Link></div><div className="learning-grid"><Link className="lesson-card card" to={learnTarget}><div className="round-icon blue"><BookOpen size={19} /></div><div className="lesson-copy"><label>{nextLesson ? 'Continue learning' : 'Learning path'}</label><h3>{nextLesson ? nextLesson.title : 'Semua lesson sudah selesai'}</h3><p>{nextLesson ? nextLesson.description : 'Kamu sudah menyelesaikan semua lesson yang tersedia.'}</p><small>{nextLesson ? `${nextLesson.stageName} · ${nextLesson.label}` : `${doneCount} / ${lessons.length} lesson selesai`}</small></div><ChevronRight className="muted" size={18} /></Link><div className="quest-card card"><div className="quest-head"><div className="round-icon purple"><Target size={17} /></div><div><label>Today's quests</label><h3>{nextQuest ? nextQuest.title : 'Semua quest selesai!'}</h3></div><b>{questDone}/{quests.length}</b></div><div className="mini-progress"><i style={{ width: `${questPercent}%` }} /></div><div className="quest-foot"><span>{nextQuest ? `+${nextQuest.reward} XP reward` : 'Kerja bagus hari ini'}</span><Link to="/student/quests">See quests <ArrowRight size={13} /></Link></div></div></div></section>
    <section className="section-block"><div className="section-title-row"><div><label>Recent wins</label><h2>Small moments, real progress</h2></div><Link className="text-link" to="/student/progress">All activity <ArrowRight size={14} /></Link></div><div className="activity-list card"><Activity icon="✓" tone="green" title={`${doneCount} lesson${doneCount === 1 ? '' : 's'} completed`} detail={nextLesson ? `Next: ${nextLesson.title}` : 'All lessons completed'} value={`${doneCount}`} /><Activity icon="🔥" tone="orange" title={`${streak} ${streak === 1 ? 'day' : 'days'} learning streak`} detail={streak > 0 ? 'Today · Keep it going' : 'Complete a task to start'} value="Streak" /><Activity icon="★" tone="purple" title={`Pet level ${level}`} detail={`${exp} XP earned`} value="Level" /></div></section>
  </div>
}
