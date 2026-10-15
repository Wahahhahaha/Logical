import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronRight, Target } from 'lucide-react'
import { EggIllustration, PetIllustration } from '../../components/illustrations/PetIllustration.jsx'
import InteractiveCat from '../../components/illustrations/InteractiveCat.jsx'
import InteractiveFox from '../../components/illustrations/InteractiveFox.jsx'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { apiFetch } from '../../lib/api.js'
import { formatToday, greetingKey } from '../../lib/greeting.js'
import { allLessons } from '../../lib/curriculum.js'
import { dailyQuests } from '../../lib/quests.js'

const EXP_PER_LEVEL = 100

function Activity({ icon, title, detail, value, tone }) { return <div className="activity"><div className={`activity-icon ${tone}`}>{icon}</div><div><b>{title}</b><span>{detail}</span></div><strong className={tone}>{value}</strong></div> }

export default function StudentDashboard() {
  const { user } = useAuth()
  const { t, language } = useI18n()
  const [activities, setActivities] = useState(null)
  useEffect(() => { let active = true; apiFetch('/api/student/activities').then(result => { if (active) setActivities(result) }).catch(() => {}); return () => { active = false } }, [])
    const exp = user.profile?.currentExp || 0
  const level = Math.floor(exp / EXP_PER_LEVEL)
  const expInLevel = exp % EXP_PER_LEVEL
  const petType = user.profile?.petType || 'egg'
  const petLabel = petType === 'egg' ? t('pet.eggName') : t(`pet.type.${petType}`)
  const petProgress = expInLevel / EXP_PER_LEVEL * 100
  const milestone = level >= 7 ? t('dash.milestone.advanced') : level >= 3 ? t('dash.milestone.intermediate') : t('dash.milestone.basic')
  const lessons = allLessons(user.profile?.grade, language)
  const completedSet = new Set(activities?.completedLessons || [])
  const doneCount = lessons.filter(lesson => completedSet.has(lesson.key)).length
  const nextLesson = lessons.find(lesson => !completedSet.has(lesson.key)) || null
  const learnTarget = nextLesson ? `/student/learn/${nextLesson.key}` : '/student/learn'
  const quests = dailyQuests(new Date())
  const questTitle = quest => language === 'en-US' ? (quest.titleEn || quest.title) : quest.title
  const questDone = activities ? quests.filter(quest => quest.measure(activities) >= quest.target).length : 0
  const nextQuest = activities ? quests.find(quest => quest.measure(activities) < quest.target) : quests[0]
  const questPercent = questDone / quests.length * 100
  const streak = user.profile?.currentStreak || 0
  const dayUnit = streak === 1 ? t('common.day') : t('common.days')
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">{formatToday(language)}</p><h1>{t(greetingKey())}, {user.fullName || t('common.friend')}</h1><p className="page-subtitle">{t('dash.ready')}</p></div></section>
    <section className="student-grid"><div className="hero-card card"><div className="hero-copy"><label>{t('dash.companionLabel')}</label><h2>{t('dash.heroTitle')}</h2><p>{t('dash.heroBody', { pet: petLabel })}</p><Link className="primary-button" to={learnTarget}>{t('dash.continueLearning')} <ArrowRight size={16} /></Link></div><div className="pet-display"><div className="pet-glow" />{petType === 'egg' ? <EggIllustration className="dashboard-pet-art" /> : petType === 'fox' ? <InteractiveFox label={petLabel} className="dashboard-pet-art" /> : petType === 'cat' ? <InteractiveCat label={petLabel} className="dashboard-pet-art" /> : <PetIllustration type={petType} className="dashboard-pet-art" />}</div></div><div className="progress-card card"><div className="split"><div><label>{t('dash.petLevel')}</label><h3>{t('dash.level', { n: level })}</h3></div><span className="level-badge">{exp} XP</span></div><div className="progress-track"><i style={{ width: `${petProgress}%` }} /></div><p className="muted-text">{t('dash.xpUntil', { n: EXP_PER_LEVEL - expInLevel })}</p><div className="milestone-row"><div className="round-icon purple"><Target size={17} /></div><div><span>{t('dash.currentMilestone')}</span><b>{milestone}</b></div></div></div></section>
    <section className="section-block"><div className="section-title-row"><div><label>{t('dash.yourPlan')}</label><h2>{t('dash.keepMomentum')}</h2></div><Link className="text-link" to="/student/progress">{t('dash.viewProgress')} <ArrowRight size={14} /></Link></div><div className="learning-grid"><Link className="lesson-card card" to={learnTarget}><div className="round-icon blue"><BookOpen size={19} /></div><div className="lesson-copy"><label>{nextLesson ? t('dash.continueLearning') : t('dash.learningPath')}</label><h3>{nextLesson ? nextLesson.title : t('dash.allLessonsDone')}</h3><p>{nextLesson ? nextLesson.description : t('dash.allLessonsDoneDesc')}</p><small>{nextLesson ? `${nextLesson.stageName} · ${nextLesson.label}` : t('dash.lessonDoneCount', { done: doneCount, total: lessons.length })}</small></div><ChevronRight className="muted" size={18} /></Link><div className="quest-card card"><div className="quest-head"><div className="round-icon purple"><Target size={17} /></div><div><label>{t('dash.todaysQuests')}</label><h3>{nextQuest ? questTitle(nextQuest) : t('dash.allQuestsDone')}</h3></div><b>{questDone}/{quests.length}</b></div><div className="mini-progress"><i style={{ width: `${questPercent}%` }} /></div><div className="quest-foot"><span>{nextQuest ? t('dash.xpReward', { n: nextQuest.reward }) : t('dash.greatJob')}</span><Link to="/student/quests">{t('dash.seeQuests')} <ArrowRight size={13} /></Link></div></div></div></section>
    <section className="section-block"><div className="section-title-row"><div><label>{t('dash.recentWins')}</label><h2>{t('dash.smallMoments')}</h2></div><Link className="text-link" to="/student/progress">{t('dash.allActivity')} <ArrowRight size={14} /></Link></div><div className="activity-list card"><Activity icon="✓" tone="green" title={t('dash.lessonsCompletedValue', { n: doneCount })} detail={nextLesson ? t('dash.next', { title: nextLesson.title }) : t('dash.allLessonsCompleted')} value={`${doneCount}`} /><Activity icon="🔥" tone="orange" title={t('dash.streakTitle', { n: streak, unit: dayUnit })} detail={streak > 0 ? t('dash.keepGoing') : t('dash.completeToStart')} value={t('dash.streakStat')} /><Activity icon="★" tone="purple" title={t('dash.petLevelN', { n: level })} detail={t('dash.xpEarned', { n: exp })} value={t('dash.levelStat')} /></div></section>
  </div>
}
