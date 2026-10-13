const { z } = require('zod');

const PRACTICE_QUESTION_SCHEMA = z.object({
  question: z.string().trim().min(1).max(240),
  options: z.array(z.union([z.string(), z.number()])).min(0).max(5),
  answer: z.union([z.string(), z.number()]),
  explanation: z.string().trim().min(1).max(240).optional().default(''),
  mode: z.enum(['choice', 'input']).optional().default('choice'),
});

const PRACTICE_SET_SCHEMA = z.array(PRACTICE_QUESTION_SCHEMA).min(1).max(10);

const STORY_OBJECTS = ['apel', 'bola', 'buku', 'pisang', 'pensil', 'kelereng', 'permen', 'mainan'];
const STORY_NAMES = ['Budi', 'Siti', 'Rina', 'Dodi', 'Maya', 'Andi'];

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function pick(items) { return items[randomInt(0, items.length - 1)]; }

function buildExpression(operation, max) {
  if (operation === 'subtraction' || operation === 'mixedSubtraction') {
    const a = randomInt(2, max);
    const b = randomInt(1, a - 1);
    return { a, b, op: '-', result: a - b };
  }
  const a = randomInt(1, max - 1);
  const b = randomInt(1, max - a);
  return { a, b, op: '+', result: a + b };
}

function buildAnswerOptions(result, max) {
  const options = new Set([result]);
  let delta = 1;
  let fallback = result + 1;
  while (options.size < 4) {
    if (result + delta <= max * 2) options.add(result + delta);
    if (options.size < 4 && result - delta >= 0) options.add(result - delta);
    delta += 1;
    if (options.size < 4 && !options.has(fallback)) options.add(fallback);
    fallback += 1;
  }
  return shuffle([...options]).map((value) => String(value));
}

function expressionQuestion(index, operation, max) {
  const isMixed = operation === 'mixed' ? index % 2 === 0 : operation !== 'subtraction';
  const { a, b, op, result } = buildExpression(isMixed ? 'addition' : 'subtraction', max);
  const options = buildAnswerOptions(result, max);
  const opWord = op === '+' ? 'ditambah' : 'dikurangi';
  return { question: `${a} ${op} ${b} = ?`, options, answer: String(result), explanation: `${a} ${opWord} ${b} hasilnya ${result}.`, seed: `${index}-${a}-${b}` };
}

function storyQuestion(index) {
  const isAddition = index % 2 === 0;
  const max = 12;
  const object = pick(STORY_OBJECTS);
  const name = pick(STORY_NAMES);
  let question;
  let result;
  let explanation;
  if (isAddition) {
    const a = randomInt(1, 5);
    const b = randomInt(1, 5);
    result = a + b;
    question = `${name} punya ${a} ${object}. Lalu ibu memberinya ${b} ${object} lagi. Berapa jumlah ${object} ${name} sekarang?`;
    explanation = `${a} ${object} ditambah ${b} ${object} hasilnya ${result}.`;
  } else {
    const a = randomInt(3, 8);
    const b = randomInt(1, a - 1);
    result = a - b;
    question = `${name} punya ${a} ${object}. Sebanyak ${b} ${object} diberikan kepada teman. Berapa sisa ${object} ${name} sekarang?`;
    explanation = `${a} ${object} dikurangi ${b} ${object} menyisakan ${result}.`;
  }
  return { question, options: buildAnswerOptions(result, max), answer: String(result), explanation, seed: `story-${index}-${Date.now()}-${object}` };
}

function localQuestion(operation, max, index) {
  if (operation === 'story') return storyQuestion(index);
  return expressionQuestion(index, operation, max);
}

function dedupeQuestions(questions) {
  const seen = new Set();
  const unique = [];
  for (const item of questions) {
    const key = String(item.question).trim();
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(item);
  }
  return unique;
}

function localQuestionsUnique(operation, max, count) {
  const result = [];
  const seen = new Set();
  let guard = 0;
  while (result.length < count && guard < count * 12 + 40) {
    const item = localQuestion(operation, max, result.length);
    const key = String(item.question).trim();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
    guard += 1;
  }
  return result;
}

async function groqQuestions({ lessonKey, operation, max, count }) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;
  const opConfig = {
    addition: { word: 'penjumlahan', instruction: 'Format pertanyaan: "a + b = ?" dengan jawaban bilangan bulat positif. TIDAK BOLEH ada tanda minus (-) di semua soal.' },
    subtraction: { word: 'pengurangan', instruction: 'Format pertanyaan: "a - b = ?" dengan a > b dan jawaban bilangan bulat positif. TIDAK BOLEH ada tanda plus (+) di semua soal.' },
    mixed: { word: 'penjumlahan dan pengurangan', instruction: 'Format pertanyaan: "a + b = ?" atau "a - b = ?" dengan jawaban bilangan bulat positif. Setengah soal penjumlahan dan setengahnya pengurangan, urutannya boleh acak.' },
  };
  const isStory = operation === 'story';
  const config = opConfig[operation];
  const opWord = isStory ? 'soal cerita penjumlahan dan pengurangan' : (config ? config.word : 'penjumlahan');
  const formatInstruction = isStory
    ? 'Setiap soal berupa cerita singkat berbahasa Indonesia tentang benda sehari-hari, diakhiri pertanyaan "Berapa ...?" dengan jawaban angka. Setengah soal cerita penjumlahan dan setengahnya pengurangan.'
    : config.instruction;
  const sample = isStory
    ? JSON.stringify([{ question: 'Budi punya 3 apel, lalu ibu memberinya 2 apel lagi. Berapa jumlah apel Budi sekarang?', options: ['5', '6', '4', '7'], answer: '5', explanation: '3 ditambah 2 hasilnya 5.' }])
    : JSON.stringify([{ question: '3 + 2 = ?', options: ['5', '6', '4', '7'], answer: '5', explanation: '3 ditambah 2 hasilnya 5.' }]);
  const prompt = [
    `Kamu adalah guru matematika SD. Buatkan ${count} soal latihan matematika ${opWord} untuk materi "${lessonKey}".`,
    `Gunakan angka kecil yang sederhana sesuai kelas 1 SD (antara 1 sampai ${max}). Buat tiap soal berbeda — jangan mengulang angka operan yang sama persis di soal lain, pilih kombinasi yang bervariasi.`,
    formatInstruction,
    'Tiap soal harus punya tepat 4 pilihan jawaban (options) dengan satu kunci jawaban benar (answer) yang merupakan string angka yang sama persis dengan salah satu option. Tambahkan penjelasan singkat berbahasa Indonesia di field explanation.',
    'Balas HANYA dengan JSON array, tanpa teks tambahan, tanpa markdown:',
    sample,
  ].join('\n');
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'llama-3.3-70b-versatile',
        temperature: 0.9,
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal: AbortSignal.timeout(20000),
    });
    if (!response.ok) return null;
    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || '';
    const cleaned = content.replace(/```json|```/gi, '').trim();
    const arrayStart = cleaned.indexOf('[');
    const arrayEnd = cleaned.lastIndexOf(']');
    if (arrayStart === -1 || arrayEnd === -1) return null;
    const parsed = JSON.parse(cleaned.slice(arrayStart, arrayEnd + 1));
    const validated = PRACTICE_SET_SCHEMA.safeParse(parsed);
    if (!validated.success) return null;
    return validated.data.map((item, index) => ({
      question: String(item.question),
      options: item.options.map((value) => String(value)),
      answer: String(item.answer),
      explanation: item.explanation || '',
      seed: `groq-${index}-${Date.now()}`,
    }));
  } catch {
    return null;
  }
}

module.exports = { PRACTICE_QUESTION_SCHEMA, PRACTICE_SET_SCHEMA };

function finalizeQuestions(questions) {
  return questions.map((item, index) => {
    const isInput = index >= questions.length - 2;
    const options = [...new Set((item.options || []).map((value) => String(value)))];
    const answer = String(item.answer);
    if (isInput) {
      return { question: String(item.question), options: [], answer, explanation: item.explanation || '', mode: 'input', seed: item.seed || `${index}` };
    }
    if (!options.includes(answer)) options.push(answer);
    while (options.length < 4) options.push(String(Number(answer) + options.length));
    return { question: String(item.question), options: options.slice(0, 4), answer, explanation: item.explanation || '', mode: 'choice', seed: item.seed || `${index}` };
  });
}

module.exports.generatePracticeQuestions = async function generatePracticeQuestions({ lessonKey = '', operation = 'addition', max = 10, count = 4 }) {
  const resolvedCount = Math.max(1, Math.min(8, Number(count) || 4));
  const resolvedMax = Math.max(3, Math.min(20, Number(max) || (operation === 'story' ? 12 : 10)));
  const questioned = await groqQuestions({ lessonKey, operation, max: resolvedMax, count: resolvedCount });
  if (questioned && questioned.length) return finalizeQuestions(dedupeQuestions(questioned).slice(0, resolvedCount));
  return finalizeQuestions(localQuestionsUnique(operation, resolvedMax, resolvedCount));
};