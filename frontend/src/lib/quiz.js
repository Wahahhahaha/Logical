const CHOICE = 'choice'
const BOOLEAN = 'boolean'
const NUMERIC = 'numeric'
const SHORT = 'short'

const EXPRESSION = /^(\d+)\s*([+\-×xX*:])\s*(\d+)\s*=\s*\?$/

function shuffle(list) {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function toArray(value) {
  if (Array.isArray(value)) return value.map(item => String(item))
  if (typeof value === 'string') return value.split(/[,;]+/).map(item => item.trim()).filter(Boolean)
  return []
}

function normalize(value) {
  return String(value ?? '').trim().replace(/\s+/g, ' ').toLowerCase()
}

function numericValue(value) {
  const text = String(value ?? '').trim()
  if (!text) return null
  const cleaned = text.replace(/\s+/g, '').replace(',', '.')
  if (!/^-?\d+(?:\.\d+)?$/.test(cleaned)) return null
  const num = Number(cleaned)
  return Number.isFinite(num) ? num : null
}

function expressionOf(prompt) {
  const match = String(prompt || '').trim().match(EXPRESSION)
  if (!match) return null
  return { a: match[1], op: match[2], b: match[3] }
}

function normalizeItem(raw, index) {
  const prompt = String(raw?.question ?? raw?.prompt ?? '').trim()
  if (!prompt) return null
  return {
    prompt,
    answer: raw.answer === undefined || raw.answer === null ? '' : String(raw.answer),
    options: toArray(raw.options),
    explanation: String(raw.explanation || ''),
    objectKind: raw.objectKind,
    practiceIndex: raw.practiceIndex ?? index,
    operands: expressionOf(prompt),
  }
}

function feasibleTypes(item) {
  const numeric = numericValue(item.answer) !== null
  const types = []
  if (item.options.length >= 2 || numeric) types.push(CHOICE)
  if (numeric) types.push(NUMERIC)
  if (numeric) types.push(BOOLEAN)
  types.push(SHORT)
  return types
}

function wrongAnswer(item) {
  const numeric = numericValue(item.answer)
  if (numeric !== null) {
    const deltas = shuffle([-2, 2, -1, 1, 3, -3])
    for (const delta of deltas) {
      const candidate = numeric + delta
      if (candidate >= 0 && candidate !== numeric) return String(candidate)
    }
    return String(numeric + 1)
  }
  const others = item.options.filter(option => normalize(option) !== normalize(item.answer))
  if (others.length) return others[0]
  return `${item.answer}_salah`
}

function booleanStatement(item, candidate) {
  const expression = String(item.prompt || '').trim().match(EXPRESSION)
  if (expression) return `${expression[1]} ${expression[2]} ${expression[3]} = ${candidate}`
  const replaced = String(item.prompt || '').replace(/\?\s*$/, '').trim()
  if (replaced && replaced !== item.prompt) return `${replaced} ${candidate}`
  return `${item.prompt} Jadi jawabannya ${candidate}.`
}

function choiceOptions(item) {
  const set = []
  const push = value => {
    const text = String(value)
    if (!set.some(existing => normalize(existing) === normalize(text))) set.push(text)
  }
  const numeric = numericValue(item.answer)
  if (item.options.length >= 2) {
    item.options.forEach(push)
    push(item.answer)
    let guard = 0
    while (set.length < 4 && guard < 24) {
      push(wrongAnswer({ ...item, options: set }))
      guard += 1
    }
    return shuffle(set.slice(0, 4))
  }
  if (numeric !== null) {
    push(item.answer)
    const deltas = shuffle([-1, 1, -2, 2, 3, -3, 10, -10])
    for (const delta of deltas) {
      if (set.length >= 4) break
      const value = numeric + delta
      if (value >= 0) push(value)
    }
    let step = 1
    while (set.length < 4) {
      push(numeric + step + 1)
      step += 1
    }
    return shuffle(set)
  }
  return set
}

function buildQuestion(type, item) {
  const base = {
    quizType: type,
    prompt: item.prompt,
    answer: item.answer,
    explanation: item.explanation,
    objectKind: item.objectKind,
    practiceIndex: item.practiceIndex,
    operands: item.operands,
  }
  if (type === CHOICE) return { ...base, options: choiceOptions(item) }
  if (type === NUMERIC) return { ...base, inputMode: 'numeric' }
  if (type === SHORT) return { ...base, inputMode: 'text' }
  const correct = Math.random() < 0.5
  const candidate = correct ? String(item.answer) : wrongAnswer(item)
  return { ...base, statement: booleanStatement(item, candidate), statementCorrect: correct }
}

export function buildQuiz(source) {
  const items = (Array.isArray(source) ? source : []).map(normalizeItem).filter(Boolean)
  const usage = {}
  let previous = null
  return items.map(item => {
    let candidates = feasibleTypes(item)
    if (previous) {
      const withoutPrevious = candidates.filter(type => type !== previous)
      if (withoutPrevious.length) candidates = withoutPrevious
    }
    const min = Math.min(...candidates.map(type => usage[type] || 0))
    const leastUsed = candidates.filter(type => (usage[type] || 0) === min)
    const type = leastUsed[Math.floor(Math.random() * leastUsed.length)]
    usage[type] = (usage[type] || 0) + 1
    previous = type
    return buildQuestion(type, item)
  })
}

export function checkAnswer(item, value) {
  const chosen = String(value ?? '').trim()
  if (item.quizType === BOOLEAN) {
    return (chosen.toLowerCase() === 'true') === Boolean(item.statementCorrect)
  }
  if (item.quizType === NUMERIC) {
    const picked = numericValue(chosen)
    const expected = numericValue(item.answer)
    return picked !== null && expected !== null && picked === expected
  }
  if (item.quizType === SHORT) {
    if (normalize(chosen) === normalize(item.answer)) return true
    const picked = numericValue(chosen)
    const expected = numericValue(item.answer)
    return picked !== null && expected !== null && picked === expected
  }
  return normalize(chosen) === normalize(item.answer)
}
