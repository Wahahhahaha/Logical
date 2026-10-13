import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, ChevronRight, Plus, Target, Users, Zap } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { apiFetch } from '../../lib/api.js'
import { formatToday, greetingFor } from '../../lib/greeting.js'
import { deriveTeacherStats, formatLastActive, studentProgress } from '../../lib/teacherAnalytics.js'

const tones = ['amber', 'blue', 'purple', 'green']
const initialsOf = (name) => name.split(' ').filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase()

function TeacherStudent({ name, topic, score, status, initials, tone }) { return <div className="teacher-student"><div className={`student-avatar ${tone}`}>{initials}</div><div><b>{name}</b><span>Weak topic · {topic}</span></div><div className="student-score"><b>{score}</b><span>{status}</span></div><ChevronRight size={16} className="muted" /></div> }

export default function TeacherDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  useEffect(() => { let active = true; apiFetch('/api/teacher/analytics').then((result) => { if (active) setData(result) }).catch(() => {}); return () => { active = false } }, [])
  const students = data?.students || []
  const { total, activeToday, averageExp, averageLevel, attention } = deriveTeacherStats(students)
  const attentionList = [...attention].sort((a, b) => (a.lastActiveAt ? new Date(a.lastActiveAt).getTime() : 0) - (b.lastActiveAt ? new Date(b.lastActiveAt).getTime() : 0)).slice(0, 4)
  const stats = [['Total students', String(total), `${data?.classes?.length || 0} ${(data?.classes?.length || 0) === 1 ? 'class' : 'classes'}`, Users, 'blue'], ['Active today', String(activeToday), total ? `${Math.round((activeToday / total) * 100)}% of your students` : 'No students yet', Zap, 'green'], ['Average level', averageLevel.toFixed(1), `${averageExp} avg XP`, BarChart3, 'purple'], ['Need attention', String(attention.length), 'No activity in 7 days', Target, 'amber']]
  const chart = data?.activityByDay || []
  const maxCount = Math.max(1, ...chart.map((day) => day.count))
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">Teacher workspace · {formatToday(user.language)}</p><h1>{greetingFor()}, {user.fullName} <span>✦</span></h1><p className="page-subtitle">Here is how your students are progressing this week.</p></div><Link className="primary-button" to="/teacher/students"><Plus size={16} /> Create student</Link></section><section className="stats-grid">{stats.map(([label, value, detail, Icon, tone]) => <div className="stat-card card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><b>{value}</b><small>{detail}</small></div>)}</section><section className="teacher-grid"><div className="card table-card"><div className="section-title-row"><div><label>Needs attention</label><h2>Students to check in on</h2></div><Link className="text-link" to="/teacher/progress">View all <ArrowRight size={14} /></Link></div><div className="student-list">{data === null ? <p className="muted-text">Loading students...</p> : attentionList.length === 0 ? <div className="empty-state">Everyone has been active this week. Nice work!</div> : attentionList.map((student, index) => { const progress = studentProgress(student); return <TeacherStudent key={student.id} name={student.fullName} topic={progress.next ? progress.next.title : 'All lessons done'} score={`${progress.percent}% mastery`} status={formatLastActive(student.lastActiveAt)} initials={initialsOf(student.fullName)} tone={tones[index % tones.length]} /> })}</div></div><div className="card chart-card"><div className="section-title-row"><div><label>Class overview</label><h2>Learning activity</h2></div><span className="chart-period">Last 7 days</span></div><div className="fake-chart"><div>{chart.map((day) => <span key={day.date} style={{ height: `${Math.max(6, (day.count / maxCount) * 100)}%` }}><small>{new Date(`${day.date}T00:00:00Z`).toLocaleDateString('en-US', { weekday: 'short', timeZone: 'UTC' }).slice(0, 1)}</small></span>)}</div></div></div></section></div>
}
