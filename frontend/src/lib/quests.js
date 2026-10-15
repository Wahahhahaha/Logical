const DAY_MS = 86400000
// NOTE: keep in sync with backend/src/quests.js (used for awarding quest EXP).

const pool = [
  { id: 'lesson-2', title: 'Belajar dua kali', titleEn: 'Learn twice', description: 'Selesaikan 2 lesson hari ini.', descriptionEn: 'Complete 2 lessons today.', reward: 20, target: 2, measure: progress => progress.lessonsToday },
  { id: 'lesson-3', title: 'Tiga langkah maju', titleEn: 'Three steps forward', description: 'Selesaikan 3 lesson hari ini.', descriptionEn: 'Complete 3 lessons today.', reward: 30, target: 3, measure: progress => progress.lessonsToday },
  { id: 'addition', title: 'Ahli penjumlahan', titleEn: 'Addition expert', description: 'Selesaikan lesson penjumlahan hari ini.', descriptionEn: 'Complete the addition lesson today.', reward: 15, target: 1, measure: progress => (progress.todayLessonKeys.includes('g1-s1-addition') ? 1 : 0) },
  { id: 'subtraction', title: 'Ahli pengurangan', titleEn: 'Subtraction expert', description: 'Selesaikan lesson pengurangan hari ini.', descriptionEn: 'Complete the subtraction lesson today.', reward: 15, target: 1, measure: progress => (progress.todayLessonKeys.includes('g1-s1-subtraction') ? 1 : 0) },
  { id: 'lesson-4', title: 'Semangat penuh', titleEn: 'Full of spirit', description: 'Selesaikan 4 lesson hari ini.', descriptionEn: 'Complete 4 lessons today.', reward: 40, target: 4, measure: progress => progress.lessonsToday }
]

const mandatory = { id: 'daily-lesson', title: 'Mulai belajar', titleEn: 'Start learning', description: 'Minimal mengerjakan 1 lesson hari ini.', descriptionEn: 'Complete at least 1 lesson today.', reward: 10, target: 1, measure: progress => progress.lessonsToday }

export function dailyQuests(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / DAY_MS)
  const quests = [mandatory]
  for (let step = 0; step < 4; step++) quests.push(pool[(dayIndex + step) % pool.length])
  return quests
}
