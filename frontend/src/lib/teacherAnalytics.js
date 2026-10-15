import { allLessons } from './curriculum.js'

export function studentProgress(student, language) {
  const lessons = allLessons(student.grade, language)
  const total = lessons.length
  const completed = new Set(student.completedLessons || [])
  const done = lessons.filter((lesson) => completed.has(lesson.key)).length
  const next = lessons.find((lesson) => !completed.has(lesson.key)) || null
  return { total, done, percent: total ? Math.round((done / total) * 100) : 0, next }
}

export function deriveTeacherStats(students) {
  const total = students.length
  const activeToday = students.filter((student) => student.activeToday).length
  const totalExp = students.reduce((sum, student) => sum + student.exp, 0)
  const totalLevel = students.reduce((sum, student) => sum + student.level, 0)
  const totalPercent = students.reduce((sum, student) => sum + studentProgress(student).percent, 0)
  const sevenDaysAgo = Date.now() - 604800000
  const attention = students.filter((student) => !student.lastActiveAt || new Date(student.lastActiveAt).getTime() < sevenDaysAgo)
  return { total, activeToday, averageExp: total ? Math.round(totalExp / total) : 0, averageLevel: total ? totalLevel / total : 0, averageCompletion: total ? Math.round(totalPercent / total) : 0, attention }
}

export function formatLastActive(iso, t) {
  if (t) {
    if (!iso) return t('time.noActivity')
    const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
    if (days <= 0) return t('time.activeToday')
    if (days === 1) return t('time.yesterday')
    return t('time.daysAgo', { n: days })
  }
  if (!iso) return 'No activity yet'
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86400000)
  if (days <= 0) return 'Active today'
  if (days === 1) return 'Yesterday'
  return `${days} days ago`
}
