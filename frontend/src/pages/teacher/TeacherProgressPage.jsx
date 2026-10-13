import { useEffect, useState } from 'react'
import { BarChart3, BookOpen, Users, Zap } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import { useToast } from '../../toast.jsx'
import { deriveTeacherStats, formatLastActive, studentProgress } from '../../lib/teacherAnalytics.js'

const initialsOf = (name) => name.split(' ').filter(Boolean).map((word) => word[0]).join('').slice(0, 2).toUpperCase()

export default function TeacherProgressPage() {
  const toast = useToast()
  const [data, setData] = useState(null)
  useEffect(() => { let active = true; apiFetch('/api/teacher/analytics').then((result) => { if (active) setData(result) }).catch((error) => { if (active) toast.error(error.message) }); return () => { active = false } }, [toast])
  const students = data?.students || []
  const classes = data?.classes || []
  const { activeToday, averageCompletion } = deriveTeacherStats(students)
  const totalLessons = students.reduce((sum, student) => sum + studentProgress(student).done, 0)
  const classCompletion = (className) => { const members = students.filter((student) => (student.className || 'Tanpa kelas') === className); return members.length ? Math.round(members.reduce((sum, student) => sum + studentProgress(student).percent, 0) / members.length) : 0 }
  const stats = [['Classes', String(classes.length), `${students.length} students`, Users, 'blue'], ['Lessons completed', String(totalLessons), 'Across all students', BookOpen, 'green'], ['Average completion', `${averageCompletion}%`, 'Of the active curriculum', BarChart3, 'purple'], ['Active today', String(activeToday), `${students.length} students total`, Zap, 'amber']]
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">Teacher workspace</p><h1>Learning progress</h1><p className="page-subtitle">Track how each student and class is moving through the curriculum.</p></div></section>
    <section className="stats-grid">{stats.map(([label, value, detail, Icon, tone]) => <div className="stat-card card" key={label}><div className={`stat-icon ${tone}`}><Icon size={18} /></div><span>{label}</span><b>{value}</b><small>{detail}</small></div>)}</section>
    <section className="section-block"><div className="section-title-row"><div><label>Class progress</label><h2>Completion by class</h2></div></div><div className="class-grid">{data === null ? <p className="muted-text">Loading classes...</p> : classes.length === 0 ? <div className="empty-state">No classes yet. Add students to start tracking progress.</div> : classes.map((cls) => { const percent = classCompletion(cls.name); return <div className="class-card card" key={cls.name}><div className="class-head"><div className="round-icon blue"><Users size={17} /></div><div><h3>{cls.name}</h3><span>Grade {cls.grade || '-'} · {cls.studentCount} students</span></div></div><div className="class-stats"><div><b>{cls.lessonsCompleted}</b><span>Lessons</span></div><div><b>{cls.averageExp}</b><span>Avg XP</span></div><div><b>{cls.activeToday}</b><span>Active</span></div></div><div className="progress-track"><i style={{ width: `${percent}%` }} /></div><p className="muted-text">{percent}% average completion</p></div> })}</div></section>
    <section className="card table-card"><div className="section-title-row"><div><label>Student progress</label><h2>{students.length} students</h2></div></div>{data === null ? <p className="muted-text">Loading students...</p> : students.length === 0 ? <div className="empty-state">No students yet.</div> : <table className="student-table"><thead><tr><th>Student</th><th>Class</th><th>Lesson progress</th><th>Level</th><th>Streak</th><th>Last active</th><th>Status</th></tr></thead><tbody>{students.map((student) => { const progress = studentProgress(student); return <tr key={student.id}><td><div className="table-student"><div className="student-avatar blue">{initialsOf(student.fullName)}</div><b>{student.fullName}</b></div></td><td>{student.className || 'No class'} · Grade {student.grade || '-'}</td><td><div className="progress-cell"><div className="progress-track"><i style={{ width: `${progress.percent}%` }} /></div><small>{progress.done} / {progress.total}</small></div></td><td>Level {student.level}</td><td>{student.streak} {student.streak === 1 ? 'day' : 'days'}</td><td>{formatLastActive(student.lastActiveAt)}</td><td>{student.activeToday ? <span className="state-pill open">Active</span> : <span className="state-pill locked">Idle</span>}</td></tr> })}</tbody></table>}</section>
  </div>
}
