import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Volume2, VolumeX } from 'lucide-react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { useToast } from '../../toast.jsx'
import { apiFetch } from '../../lib/api.js'
import { findLesson } from '../../lib/curriculum.js'
import { buildQuiz, checkAnswer } from '../../lib/quiz.js'
import InteractiveCat from '../../components/illustrations/InteractiveCat.jsx'
import InteractiveFox from '../../components/illustrations/InteractiveFox.jsx'
import InteractivePet from '../../components/illustrations/InteractivePet.jsx'
import { ObjectPhrase } from '../../components/illustrations/ObjectAssets.jsx'

const objectKinds = ['apple', 'ball', 'book', 'banana', 'pencil']

const PET_SIZE = { w: 150, h: 220 }
const randomTarget = () => ({ x: 20 + Math.random() * (window.innerWidth - PET_SIZE.w - 40), y: 90 + Math.random() * (window.innerHeight - PET_SIZE.h - 140) })
const parseOperands = expression => { const match = String(expression || '').match(/^(\d+)\s*([+-])\s*(\d+)\s*=\s*(\d+)$/); return match ? { a: Number(match[1]), op: match[2], b: Number(match[3]), c: Number(match[4]) } : null }
const sameText = (a, b) => String(a ?? '').trim().toLowerCase() === String(b ?? '').trim().toLowerCase()
const PRACTICE_HINTS = { choice: 'lesson.choiceHint', boolean: 'lesson.trueFalseHint', numeric: 'lesson.inputHint', short: 'lesson.shortHint' }
const ILLUSTRATE_MAX = 10
const showObjects = (a, b) => Number(a) <= ILLUSTRATE_MAX && Number(b) <= ILLUSTRATE_MAX

export default function StudentLessonPage() {
  const { user, updateUser } = useAuth()
  const { t, language } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const { lessonKey } = useParams()
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = useState(0)
  const [introLeaving, setIntroLeaving] = useState(false)
  const [petPos, setPetPos] = useState(() => ({ x: Math.max(0, window.innerWidth - PET_SIZE.w - 24), y: Math.max(80, window.innerHeight - PET_SIZE.h - 24) }))
  const [petMessage] = useState('')
  const [petDragging, setPetDragging] = useState(false)
  const [bubble, setBubble] = useState('')
  const [practiceData, setPracticeData] = useState(null)
  const [answers, setAnswers] = useState({})
  const [inputValue, setInputValue] = useState('')
  const [speaking, setSpeaking] = useState(false)
  const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window
  const clearSpeech = useCallback(() => { if (speechSupported) window.speechSynthesis.cancel(); setSpeaking(false) }, [speechSupported])
  const dragOffset = useRef(null)
  const walkTimer = useRef(null)
  const bubbleTimer = useRef(null)
  const petTarget = useRef(null)
  const lesson = findLesson(user.profile?.grade, lessonKey, language)
  const operation = lesson?.operation || 'addition'
  const grade = user.profile?.grade
  const practiceCount = lesson?.practiceCount || 0
  const practiceItems = useMemo(() => { const current = findLesson(grade, lessonKey, language); const curriculum = current ? current.slides.filter(slide => slide.type === 'practice') : []; const generated = practiceData && practiceData.key === lessonKey && Array.isArray(practiceData.questions) && practiceData.questions.length ? practiceData.questions : null; const source = generated || curriculum; return buildQuiz(source.map((item, order) => ({ ...item, objectKind: objectKinds[(order + 1) % objectKinds.length] }))) }, [grade, lessonKey, language, practiceData])
  const slides = lesson ? [{ type: 'intro', title: lesson.title }, ...lesson.slides.filter(slide => slide.type !== 'practice').map((slide, key) => ({ ...slide, objectKind: objectKinds[key % objectKinds.length] })), ...practiceItems.map(item => ({ ...item, type: 'practice' })), ...(practiceItems.length ? [{ type: 'review', title: t('lesson.reviewTitle'), resultCount: practiceItems.length }] : [])] : []
  const safeIndex = Math.min(index, Math.max(0, slides.length - 1))
  const slide = slides[safeIndex]
  const lastSlide = safeIndex === slides.length - 1
  const introSlide = safeIndex === 0
  const currentRecord = slide?.type === 'practice' ? answers[slide.practiceIndex] : null
  const currentAnswered = Boolean(currentRecord)
  const canAdvance = introSlide || slide?.type !== 'practice' || currentAnswered || slide?.type === 'review'
  const rawPet = user.profile?.petType
  const petType = rawPet && rawPet !== 'egg' ? rawPet : 'cat'
  const petName = user.profile?.petName || t(`pet.type.${petType}`) || t('common.companion')
  const correctCount = practiceItems.reduce((sum, item) => sum + (answers[item.practiceIndex] && answers[item.practiceIndex].correct ? 1 : 0), 0)
  const petReaction = slide?.type === 'practice' && currentRecord
    ? { id: `answer-${safeIndex}-${currentRecord.correct}`, emotion: currentRecord.correct ? 'happy' : 'confused', message: currentRecord.correct ? t('lesson.petCorrect') : t('lesson.petWrong'), duration: 1700, priority: 5 }
    : slide?.type === 'review' && correctCount === practiceItems.length && practiceItems.length
      ? { id: `review-${correctCount}`, emotion: 'celebrating', message: t('lesson.petPerfect'), duration: 1800, priority: 6 }
      : { id: `slide-${safeIndex}`, emotion: 'thinking', message: '', duration: 1100, priority: 1 }

  useEffect(() => { petTarget.current = randomTarget(); walkTimer.current = window.setInterval(() => { if (petDragging) return; setPetPos(position => { const distanceX = petTarget.current.x - position.x; const distanceY = petTarget.current.y - position.y; const distance = Math.hypot(distanceX, distanceY); if (distance < 4) { petTarget.current = randomTarget(); return position } const step = 1.4; return { x: position.x + distanceX / distance * step, y: position.y + distanceY / distance * step } }) }, 40); return () => { window.clearInterval(walkTimer.current) } }, [petDragging])
  useEffect(() => { window.clearTimeout(bubbleTimer.current); const showTimer = window.setTimeout(() => setBubble(petMessage), 0); bubbleTimer.current = window.setTimeout(() => setBubble(''), 3600); return () => { window.clearTimeout(showTimer); window.clearTimeout(bubbleTimer.current) } }, [index, answers, petMessage])
  useEffect(() => { let active = true; apiFetch('/api/auth/me').then(result => { if (active) updateUser(result.user) }).catch(() => {}); return () => { active = false } }, [updateUser])
  useEffect(() => { const resetTimer = window.setTimeout(() => { setAnswers({}); setInputValue('') }, 0); return () => window.clearTimeout(resetTimer) }, [lesson?.key, practiceData?.key])
  useEffect(() => { const key = lesson?.key; if (!key || practiceCount === 0) return; let active = true; apiFetch('/api/student/practice/generate', { method: 'POST', body: JSON.stringify({ lessonKey: key, operation, count: practiceCount }) }).then(result => { if (active && Array.isArray(result.questions) && result.questions.length) setPracticeData({ key, questions: result.questions }) }).catch(() => {}); return () => { active = false } }, [lesson?.key, operation, practiceCount])
  useEffect(() => { const onKey = event => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return; if (event.key === 'ArrowRight') { event.preventDefault(); if (slide?.type === 'practice' && !currentAnswered) return; clearSpeech(); setIndex(current => Math.min(slides.length - 1, current + 1)); setInputValue(''); setIntroLeaving(false) } else if (event.key === 'ArrowLeft') { event.preventDefault(); clearSpeech(); setIndex(current => Math.max(0, current - 1)); setInputValue(''); setIntroLeaving(false) } }; window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [slide, currentAnswered, slides.length, clearSpeech])
  useEffect(() => () => { if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel() }, [])
  if (!lesson) return <Navigate to="/student/learn" replace />
  const stopWalk = () => { window.clearInterval(walkTimer.current); walkTimer.current = null }
  const startWalk = () => { if (walkTimer.current) return; petTarget.current = randomTarget(); walkTimer.current = window.setInterval(() => { if (petDragging) return; setPetPos(position => { const distanceX = petTarget.current.x - position.x; const distanceY = petTarget.current.y - position.y; const distance = Math.hypot(distanceX, distanceY); if (distance < 4) { petTarget.current = randomTarget(); return position } const step = 1.4; return { x: position.x + distanceX / distance * step, y: position.y + distanceY / distance * step } }) }, 40) }
  const onPointerDown = event => { stopWalk(); dragOffset.current = { dx: event.clientX - petPos.x, dy: event.clientY - petPos.y }; setPetDragging(true); event.currentTarget.setPointerCapture(event.pointerId) }
  const onPointerMove = event => { if (!dragOffset.current) return; setPetPos({ x: Math.max(0, Math.min(window.innerWidth - PET_SIZE.w, event.clientX - dragOffset.current.dx)), y: Math.max(80, Math.min(window.innerHeight - PET_SIZE.h, event.clientY - dragOffset.current.dy)) }) }
  const onPointerUp = event => { dragOffset.current = null; setPetDragging(false); startWalk(); event.currentTarget.releasePointerCapture(event.pointerId) }
  const go = step => { clearSpeech(); setIndex(current => Math.min(slides.length - 1, Math.max(0, current + step))); setInputValue(''); setIntroLeaving(false) }
  const answerPractice = value => { if (slide?.type !== 'practice' || currentRecord) return; const chosen = String(value).trim(); if (!chosen) return; setAnswers(current => ({ ...current, [slide.practiceIndex]: { chosen, correct: checkAnswer(slide, chosen) } })) }
  const submitInput = () => answerPractice(inputValue)
  const speakSlide = () => {
    if (!speechSupported) { toast.error(t('lesson.speechUnsupported')); return }
    if (speaking) { clearSpeech(); return }
    const text = [slide?.title, ...(slide?.body || []), ...(slide?.points || []), slide?.note].filter(Boolean).join('. ')
    if (!text) return
    window.speechSynthesis.cancel()
    const utterance = new window.SpeechSynthesisUtterance(text)
    utterance.lang = language
    utterance.rate = 0.95
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find(item => item.lang === language) || voices.find(item => (item.lang || '').toLowerCase().startsWith(String(language).slice(0, 2).toLowerCase()))
    if (voice) utterance.voice = voice
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)
    setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }
  const speakButton = <button className={`speak-button${speaking ? ' speaking' : ''}`} type="button" onClick={speakSlide} aria-label={speaking ? t('lesson.stopListen') : t('lesson.listen')} title={speaking ? t('lesson.stopListen') : t('lesson.listen')} aria-pressed={speaking}>{speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}</button>
  const completeTask = async () => { setLoading(true); try { const result = await apiFetch('/api/student/activity/complete', { method: 'POST', body: JSON.stringify({ lessonKey: lesson.key }) }); updateUser(result.user); if (practiceItems.length) { try { await apiFetch('/api/student/practice/submit', { method: 'POST', body: JSON.stringify({ lessonKey: lesson.key, stageId: lesson.stageId, operation, correct: correctCount, total: practiceItems.length }) }) } catch { /* keep completion flow even if scoring fails */ } } const parts = []; if (result.learningAwarded) parts.push(t('lesson.xpLearning', { n: result.learningAwarded })); if (result.checkinAwarded) parts.push(t('lesson.xpCheckin', { n: result.checkinAwarded })); if (result.questAwarded) parts.push(t('lesson.xpQuest', { n: result.questAwarded })); toast.success(parts.length ? t('lesson.greatWork', { details: parts.join(', ') }) : t('lesson.alreadyRecorded')); navigate('/student/learn') } catch (requestError) { toast.error(requestError) } finally { setLoading(false) } }
  const body = introSlide
    ? <><div className={`intro-title${introLeaving ? ' leaving' : ''}`}><p className="eyebrow">{t('lesson.label', { n: lesson.label.split(' ')[1] })}</p><h2>{lesson.title}</h2><p className="onboarding-copy">{t('lesson.startCta')}</p><button className="primary-button intro-start" type="button" onClick={() => { clearSpeech(); setIntroLeaving(true); window.setTimeout(() => { setIntroLeaving(false); setIndex(1) }, 420) }}>{t('common.start')} <ArrowRight size={16} /></button></div></>
    : slide?.type === 'practice'
      ? (() => { const operands = String(slide.prompt || '').match(/^(\d+)\s*([+-])\s*(\d+)/); const illustration = operands && showObjects(operands[1], operands[3]) ? <ObjectPhrase a={Number(operands[1])} op={operands[2]} b={Number(operands[3])} showAnswer={false} kind={slide.objectKind || 'apple'} /> : null; const options = slide.quizType === 'choice' ? <div className="practice-options">{slide.options.map((option, optionIndex) => { const isCorrect = currentAnswered && sameText(option, slide.answer); const isChosenWrong = currentAnswered && sameText(option, currentRecord?.chosen) && !currentRecord?.correct; return <button className={`practice-option${isCorrect ? ' correct' : ''}${isChosenWrong ? ' wrong' : ''}`} key={option} type="button" disabled={currentAnswered} onClick={() => answerPractice(option)}><span>{String.fromCharCode(65 + optionIndex)}. {option}</span>{isCorrect && <span className="practice-option-check">✓</span>}{isChosenWrong && <span className="practice-option-wrong">✕</span>}</button> })}</div> : null; const boolean = slide.quizType === 'boolean' ? <div className="practice-options practice-boolean">{[{ value: 'true', label: t('common.true') }, { value: 'false', label: t('common.false') }].map(choice => { const isCorrect = currentAnswered && (choice.value === 'true') === Boolean(slide.statementCorrect); const isChosenWrong = currentAnswered && currentRecord?.chosen === choice.value && !currentRecord?.correct; return <button className={`practice-option${isCorrect ? ' correct' : ''}${isChosenWrong ? ' wrong' : ''}`} key={choice.value} type="button" disabled={currentAnswered} onClick={() => answerPractice(choice.value)}><span>{choice.label}</span>{isCorrect && <span className="practice-option-check">✓</span>}{isChosenWrong && <span className="practice-option-wrong">✕</span>}</button> })}</div> : null; const input = slide.quizType === 'numeric' || slide.quizType === 'short' ? <div className="practice-input-row"><div className="practice-input-wrap"><input className={`practice-input${currentRecord ? (currentRecord.correct ? ' correct' : ' wrong') : ''}`} type="text" inputMode={slide.quizType === 'numeric' ? 'numeric' : 'text'} autoFocus placeholder={slide.quizType === 'short' ? t('lesson.shortPlaceholder') : t('lesson.inputPlaceholder')} value={inputValue} onChange={event => setInputValue(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') submitInput() }} disabled={currentAnswered} />{currentRecord && <span className={`practice-input-icon ${currentRecord.correct ? 'correct' : 'wrong'}`} aria-hidden="true">{currentRecord.correct ? '✓' : '✕'}</span>}</div><button className="primary-button practice-submit" type="button" onClick={submitInput} disabled={currentAnswered || !String(inputValue).trim()}>{t('lesson.check')}</button></div> : null; return <><div className="practice-head"><label>{t('lesson.practice')}</label><span>{t(PRACTICE_HINTS[slide.quizType] || 'lesson.choiceHint')}</span></div><h2>{slide.quizType === 'boolean' ? slide.statement : slide.prompt}</h2>{illustration}{options}{boolean}{input}</> })()
      : slide?.type === 'review'
        ? <><div className="review-summary" style={{ marginTop: 8 }}><h2>{t('lesson.reviewHeading')}</h2><p className="review-score">{t('lesson.reviewScore', { correct: correctCount, total: practiceItems.length })} {correctCount === practiceItems.length ? t('lesson.perfect') : correctCount >= practiceItems.length / 2 ? t('lesson.good') : t('lesson.keepPracticing')}</p></div><label>{lesson.label} · {lesson.stageName}</label><div className="review-list">{practiceItems.map((item, key) => { const record = answers[item.practiceIndex]; const questionText = item.quizType === 'boolean' ? item.statement : item.prompt; const correctText = item.quizType === 'boolean' ? (item.statementCorrect ? t('common.true') : t('common.false')) : item.answer; const chosenText = item.quizType === 'boolean' ? (record?.chosen === 'true' ? t('common.true') : t('common.false')) : record?.chosen; return <div className={`review-item${record ? (record.correct ? ' right' : ' wrong') : ''}`} key={key}><span className="review-status">{record ? (record.correct ? '✓' : '✕') : '・'}</span><div className="review-body"><p className="review-question">{questionText}</p>{(() => { const operands = String(item.prompt).match(/^(\d+)\s*([+-])\s*(\d+)/); return operands && showObjects(operands[1], operands[3]) ? <ObjectPhrase a={Number(operands[1])} op={operands[2]} b={Number(operands[3])} showAnswer kind={item.objectKind || 'apple'} answer={Number(item.answer)} /> : null })()}<p className="review-feedback"><b>{t('lesson.answer', { a: correctText })}</b>{record ? ` — ${t('lesson.yourAnswer', { a: chosenText })}` : ''}</p><p className="review-explanation">{item.explanation}</p></div></div>})}</div></>
      : slide?.type === 'example'
        ? <><label>{lesson.label} · {lesson.stageName}</label><div className="slide-title-row"><div className="lesson-title-mini">{slide.title}</div>{speakButton}</div>{slide.body?.map((text, key) => <p key={key}>{text}</p>)}{(() => { const operands = parseOperands(slide.expression); return operands && showObjects(operands.a, operands.b) ? <ObjectPhrase a={operands.a} op={operands.op} b={operands.b} answer={operands.c} showAnswer kind={slide.objectKind || 'apple'} /> : <div className="task-example"><span>{slide.expression}</span></div> })()}{slide.note && <p className="slide-note">{slide.note}</p>}</>
        : <><label>{lesson.label} · {lesson.stageName}</label><div className="slide-title-row"><h2>{slide.title}</h2>{speakButton}</div>{slide.body?.map((text, key) => <p key={key}>{text}</p>)}{slide.points && <ul className="slide-points">{slide.points.map((point, key) => <li key={key}>{point}</li>)}</ul>}</>
  return <div className="lesson-page"><div className="lesson-topbar"><button className="lesson-page-back" type="button" onClick={() => navigate('/student/learn')}><ArrowLeft size={16} /> {t('common.back')}</button><div className="slide-progress"><i style={{ width: `${(index + 1) / slides.length * 100}%` }} /></div></div><div className="lesson-layout"><div className="card learning-task-card lesson-page-card"><div className={`lesson-slide${introSlide ? ` intro${introLeaving ? ' leaving' : ''}` : ''}`} key={index}>{body}</div>{!introSlide && <div className="slide-foot"><button className="secondary-button slide-nav" type="button" disabled={index === 0} onClick={() => go(-1)}><ArrowLeft size={14} /> {t('common.back')}</button><span className="slide-count">{t('lesson.slideCount', { i: index, n: slides.length - 1 })}</span>{lastSlide ? <button className="primary-button" onClick={completeTask} disabled={loading || !canAdvance}>{loading ? t('common.saving') : t('lesson.complete')} <Check size={16} /></button> : <button className="primary-button" onClick={() => go(1)} disabled={!canAdvance}>{t('common.next')} <ArrowRight size={14} /></button>}</div>}</div></div>{!introSlide && <div className={`lesson-pet ${petDragging ? 'dragging' : ''}`} style={{ left: petPos.x, top: petPos.y }} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerCancel={onPointerUp}>{bubble && <div className="lesson-pet-bubble">{bubble}</div>}<div className="lesson-pet-art"><span className="lesson-pet-visual">{petType === 'cat' ? <InteractiveCat reaction={petReaction} label={petName} /> : petType === 'fox' ? <InteractiveFox reaction={petReaction} label={petName} /> : <InteractivePet type={petType} reaction={petReaction} label={petName} />}</span></div><span className="lesson-pet-name">{petName}</span></div>}</div>
}
