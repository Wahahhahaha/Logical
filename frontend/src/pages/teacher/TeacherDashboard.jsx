import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, ChevronRight, Plus, Target, Users, Zap } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { apiFetch } from '../../lib/api.js'
import { greetingKey } from '../../lib/greeting.js'
import { deriveTeacherStats, formatLastActive, studentProgress } from '../../lib/teacherAnalytics.js'
import { ListSkeleton, StatsSkeleton } from '../../components/Skeleton.jsx'

const tones = ['amber', 'blue', 'purple', 'green']
const initialsOf = (name) => name.split(' ').filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase()

function TeacherStudent({ name, topic, score, status, initials, tone }) { return <div className="teacher-student"><div className={`student-avatar ${tone}`}>{initials}</div><div><b>{name}</b><span>{topic}</span></div><div className="student-score"><b>{score}</b><span>{status}</span></div><ChevronRight size={16} className="muted" /></div> }

export default function TeacherDashboard() {
  const { user } = useAuth()
  const { t, language } = useI18n()
  const [data, setData] = useState(null)
  useEffect(() => { let active = true; apiFetch('/api/teacher/analytics').then((result) => { if (active) setData(result) }).catch(() => {}); return () => { active = false } }, [])
  const students = data?.students || []
  const { total, activeToday, averageExp, averageLevel, attention } = deriveTeacherStats(students)
  const attentionList = [...attention].sort((a, b) => (a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0) - (b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0)).slice(0, 4)
  const classCount = data?.classes?.length || 0
  const stats = [[t('teacher.totalStudents'), String(total), t('teacher.nClasses', { n: classCount }), Users, 'blue'], [t('teacher.activeToday'), String(activeToday), total ? t('teacher.pctStudents', { n: Math.round((activeToday / total) * 100) }) : t('teacher.noStudentsYet'), Zap, 'green'], [t('teacher.avgLevel'), averageLevel.toFixed(1), t('teacher.avgXp', { n: averageExp }), BarChart3, 'purple'], [t('teacher.needAttention'), String(attention.length), t('teacher.noActivity7'), Target, 'amber']]
  const chart = data?.activityByDay || []
  const maxCount = Math.max(1, ...chart.map((day) => day.count))
  if (!data) return <div className="page-stack"><section className="welcome-row"><div><div className="skeleton skeleton-text skeleton-short" /><div className="skeleton skeleton-heading" /><div className="skeleton skeleton-text skeleton-medium" /></div></section><StatsSkeleton /><ListSkeleton count={4} className="card" /></div>
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">{t('teacher.workspace')}</p><h1>{t(greetingKey())}, {user.fullName}</h1><p className="page-subtitle">{t('teacher.hereIsHow')}</p></div><Link className="primary-button" to="/teacher/students"><Plus size={16} /> {t('teacher.createStudent')}</Link></section><section className="stats-grid">{stats.map(([label, value, detail, Icon, tone]) => <div className="stat-card card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><b>{value}</b><small>{detail}</small></div>)}</section><section className="teacher-grid"><div className="card table-card"><div className="section-title-row"><div><label>{t('teacher.needsAttention')}</label><h2>{t('teacher.studentsCheckIn')}</h2></div><Link className="text-link" to="/teacher/progress">{t('teacher.viewAll')} <ArrowRight size={14} /></Link></div><div className="student-list">{data === null ? <p className="muted-text">{t('teacher.loadingStudents')}</p> : attentionList.length === 0 ? <div className="empty-state">{t('teacher.everyoneActive')}</div> : attentionList.map((student, index) => { const progress = studentProgress(student, language); return <TeacherStudent key={student.id} name={student.fullName} topic={t('teacher.weakTopic', { topic: progress.next ? progress.next.title : t('teacher.allLessonsDone') })} score={t('teacher.mastery', { n: progress.percent })} status={formatLastActive(student.lastActiveAt, t)} initials={initialsOf(student.fullName)} tone={tones[index % tones.length]} /> })}</div></div><div className="card chart-card"><div className="section-title-row"><div><label>{t('teacher.classOverview')}</label><h2>{t('teacher.learningActivity')}</h2></div><span className="chart-period">{t('teacher.last7Days')}</span></div><div className="fake-chart"><div>{chart.map((day) => <span key={day.date} style={{ height: `${Math.max(6, (day.count / maxCount) * 100)}%` }}><small>{new Date(`${day.date}T00:00:00Z`).toLocaleDateString(language, { weekday: 'short', timeZone: 'UTC' }).slice(0, 1)}</small></span>)}</div></div></div></section></div>
}
