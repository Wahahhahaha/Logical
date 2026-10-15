import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, BookOpen, Check, Flame, Lock, Target, Zap } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { apiFetch } from '../../lib/api.js'
import { useToast } from '../../toast.jsx'
import { formatToday } from '../../lib/greeting.js'
import { planFor } from '../../lib/curriculum.js'
import { dailyQuests } from '../../lib/quests.js'

const EXP_PER_LEVEL = 100

export default function StudentProgressPage() {
  const { user } = useAuth()
  const { t, language } = useI18n()
  const toast = useToast()
  const [activities, setActivities] = useState(null)
  useEffect(() => { let active = true; apiFetch('/api/student/activities').then((result) => { if (active) setActivities(result) }).catch((error) => { if (active) toast.error(error) }); return () => { active = false } }, [toast])
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
  const dayUnit = streak === 1 ? t('common.day') : t('common.days')
  const lessonsToday = activities?.lessonsToday ?? 0
  const stats = [[t('prog.lessonsCompleted'), `${done}/${total}`, t('prog.ofCurriculum', { n: percent }), BookOpen, 'blue'], [t('prog.currentLevel'), t('dash.level', { n: level }), t('prog.xpTotal', { n: exp }), BarChart3, 'purple'], [t('dash.streakStat'), `${streak} ${dayUnit}`, t('prog.keepDaily'), Flame, 'orange'], [t('prog.today'), t('prog.todayLessons', { n: lessonsToday }), t('prog.questsDone', { a: questDone, b: quests.length }), Zap, 'green']]
  const todayDetail = `${t('prog.todayLessons', { n: lessonsToday })} · ${activities?.checkedInToday ? t('prog.checkedIn') : t('prog.noCheckin')} · ${t('prog.questsComplete', { n: questDone })}`
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">{t('prog.learningProgress')} · {formatToday(language)}</p><h1>{t('prog.yourProgress')}</h1><p className="page-subtitle">{t('prog.seeHowFar')}</p></div><div className="streak-pill"><Flame size={17} fill="currentColor" /><strong>{streak} {dayUnit} <small>{t('common.streak')}</small></strong></div></section>
    <section className="stats-grid">{stats.map(([label, value, detail, Icon, tone]) => <div className="stat-card card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><b>{value}</b><small>{detail}</small></div>)}</section>
    <section className="teacher-grid"><div className="card table-card"><div className="section-title-row"><div><label>{t('prog.stageBreakdown')}</label><h2>{t('prog.byStage')}</h2></div></div>{plan.stages.length === 0 ? <div className="empty-state">{t('prog.prep')}</div> : <div className="stage-line-list">{plan.stages.map((stage) => { const stageLessons = stage.lessons || []; const stageDone = stageLessons.filter((lesson) => completedSet.has(lesson.key)).length; const stagePercent = stageLessons.length ? Math.round((stageDone / stageLessons.length) * 100) : 0; return <div className="stage-line" key={stage.id}><div className="stage-line-head"><div className="round-icon blue">{stage.locked ? <Lock size={17} /> : (stage.icon ? React.createElement(stage.icon, { size: 17 }) : null)}</div><div><label>{stage.name} · Grade {plan.grade}</label><h3>{stage.title}</h3></div>{stage.locked ? <span className="state-pill locked">{t('common.locked')}</span> : <span className="stage-line-count">{t('prog.lessonsCount', { a: stageDone, b: stageLessons.length })}</span>}</div><div className="progress-track"><i style={{ width: `${stagePercent}%` }} /></div></div> })}</div>}</div><div className="card progress-card"><div className="split"><div><label>{t('prog.experience')}</label><h3>{t('dash.level', { n: level })}</h3></div><span className="level-badge">{exp} XP</span></div><div className="progress-track"><i style={{ width: `${expPercent}%` }} /></div><p className="muted-text">{t('dash.xpUntil', { n: EXP_PER_LEVEL - expInLevel })}</p><div className="milestone-row"><div className="round-icon purple"><Target size={17} /></div><div><span>{t('prog.todayActivity')}</span><b>{todayDetail}</b></div></div><div className="milestone-row"><div className="round-icon purple"><BookOpen size={17} /></div><div><span>{t('prog.completion')}</span><b>{t('prog.fullCurriculum', { n: percent })}</b></div></div></div></section>
    <section className="section-block"><div className="section-title-row"><div><label>{t('prog.lessonChecklist')}</label><h2>{t('prog.allLessons')}</h2></div><Link className="text-link" to="/student/learn">{t('prog.goToLearning')} <ArrowRight size={14} /></Link></div>{total === 0 ? <div className="empty-state">{t('prog.noLessons')}</div> : <div className="lesson-grid">{all.map((lesson) => { const isDone = completedSet.has(lesson.key); return <Link className={`lesson-choice ${isDone ? 'completed' : ''}`} key={lesson.key} to={`/student/learn/${lesson.key}`}><span className="lesson-index">{lesson.stageName} · {lesson.label}</span><b>{lesson.title}</b><small>{lesson.description}</small><span className="lesson-go">{isDone ? <><Check size={14} /> {t('common.done')}</> : <>{t('common.start')} <ArrowRight size={14} /></>}</span></Link> })}</div>}</section>
  </div>
}
