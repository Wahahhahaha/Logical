import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Flame, Lock, Minus, Plus } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { apiFetch } from '../../lib/api.js'
import { planFor } from '../../lib/curriculum.js'

export default function StudentLearningPage() {
  const { user } = useAuth()
  const { t } = useI18n()
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
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">{t('learn.learningPath')}</p><h1>{plan.title}</h1><p className="page-subtitle">{t('learn.gradeSub', { grade: plan.grade, subtitle: plan.subtitle })}</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{streak} {streak === 1 ? t('common.day') : t('common.days')} <small>{t('common.streak')}</small></strong></div></section>{plan.stages.length === 0 ? <div className="empty-state">{t('learn.empty')}</div> : <div className="stage-list">{plan.stages.map(stage => { const expanded = Boolean(openStages[stage.id]); return <div className={`stage-card card ${stage.locked ? 'locked' : ''} ${expanded ? 'expanded' : ''}`} key={stage.id}><div className="stage-head" role={stage.locked ? undefined : 'button'} tabIndex={stage.locked ? undefined : 0} aria-expanded={stage.locked ? undefined : expanded} onClick={stage.locked ? undefined : () => toggleStage(stage.id)} onKeyDown={stage.locked ? undefined : event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleStage(stage.id) } }}><div className="round-icon blue">{stage.locked ? <Lock size={18} /> : (stage.icon ? React.createElement(stage.icon, { size: 18 }) : null)}</div><div><label>{stage.name}</label><h3>{stage.title}</h3></div>{stage.locked ? <span className="state-pill locked">{t('common.locked')}</span> : <button className="stage-toggle" type="button" aria-label={expanded ? t('learn.hideLessons', { stage: stage.name }) : t('learn.showLessons', { stage: stage.name })} onClick={event => { event.stopPropagation(); toggleStage(stage.id) }}>{expanded ? <Minus size={16} /> : <Plus size={16} />}</button>}</div>{stage.locked ? <div className="lesson-grid"><p className="muted-text">{t('learn.lockedMsg', { n: stage.id - 1 })}</p></div> : expanded ? <div className="lesson-grid">{(stage.lessons || []).map(lesson => { const isDone = completed.includes(lesson.key); return <Link className={`lesson-choice ${isDone ? 'completed' : ''}`} key={lesson.key} to={`/student/learn/${lesson.key}`}><span className="lesson-index">{stage.name} · {lesson.label}</span><b>{lesson.title}</b><small>{lesson.description}</small><span className="lesson-go">{isDone ? <><Check size={14} /> {t('common.done')}</> : <>{t('common.start')} <ArrowRight size={14} /></>}</span></Link> })}</div> : null}</div>})}</div>}</div>
}
