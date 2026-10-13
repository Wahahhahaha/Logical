const DAY_MS = 86400000;

const pool = [
  { id: 'lesson-2', title: 'Belajar dua kali', description: 'Selesaikan 2 lesson hari ini.', reward: 20, target: 2, measure: (progress) => progress.lessonsToday },
  { id: 'lesson-3', title: 'Tiga langkah maju', description: 'Selesaikan 3 lesson hari ini.', reward: 30, target: 3, measure: (progress) => progress.lessonsToday },
  { id: 'addition', title: 'Ahli penjumlahan', description: 'Selesaikan lesson penjumlahan hari ini.', reward: 15, target: 1, measure: (progress) => (progress.todayLessonKeys.includes('g1-s1-addition') ? 1 : 0) },
  { id: 'subtraction', title: 'Ahli pengurangan', description: 'Selesaikan lesson pengurangan hari ini.', reward: 15, target: 1, measure: (progress) => (progress.todayLessonKeys.includes('g1-s1-subtraction') ? 1 : 0) },
  { id: 'lesson-4', title: 'Semangat penuh', description: 'Selesaikan 4 lesson hari ini.', reward: 40, target: 4, measure: (progress) => progress.lessonsToday }
];

const mandatory = { id: 'daily-lesson', title: 'Mulai belajar', description: 'Minimal mengerjakan 1 lesson hari ini.', reward: 10, target: 1, measure: (progress) => progress.lessonsToday };

function dailyQuests(date = new Date()) {
  const dayIndex = Math.floor(date.getTime() / DAY_MS);
  const quests = [mandatory];
  for (let step = 0; step < 4; step += 1) quests.push(pool[(dayIndex + step) % pool.length]);
  return quests;
}

module.exports = { dailyQuests };
