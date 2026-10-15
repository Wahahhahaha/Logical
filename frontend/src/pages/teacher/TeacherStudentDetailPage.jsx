import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, BarChart3, BookOpen, Flame, TrendingDown, TrendingUp, Zap } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import { useI18n } from '../../i18n.jsx'
import { useToast } from '../../toast.jsx'
import Avatar from '../../components/Avatar.jsx'
import { allLessons, planFor } from '../../lib/curriculum.js'
import { formatLastActive } from '../../lib/teacherAnalytics.js'

export default function TeacherStudentDetailPage() {
  const { t, language } = useI18n()
  const toast = useToast()
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    apiFetch(`/api/teacher/students/${id}/insights`).then((result) => { if (active) { setData(result); setError(null) } }).catch((requestError) => { if (active) { setData(null); setError(requestError) } })
    return () => { active = false }
  }, [id])

  useEffect(() => { if (error) toast.error(error) }, [error, toast])

  const student = data?.student
  const grade = student?.profile?.grade
  const analysis = useMemo(() => {
    if (!data || !student) return null
    const plan = planFor(grade, language)
    const lessons = allLessons(grade, language)
    const completedSet = new Set(data.completedLessons || [])
    const lessonIndex = new Map(lessons.map((lesson) => [lesson.key, lesson]))
    const attempts = (data.attempts || []).map((attempt) => ({ ...attempt, lesson: lessonIndex.get(attempt.lessonKey) || null }))
    const total = lessons.length
    const done = lessons.filter((lesson) => completedSet.has(lesson.key)).length
    const percent = total ? Math.round((done / total) * 100) : 0
    const nextLesson = lessons.find((lesson) => !completedSet.has(lesson.key)) || null
    const stages = plan.stages.filter((stage) => !stage.locked).map((stage) => {
      const stageLessons = stage.lessons || []
      const stageTotal = stageLessons.length
      const stageDone = stageLessons.filter((lesson) => completedSet.has(lesson.key)).length
      const stageAttempts = attempts.filter((attempt) => attempt.stageId === stage.id || lessonIndex.get(attempt.lessonKey)?.stageId === stage.id)
      const avgScore = stageAttempts.length ? Math.round(stageAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / stageAttempts.length) : null
      const completePercent = stageTotal ? Math.round((stageDone / stageTotal) * 100) : 0
      const mastery = avgScore === null ? completePercent : Math.round((completePercent * 0.5) + (avgScore * 0.5))
      return { id: stage.id, name: stage.name, title: stage.title, total: stageTotal, done: stageDone, percent: completePercent, attempts: stageAttempts.length, avgScore, mastery }
    })
    const ranked = [...stages].sort((a, b) => (b.mastery - a.mastery) || (b.percent - a.percent))
    const strongTopics = ranked.filter((stage) => stage.mastery > 0).slice(0, 3)
    const strongIds = new Set(strongTopics.map((stage) => stage.id))
    const weakTopics = [...stages].sort((a, b) => (a.mastery - b.mastery) || (a.percent - b.percent)).filter((stage) => !strongIds.has(stage.id)).slice(0, 3)
    const exp = student.profile?.currentExp || 0
    const avgScore = attempts.length ? Math.round(attempts.reduce((sum, attempt) => sum + attempt.score, 0) / attempts.length) : 0
    return { percent, done, total, nextLesson, stages, strongTopics, weakTopics, attempts, avgScore, exp, level: Math.floor(exp / 100) }
  }, [data, grade, language, student])

  if (error && !data) return <div className="page-stack"><Link className="text-link detail-back" to="/teacher/students"><ArrowLeft size={14} /> {t('teacher.backToStudents')}</Link><div className="form-error">{t('teacher.studentNotFound')}</div></div>
  if (!data || !analysis) return <div className="page-stack"><div className="card loading-card">{t('teacher.loadingStudent')}</div></div>

  const activityMax = Math.max(1, ...(data.activityByDay || []).map((day) => day.count))
  const dayLabel = (date) => new Date(`${date}T00:00:00Z`).toLocaleDateString(language, { weekday: 'short' })
  const stats = [
    [t('teacher.progress'), `${analysis.percent}%`, t('teacher.lessonsDone', { a: analysis.done, b: analysis.total }), BookOpen, 'blue'],
    [t('teacher.score'), `${analysis.avgScore}%`, t('teacher.avgScoreHint', { n: analysis.attempts.length }), BarChart3, 'green'],
    [t('teacher.level'), t('dash.level', { n: analysis.level }), t('teacher.xpTotal', { n: analysis.exp }), Zap, 'purple'],
    [t('teacher.streak'), `${data.streak}`, data.checkedInToday ? t('teacher.checkedIn') : t('teacher.notCheckedIn'), Flame, 'amber'],
  ]

  return <div className="page-stack">
    <Link className="text-link detail-back" to="/teacher/students"><ArrowLeft size={14} /> {t('teacher.backToStudents')}</Link>
    <section className="welcome-row">
      <div className="detail-head"><div className="student-avatar blue detail-avatar"><Avatar user={student} /></div><div><p className="eyebrow">{t('teacher.insights')}</p><h1>{student.fullName}</h1><p className="page-subtitle">{t('teacher.gradeShort', { n: grade || '-' })} · {student.profile?.className || t('teacher.noClass')} · {formatLastActive(data.lastActiveAt, t)}</p></div></div>
    </section>
    <section className="stats-grid">{stats.map(([label, value, detail, Icon, tone]) => <div className="stat-card card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><b>{value}</b><small>{detail}</small></div>)}</section>
    <section className="section-block">
      <div className="section-title-row"><div><label>{t('teacher.topicMastery')}</label><h2>{t('teacher.progressByTopic')}</h2></div><span className="muted-text">{analysis.nextLesson ? t('teacher.nextLesson', { title: analysis.nextLesson.title }) : t('teacher.allLessonsDone')}</span></div>
      {analysis.stages.length === 0 ? <div className="empty-state">{t('teacher.noMastery')}</div> : <div className="mastery-list card">{analysis.stages.map((stage) => <div className="mastery-row" key={stage.id}><div className="mastery-head"><div><label>{stage.name}</label><h3>{stage.title}</h3></div><span className={`mastery-badge ${stage.mastery >= 70 ? 'good' : stage.mastery >= 40 ? 'mid' : stage.mastery > 0 ? 'low' : 'empty'}`}>{t('teacher.mastery', { n: stage.mastery })}</span></div><div className="progress-track"><i style={{ width: `${stage.percent}%` }} /></div><small>{t('teacher.lessonsDone', { a: stage.done, b: stage.total })} · {t('teacher.attemptsN', { n: stage.attempts })}{stage.avgScore !== null ? ` · ${t('teacher.score')} ${stage.avgScore}%` : ''}</small></div>)}</div>}
    </section>
    <section className="topic-grid">
      <div className="topic-card card"><div className="topic-head strong"><TrendingUp size={18} /><h3>{t('teacher.strongTopics')}</h3></div>{analysis.strongTopics.length === 0 ? <p className="muted-text">{t('teacher.noAttempts')}</p> : <ul className="topic-list">{analysis.strongTopics.map((stage) => <li key={stage.id}><span>{stage.title}</span><b>{t('teacher.mastery', { n: stage.mastery })}</b></li>)}</ul>}</div>
      <div className="topic-card card"><div className="topic-head weak"><TrendingDown size={18} /><h3>{t('teacher.weakTopics')}</h3></div>{analysis.weakTopics.length === 0 ? <p className="muted-text">{t('teacher.allStrong')}</p> : <ul className="topic-list">{analysis.weakTopics.map((stage) => <li key={stage.id}><span>{stage.title}</span><b>{stage.done === 0 && stage.attempts === 0 ? t('teacher.notStarted') : t('teacher.mastery', { n: stage.mastery })}</b></li>)}</ul>}</div>
    </section>
    <section className="card activity-card">
      <div className="section-title-row"><div><label>{t('teacher.learningActivity')}</label><h2>{t('teacher.learningActivity7d')}</h2></div><span className="activity-today">{t('teacher.lessonsToday')}<b>{data.lessonsToday}</b></span></div>
      <div className="activity-bars">{(data.activityByDay || []).map((day) => { const isZero = day.count === 0; const height = isZero ? '6px' : `${Math.max(12, Math.round((day.count / activityMax) * 100))}%`; return <div className="activity-col" key={day.date}><span className="activity-count">{day.count}</span><div className="activity-track"><div className={`activity-fill${isZero ? ' empty' : ''}`} style={{ height }} /></div><span className="activity-day">{dayLabel(day.date)}</span></div> })}</div>
    </section>
    <section className="card table-card">
      <div className="section-title-row"><div><label>{t('teacher.evaluationResults')}</label><h2>{t('teacher.recentEvaluations')}</h2></div></div>
      {analysis.attempts.length === 0 ? <div className="empty-state"><p>{t('teacher.noAttempts')}</p><small className="muted-text">{t('teacher.evalHint')}</small></div> : <table className="student-table"><thead><tr><th>{t('teacher.evalLesson')}</th><th>{t('teacher.evalTopic')}</th><th>{t('teacher.evalScore')}</th><th>{t('teacher.evalDate')}</th></tr></thead><tbody>{analysis.attempts.slice(0, 20).map((attempt, index) => <tr key={`${attempt.lessonKey}-${attempt.createdAt}-${index}`}><td><b>{attempt.lesson?.title || attempt.lessonKey}</b></td><td>{attempt.lesson?.stageName || `Stage ${attempt.stageId || '-'}`}</td><td><span className={`mastery-badge ${attempt.score >= 70 ? 'good' : attempt.score >= 40 ? 'mid' : 'low'}`}>{attempt.score}%</span> <small className="muted-text">{attempt.correct}/{attempt.total}</small></td><td>{attempt.createdAt ? new Date(attempt.createdAt).toLocaleDateString(language) : '-'}</td></tr>)}</tbody></table>}
    </section>
  </div>
}
