import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Flame, Lock, Minus, Plus } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { apiFetch } from '../../lib/api.js'
import { planFor } from '../../lib/curriculum.js'

export default function StudentLearningPage() {
  const { user } = useAuth()
  const [openStages, setOpenStages] = useState({})
  const streak = user.profile?.currentStreak || 0
  const basePlan = planFor(user.profile?.grade)
  const [completed, setCompleted] = useState([])
  const plan = useMemo(() => {
    const stages = basePlan.stages.map((stage, idx) => {
      if (idx === 0) return stage
      const prevStage = basePlan.stages[idx - 1]
      const prevLessons = prevStage.lessons || []
      const allDone = prevLessons.length > 0 && prevLessons.every(lesson => completed.includes(lesson.key))
      if (allDone) return { ...stage, locked: false }
      return { ...stage, locked: stage.locked !== false ? true : false }
    })
    return { ...basePlan, stages }
  }, [basePlan, completed])
  useEffect(() => { let active = true; apiFetch('/api/student/activities').then(result => { if (active) setCompleted(result.completedLessons || []) }).catch(() => {}); return () => { active = false } }, [])
  const toggleStage = id => setOpenStages(previous => ({ ...previous, [id]: !previous[id] }))
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">Learning path</p><h1>{plan.title}</h1><p className="page-subtitle">Grade {plan.grade} · {plan.subtitle}</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{streak} {streak === 1 ? 'day' : 'days'} <small>learning streak</small></strong></div></section>{plan.stages.length === 0 ? <div className="empty-state">Konten untuk grade ini segera hadir. Mulai dari <b>Grade 1</b> untuk belajar Matematika Dasar.</div> : <div className="stage-list">{plan.stages.map(stage => { const expanded = Boolean(openStages[stage.id]); return <div className={`stage-card card ${stage.locked ? 'locked' : ''} ${expanded ? 'expanded' : ''}`} key={stage.id}><div className="stage-head" role={stage.locked ? undefined : 'button'} tabIndex={stage.locked ? undefined : 0} aria-expanded={stage.locked ? undefined : expanded} onClick={stage.locked ? undefined : () => toggleStage(stage.id)} onKeyDown={stage.locked ? undefined : event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleStage(stage.id) } }}><div className="round-icon blue">{stage.locked ? <Lock size={18} /> : (stage.icon ? React.createElement(stage.icon, { size: 18 }) : null)}</div><div><label>{stage.name}</label><h3>{stage.title}</h3></div>{stage.locked ? <span className="state-pill locked">Locked</span> : <button className="stage-toggle" type="button" aria-label={expanded ? `Hide ${stage.name} lessons` : `Show all ${stage.name} lessons`} onClick={event => { event.stopPropagation(); toggleStage(stage.id) }}>{expanded ? <Minus size={16} /> : <Plus size={16} />}</button>}</div>{stage.locked ? <div className="lesson-grid"><p className="muted-text">Stage ini akan segera dibuka. Selesaikan Stage {stage.id - 1} terlebih dahulu.</p></div> : expanded ? <div className="lesson-grid">{(stage.lessons || []).map(lesson => { const isDone = completed.includes(lesson.key); return <Link className={`lesson-choice ${isDone ? 'completed' : ''}`} key={lesson.key} to={`/student/learn/${lesson.key}`}><span className="lesson-index">{stage.name} · {lesson.label}</span><b>{lesson.title}</b><small>{lesson.description}</small><span className="lesson-go">{isDone ? <><Check size={14} /> Done</> : <>Start <ArrowRight size={14} /></>}</span></Link> })}</div> : null}</div>})}</div>}</div>
}
