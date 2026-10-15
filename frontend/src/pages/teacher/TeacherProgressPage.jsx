import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, BookOpen, Eye, Users, Zap } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import { useI18n } from '../../i18n.jsx'
import { useToast } from '../../toast.jsx'
import { deriveTeacherStats, formatLastActive, studentProgress } from '../../lib/teacherAnalytics.js'
import { ListSkeleton, StatsSkeleton } from '../../components/Skeleton.jsx'

const PAGE_SIZE = 5
const initialsOf = (name) => name.split(' ').filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase()

export default function TeacherProgressPage() {
  const { t } = useI18n()
  const toast = useToast()
  const [data, setData] = useState(null)
  const [page, setPage] = useState(1)
  useEffect(() => { let active = true; apiFetch('/api/teacher/analytics').then((result) => { if (active) setData(result) }).catch((error) => { if (active) toast.error(error) }); return () => { active = false } }, [toast])
  const students = data?.students || []
  const classes = data?.classes || []
  const pageCount = Math.max(1, Math.ceil(students.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pagedStudents = students.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const { activeToday, averageCompletion } = deriveTeacherStats(students)
  const totalLessons = students.reduce((sum, student) => sum + studentProgress(student).done, 0)
  const classCompletion = (className) => { const members = students.filter((student) => (student.className || t('teacher.noClass')) === className); return members.length ? Math.round(members.reduce((sum, student) => sum + studentProgress(student).percent, 0) / members.length) : 0 }
  const stats = [[t('teacher.classes'), String(classes.length), t('teacher.nStudents', { n: students.length }), Users, 'blue'], [t('teacher.lessonsCompleted'), String(totalLessons), t('teacher.acrossAll'), BookOpen, 'green'], [t('teacher.avgCompletion'), `${averageCompletion}%`, t('teacher.ofActiveCurriculum'), BarChart3, 'purple'], [t('teacher.activeToday'), String(activeToday), t('teacher.studentsTotal', { n: students.length }), Zap, 'amber']]
  if (!data) return <div className="page-stack"><StatsSkeleton /><ListSkeleton count={5} className="card" /></div>
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">{t('teacher.workspace')}</p><h1>{t('teacher.learningProgress')}</h1><p className="page-subtitle">{t('teacher.trackHow')}</p></div></section>
    <section className="stats-grid">{stats.map(([label, value, detail, Icon, tone]) => <div className="stat-card card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><b>{value}</b><small>{detail}</small></div>)}</section>
    <section className="section-block"><div className="section-title-row"><div><label>{t('teacher.classProgress')}</label><h2>{t('teacher.completionByClass')}</h2></div></div><div className="class-grid">{data === null ? <p className="muted-text">{t('teacher.loadingClasses')}</p> : classes.length === 0 ? <div className="empty-state">{t('teacher.noClasses')}</div> : classes.map((cls) => { const percent = classCompletion(cls.name); return <div className="class-card card" key={cls.name}><div className="class-head"><div className="round-icon blue"><Users size={17} /></div><div><h3>{cls.name}</h3><span>{t('teacher.gradeShort', { n: cls.grade || '-' })} · {t('teacher.nStudents', { n: cls.studentCount })}</span></div></div><div className="class-stats"><div><b>{cls.lessonsCompleted}</b><span>{t('teacher.lessons')}</span></div><div><b>{cls.averageExp}</b><span>{t('teacher.avgXpLabel')}</span></div><div><b>{cls.activeToday}</b><span>{t('teacher.active')}</span></div></div><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><p className="muted-text">{t('teacher.avgCompletionPct', { n: percent })}</p></div> })}</div></section>
    <section className="card table-card"><div className="section-title-row"><div><label>{t('teacher.studentProgress')}</label><h2>{t('teacher.nStudents', { n: students.length })}</h2></div></div>{data === null ? <p className="muted-text">{t('teacher.loadingStudents')}</p> : students.length === 0 ? <div className="empty-state">{t('teacher.noStudents')}</div> : <><table className="student-table"><thead><tr><th>{t('teacher.thStudent')}</th><th>{t('teacher.thClass')}</th><th>{t('teacher.thLessonProgress')}</th><th>{t('teacher.thLevel')}</th><th>{t('teacher.thStreak')}</th><th>{t('teacher.thLastActive')}</th><th>{t('teacher.thStatus')}</th><th className="actions-cell">{t('teacher.thActions')}</th></tr></thead><tbody>{pagedStudents.map((student) => { const progress = studentProgress(student); return <tr key={student.id}><td><div className="table-student"><div className="student-avatar blue">{initialsOf(student.fullName)}</div><b>{student.fullName}</b></div></td><td>{student.className || t('teacher.noClass')} · {t('teacher.gradeShort', { n: student.grade || '-' })}</td><td><div className="progress-cell"><div className="progress-track"><i style={{ width: `${progress.percent}%` }} /></div><small>{progress.done} / {progress.total}</small></div></td><td>{t('dash.level', { n: student.level })}</td><td>{student.streak} {student.streak === 1 ? t('common.day') : t('common.days')}</td><td>{formatLastActive(student.lastActiveAt, t)}</td><td>{student.activeToday ? <span className="state-pill open">{t('teacher.active')}</span> : <span className="state-pill locked">{t('teacher.idle')}</span>}</td><td className="actions-cell"><Link className="icon-button" to={`/teacher/students/${student.id}`} aria-label={t('teacher.viewDetailsAria', { name: student.fullName })} title={t('teacher.viewDetails')}><Eye size={15} /></Link></td></tr> })}</tbody></table><div className="pagination"><button className="secondary-button" disabled={safePage === 1} onClick={() => setPage(value => value - 1)}>{t('teacher.previous')}</button><span>{t('teacher.page', { a: safePage, b: pageCount })}</span><button className="secondary-button" disabled={safePage === pageCount} onClick={() => setPage(value => value + 1)}>{t('common.next')}</button></div></>}</section>
  </div>
}
