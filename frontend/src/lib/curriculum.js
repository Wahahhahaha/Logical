import { Calculator } from 'lucide-react'

export const curriculum = {
  '1': {
    grade: '1',
    title: 'Matematika Dasar',
    subtitle: 'Operasi penjumlahan dan pengurangan pada bilangan sederhana.',
    stages: [
      { id: 1, name: 'Stage 1', title: 'Matematika Dasar', icon: Calculator, lessons: [
        {
          key: 'g1-s1-addition',
          label: 'Lesson 1',
          title: 'Belajar penjumlahan',
          description: 'Mengenal cara menjumlahkan dua bilangan sederhana.',
          operation: 'addition',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Apa itu penjumlahan?', body: ['Penjumlahan adalah cara menggabungkan dua bilangan menjadi satu bilangan baru yang disebut jumlah.', 'Tanda penjumlahan ditulis + dan dibaca "ditambah".'] },
            { type: 'example', title: 'Contoh: 2 + 3', body: ['Bayangkan kamu punya 2 kelereng, lalu temanmu memberi 3 kelereng lagi.'], expression: '2 + 3 = 5', note: 'Total kelerengmu sekarang ada 5.' },
            { type: 'example', title: 'Contoh: 4 + 2', body: ['Ada 4 pensil di atas meja, lalu ditambah 2 pensil lagi.'], expression: '4 + 2 = 6', note: 'Semua pensil berjumlah 6.' }
          ]
        },
        {
          key: 'g1-s1-addition-practice',
          label: 'Lesson 2',
          title: 'Latihan penjumlahan',
          description: 'Berlatih menjawab soal-soal penjumlahan.',
          operation: 'addition',
          practiceCount: 6,
          slides: [
            { type: 'text', title: 'Siap latihan penjumlahan!', body: ['Sekarang waktunya berlatih penjumlahan.', 'Ingat: 2 + 3 artinya 2 ditambah 3. Jumlahkan kedua bilangan dengan teliti.'] },
            { type: 'example', title: 'Contoh: 2 + 3', body: ['Berapa hasil dari 2 + 3?'], expression: '2 + 3 = 5', note: 'Cara menghitung: 2, lalu lanjut 3 langkah → 3, 4, 5.' },
            { type: 'practice', question: '2 + 1 = ?', options: ['1', '3', '4', '5'], answer: '3', explanation: '2 ditambah 1 menghasilkan 3.' },
            { type: 'practice', question: '3 + 1 = ?', options: ['3', '4', '5', '6'], answer: '4', explanation: '3 ditambah 1 menghasilkan 4.' },
            { type: 'practice', question: '2 + 2 = ?', options: ['3', '4', '5', '6'], answer: '4', explanation: '2 ditambah 2 menghasilkan 4.' },
            { type: 'practice', question: '4 + 1 = ?', options: ['4', '5', '6', '7'], answer: '5', explanation: '4 ditambah 1 menghasilkan 5.' },
            { type: 'practice', question: '2 + 3 = ?', options: ['4', '5', '6', '7'], answer: '5', explanation: '2 ditambah 3 menghasilkan 5.' },
            { type: 'practice', question: '3 + 2 = ?', options: ['4', '5', '6', '7'], answer: '5', explanation: '3 ditambah 2 menghasilkan 5.' },
            { type: 'practice', question: '5 + 1 = ?', options: ['5', '6', '7', '8'], answer: '6', explanation: '5 ditambah 1 menghasilkan 6.' },
            { type: 'practice', question: '3 + 4 = ?', mode: 'input', answer: '7', explanation: '3 ditambah 4 menghasilkan 7.' },
            { type: 'practice', question: '2 + 5 = ?', mode: 'input', answer: '7', explanation: '2 ditambah 5 menghasilkan 7.' }
          ]
        },
        {
          key: 'g1-s1-subtraction',
          label: 'Lesson 3',
          title: 'Belajar pengurangan',
          description: 'Mengenal cara mengurangi bilangan sederhana.',
          operation: 'subtraction',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Apa itu pengurangan?', body: ['Pengurangan adalah cara mengambil sebagian dari suatu bilangan.', 'Tanda pengurangan ditulis - dan dibaca "dikurangi".'] },
            { type: 'example', title: 'Contoh: 7 - 2', body: ['Kamu punya 7 permen, lalu 2 permen kamu berikan kepada teman.'], expression: '7 - 2 = 5', note: 'Permenmu sekarang tersisa 5.' },
            { type: 'example', title: 'Contoh: 8 - 3', body: ['Ada 8 bola di keranjang, lalu 3 bola diambil untuk dimainkan.'], expression: '8 - 3 = 5', note: 'Sisa bola di keranjang ada 5.' }
          ]
        },
        {
          key: 'g1-s1-subtraction-practice',
          label: 'Lesson 4',
          title: 'Latihan pengurangan',
          description: 'Berlatih menjawab soal-soal pengurangan.',
          operation: 'subtraction',
          practiceCount: 6,
          slides: [
            { type: 'practice', question: '5 - 1 = ?', options: ['3', '4', '5', '6'], answer: '4', explanation: '5 dikurangi 1 menyisakan 4.' },
            { type: 'practice', question: '7 - 2 = ?', options: ['4', '5', '6', '7'], answer: '5', explanation: '7 dikurangi 2 menyisakan 5.' },
            { type: 'practice', question: '6 - 4 = ?', mode: 'input', answer: '2', explanation: '6 dikurangi 4 menyisakan 2.' },
            { type: 'practice', question: '9 - 3 = ?', mode: 'input', answer: '6', explanation: '9 dikurangi 3 menyisakan 6.' }
          ]
        },
        {
          key: 'g1-s1-mixed',
          label: 'Lesson 5',
          title: 'Gabungan penjumlahan dan pengurangan',
          description: 'Belajar menyelesaikan soal campuran penjumlahan dan pengurangan.',
          operation: 'mixed',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Operasi campuran', body: ['Terkadang sebuah soal meminta kamu menjumlahkan lalu mengurangkan, atau sebaliknya.', 'Bacalah tanda dengan teliti: + artinya dijumlah, - artinya dikurangi.'] },
            { type: 'example', title: 'Contoh: 3 + 5', body: ['Kamu punya 3 buku, lalu ayah memberi 5 buku lagi. Berapa total bukumu?'], expression: '3 + 5 = 8', note: 'Buku yang kamu punya sekarang berjumlah 8.' },
            { type: 'example', title: 'Contoh: 9 - 4', body: ['Ada 9 pisang di piring, lalu 4 pisang dimakan. Berapa pisang yang tersisa?'], expression: '9 - 4 = 5', note: 'Sisa pisang di piring ada 5.' }
          ]
        },
        {
          key: 'g1-s1-mixed-practice',
          label: 'Lesson 6',
          title: 'Latihan hitung campuran',
          description: 'Berlatih menjawab soal campuran penjumlahan dan pengurangan.',
          operation: 'mixed',
          practiceCount: 6,
          slides: [
            { type: 'practice', question: '3 + 4 = ?', options: ['6', '7', '8', '9'], answer: '7', explanation: '3 ditambah 4 menghasilkan 7.' },
            { type: 'practice', question: '8 - 5 = ?', options: ['2', '3', '4', '5'], answer: '3', explanation: '8 dikurangi 5 menyisakan 3.' },
            { type: 'practice', question: '4 + 2 = ?', mode: 'input', answer: '6', explanation: '4 ditambah 2 menghasilkan 6.' },
            { type: 'practice', question: '7 - 3 = ?', mode: 'input', answer: '4', explanation: '7 dikurangi 3 menyisakan 4.' }
          ]
        },
        {
          key: 'g1-s1-story',
          label: 'Lesson 7',
          title: 'Belajar soal cerita',
          description: 'Mengenal cara menyelesaikan soal cerita penjumlahan dan pengurangan.',
          operation: 'story',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Apa itu soal cerita?', body: ['Soal cerita adalah soal matematika yang disampaikan lewat sebuah cerita.', 'Bacalah cerita dengan hati-hati untuk menemukan angkanya dan menentukan operasi yang tepat.'] },
            { type: 'example', title: 'Contoh: cerita penjumlahan', body: ['Budi punya 2 apel. Ibu memberinya 3 apel lagi. Berapa jumlah apel Budi sekarang?'], expression: '2 + 3 = 5', note: 'Budi sekarang punya 5 apel.' },
            { type: 'example', title: 'Contoh: cerita pengurangan', body: ['Siti punya 7 kelereng. Ia memberikan 2 kelereng kepada temannya. Berapa sisa kelereng Siti?'], expression: '7 - 2 = 5', note: 'Sisa kelereng Siti ada 5.' }
          ]
        },
        {
          key: 'g1-s1-story-practice',
          label: 'Lesson 8',
          title: 'Latihan soal cerita',
          description: 'Berlatih menjawab soal-soal cerita penjumlahan dan pengurangan.',
          operation: 'story',
          practiceCount: 6,
          slides: [
            { type: 'practice', question: 'Dina punya 3 bola. Adik memberinya 4 bola lagi. Berapa jumlah bola Dina sekarang?', options: ['6', '7', '8', '9'], answer: '7', explanation: '3 ditambah 4 menghasilkan 7.' },
            { type: 'practice', question: 'Rudi punya 8 buku. Ia meminjamkan 3 buku. Berapa sisa buku Rudi?', options: ['4', '5', '6', '7'], answer: '5', explanation: '8 dikurangi 3 menyisakan 5.' },
            { type: 'practice', question: 'Kakek punya 5 pisang. Ia membeli 2 pisang lagi. Berapa jumlah pisang Kakek sekarang?', mode: 'input', answer: '7', explanation: '5 ditambah 2 menghasilkan 7.' },
            { type: 'practice', question: 'Maya punya 9 pensil. Ia menghabiskan 4 pensil. Berapa sisa pensil Maya?', mode: 'input', answer: '5', explanation: '9 dikurangi 4 menyisakan 5.' }
          ]
        }
      ] },
      { id: 2, name: 'Stage 2', title: 'Mengurutkan Bilangan', locked: true },
      { id: 3, name: 'Stage 3', title: 'Bentuk dan Bangun', locked: true }
    ]
  }
}

export const fallbackGrade = { grade: '-', title: 'Segera hadir', subtitle: 'Materi untuk grade ini sedang disiapkan.', stages: [] }

export function planFor(grade) { return curriculum[grade] || fallbackGrade }

export function allLessons(grade) {
  const plan = planFor(grade)
  const list = []
  for (const stage of plan.stages) if (!stage.locked) for (const lesson of stage.lessons || []) list.push({ ...lesson, stageId: stage.id, stageName: stage.name, stageTitle: stage.title })
  return list
}

export function findLesson(grade, lessonKey) {
  const plan = planFor(grade)
  for (const stage of plan.stages) for (const lesson of stage.lessons || []) if (lesson.key === lessonKey) return { ...lesson, stageId: stage.id, stageName: stage.name }
  return null
}
