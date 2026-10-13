import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, BookOpen, Check, Flame, Lock, Target, Zap } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { apiFetch } from '../../lib/api.js'
import { useToast } from '../../toast.jsx'
import { formatToday } from '../../lib/greeting.js'
import { planFor } from '../../lib/curriculum.js'
import { dailyQuests } from '../../lib/quests.js'

const EXP_PER_LEVEL = 100

export default function StudentProgressPage() {
  const { user } = useAuth()
  const toast = useToast()
  const [activities, setActivities] = useState(null)
  useEffect(() => { let active = true; apiFetch('/api/student/activities').then((result) => { if (active) setActivities(result) }).catch((error) => { if (active) toast.error(error.message) }); return () => { active = false } }, [toast])
  const exp = user.profile?.currentExp || 0
  const streak = user.profile?.currentStreak || 0
  const grade = user.profile?.grade
  const level = Math.floor(exp / EXP_PER_LEVEL)
  const expInLevel = exp % EXP_PER_LEVEL
  const expPercent = (expInLevel / EXP_PER_LEVEL) * 100
  const basePlan = planFor(grade)
  const completedSet = new Set(activities?.completedLessons || [])
  const stages = basePlan.stages.map((stage, idx) => {
    if (idx === 0) return stage
    const prevStage = basePlan.stages[idx - 1]
    const prevLessons = prevStage.lessons || []
    const allDone = prevLessons.length > 0 && prevLessons.every(lesson => completedSet.has(lesson.key))
    if (allDone) return { ...stage, locked: false }
    return { ...stage, locked: stage.locked !== false ? true : false }
  })
  const plan = { ...basePlan, stages }
  const unlockedStages = plan.stages.filter((stage) => !stage.locked)
  const all = unlockedStages.flatMap((stage) => stage.lessons || [])
  const total = all.length
  const done = all.filter((lesson) => completedSet.has(lesson.key)).length
  const percent = total ? Math.round((done / total) * 100) : 0
  const quests = dailyQuests(new Date())
  const questDone = activities ? quests.filter((quest) => quest.measure(activities) >= quest.target).length : 0
  const stats = [['Lessons completed', `${done}/${total}`, `${percent}% of curriculum`, BookOpen, 'blue'], ['Current level', `Level ${level}`, `${exp} XP total`, BarChart3, 'purple'], ['Streak', `${streak} ${streak === 1 ? 'day' : 'days'}`, 'Keep learning daily', Flame, 'orange'], ['Today', `${activities?.lessonsToday ?? 0} lessons`, `${questDone}/${quests.length} quests done`, Zap, 'green']]
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">Learning progress · {formatToday(user.language)}</p><h1>Your progress</h1><p className="page-subtitle">See how far you have come through the curriculum.</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{streak} {streak === 1 ? 'day' : 'days'} <small>learning streak</small></strong></div></section>
    <section className="stats-grid">{stats.map(([label, value, detail, Icon, tone]) => <div className="stat-card card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><b>{value}</b><small>{detail}</small></div>)}</section>
    <section className="teacher-grid"><div className="card table-card"><div className="section-title-row"><div><label>Stage breakdown</label><h2>Progress by stage</h2></div></div>{plan.stages.length === 0 ? <div className="empty-state">Kurikulum untuk grade ini sedang disiapkan.</div> : <div className="stage-line-list">{plan.stages.map((stage) => { const stageLessons = stage.lessons || []; const stageDone = stageLessons.filter((lesson) => completedSet.has(lesson.key)).length; const stagePercent = stageLessons.length ? Math.round((stageDone / stageLessons.length) * 100) : 0; return <div className="stage-line" key={stage.id}><div className="stage-line-head"><div className="round-icon blue">{stage.locked ? <Lock size={17} /> : <stage.icon size={17} />}</div><div><label>{stage.name} · Grade {plan.grade}</label><h3>{stage.title}</h3></div>{stage.locked ? <span className="state-pill locked">Locked</span> : <span className="stage-line-count">{stageDone} / {stageLessons.length} lessons</span>}</div><div className="progress-track"><i style={{ width: `${stagePercent}%` }} /></div></div> })}</div>}</div><div className="card progress-card"><div className="split"><div><label>Experience</label><h3>Level {level}</h3></div><span className="level-badge">{exp} XP</span></div><div className="progress-track"><i style={{ width: `${expPercent}%` }} /></div><p className="muted-text">{EXP_PER_LEVEL - expInLevel} EXP until the next level</p><div className="milestone-row"><div className="round-icon purple"><Target size={17} /></div><div><span>Today's activity</span><b>{activities?.lessonsToday ?? 0} lessons done · {activities?.checkedInToday ? 'Checked in' : 'No check-in yet'} · {questDone} quests complete</b></div></div><div className="milestone-row"><div className="round-icon purple"><BookOpen size={17} /></div><div><span>Completion</span><b>{percent}% of the full curriculum</b></div></div></div></section>
    <section className="section-block"><div className="section-title-row"><div><label>Lesson checklist</label><h2>All lessons</h2></div><Link className="text-link" to="/student/learn">Go to learning <ArrowRight size={14} /></Link></div>{total === 0 ? <div className="empty-state">Tidak ada lesson untuk grade ini.</div> : <div className="lesson-grid">{all.map((lesson) => { const isDone = completedSet.has(lesson.key); return <Link className={`lesson-choice ${isDone ? 'completed' : ''}`} key={lesson.key} to={`/student/learn/${lesson.key}`}><span className="lesson-index">{lesson.stageName} · {lesson.label}</span><b>{lesson.title}</b><small>{lesson.description}</small><span className="lesson-go">{isDone ? <><Check size={14} /> Done</> : <>Start <ArrowRight size={14} /></>}</span></Link> })}</div>}</section>
  </div>
}