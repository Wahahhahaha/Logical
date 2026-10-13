import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth.jsx'
import { useToast } from '../../toast.jsx'
import { apiFetch } from '../../lib/api.js'
import { findLesson } from '../../lib/curriculum.js'
import { EggIllustration, PetIllustration } from '../../components/illustrations/PetIllustration.jsx'
import { ObjectPhrase } from '../../components/illustrations/ObjectAssets.jsx'

const objectKinds = ['apple', 'ball', 'book', 'banana', 'pencil']

const petNames = { egg: 'Mochi egg', cat: 'Cat', dog: 'Dog', fox: 'Fox' }
const PET_SIZE = { w: 150, h: 220 }
const randomTarget = () => ({ x: 20 + Math.random() * (window.innerWidth - PET_SIZE.w - 40), y: 90 + Math.random() * (window.innerHeight - PET_SIZE.h - 140) })
const parseOperands = expression => { const match = String(expression || '').match(/^(\d+)\s*([+-])\s*(\d+)\s*=\s*(\d+)$/); return match ? { a: Number(match[1]), op: match[2], b: Number(match[3]), c: Number(match[4]) } : null }
const toOptions = value => { if (Array.isArray(value)) return value.map(item => String(item)); if (typeof value === 'string') return value.split(/[, ]+/).map(item => item.trim()).filter(Boolean); return [] }

export default function StudentLessonPage() {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const navigate = useNavigate()
  const { lessonKey } = useParams()
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const [introLeaving, setIntroLeaving] = useState(false)
  const [petPos, setPetPos] = useState(() => ({ x: Math.max(0, window.innerWidth - PET_SIZE.w - 24), y: Math.max(80, window.innerHeight - PET_SIZE.h - 24) }))
  const [petDragging, setPetDragging] = useState(false)
  const [bubble, setBubble] = useState('')
  const [practiceData, setPracticeData] = useState(null)
  const [answers, setAnswers] = useState({})
  const [inputValue, setInputValue] = useState('')
  const dragOffset = useRef(null)
  const walkTimer = useRef(null)
  const bubbleTimer = useRef(null)
  const petTarget = useRef(null)
  const lesson = findLesson(user.profile?.grade, lessonKey)
  const operation = lesson?.operation || 'addition'
  const practiceCount = lesson?.practiceCount || 0
  const practiceQuestions = practiceData && practiceData.key === lesson?.key ? practiceData.questions : null
  const curriculumPractice = lesson ? lesson.slides.filter(slide => slide.type === 'practice') : []
  const practiceSource = practiceCount > 0 ? (Array.isArray(practiceQuestions) && practiceQuestions.length ? practiceQuestions : curriculumPractice) : []
  const practiceItems = Array.isArray(practiceSource) ? practiceSource.map((item, key) => ({ ...item, type: 'practice', practiceIndex: key, mode: item.mode || 'choice', options: toOptions(item.options), objectKind: objectKinds[(key + 1) % objectKinds.length] })) : []
  const slides = lesson ? [{ type: 'intro', title: lesson.title }, ...lesson.slides.filter(slide => slide.type !== 'practice').map((slide, key) => ({ ...slide, objectKind: objectKinds[key % objectKinds.length] })), ...practiceItems, ...(practiceItems.length ? [{ type: 'review', title: 'Hasil latihan', resultCount: practiceItems.length }] : [])] : []
  const safeIndex = Math.min(index, Math.max(0, slides.length - 1))
  const slide = slides[safeIndex]
  const lastSlide = safeIndex === slides.length - 1
  const introSlide = safeIndex === 0
  const currentRecord = slide?.type === 'practice' ? answers[slide.practiceIndex] : null
  const currentAnswered = Boolean(currentRecord)
  const canAdvance = introSlide || slide?.type !== 'practice' || currentAnswered || slide?.type === 'review'
  const petType = user.profile?.petType || 'egg'
  const petName = user.profile?.petName || petNames[petType] || 'Companion'
  const correctCount = practiceItems.reduce((sum, item) => sum + (answers[item.practiceIndex] && answers[item.practiceIndex].correct ? 1 : 0), 0)
  const petMessage = introSlide ? `Ayo mulai belajar ${lesson ? lesson.title : ''}! ✨` : slide?.type === 'review' ? `Latihan selesai! Kamu benar ${correctCount} dari ${practiceItems.length}. 🎉` : slide?.type === 'practice' ? (currentAnswered ? (currentRecord.correct ? `Benar sekali! Hebat! 🎉` : `Belum tepat, lihat jawaban yang benar ya!`) : `Pilih jawaban yang benar ya!`) : slide?.type === 'example' ? `Perhatikan contoh ini baik-baik! 👀` : `Ayo baca pelajaran ini bersama!`
  useEffect(() => { petTarget.current = randomTarget(); walkTimer.current = window.setInterval(() => { if (petDragging) return; setPetPos(position => { const distanceX = petTarget.current.x - position.x; const distanceY = petTarget.current.y - position.y; const distance = Math.hypot(distanceX, distanceY); if (distance < 4) { petTarget.current = randomTarget(); return position } const step = 1.4; return { x: position.x + distanceX / distance * step, y: position.y + distanceY / distance * step } }) }, 40); return () => { window.clearInterval(walkTimer.current) } }, [petDragging])
  useEffect(() => { window.clearTimeout(bubbleTimer.current); const showTimer = window.setTimeout(() => setBubble(petMessage), 0); bubbleTimer.current = window.setTimeout(() => setBubble(''), 3600); return () => { window.clearTimeout(showTimer); window.clearTimeout(bubbleTimer.current) } }, [index, answers, petMessage])
  useEffect(() => { let active = true; apiFetch('/api/auth/me').then(result => { if (active) updateUser(result.user) }).catch(() => {}); return () => { active = false } }, [updateUser])
  useEffect(() => { const resetTimer = window.setTimeout(() => { setAnswers({}); setInputValue('') }, 0); return () => window.clearTimeout(resetTimer) }, [lesson?.key, practiceData?.key])
  useEffect(() => { const key = lesson?.key; if (!key || practiceCount === 0) return; let active = true; apiFetch('/api/student/practice/generate', { method: 'POST', body: JSON.stringify({ lessonKey: key, operation, count: practiceCount }) }).then(result => { if (active && Array.isArray(result.questions) && result.questions.length) setPracticeData({ key, questions: result.questions }) }).catch(() => {}); return () => { active = false } }, [lesson?.key, operation, practiceCount])
  useEffect(() => { const onKey = event => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return; if (event.key === 'ArrowRight') { event.preventDefault(); if (slide?.type === 'practice' && !currentAnswered) return; setIndex(current => Math.min(slides.length - 1, current + 1)); setInputValue(''); setIntroLeaving(false) } else if (event.key === 'ArrowLeft') { event.preventDefault(); setIndex(current => Math.max(0, current - 1)); setInputValue(''); setIntroLeaving(false) } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [slide, currentAnswered, slides.length])
  if (!lesson) return <Navigate to="/student/learn" replace />
  const stopWalk = () => { window.clearInterval(walkTimer.current); walkTimer.current = null }
  const startWalk = () => { if (walkTimer.current) return; petTarget.current = randomTarget(); walkTimer.current = window.setInterval(() => { if (petDragging) return; setPetPos(position => { const distanceX = petTarget.current.x - position.x; const distanceY = petTarget.current.y - position.y; const distance = Math.hypot(distanceX, distanceY); if (distance < 4) { petTarget.current = randomTarget(); return position } const step = 1.4; return { x: position.x + distanceX / distance * step, y: position.y + distanceY / distance * step } }) }, 40) }
  const onPointerDown = event => { stopWalk(); dragOffset.current = { dx: event.clientX - petPos.x, dy: event.clientY - petPos.y }; setPetDragging(true); event.currentTarget.setPointerCapture(event.pointerId) }
  const onPointerMove = event => { if (!dragOffset.current) return; setPetPos({ x: Math.max(0, Math.min(window.innerWidth - PET_SIZE.w, event.clientX - dragOffset.current.dx)), y: Math.max(80, Math.min(window.innerHeight - PET_SIZE.h, event.clientY - dragOffset.current.dy)) }) }
  const onPointerUp = event => { dragOffset.current = null; setPetDragging(false); startWalk(); event.currentTarget.releasePointerCapture(event.pointerId) }
  const go = step => { setIndex(current => Math.min(slides.length - 1, Math.max(0, current + step))); setInputValue(''); setIntroLeaving(false) }
  const choose = option => { if (slide?.type !== 'practice' || currentRecord) return; setAnswers(current => ({ ...current, [slide.practiceIndex]: { chosen: option, correct: option === slide.answer } })) }
  const submitInput = () => { if (slide?.type !== 'practice' || currentRecord) return; const value = String(inputValue).trim(); if (!value) return; setAnswers(current => ({ ...current, [slide.practiceIndex]: { chosen: value, correct: value === String(slide.answer) } })) }
  const completeTask = async () => { setLoading(true); try { const result = await apiFetch('/api/student/activity/complete', { method: 'POST', body: JSON.stringify({ lessonKey: lesson.key }) }); updateUser(result.user); const parts = []; if (result.learningAwarded) parts.push(`+${result.learningAwarded} XP learning`); if (result.checkinAwarded) parts.push(`+${result.checkinAwarded} XP check-in`); if (result.questAwarded) parts.push(`+${result.questAwarded} XP quest`); toast.success(parts.length ? `Great work! ${parts.join(', ')}.` : 'This learning task has already been recorded today.'); navigate('/student/learn') } catch (requestError) { toast.error(requestError.message) } finally { setLoading(false) } }
  const body = introSlide
    ? <><div className={`intro-title${introLeaving ? ' leaving' : ''}`}><p className="eyebrow">Lesson {slides.length - 1 ? lesson.label.split(' ')[1] : ''}</p><h2>{lesson.title}</h2><p className="onboarding-copy">Ayo mulai belajar bersama!</p><button className="primary-button intro-start" type="button" onClick={() => { setIntroLeaving(true); window.setTimeout(() => { setIntroLeaving(false); setIndex(1) }, 420) }}>Start <ArrowRight size={16} /></button></div></>
    : slide?.type === 'practice'
      ? <><div className="practice-head"><label>Latihan</label><span>{slide.mode === 'input' ? 'Isian — ketik jawabanmu' : 'Pilih satu jawaban'}</span></div><h2>{slide.question}</h2>{(() => { const operands = slide.question.match(/^(\d+)\s*([+-])\s*(\d+)/); return operands ? <ObjectPhrase a={Number(operands[1])} op={operands[2]} b={Number(operands[3])} showAnswer={false} kind={slide.objectKind || 'apple'} /> : null })()}{slide.mode === 'input' ? <div className="practice-input-row"><input className="practice-input" type="text" inputMode="numeric" autoFocus placeholder="Tulis jawabanmu" value={inputValue} onChange={event => setInputValue(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') submitInput() }} /><button className="primary-button practice-submit" type="button" onClick={submitInput} disabled={!String(inputValue).trim()}>Cek</button></div> : <div className="practice-options">{toOptions(slide.options).slice(0, 4).map((option, optionIndex) => { const isCorrect = currentAnswered && option === slide.answer; const isChosenWrong = currentAnswered && option === currentRecord?.chosen && !currentRecord?.correct; return <button className={`practice-option${isCorrect ? ' correct' : ''}${isChosenWrong ? ' wrong' : ''}`} key={option} type="button" disabled={currentAnswered} onClick={() => choose(option)}><span>{String.fromCharCode(65 + optionIndex)}. {option}</span>{isCorrect && <span className="practice-option-check">✓</span>}{isChosenWrong && <span className="practice-option-wrong">✕</span>}</button>})}</div>}{currentRecord && <p className={currentRecord.correct ? 'practice-feedback correct' : 'practice-feedback wrong'}>{currentRecord.correct ? 'Benar! 🎉' : 'Jawaban salah, tetap bisa lanjut ya!'}</p>}</>
      : slide?.type === 'review'
        ? <><label>{lesson.label} · {lesson.stageName}</label><div className="review-summary"><h2>Hasil latihanmu</h2><p className="review-score">Benar <b>{correctCount}</b> dari <b>{practiceItems.length}</b> soal {correctCount === practiceItems.length ? '🎉 Semua benar!' : correctCount >= practiceItems.length / 2 ? '👏 Bagus!' : '💪 Terus berlatih!'}</p></div><div className="review-list">{practiceItems.map((item, key) => { const record = answers[item.practiceIndex]; return <div className={`review-item${record ? (record.correct ? ' right' : ' wrong') : ''}`} key={key}><span className="review-status">{record ? (record.correct ? '✓' : '✕') : '・'}</span><div className="review-body"><p className="review-question">{item.question}</p>{(() => { const operands = String(item.question).match(/^(\d+)\s*([+-])\s*(\d+)/); return operands ? <ObjectPhrase a={Number(operands[1])} op={operands[2]} b={Number(operands[3])} showAnswer kind={item.objectKind || 'apple'} answer={Number(item.answer)} /> : null })()}<p className="review-feedback"><b>Jawaban: {item.answer}</b>{record ? ` — Jawabanmu: ${record.chosen}` : ''}</p><p className="review-explanation">{item.explanation}</p></div></div>})}</div></>
      : slide?.type === 'example'
        ? <><label>{lesson.label} · {lesson.stageName}</label><div className="lesson-title-mini">{slide.title}</div>{slide.body?.map((text, key) => <p key={key}>{text}</p>)}{(() => { const operands = parseOperands(slide.expression); return operands ? <ObjectPhrase a={operands.a} op={operands.op} b={operands.b} answer={operands.c} showAnswer kind={slide.objectKind || 'apple'} /> : <div className="task-example"><span>{slide.expression}</span></div> })()}{slide.note && <p className="slide-note">{slide.note}</p>}</>
        : <><label>{lesson.label} · {lesson.stageName}</label><h2>{slide.title}</h2>{slide.body?.map((text, key) => <p key={key}>{text}</p>)}{slide.points && <ul className="slide-points">{slide.points.map((point, key) => <li key={key}>{point}</li>)}</ul>}</>
  return <div className="lesson-page"><div className="lesson-topbar"><button className="lesson-page-back" type="button" onClick={() => navigate('/student/learn')}><ArrowLeft size={16} /> Back</button><div className="slide-progress"><i style={{ width: `${(index + 1) / slides.length * 100}%` }} /></div></div><div className="lesson-layout"><div className="card learning-task-card lesson-page-card"><div className={`lesson-slide${introSlide ? ` intro${introLeaving ? ' leaving' : ''}` : ''}`} key={index}>{body}</div>{!introSlide && <div className="slide-foot"><button className="secondary-button slide-nav" type="button" disabled={index === 0} onClick={() => go(-1)}><ArrowLeft size={14} /> Back</button><span className="slide-count">Slide {index} / {slides.length - 1}</span>{lastSlide ? <button className="primary-button" onClick={completeTask} disabled={loading || !canAdvance}>{loading ? 'Saving...' : 'Complete lesson'} <Check size={16} /></button> : <button className="primary-button" onClick={() => go(1)} disabled={!canAdvance}>Next <ArrowRight size={14} /></button>}</div>}</div></div>{!introSlide && <div className={`lesson-pet ${petDragging ? 'dragging' : ''}`} style={{ left: petPos.x, top: petPos.y }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>{bubble && <div className="lesson-pet-bubble">{bubble}</div>}<div className="lesson-pet-art"><span className="lesson-pet-visual">{petType === 'egg' ? <EggIllustration /> : <PetIllustration type={petType} />}</span></div><span className="lesson-pet-name">{petName}</span></div>}</div>
}