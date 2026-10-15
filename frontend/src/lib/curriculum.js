import { Calculator, Divide, Hash, Percent, Ruler } from 'lucide-react'
import { curriculumEn } from './curriculumEn.js'

export const curriculum = {
  '1': {
    grade: '1',
    title: 'Matematika Dasar',
    subtitle: 'Penjumlahan, pengurangan, serta membandingkan dan mengurutkan bilangan sederhana.',
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

      { id: 2, name: 'Stage 2', title: 'Mengurutkan Bilangan', icon: Hash, locked: true, lessons: [
        {
          key: 'g1-s2-compare',
          label: 'Lesson 1',
          title: 'Membandingkan bilangan',
          description: 'Mengenal tanda lebih besar, lebih kecil, dan sama dengan.',
          operation: 'compare',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Membandingkan bilangan', body: ['Membandingkan bilangan berarti menentukan bilangan mana yang lebih besar atau lebih kecil.', 'Tanda > artinya "lebih besar", tanda < artinya "lebih kecil", dan tanda = artinya "sama dengan".'] },
            { type: 'example', title: 'Contoh: 5 dan 3', body: ['Bandingkan bilangan 5 dengan 3.'], expression: '5 > 3', note: '5 lebih besar dari 3, jadi memakai tanda >.' },
            { type: 'example', title: 'Contoh: 4 dan 4', body: ['Bandingkan bilangan 4 dengan 4.'], expression: '4 = 4', note: 'Kedua bilangan sama besar, jadi memakai tanda =.' }
          ]
        },
        {
          key: 'g1-s2-compare-practice',
          label: 'Lesson 2',
          title: 'Latihan membandingkan bilangan',
          description: 'Berlatih memilih tanda lebih besar, lebih kecil, atau sama dengan.',
          operation: 'compare',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Siap latihan membandingkan!', body: ['Pilih tanda yang tepat untuk membandingkan kedua bilangan.', 'Ingat: > lebih besar, < lebih kecil, = sama dengan.'] },
            { type: 'practice', question: '6 ... 2', options: ['<', '=', '>'], answer: '>', explanation: '6 lebih besar dari 2, jadi tandanya >.' },
            { type: 'practice', question: '3 ... 8', options: ['<', '=', '>'], answer: '<', explanation: '3 lebih kecil dari 8, jadi tandanya <.' },
            { type: 'practice', question: '7 ... 7', options: ['<', '=', '>'], answer: '=', explanation: '7 sama besar dengan 7, jadi tandanya =.' },
            { type: 'practice', question: '9 ... 4', options: ['<', '=', '>'], answer: '>', explanation: '9 lebih besar dari 4, jadi tandanya >.' },
            { type: 'practice', question: '5 ... 5', options: ['<', '=', '>'], answer: '=', explanation: '5 sama besar dengan 5, jadi tandanya =.' },
            { type: 'practice', question: '2 ... 6', options: ['<', '=', '>'], answer: '<', explanation: '2 lebih kecil dari 6, jadi tandanya <.' }
          ]
        },
        {
          key: 'g1-s2-order-asc',
          label: 'Lesson 3',
          title: 'Mengurutkan dari yang terkecil',
          description: 'Mengurutkan bilangan dari yang terkecil ke yang terbesar.',
          operation: 'order',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Urutan naik', body: ['Mengurutkan dari yang terkecil berarti menyusun bilangan mulai dari yang paling kecil sampai yang paling besar.', 'Perhatikan setiap bilangan, lalu bandingkan satu per satu.'] },
            { type: 'example', title: 'Contoh: 3, 1, 2', body: ['Urutkan bilangan 3, 1, dan 2 dari yang terkecil.'], expression: '1, 2, 3', note: 'Karena 1 < 2 < 3, urutannya 1, 2, 3.' },
            { type: 'example', title: 'Contoh: 6, 4, 5', body: ['Urutkan bilangan 6, 4, dan 5 dari yang terkecil.'], expression: '4, 5, 6', note: 'Karena 4 < 5 < 6, urutannya 4, 5, 6.' }
          ]
        },
        {
          key: 'g1-s2-order-asc-practice',
          label: 'Lesson 4',
          title: 'Latihan mengurutkan naik',
          description: 'Berlatih mengurutkan bilangan dari yang terkecil.',
          operation: 'order',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Siap latihan mengurutkan!', body: ['Pilih urutan bilangan dengan teliti.', 'Ingat, urutan naik dimulai dari bilangan terkecil.'] },
            { type: 'practice', question: 'Bilangan terkecil di antara 4, 1, 3 adalah?', options: ['1', '3', '4'], answer: '1', explanation: '1 adalah bilangan terkecil.' },
            { type: 'practice', question: 'Urutan dari terkecil: 5, 2, 4', options: ['2, 4, 5', '4, 2, 5', '5, 2, 4'], answer: '2, 4, 5', explanation: '2 < 4 < 5, jadi urutannya 2, 4, 5.' },
            { type: 'practice', question: 'Bilangan terbesar di antara 3, 7, 5 adalah?', options: ['3', '5', '7'], answer: '7', explanation: '7 adalah bilangan terbesar.' },
            { type: 'practice', question: 'Urutan dari terkecil: 6, 3, 5', options: ['3, 5, 6', '6, 5, 3', '5, 3, 6'], answer: '3, 5, 6', explanation: '3 < 5 < 6, jadi urutannya 3, 5, 6.' },
            { type: 'practice', question: 'Bilangan terkecil di antara 9, 6, 8 adalah?', mode: 'input', answer: '6', explanation: '6 adalah bilangan terkecil.' },
            { type: 'practice', question: 'Bilangan terbesar di antara 2, 4, 1 adalah?', mode: 'input', answer: '4', explanation: '4 adalah bilangan terbesar.' }
          ]
        },
        {
          key: 'g1-s2-order-desc',
          label: 'Lesson 5',
          title: 'Mengurutkan dari yang terbesar',
          description: 'Mengurutkan bilangan dari yang terbesar ke yang terkecil.',
          operation: 'order',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Urutan turun', body: ['Mengurutkan dari yang terbesar berarti menyusun bilangan mulai dari yang paling besar sampai yang paling kecil.', 'Urutan turun adalah kebalikan dari urutan naik.'] },
            { type: 'example', title: 'Contoh: 2, 5, 3', body: ['Urutkan bilangan 2, 5, dan 3 dari yang terbesar.'], expression: '5, 3, 2', note: 'Karena 5 > 3 > 2, urutannya 5, 3, 2.' },
            { type: 'example', title: 'Contoh: 4, 7, 6', body: ['Urutkan bilangan 4, 7, dan 6 dari yang terbesar.'], expression: '7, 6, 4', note: 'Karena 7 > 6 > 4, urutannya 7, 6, 4.' }
          ]
        },
        {
          key: 'g1-s2-order-desc-practice',
          label: 'Lesson 6',
          title: 'Latihan mengurutkan turun',
          description: 'Berlatih mengurutkan bilangan dari yang terbesar.',
          operation: 'order',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Siap latihan mengurutkan!', body: ['Sekarang urutkan bilangan dari yang terbesar ke yang terkecil.', 'Bandingkan bilangan dengan teliti.'] },
            { type: 'practice', question: 'Urutan dari terbesar: 3, 8, 5', options: ['8, 5, 3', '3, 5, 8', '5, 3, 8'], answer: '8, 5, 3', explanation: '8 > 5 > 3, jadi urutannya 8, 5, 3.' },
            { type: 'practice', question: 'Urutan dari terbesar: 4, 1, 6', options: ['6, 4, 1', '1, 4, 6', '4, 6, 1'], answer: '6, 4, 1', explanation: '6 > 4 > 1, jadi urutannya 6, 4, 1.' },
            { type: 'practice', question: 'Bilangan terbesar di antara 7, 9, 8 adalah?', options: ['7', '8', '9'], answer: '9', explanation: '9 adalah bilangan terbesar.' },
            { type: 'practice', question: 'Urutan dari terbesar: 2, 5, 3', options: ['5, 3, 2', '2, 3, 5', '3, 5, 2'], answer: '5, 3, 2', explanation: '5 > 3 > 2, jadi urutannya 5, 3, 2.' },
            { type: 'practice', question: 'Bilangan terbesar di antara 5, 6, 4 adalah?', mode: 'input', answer: '6', explanation: '6 adalah bilangan terbesar.' },
            { type: 'practice', question: 'Bilangan terkecil di antara 3, 7, 2 adalah?', mode: 'input', answer: '2', explanation: '2 adalah bilangan terkecil.' }
          ]
        },
        {
          key: 'g1-s2-between',
          label: 'Lesson 7',
          title: 'Bilangan sebelum dan sesudah',
          description: 'Menentukan bilangan sebelum, sesudah, dan di antara dua bilangan.',
          operation: 'order',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Bilangan sebelum dan sesudah', body: ['Setiap bilangan punya bilangan sebelum dan bilangan sesudah.', 'Bilangan sebelum nilainya 1 lebih kecil, bilangan sesudah nilainya 1 lebih besar.'] },
            { type: 'example', title: 'Contoh: sebelum dan sesudah 5', body: ['Tentukan bilangan sebelum 5 dan bilangan sesudah 5.'], expression: '4 < 5 < 6', note: 'Bilangan sebelum 5 adalah 4, bilangan sesudah 5 adalah 6.' },
            { type: 'example', title: 'Contoh: di antara 8 dan 10', body: ['Bilangan apa yang berada di antara 8 dan 10?'], expression: '9', note: 'Bilangan di antara 8 dan 10 adalah 9.' }
          ]
        },
        {
          key: 'g1-s2-between-practice',
          label: 'Lesson 8',
          title: 'Latihan sebelum dan sesudah',
          description: 'Berlatih menentukan bilangan sebelum, sesudah, dan di antara dua bilangan.',
          operation: 'order',
          practiceCount: 0,
          slides: [
            { type: 'text', title: 'Siap latihan!', body: ['Tentukan bilangan sebelum, sesudah, atau di antara bilangan.', 'Ingat: sebelum = 1 lebih kecil, sesudah = 1 lebih besar.'] },
            { type: 'practice', question: 'Bilangan sesudah 7 adalah?', options: ['5', '6', '8', '9'], answer: '8', explanation: 'Bilangan sesudah 7 adalah 8.' },
            { type: 'practice', question: 'Bilangan sebelum 4 adalah?', options: ['2', '3', '5'], answer: '3', explanation: 'Bilangan sebelum 4 adalah 3.' },
            { type: 'practice', question: 'Bilangan di antara 5 dan 7 adalah?', options: ['4', '6', '8'], answer: '6', explanation: 'Bilangan di antara 5 dan 7 adalah 6.' },
            { type: 'practice', question: 'Bilangan sesudah 9 adalah?', options: ['8', '10', '11'], answer: '10', explanation: 'Bilangan sesudah 9 adalah 10.' },
            { type: 'practice', question: 'Bilangan sebelum 6 adalah?', mode: 'input', answer: '5', explanation: 'Bilangan sebelum 6 adalah 5.' },
            { type: 'practice', question: 'Bilangan di antara 2 dan 4 adalah?', mode: 'input', answer: '3', explanation: 'Bilangan di antara 2 dan 4 adalah 3.' }
          ]
        }
      ] },
      { id: 3, name: 'Stage 3', title: 'Bentuk dan Bangun', locked: true }
    ]
  },
  '2': {
  "grade": "2",
  "title": "Matematika Kelas 2",
  "subtitle": "Nilai tempat, penjumlahan dan pengurangan sampai 100, serta perkalian dan pembagian dasar.",
  "stages": [
    {
      "id": 1,
      "name": "Stage 1",
      "title": "Nilai Tempat & Membandingkan Bilangan",
      "icon": Hash,
      "lessons": [
        {
          "key": "g2-s1-place-value",
          "label": "Lesson 1",
          "title": "Mengenal nilai tempat",
          "description": "Menentukan nilai tempat ratusan, puluhan, dan satuan pada suatu bilangan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Nilai tempat",
              "body": [
                "Setiap angka pada suatu bilangan memiliki nilai tempat yang berbeda-beda.",
                "Nilai tempat dari kiri ke kanan adalah ratusan, puluhan, lalu satuan."
              ],
              "points": [
                "Ratusan bernilai 100",
                "Puluhan bernilai 10",
                "Satuan bernilai 1"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: bilangan 47",
              "body": [
                "Angka 4 menempati puluhan, angka 7 menempati satuan."
              ],
              "expression": "40 + 7 = 47",
              "note": "4 puluhan bernilai 40 dan 7 satuan bernilai 7."
            },
            {
              "type": "example",
              "title": "Contoh: bilangan 132",
              "body": [
                "Angka 1 ratusan, angka 3 puluhan, dan angka 2 satuan."
              ],
              "expression": "100 + 30 + 2 = 132",
              "note": "Nilai tempat tiap angka berbeda-beda."
            }
          ]
        },
        {
          "key": "g2-s1-place-value-practice",
          "label": "Lesson 2",
          "title": "Latihan mengenal nilai tempat",
          "description": "Berlatih soal menentukan nilai tempat ratusan, puluhan, dan satuan pada suatu bilangan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Angka 6 pada bilangan 64 menempati nilai tempat apa?",
              "options": [
                "Ribuan",
                "Puluhan",
                "Ratusan",
                "Satuan"
              ],
              "answer": "Puluhan",
              "explanation": "Pada 64, angka 6 berada di posisi puluhan."
            },
            {
              "type": "practice",
              "question": "Angka 2 pada bilangan 205 menempati nilai tempat apa?",
              "options": [
                "Satuan",
                "Puluhan",
                "Ratusan",
                "Ribuan"
              ],
              "answer": "Ratusan",
              "explanation": "Pada 205, angka 2 berada di posisi ratusan."
            },
            {
              "type": "practice",
              "question": "Angka 9 pada bilangan 149 menempati nilai tempat apa?",
              "options": [
                "Satuan",
                "Puluhan",
                "Ratusan",
                "Ribuan"
              ],
              "answer": "Satuan",
              "explanation": "Pada 149, angka 9 berada di posisi satuan."
            },
            {
              "type": "practice",
              "question": "Nilai dari angka 5 pada bilangan 58 adalah ...",
              "mode": "input",
              "answer": "50",
              "explanation": "Angka 5 di posisi puluhan bernilai 50."
            },
            {
              "type": "practice",
              "question": "Nilai dari angka 4 pada bilangan 104 adalah ...",
              "mode": "input",
              "answer": "4",
              "explanation": "Angka 4 di posisi satuan bernilai 4."
            },
            {
              "type": "practice",
              "question": "Bilangan yang terbentuk dari 3 ratusan 5 puluhan 8 satuan adalah ...",
              "mode": "input",
              "answer": "358",
              "explanation": "3 ratusan 5 puluhan 8 satuan sama dengan 358."
            }
          ]
        },
        {
          "key": "g2-s1-compare",
          "label": "Lesson 3",
          "title": "Membandingkan bilangan",
          "description": "Menggunakan tanda <, =, dan > untuk membandingkan dua bilangan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Tanda pembanding",
              "body": [
                "Untuk membandingkan dua bilangan kita memakai tanda pembanding.",
                "Sisi terbuka tanda selalu mengarah ke bilangan yang lebih besar."
              ],
              "points": [
                "< artinya lebih kecil dari",
                "= artinya sama dengan",
                "> artinya lebih besar dari"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 34 ... 43",
              "body": [
                "Puluhan 3 lebih kecil dari 4."
              ],
              "expression": "34 < 43",
              "note": "Karena 34 lebih kecil dari 43."
            },
            {
              "type": "example",
              "title": "Contoh: 56 ... 56",
              "body": [
                "Kedua bilangan besarnya sama."
              ],
              "expression": "56 = 56",
              "note": "Karena keduanya sama besar."
            }
          ]
        },
        {
          "key": "g2-s1-compare-practice",
          "label": "Lesson 4",
          "title": "Latihan membandingkan bilangan",
          "description": "Berlatih soal menggunakan tanda <, =, dan > untuk membandingkan dua bilangan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "78 ... 87. Tanda yang tepat adalah ...",
              "options": [
                "<",
                "=",
                ">"
              ],
              "answer": "<",
              "explanation": "78 lebih kecil dari 87."
            },
            {
              "type": "practice",
              "question": "95 ... 59. Tanda yang tepat adalah ...",
              "options": [
                ">",
                "<",
                "="
              ],
              "answer": ">",
              "explanation": "95 lebih besar dari 59."
            },
            {
              "type": "practice",
              "question": "60 ... 60. Tanda yang tepat adalah ...",
              "options": [
                "<",
                "=",
                ">"
              ],
              "answer": "=",
              "explanation": "60 sama dengan 60."
            },
            {
              "type": "practice",
              "question": "Bilangan yang lebih besar di antara 49 dan 94 adalah ...",
              "mode": "input",
              "answer": "94",
              "explanation": "94 lebih besar dari 49."
            },
            {
              "type": "practice",
              "question": "Bilangan yang lebih kecil di antara 63 dan 36 adalah ...",
              "mode": "input",
              "answer": "36",
              "explanation": "36 lebih kecil dari 63."
            },
            {
              "type": "practice",
              "question": "Bilangan yang lebih besar di antara 72 dan 27 adalah ...",
              "mode": "input",
              "answer": "72",
              "explanation": "72 lebih besar dari 27."
            }
          ]
        },
        {
          "key": "g2-s1-rounding",
          "label": "Lesson 5",
          "title": "Membulatkan bilangan",
          "description": "Membulatkan bilangan dua angka ke puluhan terdekat.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Membulatkan bilangan",
              "body": [
                "Untuk membulatkan ke puluhan terdekat, lihat angka satuannya.",
                "Jika satuan 4 atau kurang, bulatkan ke bawah. Jika 5 atau lebih, bulatkan ke atas."
              ],
              "points": [
                "Satuan 4 atau kurang, turun",
                "Satuan 5 atau lebih, naik"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 34",
              "body": [
                "Angka satuan 4, bulatkan ke bawah."
              ],
              "expression": "34 dibulatkan menjadi 30",
              "note": "34 mendekati 30."
            },
            {
              "type": "example",
              "title": "Contoh: 37",
              "body": [
                "Angka satuan 7, bulatkan ke atas."
              ],
              "expression": "37 dibulatkan menjadi 40",
              "note": "37 mendekati 40."
            }
          ]
        },
        {
          "key": "g2-s1-rounding-practice",
          "label": "Lesson 6",
          "title": "Latihan membulatkan bilangan",
          "description": "Berlatih soal membulatkan bilangan dua angka ke puluhan terdekat.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Bilangan 34 dibulatkan ke puluhan terdekat adalah ...",
              "options": [
                "40",
                "39",
                "35",
                "30"
              ],
              "answer": "30",
              "explanation": "Satuan 4, bulatkan ke bawah menjadi 30."
            },
            {
              "type": "practice",
              "question": "Bilangan 37 dibulatkan ke puluhan terdekat adalah ...",
              "options": [
                "38",
                "35",
                "40",
                "30"
              ],
              "answer": "40",
              "explanation": "Satuan 7, bulatkan ke atas menjadi 40."
            },
            {
              "type": "practice",
              "question": "Bilangan 45 dibulatkan ke puluhan terdekat adalah ...",
              "options": [
                "40",
                "50",
                "44",
                "46"
              ],
              "answer": "50",
              "explanation": "Satuan 5, bulatkan ke atas menjadi 50."
            },
            {
              "type": "practice",
              "question": "Bilangan 41 dibulatkan ke puluhan terdekat adalah ...",
              "mode": "input",
              "answer": "40",
              "explanation": "Satuan 1, bulatkan ke bawah menjadi 40."
            },
            {
              "type": "practice",
              "question": "Bilangan 58 dibulatkan ke puluhan terdekat adalah ...",
              "mode": "input",
              "answer": "60",
              "explanation": "Satuan 8, bulatkan ke atas menjadi 60."
            },
            {
              "type": "practice",
              "question": "Bilangan 62 dibulatkan ke puluhan terdekat adalah ...",
              "mode": "input",
              "answer": "60",
              "explanation": "Satuan 2, bulatkan ke bawah menjadi 60."
            }
          ]
        },
        {
          "key": "g2-s1-ordering",
          "label": "Lesson 7",
          "title": "Mengurutkan bilangan",
          "description": "Mengurutkan deretan bilangan dari terkecil ke terbesar dan sebaliknya.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Mengurutkan bilangan",
              "body": [
                "Mengurutkan bisa dari terkecil ke terbesar (naik) atau dari terbesar ke terkecil (turun).",
                "Bandingkan nilai tempat paling besar terlebih dahulu."
              ],
              "points": [
                "Naik: kecil ke besar",
                "Turun: besar ke kecil"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: urutan naik",
              "body": [
                "Bilangan 32, 15, 28 diurutkan naik."
              ],
              "expression": "15, 28, 32",
              "note": "Dari terkecil ke terbesar."
            },
            {
              "type": "example",
              "title": "Contoh: urutan turun",
              "body": [
                "Bilangan 32, 15, 28 diurutkan turun."
              ],
              "expression": "32, 28, 15",
              "note": "Dari terbesar ke terkecil."
            }
          ]
        },
        {
          "key": "g2-s1-ordering-practice",
          "label": "Lesson 8",
          "title": "Latihan mengurutkan bilangan",
          "description": "Berlatih soal mengurutkan deretan bilangan dari terkecil ke terbesar dan sebaliknya.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Urutan naik dari 45, 23, 56 adalah ...",
              "options": [
                "56, 45, 23",
                "45, 23, 56",
                "23, 56, 45",
                "23, 45, 56"
              ],
              "answer": "23, 45, 56",
              "explanation": "23 lebih kecil dari 45 lebih kecil dari 56."
            },
            {
              "type": "practice",
              "question": "Urutan turun dari 45, 23, 56 adalah ...",
              "options": [
                "56, 45, 23",
                "45, 23, 56",
                "23, 45, 56",
                "23, 56, 45"
              ],
              "answer": "56, 45, 23",
              "explanation": "56 lebih besar dari 45 lebih besar dari 23."
            },
            {
              "type": "practice",
              "question": "Urutan naik dari 62, 68, 58 adalah ...",
              "mode": "input",
              "answer": "58, 62, 68",
              "explanation": "58 lebih kecil dari 62 lebih kecil dari 68."
            },
            {
              "type": "practice",
              "question": "Urutan turun dari 62, 68, 58 adalah ...",
              "mode": "input",
              "answer": "68, 62, 58",
              "explanation": "68 lebih besar dari 62 lebih besar dari 58."
            },
            {
              "type": "practice",
              "question": "Bilangan terkecil dari 73, 37, dan 53 adalah ...",
              "mode": "input",
              "answer": "37",
              "explanation": "37 paling kecil."
            },
            {
              "type": "practice",
              "question": "Bilangan terbesar dari 73, 37, dan 53 adalah ...",
              "mode": "input",
              "answer": "73",
              "explanation": "73 paling besar."
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Stage 2",
      "title": "Penjumlahan & Pengurangan sampai 100",
      "icon": Calculator,
      "locked": true,
      "lessons": [
        {
          "key": "g2-s2-add-basic",
          "label": "Lesson 1",
          "title": "Penjumlahan tanpa menyimpan",
          "description": "Menjumlahkan dua bilangan dua angka tanpa teknik menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Penjumlahan tanpa menyimpan",
              "body": [
                "Jumlahkan satuan terlebih dahulu, lalu puluhan.",
                "Jika jumlah satuan kurang dari 10, tidak perlu menyimpan."
              ],
              "points": [
                "Satuan dulu, lalu puluhan",
                "Hasil satuan kurang dari 10"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 24 + 13",
              "body": [
                "Satuan 4 + 3 = 7, puluhan 2 + 1 = 3."
              ],
              "expression": "24 + 13 = 37",
              "note": "Hasilnya 37."
            },
            {
              "type": "example",
              "title": "Contoh: 45 + 32",
              "body": [
                "Satuan 5 + 2 = 7, puluhan 4 + 3 = 7."
              ],
              "expression": "45 + 32 = 77",
              "note": "Hasilnya 77."
            }
          ]
        },
        {
          "key": "g2-s2-add-basic-practice",
          "label": "Lesson 2",
          "title": "Latihan penjumlahan tanpa menyimpan",
          "description": "Berlatih soal menjumlahkan dua bilangan dua angka tanpa teknik menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "24 + 13 = ?",
              "options": [
                "38",
                "35",
                "36",
                "37"
              ],
              "answer": "37",
              "explanation": "4 + 3 = 7 dan 2 + 1 = 3, hasilnya 37."
            },
            {
              "type": "practice",
              "question": "45 + 32 = ?",
              "options": [
                "78",
                "75",
                "76",
                "77"
              ],
              "answer": "77",
              "explanation": "5 + 2 = 7 dan 4 + 3 = 7, hasilnya 77."
            },
            {
              "type": "practice",
              "question": "52 + 26 = ?",
              "options": [
                "78",
                "76",
                "88",
                "68"
              ],
              "answer": "78",
              "explanation": "2 + 6 = 8 dan 5 + 2 = 7, hasilnya 78."
            },
            {
              "type": "practice",
              "question": "63 + 25 = ?",
              "mode": "input",
              "answer": "88",
              "explanation": "3 + 5 = 8 dan 6 + 2 = 8, hasilnya 88."
            },
            {
              "type": "practice",
              "question": "41 + 37 = ?",
              "mode": "input",
              "answer": "78",
              "explanation": "1 + 7 = 8 dan 4 + 3 = 7, hasilnya 78."
            },
            {
              "type": "practice",
              "question": "30 + 46 = ?",
              "mode": "input",
              "answer": "76",
              "explanation": "0 + 6 = 6 dan 3 + 4 = 7, hasilnya 76."
            }
          ]
        },
        {
          "key": "g2-s2-add-carry",
          "label": "Lesson 3",
          "title": "Penjumlahan dengan menyimpan",
          "description": "Menjumlahkan dua bilangan dua angka dengan teknik menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Penjumlahan dengan menyimpan",
              "body": [
                "Jika jumlah satuan 10 atau lebih, tulis satuannya dan simpan 1 puluhan.",
                "Lalu tambahkan simpanan itu ke puluhan."
              ],
              "points": [
                "Satuan 10 atau lebih, simpan 1",
                "Simpan ditambahkan ke puluhan"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 36 + 27",
              "body": [
                "Satuan 6 + 7 = 13, tulis 3 simpan 1.",
                "Puluhan 3 + 2 + 1 = 6."
              ],
              "expression": "36 + 27 = 63",
              "note": "Hasilnya 63."
            },
            {
              "type": "example",
              "title": "Contoh: 58 + 26",
              "body": [
                "Satuan 8 + 6 = 14, tulis 4 simpan 1.",
                "Puluhan 5 + 2 + 1 = 8."
              ],
              "expression": "58 + 26 = 84",
              "note": "Hasilnya 84."
            }
          ]
        },
        {
          "key": "g2-s2-add-carry-practice",
          "label": "Lesson 4",
          "title": "Latihan penjumlahan dengan menyimpan",
          "description": "Berlatih soal menjumlahkan dua bilangan dua angka dengan teknik menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "36 + 27 = ?",
              "options": [
                "53",
                "73",
                "63",
                "61"
              ],
              "answer": "63",
              "explanation": "6 + 7 = 13 simpan 1, lalu 3 + 2 + 1 = 6, hasilnya 63."
            },
            {
              "type": "practice",
              "question": "58 + 26 = ?",
              "options": [
                "84",
                "74",
                "94",
                "82"
              ],
              "answer": "84",
              "explanation": "8 + 6 = 14 simpan 1, lalu 5 + 2 + 1 = 8, hasilnya 84."
            },
            {
              "type": "practice",
              "question": "47 + 35 = ?",
              "options": [
                "72",
                "81",
                "82",
                "92"
              ],
              "answer": "82",
              "explanation": "7 + 5 = 12 simpan 1, lalu 4 + 3 + 1 = 8, hasilnya 82."
            },
            {
              "type": "practice",
              "question": "74 + 18 = ?",
              "mode": "input",
              "answer": "92",
              "explanation": "4 + 8 = 12 simpan 1, lalu 7 + 1 + 1 = 9, hasilnya 92."
            },
            {
              "type": "practice",
              "question": "29 + 43 = ?",
              "mode": "input",
              "answer": "72",
              "explanation": "9 + 3 = 12 simpan 1, lalu 2 + 4 + 1 = 7, hasilnya 72."
            },
            {
              "type": "practice",
              "question": "65 + 27 = ?",
              "mode": "input",
              "answer": "92",
              "explanation": "5 + 7 = 12 simpan 1, lalu 6 + 2 + 1 = 9, hasilnya 92."
            }
          ]
        },
        {
          "key": "g2-s2-sub-basic",
          "label": "Lesson 5",
          "title": "Pengurangan tanpa meminjam",
          "description": "Mengurangkan dua bilangan dua angka tanpa teknik meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Pengurangan tanpa meminjam",
              "body": [
                "Kurangkan satuan terlebih dahulu, lalu puluhan.",
                "Jika satuan atas cukup, tidak perlu meminjam."
              ],
              "points": [
                "Satuan dulu, lalu puluhan"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 47 - 25",
              "body": [
                "Satuan 7 - 5 = 2, puluhan 4 - 2 = 2."
              ],
              "expression": "47 - 25 = 22",
              "note": "Hasilnya 22."
            },
            {
              "type": "example",
              "title": "Contoh: 85 - 40",
              "body": [
                "Satuan 5 - 0 = 5, puluhan 8 - 4 = 4."
              ],
              "expression": "85 - 40 = 45",
              "note": "Hasilnya 45."
            }
          ]
        },
        {
          "key": "g2-s2-sub-basic-practice",
          "label": "Lesson 6",
          "title": "Latihan pengurangan tanpa meminjam",
          "description": "Berlatih soal mengurangkan dua bilangan dua angka tanpa teknik meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "47 - 25 = ?",
              "options": [
                "23",
                "20",
                "22",
                "21"
              ],
              "answer": "22",
              "explanation": "7 - 5 = 2 dan 4 - 2 = 2, hasilnya 22."
            },
            {
              "type": "practice",
              "question": "85 - 40 = ?",
              "options": [
                "35",
                "45",
                "40",
                "55"
              ],
              "answer": "45",
              "explanation": "5 - 0 = 5 dan 8 - 4 = 4, hasilnya 45."
            },
            {
              "type": "practice",
              "question": "68 - 34 = ?",
              "options": [
                "44",
                "36",
                "32",
                "34"
              ],
              "answer": "34",
              "explanation": "8 - 4 = 4 dan 6 - 3 = 3, hasilnya 34."
            },
            {
              "type": "practice",
              "question": "76 - 52 = ?",
              "mode": "input",
              "answer": "24",
              "explanation": "6 - 2 = 4 dan 7 - 5 = 2, hasilnya 24."
            },
            {
              "type": "practice",
              "question": "94 - 61 = ?",
              "mode": "input",
              "answer": "33",
              "explanation": "4 - 1 = 3 dan 9 - 6 = 3, hasilnya 33."
            },
            {
              "type": "practice",
              "question": "57 - 24 = ?",
              "mode": "input",
              "answer": "33",
              "explanation": "7 - 4 = 3 dan 5 - 2 = 3, hasilnya 33."
            }
          ]
        },
        {
          "key": "g2-s2-sub-borrow",
          "label": "Lesson 7",
          "title": "Pengurangan dengan meminjam",
          "description": "Mengurangkan dua bilangan dua angka dengan teknik meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Pengurangan dengan meminjam",
              "body": [
                "Jika satuan atas tidak cukup, pinjam 1 puluhan dari puluhan.",
                "1 puluhan sama dengan 10 satuan."
              ],
              "points": [
                "1 puluhan = 10 satuan",
                "Kurangi puluhan setelah meminjam"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 63 - 28",
              "body": [
                "Satuan 3 tidak cukup, pinjam menjadi 13 - 8 = 5.",
                "Puluhan 5 - 2 = 3."
              ],
              "expression": "63 - 28 = 35",
              "note": "Hasilnya 35."
            },
            {
              "type": "example",
              "title": "Contoh: 72 - 19",
              "body": [
                "Satuan 2 pinjam menjadi 12 - 9 = 3.",
                "Puluhan 6 - 1 = 5."
              ],
              "expression": "72 - 19 = 53",
              "note": "Hasilnya 53."
            }
          ]
        },
        {
          "key": "g2-s2-sub-borrow-practice",
          "label": "Lesson 8",
          "title": "Latihan pengurangan dengan meminjam",
          "description": "Berlatih soal mengurangkan dua bilangan dua angka dengan teknik meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "63 - 28 = ?",
              "options": [
                "91",
                "35",
                "41",
                "45"
              ],
              "answer": "35",
              "explanation": "12 - 8 = 5 dan 5 - 2 = 3, hasilnya 35."
            },
            {
              "type": "practice",
              "question": "72 - 19 = ?",
              "options": [
                "57",
                "63",
                "43",
                "53"
              ],
              "answer": "53",
              "explanation": "12 - 9 = 3 dan 6 - 1 = 5, hasilnya 53."
            },
            {
              "type": "practice",
              "question": "90 - 46 = ?",
              "options": [
                "54",
                "44",
                "56",
                "34"
              ],
              "answer": "44",
              "explanation": "10 - 6 = 4 dan 8 - 4 = 4, hasilnya 44."
            },
            {
              "type": "practice",
              "question": "81 - 37 = ?",
              "mode": "input",
              "answer": "44",
              "explanation": "11 - 7 = 4 dan 7 - 3 = 4, hasilnya 44."
            },
            {
              "type": "practice",
              "question": "50 - 26 = ?",
              "mode": "input",
              "answer": "24",
              "explanation": "10 - 6 = 4 dan 4 - 2 = 2, hasilnya 24."
            },
            {
              "type": "practice",
              "question": "64 - 38 = ?",
              "mode": "input",
              "answer": "26",
              "explanation": "14 - 8 = 6 dan 5 - 3 = 2, hasilnya 26."
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Stage 3",
      "title": "Perkalian & Pembagian Dasar",
      "icon": Divide,
      "locked": true,
      "lessons": [
        {
          "key": "g2-s3-mult-intro",
          "label": "Lesson 1",
          "title": "Perkalian sebagai penjumlahan berulang",
          "description": "Mengenal arti perkalian dengan penjumlahan berulang.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Arti perkalian",
              "body": [
                "Perkalian adalah penjumlahan yang diulang dengan bilangan yang sama.",
                "Simbol perkalian adalah x."
              ],
              "points": [
                "3 x 4 sama dengan 4 + 4 + 4",
                "4 x 2 sama dengan 2 + 2 + 2 + 2"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 3 x 4",
              "body": [
                "Angka 4 dijumlahkan sebanyak 3 kali."
              ],
              "expression": "4 + 4 + 4 = 12",
              "note": "Jadi 3 x 4 = 12."
            },
            {
              "type": "example",
              "title": "Contoh: 2 x 5",
              "body": [
                "Angka 5 dijumlahkan sebanyak 2 kali."
              ],
              "expression": "5 + 5 = 10",
              "note": "Jadi 2 x 5 = 10."
            }
          ]
        },
        {
          "key": "g2-s3-mult-intro-practice",
          "label": "Lesson 2",
          "title": "Latihan perkalian sebagai penjumlahan berulang",
          "description": "Berlatih soal mengenal arti perkalian dengan penjumlahan berulang.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "3 x 4 = ?",
              "options": [
                "11",
                "12",
                "10",
                "13"
              ],
              "answer": "12",
              "explanation": "4 + 4 + 4 = 12."
            },
            {
              "type": "practice",
              "question": "2 x 5 = ?",
              "options": [
                "12",
                "7",
                "9",
                "10"
              ],
              "answer": "10",
              "explanation": "5 + 5 = 10."
            },
            {
              "type": "practice",
              "question": "3 x 5 = ?",
              "options": [
                "12",
                "18",
                "20",
                "15"
              ],
              "answer": "15",
              "explanation": "5 + 5 + 5 = 15."
            },
            {
              "type": "practice",
              "question": "4 x 3 = ?",
              "mode": "input",
              "answer": "12",
              "explanation": "3 + 3 + 3 + 3 = 12."
            },
            {
              "type": "practice",
              "question": "5 x 2 = ?",
              "mode": "input",
              "answer": "10",
              "explanation": "2 + 2 + 2 + 2 + 2 = 10."
            },
            {
              "type": "practice",
              "question": "4 x 4 = ?",
              "mode": "input",
              "answer": "16",
              "explanation": "4 + 4 + 4 + 4 = 16."
            }
          ]
        },
        {
          "key": "g2-s3-mult-table",
          "label": "Lesson 3",
          "title": "Tabel perkalian 1 sampai 5",
          "description": "Menghafal perkalian 1 sampai 5.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Tabel perkalian",
              "body": [
                "Hafalkan tabel perkalian 1 sampai 5 agar berhitung cepat."
              ],
              "points": [
                "2 x 6 = 12",
                "3 x 7 = 21",
                "4 x 5 = 20",
                "5 x 6 = 30"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 2 x 8",
              "body": [
                "2 x 8 sama dengan 8 + 8."
              ],
              "expression": "2 x 8 = 16",
              "note": "Hasilnya 16."
            },
            {
              "type": "example",
              "title": "Contoh: 5 x 7",
              "body": [
                "5 x 7 sama dengan 7 + 7 + 7 + 7 + 7."
              ],
              "expression": "5 x 7 = 35",
              "note": "Hasilnya 35."
            }
          ]
        },
        {
          "key": "g2-s3-mult-table-practice",
          "label": "Lesson 4",
          "title": "Latihan tabel perkalian 1 sampai 5",
          "description": "Berlatih soal menghafal perkalian 1 sampai 5.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "2 x 6 = ?",
              "options": [
                "12",
                "10",
                "14",
                "16"
              ],
              "answer": "12",
              "explanation": "2 x 6 = 12."
            },
            {
              "type": "practice",
              "question": "3 x 7 = ?",
              "options": [
                "27",
                "21",
                "18",
                "24"
              ],
              "answer": "21",
              "explanation": "3 x 7 = 21."
            },
            {
              "type": "practice",
              "question": "4 x 5 = ?",
              "options": [
                "20",
                "25",
                "15",
                "24"
              ],
              "answer": "20",
              "explanation": "4 x 5 = 20."
            },
            {
              "type": "practice",
              "question": "5 x 6 = ?",
              "mode": "input",
              "answer": "30",
              "explanation": "5 x 6 = 30."
            },
            {
              "type": "practice",
              "question": "3 x 8 = ?",
              "mode": "input",
              "answer": "24",
              "explanation": "3 x 8 = 24."
            },
            {
              "type": "practice",
              "question": "4 x 7 = ?",
              "mode": "input",
              "answer": "28",
              "explanation": "4 x 7 = 28."
            }
          ]
        },
        {
          "key": "g2-s3-div-intro",
          "label": "Lesson 5",
          "title": "Pembagian sebagai pengurangan berulang",
          "description": "Mengenal arti pembagian sederhana.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Arti pembagian",
              "body": [
                "Pembagian adalah membagi sejumlah benda menjadi beberapa kelompok yang sama banyak.",
                "Simbol pembagian adalah : atau /."
              ],
              "points": [
                "12 : 3 artinya 12 dibagi 3",
                "Hasilnya adalah banyak kelompok"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 12 : 3",
              "body": [
                "12 benda dibagi menjadi kelompok isi 3."
              ],
              "expression": "12 : 3 = 4",
              "note": "Ada 4 kelompok."
            },
            {
              "type": "example",
              "title": "Contoh: 10 : 2",
              "body": [
                "10 benda dibagi dua sama banyak."
              ],
              "expression": "10 : 2 = 5",
              "note": "Setiap kelompok berisi 5."
            }
          ]
        },
        {
          "key": "g2-s3-div-intro-practice",
          "label": "Lesson 6",
          "title": "Latihan pembagian sebagai pengurangan berulang",
          "description": "Berlatih soal mengenal arti pembagian sederhana.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "12 : 3 = ?",
              "options": [
                "6",
                "4",
                "3",
                "5"
              ],
              "answer": "4",
              "explanation": "12 dibagi 3 menghasilkan 4."
            },
            {
              "type": "practice",
              "question": "10 : 2 = ?",
              "options": [
                "4",
                "6",
                "8",
                "5"
              ],
              "answer": "5",
              "explanation": "10 dibagi 2 menghasilkan 5."
            },
            {
              "type": "practice",
              "question": "15 : 5 = ?",
              "options": [
                "2",
                "5",
                "3",
                "4"
              ],
              "answer": "3",
              "explanation": "15 dibagi 5 menghasilkan 3."
            },
            {
              "type": "practice",
              "question": "20 : 4 = ?",
              "mode": "input",
              "answer": "5",
              "explanation": "20 dibagi 4 menghasilkan 5."
            },
            {
              "type": "practice",
              "question": "18 : 3 = ?",
              "mode": "input",
              "answer": "6",
              "explanation": "18 dibagi 3 menghasilkan 6."
            },
            {
              "type": "practice",
              "question": "16 : 2 = ?",
              "mode": "input",
              "answer": "8",
              "explanation": "16 dibagi 2 menghasilkan 8."
            }
          ]
        },
        {
          "key": "g2-s3-mult-div",
          "label": "Lesson 7",
          "title": "Hubungan perkalian dan pembagian",
          "description": "Menghubungkan perkalian dengan pembagian.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Hubungan perkalian dan pembagian",
              "body": [
                "Pembagian adalah kebalikan dari perkalian.",
                "Jika 3 x 4 = 12, maka 12 : 3 = 4 dan 12 : 4 = 3."
              ],
              "points": [
                "Perkalian dan pembagian saling berkebalikan"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: dari 6 x 2",
              "body": [
                "Karena 6 x 2 = 12."
              ],
              "expression": "12 : 6 = 2",
              "note": "Kebalikan dari 6 x 2."
            },
            {
              "type": "example",
              "title": "Contoh: dari 5 x 4",
              "body": [
                "Karena 5 x 4 = 20."
              ],
              "expression": "20 : 5 = 4",
              "note": "Kebalikan dari 5 x 4."
            }
          ]
        },
        {
          "key": "g2-s3-mult-div-practice",
          "label": "Lesson 8",
          "title": "Latihan hubungan perkalian dan pembagian",
          "description": "Berlatih soal menghubungkan perkalian dengan pembagian.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Jika 3 x 4 = 12, maka 12 : 4 = ?",
              "options": [
                "2",
                "4",
                "6",
                "3"
              ],
              "answer": "3",
              "explanation": "Kebalikan dari perkalian."
            },
            {
              "type": "practice",
              "question": "Jika 5 x 4 = 20, maka 20 : 5 = ?",
              "options": [
                "5",
                "4",
                "3",
                "6"
              ],
              "answer": "4",
              "explanation": "Kebalikan dari perkalian."
            },
            {
              "type": "practice",
              "question": "Jika 6 x 3 = 18, maka 18 : 3 = ?",
              "mode": "input",
              "answer": "6",
              "explanation": "Kebalikan dari perkalian."
            },
            {
              "type": "practice",
              "question": "Jika 7 x 2 = 14, maka 14 : 2 = ?",
              "mode": "input",
              "answer": "7",
              "explanation": "Kebalikan dari perkalian."
            },
            {
              "type": "practice",
              "question": "Jika 5 x 5 = 25, maka 25 : 5 = ?",
              "mode": "input",
              "answer": "5",
              "explanation": "Kebalikan dari perkalian."
            },
            {
              "type": "practice",
              "question": "Jika 4 x 6 = 24, maka 24 : 6 = ?",
              "mode": "input",
              "answer": "4",
              "explanation": "Kebalikan dari perkalian."
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "Stage 4",
      "title": "Soal Cerita",
      "icon": Ruler,
      "locked": true,
      "lessons": [
        {
          "key": "g2-s4-story-add",
          "label": "Lesson 1",
          "title": "Soal cerita penjumlahan",
          "description": "Menyelesaikan soal cerita penjumlahan sampai 100.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita penjumlahan",
              "body": [
                "Kata \"jumlah\", \"seluruhnya\", atau \"lagi\" biasanya menandakan penjumlahan."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Di perpustakaan ada 45 buku, datang 28 buku lagi. Berapa jumlahnya?"
              ],
              "expression": "45 + 28 = 73",
              "note": "Jumlah buku 73."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Rina punya 56 perangko, mendapat 27 perangko lagi."
              ],
              "expression": "56 + 27 = 83",
              "note": "Jumlahnya 83."
            }
          ]
        },
        {
          "key": "g2-s4-story-add-practice",
          "label": "Lesson 2",
          "title": "Latihan soal cerita penjumlahan",
          "description": "Berlatih soal menyelesaikan soal cerita penjumlahan sampai 100.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Rina mengumpulkan 56 perangko. Ia mendapat 27 perangko lagi. Berapa jumlah perangko Rina sekarang?",
              "options": [
                "93",
                "83",
                "82",
                "73"
              ],
              "answer": "83",
              "explanation": "56 + 27 = 83."
            },
            {
              "type": "practice",
              "question": "Dodi membaca 48 halaman kemarin dan 35 halaman hari ini. Berapa jumlah halaman yang dibaca?",
              "options": [
                "82",
                "93",
                "73",
                "83"
              ],
              "answer": "83",
              "explanation": "48 + 35 = 83."
            },
            {
              "type": "practice",
              "question": "Pak Budi memanen 37 mangga lalu 26 mangga lagi. Berapa jumlah mangga?",
              "mode": "input",
              "answer": "63",
              "explanation": "37 + 26 = 63."
            },
            {
              "type": "practice",
              "question": "Ada 54 kursi, ditambah 28 kursi lagi. Berapa jumlah kursi?",
              "mode": "input",
              "answer": "82",
              "explanation": "54 + 28 = 82."
            },
            {
              "type": "practice",
              "question": "Lina menabung 45 ribu, lalu menambah 38 ribu. Berapa total tabungan?",
              "mode": "input",
              "answer": "83",
              "explanation": "45 + 38 = 83."
            },
            {
              "type": "practice",
              "question": "Ada 64 buku di rak, ditambah 29 buku lagi. Berapa jumlahnya?",
              "mode": "input",
              "answer": "93",
              "explanation": "64 + 29 = 93."
            }
          ]
        },
        {
          "key": "g2-s4-story-sub",
          "label": "Lesson 3",
          "title": "Soal cerita pengurangan",
          "description": "Menyelesaikan soal cerita pengurangan sampai 100.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita pengurangan",
              "body": [
                "Kata \"sisa\", \"tersisa\", atau \"diberikan\" biasanya menandakan pengurangan."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ibu punya 80 telur, 26 telur pecah. Berapa yang masih bagus?"
              ],
              "expression": "80 - 26 = 54",
              "note": "Tersisa 54 telur."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 90 mangga, 38 mangga dijual."
              ],
              "expression": "90 - 38 = 52",
              "note": "Tersisa 52 mangga."
            }
          ]
        },
        {
          "key": "g2-s4-story-sub-practice",
          "label": "Lesson 4",
          "title": "Latihan soal cerita pengurangan",
          "description": "Berlatih soal menyelesaikan soal cerita pengurangan sampai 100.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Pak Andi memiliki 90 mangga. Sebanyak 38 mangga dijual. Berapa mangga yang tersisa?",
              "options": [
                "62",
                "128",
                "42",
                "52"
              ],
              "answer": "52",
              "explanation": "90 - 38 = 52."
            },
            {
              "type": "practice",
              "question": "Nenek punya 75 kue, 28 kue dimakan. Berapa sisa kue?",
              "options": [
                "47",
                "53",
                "43",
                "57"
              ],
              "answer": "47",
              "explanation": "75 - 28 = 47."
            },
            {
              "type": "practice",
              "question": "Ada 64 pensil, terjual 29 pensil. Berapa sisa pensil?",
              "mode": "input",
              "answer": "35",
              "explanation": "64 - 29 = 35."
            },
            {
              "type": "practice",
              "question": "Siti punya 82 kelereng, ia memberi 45 kelereng. Berapa sisanya?",
              "mode": "input",
              "answer": "37",
              "explanation": "82 - 45 = 37."
            },
            {
              "type": "practice",
              "question": "Kebun punya 96 bunga, 49 bunga dipetik. Berapa sisa bunga?",
              "mode": "input",
              "answer": "47",
              "explanation": "96 - 49 = 47."
            },
            {
              "type": "practice",
              "question": "Perpustakaan punya 70 buku, 26 buku dipinjam. Berapa sisa buku?",
              "mode": "input",
              "answer": "44",
              "explanation": "70 - 26 = 44."
            }
          ]
        },
        {
          "key": "g2-s4-story-mult",
          "label": "Lesson 5",
          "title": "Soal cerita perkalian",
          "description": "Menyelesaikan soal cerita perkalian sederhana.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita perkalian",
              "body": [
                "Kata \"setiap\" atau \"masing-masing\" biasanya menandakan perkalian."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 5 kotak, setiap kotak berisi 4 pensil. Berapa jumlah pensil?"
              ],
              "expression": "5 x 4 = 20",
              "note": "Jumlahnya 20."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 3 keranjang, setiap keranjang berisi 6 mangga."
              ],
              "expression": "3 x 6 = 18",
              "note": "Jumlahnya 18."
            }
          ]
        },
        {
          "key": "g2-s4-story-mult-practice",
          "label": "Lesson 6",
          "title": "Latihan soal cerita perkalian",
          "description": "Berlatih soal menyelesaikan soal cerita perkalian sederhana.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Ada 5 kotak. Setiap kotak berisi 7 permen. Berapa jumlah permen seluruhnya?",
              "options": [
                "40",
                "30",
                "35",
                "45"
              ],
              "answer": "35",
              "explanation": "5 x 7 = 35."
            },
            {
              "type": "practice",
              "question": "Ada 3 keranjang. Setiap keranjang berisi 8 mangga. Berapa jumlah mangga?",
              "options": [
                "24",
                "27",
                "21",
                "32"
              ],
              "answer": "24",
              "explanation": "3 x 8 = 24."
            },
            {
              "type": "practice",
              "question": "Ada 6 meja, setiap meja 5 kursi. Berapa jumlah kursi?",
              "mode": "input",
              "answer": "30",
              "explanation": "6 x 5 = 30."
            },
            {
              "type": "practice",
              "question": "Ada 4 kotak, setiap kotak 9 bola. Berapa jumlah bola?",
              "mode": "input",
              "answer": "36",
              "explanation": "4 x 9 = 36."
            },
            {
              "type": "practice",
              "question": "Ada 7 tas, setiap tas 3 buku. Berapa jumlah buku?",
              "mode": "input",
              "answer": "21",
              "explanation": "7 x 3 = 21."
            },
            {
              "type": "practice",
              "question": "Ada 8 gelas, setiap gelas 2 sedotan. Berapa jumlah sedotan?",
              "mode": "input",
              "answer": "16",
              "explanation": "8 x 2 = 16."
            }
          ]
        },
        {
          "key": "g2-s4-story-mixed",
          "label": "Lesson 7",
          "title": "Soal cerita campuran",
          "description": "Menyelesaikan soal cerita campuran perkalian dan pembagian.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita campuran",
              "body": [
                "Bacalah dengan teliti untuk menentukan operasi yang tepat."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 6 kotak, setiap kotak berisi 5 pensil."
              ],
              "expression": "6 x 5 = 30",
              "note": "Jumlahnya 30."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 30 pensil, dipakai 12 pensil."
              ],
              "expression": "30 - 12 = 18",
              "note": "Tersisa 18."
            }
          ]
        },
        {
          "key": "g2-s4-story-mixed-practice",
          "label": "Lesson 8",
          "title": "Latihan soal cerita campuran",
          "description": "Berlatih soal menyelesaikan soal cerita campuran perkalian dan pembagian.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Ada 4 kotak. Setiap kotak berisi 8 buku. Berapa jumlah buku seluruhnya?",
              "options": [
                "32",
                "40",
                "28",
                "36"
              ],
              "answer": "32",
              "explanation": "4 x 8 = 32."
            },
            {
              "type": "practice",
              "question": "48 buku dibagi rata ke 6 rak. Berapa buku di setiap rak?",
              "options": [
                "9",
                "7",
                "8",
                "6"
              ],
              "answer": "8",
              "explanation": "48 : 6 = 8."
            },
            {
              "type": "practice",
              "question": "Ada 7 kotak, setiap kotak 9 kelereng. Berapa jumlah kelereng?",
              "mode": "input",
              "answer": "63",
              "explanation": "7 x 9 = 63."
            },
            {
              "type": "practice",
              "question": "36 permen dibagi rata ke 6 anak. Berapa permen untuk setiap anak?",
              "mode": "input",
              "answer": "6",
              "explanation": "36 : 6 = 6."
            },
            {
              "type": "practice",
              "question": "Ada 5 keranjang, setiap keranjang 6 jeruk. Berapa jumlah jeruk?",
              "mode": "input",
              "answer": "30",
              "explanation": "5 x 6 = 30."
            },
            {
              "type": "practice",
              "question": "45 bunga dibagi ke 9 vas sama banyak. Berapa bunga di setiap vas?",
              "mode": "input",
              "answer": "5",
              "explanation": "45 : 9 = 5."
            }
          ]
        }
      ]
    }
  ]
},
  '3': {
  "grade": "3",
  "title": "Matematika Kelas 3",
  "subtitle": "Bilangan sampai 1.000, perkalian dan pembagian, pecahan sederhana, serta hitung campuran.",
  "stages": [
    {
      "id": 1,
      "name": "Stage 1",
      "title": "Bilangan sampai 1.000",
      "icon": Hash,
      "lessons": [
        {
          "key": "g3-s1-place-value",
          "label": "Lesson 1",
          "title": "Nilai tempat sampai ribuan",
          "description": "Menentukan nilai tempat ribuan, ratusan, puluhan, dan satuan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Nilai tempat",
              "body": [
                "Nilai tempat dari kiri ke kanan adalah ribuan, ratusan, puluhan, dan satuan."
              ],
              "points": [
                "Ribuan bernilai 1.000",
                "Ratusan bernilai 100",
                "Puluhan bernilai 10",
                "Satuan bernilai 1"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: bilangan 345",
              "body": [
                "Angka 3 ratusan, 4 puluhan, dan 5 satuan."
              ],
              "expression": "300 + 40 + 5 = 345",
              "note": "Nilai tempat tiap angka berbeda."
            },
            {
              "type": "example",
              "title": "Contoh: bilangan 1.208",
              "body": [
                "Angka 1 ribuan, 2 ratusan, 0 puluhan, dan 8 satuan."
              ],
              "expression": "1000 + 200 + 0 + 8 = 1208",
              "note": "Angka 0 tetap menempati nilai tempat."
            }
          ]
        },
        {
          "key": "g3-s1-place-value-practice",
          "label": "Lesson 2",
          "title": "Latihan nilai tempat sampai ribuan",
          "description": "Berlatih soal menentukan nilai tempat ribuan, ratusan, puluhan, dan satuan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Angka 7 pada bilangan 1.743 menempati nilai tempat apa?",
              "options": [
                "Ribuan",
                "Satuan",
                "Ratusan",
                "Puluhan"
              ],
              "answer": "Ratusan",
              "explanation": "Pada 1.743, angka 7 berada di posisi ratusan."
            },
            {
              "type": "practice",
              "question": "Angka 4 pada bilangan 2.540 menempati nilai tempat apa?",
              "options": [
                "Ribuan",
                "Ratusan",
                "Satuan",
                "Puluhan"
              ],
              "answer": "Puluhan",
              "explanation": "Pada 2.540, angka 4 berada di posisi puluhan."
            },
            {
              "type": "practice",
              "question": "Angka 3 pada bilangan 3.000 menempati nilai tempat apa?",
              "options": [
                "Puluhan",
                "Ratusan",
                "Ribuan",
                "Satuan"
              ],
              "answer": "Ribuan",
              "explanation": "Pada 3.000, angka 3 berada di posisi ribuan."
            },
            {
              "type": "practice",
              "question": "Nilai dari angka 6 pada bilangan 1.600 adalah ...",
              "mode": "input",
              "answer": "600",
              "explanation": "Angka 6 di posisi ratusan bernilai 600."
            },
            {
              "type": "practice",
              "question": "Nilai dari angka 5 pada bilangan 2.350 adalah ...",
              "mode": "input",
              "answer": "50",
              "explanation": "Angka 5 di posisi puluhan bernilai 50."
            },
            {
              "type": "practice",
              "question": "Bilangan dari 2 ribuan 4 ratusan 0 puluhan 8 satuan adalah ...",
              "mode": "input",
              "answer": "2408",
              "explanation": "Terbentuk bilangan 2408."
            }
          ]
        },
        {
          "key": "g3-s1-compare",
          "label": "Lesson 3",
          "title": "Membandingkan bilangan",
          "description": "Membandingkan bilangan sampai 1.000.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Membandingkan bilangan",
              "body": [
                "Bandingkan mulai dari nilai tempat paling kiri."
              ],
              "points": [
                "452 lebih besar dari 425",
                "638 lebih kecil dari 683"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 452 ... 425",
              "body": [
                "Ratusan sama 4, puluhan 5 lebih besar dari 2."
              ],
              "expression": "452 > 425",
              "note": "452 lebih besar."
            },
            {
              "type": "example",
              "title": "Contoh: 638 ... 683",
              "body": [
                "Ratusan sama 6, puluhan 3 lebih kecil dari 8."
              ],
              "expression": "638 < 683",
              "note": "638 lebih kecil."
            }
          ]
        },
        {
          "key": "g3-s1-compare-practice",
          "label": "Lesson 4",
          "title": "Latihan membandingkan bilangan",
          "description": "Berlatih soal membandingkan bilangan sampai 1.000.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "512 ... 521. Tanda yang tepat adalah ...",
              "options": [
                "<",
                ">",
                "="
              ],
              "answer": "<",
              "explanation": "512 lebih kecil dari 521."
            },
            {
              "type": "practice",
              "question": "740 ... 704. Tanda yang tepat adalah ...",
              "options": [
                "<",
                ">",
                "="
              ],
              "answer": ">",
              "explanation": "740 lebih besar dari 704."
            },
            {
              "type": "practice",
              "question": "399 ... 401. Tanda yang tepat adalah ...",
              "options": [
                ">",
                "=",
                "<"
              ],
              "answer": "<",
              "explanation": "399 lebih kecil dari 401."
            },
            {
              "type": "practice",
              "question": "Bilangan terbesar di antara 465, 645, dan 456 adalah ...",
              "mode": "input",
              "answer": "645",
              "explanation": "645 memiliki ratusan paling besar."
            },
            {
              "type": "practice",
              "question": "Bilangan terkecil di antara 465, 645, dan 456 adalah ...",
              "mode": "input",
              "answer": "456",
              "explanation": "456 paling kecil."
            },
            {
              "type": "practice",
              "question": "Bilangan yang lebih besar antara 802 dan 820 adalah ...",
              "mode": "input",
              "answer": "820",
              "explanation": "820 lebih besar dari 802."
            }
          ]
        },
        {
          "key": "g3-s1-ordering",
          "label": "Lesson 5",
          "title": "Mengurutkan bilangan",
          "description": "Mengurutkan bilangan sampai 1.000.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Mengurutkan bilangan",
              "body": [
                "Urutkan dari yang terkecil (naik) atau dari yang terbesar (turun)."
              ]
            },
            {
              "type": "example",
              "title": "Contoh: urutan naik",
              "body": [
                "320, 302, 230 diurutkan naik."
              ],
              "expression": "230, 302, 320",
              "note": "Dari terkecil ke terbesar."
            },
            {
              "type": "example",
              "title": "Contoh: urutan turun",
              "body": [
                "320, 302, 230 diurutkan turun."
              ],
              "expression": "320, 302, 230",
              "note": "Dari terbesar ke terkecil."
            }
          ]
        },
        {
          "key": "g3-s1-ordering-practice",
          "label": "Lesson 6",
          "title": "Latihan mengurutkan bilangan",
          "description": "Berlatih soal mengurutkan bilangan sampai 1.000.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Urutan naik dari 320, 302, dan 230 adalah ...",
              "options": [
                "230, 320, 302",
                "320, 302, 230",
                "302, 230, 320",
                "230, 302, 320"
              ],
              "answer": "230, 302, 320",
              "explanation": "230 lebih kecil dari 302 lebih kecil dari 320."
            },
            {
              "type": "practice",
              "question": "Urutan turun dari 320, 302, dan 230 adalah ...",
              "options": [
                "230, 302, 320",
                "320, 302, 230",
                "302, 230, 320",
                "230, 320, 302"
              ],
              "answer": "320, 302, 230",
              "explanation": "320 lebih besar dari 302 lebih besar dari 230."
            },
            {
              "type": "practice",
              "question": "Urutan naik dari 615, 561, dan 651 adalah ...",
              "mode": "input",
              "answer": "561, 615, 651",
              "explanation": "Dari terkecil ke terbesar."
            },
            {
              "type": "practice",
              "question": "Urutan turun dari 615, 561, dan 651 adalah ...",
              "mode": "input",
              "answer": "651, 615, 561",
              "explanation": "Dari terbesar ke terkecil."
            },
            {
              "type": "practice",
              "question": "Bilangan terkecil dari 708, 780, dan 718 adalah ...",
              "mode": "input",
              "answer": "708",
              "explanation": "708 paling kecil."
            },
            {
              "type": "practice",
              "question": "Bilangan terbesar dari 708, 780, dan 718 adalah ...",
              "mode": "input",
              "answer": "780",
              "explanation": "780 paling besar."
            }
          ]
        },
        {
          "key": "g3-s1-pattern",
          "label": "Lesson 7",
          "title": "Pola bilangan",
          "description": "Melanjutkan pola bilangan naik dan turun.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Pola bilangan",
              "body": [
                "Pola bilangan adalah deretan bilangan yang berubah dengan aturan tertentu.",
                "Contoh pola bertambah 3: 2, 5, 8, 11."
              ],
              "points": [
                "Bertambah 2: 1, 3, 5, 7",
                "Bertambah 5: 5, 10, 15, 20"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: pola bertambah 3",
              "body": [
                "Mulai dari 2, tambah 3 terus."
              ],
              "expression": "2, 5, 8, 11",
              "note": "Bilangan berikutnya 14."
            },
            {
              "type": "example",
              "title": "Contoh: pola berkurang 4",
              "body": [
                "Mulai dari 20, kurang 4 terus."
              ],
              "expression": "20, 16, 12, 8",
              "note": "Bilangan berikutnya 4."
            }
          ]
        },
        {
          "key": "g3-s1-pattern-practice",
          "label": "Lesson 8",
          "title": "Latihan pola bilangan",
          "description": "Berlatih soal melanjutkan pola bilangan naik dan turun.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Lanjutkan pola: 2, 5, 8, 11, ...",
              "options": [
                "13",
                "15",
                "14",
                "12"
              ],
              "answer": "14",
              "explanation": "Pola bertambah 3."
            },
            {
              "type": "practice",
              "question": "Lanjutkan pola: 20, 16, 12, 8, ...",
              "options": [
                "6",
                "0",
                "4",
                "2"
              ],
              "answer": "4",
              "explanation": "Pola berkurang 4."
            },
            {
              "type": "practice",
              "question": "Lanjutkan pola: 5, 10, 15, 20, ...",
              "mode": "input",
              "answer": "25",
              "explanation": "Pola bertambah 5."
            },
            {
              "type": "practice",
              "question": "Lanjutkan pola: 3, 6, 9, 12, ...",
              "mode": "input",
              "answer": "15",
              "explanation": "Pola bertambah 3."
            },
            {
              "type": "practice",
              "question": "Lanjutkan pola: 100, 90, 80, 70, ...",
              "mode": "input",
              "answer": "60",
              "explanation": "Pola berkurang 10."
            },
            {
              "type": "practice",
              "question": "Lanjutkan pola: 1, 4, 7, 10, ...",
              "mode": "input",
              "answer": "13",
              "explanation": "Pola bertambah 3."
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Stage 2",
      "title": "Penjumlahan & Pengurangan sampai 1.000",
      "icon": Calculator,
      "locked": true,
      "lessons": [
        {
          "key": "g3-s2-add-basic",
          "label": "Lesson 1",
          "title": "Penjumlahan bersusun",
          "description": "Menjumlahkan bilangan tiga angka tanpa menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Penjumlahan bersusun",
              "body": [
                "Susun bilangan sesuai nilai tempat, lalu jumlahkan mulai dari satuan."
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 234 + 152",
              "body": [
                "Satuan 4 + 2 = 6, puluhan 3 + 5 = 8, ratusan 2 + 1 = 3."
              ],
              "expression": "234 + 152 = 386",
              "note": "Hasilnya 386."
            },
            {
              "type": "example",
              "title": "Contoh: 315 + 240",
              "body": [
                "5 + 0 = 5, 1 + 4 = 5, 3 + 2 = 5."
              ],
              "expression": "315 + 240 = 555",
              "note": "Hasilnya 555."
            }
          ]
        },
        {
          "key": "g3-s2-add-basic-practice",
          "label": "Lesson 2",
          "title": "Latihan penjumlahan bersusun",
          "description": "Berlatih soal menjumlahkan bilangan tiga angka tanpa menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "234 + 152 = ?",
              "options": [
                "286",
                "376",
                "396",
                "386"
              ],
              "answer": "386",
              "explanation": "4 + 2 = 6, 3 + 5 = 8, 2 + 1 = 3, hasilnya 386."
            },
            {
              "type": "practice",
              "question": "315 + 240 = ?",
              "options": [
                "565",
                "545",
                "555",
                "455"
              ],
              "answer": "555",
              "explanation": "5 + 0 = 5, 1 + 4 = 5, 3 + 2 = 5, hasilnya 555."
            },
            {
              "type": "practice",
              "question": "412 + 235 = ?",
              "options": [
                "637",
                "747",
                "657",
                "647"
              ],
              "answer": "647",
              "explanation": "2 + 5 = 7, 1 + 3 = 4, 4 + 2 = 6, hasilnya 647."
            },
            {
              "type": "practice",
              "question": "521 + 168 = ?",
              "mode": "input",
              "answer": "689",
              "explanation": "1 + 8 = 9, 2 + 6 = 8, 5 + 1 = 6, hasilnya 689."
            },
            {
              "type": "practice",
              "question": "243 + 314 = ?",
              "mode": "input",
              "answer": "557",
              "explanation": "3 + 4 = 7, 4 + 1 = 5, 2 + 3 = 5, hasilnya 557."
            },
            {
              "type": "practice",
              "question": "405 + 282 = ?",
              "mode": "input",
              "answer": "687",
              "explanation": "5 + 2 = 7, 0 + 8 = 8, 4 + 2 = 6, hasilnya 687."
            }
          ]
        },
        {
          "key": "g3-s2-add-carry",
          "label": "Lesson 3",
          "title": "Penjumlahan dengan menyimpan",
          "description": "Menjumlahkan bilangan tiga angka dengan teknik menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Penjumlahan dengan menyimpan",
              "body": [
                "Jika jumlah satu kolom 10 atau lebih, simpan 1 ke kolom di sebelah kirinya."
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 468 + 275",
              "body": [
                "8 + 5 = 13 tulis 3 simpan 1, 6 + 7 + 1 = 14 tulis 4 simpan 1, 4 + 2 + 1 = 7."
              ],
              "expression": "468 + 275 = 743",
              "note": "Hasilnya 743."
            },
            {
              "type": "example",
              "title": "Contoh: 527 + 186",
              "body": [
                "7 + 6 = 13 simpan 1, 2 + 8 + 1 = 11 simpan 1, 5 + 1 + 1 = 7."
              ],
              "expression": "527 + 186 = 713",
              "note": "Hasilnya 713."
            }
          ]
        },
        {
          "key": "g3-s2-add-carry-practice",
          "label": "Lesson 4",
          "title": "Latihan penjumlahan dengan menyimpan",
          "description": "Berlatih soal menjumlahkan bilangan tiga angka dengan teknik menyimpan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "468 + 275 = ?",
              "options": [
                "633",
                "643",
                "783",
                "743"
              ],
              "answer": "743",
              "explanation": "Hasilnya 743."
            },
            {
              "type": "practice",
              "question": "527 + 186 = ?",
              "options": [
                "723",
                "603",
                "703",
                "713"
              ],
              "answer": "713",
              "explanation": "Hasilnya 713."
            },
            {
              "type": "practice",
              "question": "649 + 152 = ?",
              "options": [
                "801",
                "791",
                "811",
                "901"
              ],
              "answer": "801",
              "explanation": "9 + 2 = 11 simpan 1, 4 + 5 + 1 = 10 simpan 1, 6 + 1 + 1 = 8, hasilnya 801."
            },
            {
              "type": "practice",
              "question": "376 + 245 = ?",
              "mode": "input",
              "answer": "621",
              "explanation": "Hasilnya 621."
            },
            {
              "type": "practice",
              "question": "489 + 267 = ?",
              "mode": "input",
              "answer": "756",
              "explanation": "Hasilnya 756."
            },
            {
              "type": "practice",
              "question": "158 + 279 = ?",
              "mode": "input",
              "answer": "437",
              "explanation": "Hasilnya 437."
            }
          ]
        },
        {
          "key": "g3-s2-sub-basic",
          "label": "Lesson 5",
          "title": "Pengurangan bersusun",
          "description": "Mengurangkan bilangan tiga angka tanpa meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Pengurangan bersusun",
              "body": [
                "Kurangkan mulai dari satuan, lalu puluhan, lalu ratusan."
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 486 - 253",
              "body": [
                "6 - 3 = 3, 8 - 5 = 3, 4 - 2 = 2."
              ],
              "expression": "486 - 253 = 233",
              "note": "Hasilnya 233."
            },
            {
              "type": "example",
              "title": "Contoh: 750 - 320",
              "body": [
                "0 - 0 = 0, 5 - 2 = 3, 7 - 3 = 4."
              ],
              "expression": "750 - 320 = 430",
              "note": "Hasilnya 430."
            }
          ]
        },
        {
          "key": "g3-s2-sub-basic-practice",
          "label": "Lesson 6",
          "title": "Latihan pengurangan bersusun",
          "description": "Berlatih soal mengurangkan bilangan tiga angka tanpa meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "486 - 253 = ?",
              "options": [
                "333",
                "233",
                "223",
                "243"
              ],
              "answer": "233",
              "explanation": "6 - 3 = 3, 8 - 5 = 3, 4 - 2 = 2, hasilnya 233."
            },
            {
              "type": "practice",
              "question": "750 - 320 = ?",
              "options": [
                "430",
                "530",
                "440",
                "420"
              ],
              "answer": "430",
              "explanation": "0 - 0 = 0, 5 - 2 = 3, 7 - 3 = 4, hasilnya 430."
            },
            {
              "type": "practice",
              "question": "896 - 452 = ?",
              "options": [
                "454",
                "544",
                "444",
                "434"
              ],
              "answer": "444",
              "explanation": "6 - 2 = 4, 9 - 5 = 4, 8 - 4 = 4, hasilnya 444."
            },
            {
              "type": "practice",
              "question": "758 - 346 = ?",
              "mode": "input",
              "answer": "412",
              "explanation": "8 - 6 = 2, 5 - 4 = 1, 7 - 3 = 4, hasilnya 412."
            },
            {
              "type": "practice",
              "question": "965 - 720 = ?",
              "mode": "input",
              "answer": "245",
              "explanation": "5 - 0 = 5, 6 - 2 = 4, 9 - 7 = 2, hasilnya 245."
            },
            {
              "type": "practice",
              "question": "689 - 175 = ?",
              "mode": "input",
              "answer": "514",
              "explanation": "9 - 5 = 4, 8 - 7 = 1, 6 - 1 = 5, hasilnya 514."
            }
          ]
        },
        {
          "key": "g3-s2-sub-borrow",
          "label": "Lesson 7",
          "title": "Pengurangan dengan meminjam",
          "description": "Mengurangkan bilangan tiga angka dengan teknik meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Pengurangan dengan meminjam",
              "body": [
                "Jika tidak cukup, pinjam 1 dari kolom di sebelah kirinya.",
                "1 ratusan sama dengan 10 puluhan, 1 puluhan sama dengan 10 satuan."
              ],
              "points": [
                "1 ratusan = 10 puluhan",
                "1 puluhan = 10 satuan"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 532 - 268",
              "body": [
                "12 - 8 = 4, 12 - 6 = 6, 4 - 2 = 2."
              ],
              "expression": "532 - 268 = 264",
              "note": "Hasilnya 264."
            },
            {
              "type": "example",
              "title": "Contoh: 604 - 236",
              "body": [
                "14 - 6 = 8, 9 - 3 = 6, 5 - 2 = 3."
              ],
              "expression": "604 - 236 = 368",
              "note": "Hasilnya 368."
            }
          ]
        },
        {
          "key": "g3-s2-sub-borrow-practice",
          "label": "Lesson 8",
          "title": "Latihan pengurangan dengan meminjam",
          "description": "Berlatih soal mengurangkan bilangan tiga angka dengan teknik meminjam.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "532 - 268 = ?",
              "options": [
                "274",
                "254",
                "264",
                "364"
              ],
              "answer": "264",
              "explanation": "12 - 8 = 4, 12 - 6 = 6, 4 - 2 = 2, hasilnya 264."
            },
            {
              "type": "practice",
              "question": "604 - 236 = ?",
              "options": [
                "478",
                "368",
                "358",
                "378"
              ],
              "answer": "368",
              "explanation": "14 - 6 = 8, 9 - 3 = 6, 5 - 2 = 3, hasilnya 368."
            },
            {
              "type": "practice",
              "question": "900 - 458 = ?",
              "options": [
                "542",
                "442",
                "432",
                "452"
              ],
              "answer": "442",
              "explanation": "10 - 8 = 2, 9 - 5 = 4, 8 - 4 = 4, hasilnya 442."
            },
            {
              "type": "practice",
              "question": "703 - 268 = ?",
              "mode": "input",
              "answer": "435",
              "explanation": "13 - 8 = 5, 9 - 6 = 3, 6 - 2 = 4, hasilnya 435."
            },
            {
              "type": "practice",
              "question": "812 - 457 = ?",
              "mode": "input",
              "answer": "355",
              "explanation": "12 - 7 = 5, 10 - 5 = 5, 7 - 4 = 3, hasilnya 355."
            },
            {
              "type": "practice",
              "question": "521 - 147 = ?",
              "mode": "input",
              "answer": "374",
              "explanation": "11 - 7 = 4, 11 - 4 = 7, 4 - 1 = 3, hasilnya 374."
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "name": "Stage 3",
      "title": "Perkalian & Pembagian",
      "icon": Divide,
      "locked": true,
      "lessons": [
        {
          "key": "g3-s3-mult-intro",
          "label": "Lesson 1",
          "title": "Perkalian sebagai penjumlahan berulang",
          "description": "Mengenal arti perkalian.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Perkalian sebagai penjumlahan berulang",
              "body": [
                "Perkalian adalah penjumlahan berulang dengan bilangan yang sama."
              ],
              "points": [
                "4 x 6 sama dengan 6 + 6 + 6 + 6"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 4 x 6",
              "body": [
                "Angka 6 dijumlahkan sebanyak 4 kali."
              ],
              "expression": "6 + 6 + 6 + 6 = 24",
              "note": "Jadi 4 x 6 = 24."
            },
            {
              "type": "example",
              "title": "Contoh: 5 x 3",
              "body": [
                "Angka 3 dijumlahkan sebanyak 5 kali."
              ],
              "expression": "3 + 3 + 3 + 3 + 3 = 15",
              "note": "Jadi 5 x 3 = 15."
            }
          ]
        },
        {
          "key": "g3-s3-mult-intro-practice",
          "label": "Lesson 2",
          "title": "Latihan perkalian sebagai penjumlahan berulang",
          "description": "Berlatih soal mengenal arti perkalian.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "4 x 6 = ?",
              "options": [
                "24",
                "20",
                "28",
                "18"
              ],
              "answer": "24",
              "explanation": "6 + 6 + 6 + 6 = 24."
            },
            {
              "type": "practice",
              "question": "5 x 3 = ?",
              "options": [
                "12",
                "15",
                "10",
                "18"
              ],
              "answer": "15",
              "explanation": "3 + 3 + 3 + 3 + 3 = 15."
            },
            {
              "type": "practice",
              "question": "3 x 9 = ?",
              "mode": "input",
              "answer": "27",
              "explanation": "9 + 9 + 9 = 27."
            },
            {
              "type": "practice",
              "question": "6 x 4 = ?",
              "mode": "input",
              "answer": "24",
              "explanation": "4 + 4 + 4 + 4 + 4 + 4 = 24."
            },
            {
              "type": "practice",
              "question": "7 x 2 = ?",
              "mode": "input",
              "answer": "14",
              "explanation": "2 + 2 + 2 + 2 + 2 + 2 + 2 = 14."
            },
            {
              "type": "practice",
              "question": "8 x 3 = ?",
              "mode": "input",
              "answer": "24",
              "explanation": "3 + 3 + 3 + 3 + 3 + 3 + 3 + 3 = 24."
            }
          ]
        },
        {
          "key": "g3-s3-mult-table",
          "label": "Lesson 3",
          "title": "Tabel perkalian 1 sampai 10",
          "description": "Menghafal dan menggunakan tabel perkalian.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Tabel perkalian",
              "body": [
                "Hafalkan tabel perkalian 1 sampai 10 agar berhitung menjadi cepat."
              ],
              "points": [
                "6 x 7 = 42",
                "8 x 9 = 72",
                "9 x 9 = 81"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 6 x 7",
              "body": [
                "6 x 7 = 42."
              ],
              "expression": "6 x 7 = 42",
              "note": "Hasilnya 42."
            },
            {
              "type": "example",
              "title": "Contoh: 8 x 9",
              "body": [
                "8 x 9 = 72."
              ],
              "expression": "8 x 9 = 72",
              "note": "Hasilnya 72."
            }
          ]
        },
        {
          "key": "g3-s3-mult-table-practice",
          "label": "Lesson 4",
          "title": "Latihan tabel perkalian 1 sampai 10",
          "description": "Berlatih soal menghafal dan menggunakan tabel perkalian.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "6 x 7 = ?",
              "options": [
                "48",
                "56",
                "36",
                "42"
              ],
              "answer": "42",
              "explanation": "6 x 7 = 42."
            },
            {
              "type": "practice",
              "question": "8 x 9 = ?",
              "options": [
                "72",
                "64",
                "81",
                "63"
              ],
              "answer": "72",
              "explanation": "8 x 9 = 72."
            },
            {
              "type": "practice",
              "question": "7 x 7 = ?",
              "options": [
                "42",
                "47",
                "49",
                "56"
              ],
              "answer": "49",
              "explanation": "7 x 7 = 49."
            },
            {
              "type": "practice",
              "question": "9 x 6 = ?",
              "mode": "input",
              "answer": "54",
              "explanation": "9 x 6 = 54."
            },
            {
              "type": "practice",
              "question": "8 x 8 = ?",
              "mode": "input",
              "answer": "64",
              "explanation": "8 x 8 = 64."
            },
            {
              "type": "practice",
              "question": "9 x 9 = ?",
              "mode": "input",
              "answer": "81",
              "explanation": "9 x 9 = 81."
            }
          ]
        },
        {
          "key": "g3-s3-mult-tens",
          "label": "Lesson 5",
          "title": "Perkalian puluhan dengan satuan",
          "description": "Mengalikan bilangan puluhan dengan satuan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Perkalian puluhan dengan satuan",
              "body": [
                "Hitung 3 x 20 sebagai 3 x 2 puluhan = 6 puluhan = 60."
              ],
              "points": [
                "2 x 30 = 60",
                "4 x 20 = 80"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 3 x 20",
              "body": [
                "3 x 2 = 6, lalu tambahkan 0."
              ],
              "expression": "3 x 20 = 60",
              "note": "Hasilnya 60."
            },
            {
              "type": "example",
              "title": "Contoh: 4 x 20",
              "body": [
                "4 x 2 = 8, lalu tambahkan 0."
              ],
              "expression": "4 x 20 = 80",
              "note": "Hasilnya 80."
            }
          ]
        },
        {
          "key": "g3-s3-mult-tens-practice",
          "label": "Lesson 6",
          "title": "Latihan perkalian puluhan dengan satuan",
          "description": "Berlatih soal mengalikan bilangan puluhan dengan satuan.",
          "operation": "addition",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "3 x 20 = ?",
              "options": [
                "50",
                "30",
                "600",
                "60"
              ],
              "answer": "60",
              "explanation": "3 x 2 = 6, tambahkan 0 menjadi 60."
            },
            {
              "type": "practice",
              "question": "4 x 20 = ?",
              "options": [
                "800",
                "80",
                "60",
                "40"
              ],
              "answer": "80",
              "explanation": "4 x 2 = 8, tambahkan 0 menjadi 80."
            },
            {
              "type": "practice",
              "question": "5 x 30 = ?",
              "mode": "input",
              "answer": "150",
              "explanation": "5 x 3 = 15, tambahkan 0 menjadi 150."
            },
            {
              "type": "practice",
              "question": "2 x 40 = ?",
              "mode": "input",
              "answer": "80",
              "explanation": "2 x 4 = 8, tambahkan 0 menjadi 80."
            },
            {
              "type": "practice",
              "question": "6 x 20 = ?",
              "mode": "input",
              "answer": "120",
              "explanation": "6 x 2 = 12, tambahkan 0 menjadi 120."
            },
            {
              "type": "practice",
              "question": "3 x 30 = ?",
              "mode": "input",
              "answer": "90",
              "explanation": "3 x 3 = 9, tambahkan 0 menjadi 90."
            }
          ]
        },
        {
          "key": "g3-s3-division",
          "label": "Lesson 7",
          "title": "Pembagian",
          "description": "Membagi bilangan dengan hasil sampai 10.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Pembagian",
              "body": [
                "Pembagian adalah kebalikan dari perkalian."
              ],
              "points": [
                "36 : 6 = 6",
                "56 : 8 = 7"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 42 : 6",
              "body": [
                "Karena 6 x 7 = 42."
              ],
              "expression": "42 : 6 = 7",
              "note": "Hasilnya 7."
            },
            {
              "type": "example",
              "title": "Contoh: 72 : 8",
              "body": [
                "Karena 8 x 9 = 72."
              ],
              "expression": "72 : 8 = 9",
              "note": "Hasilnya 9."
            }
          ]
        },
        {
          "key": "g3-s3-division-practice",
          "label": "Lesson 8",
          "title": "Latihan pembagian",
          "description": "Berlatih soal membagi bilangan dengan hasil sampai 10.",
          "operation": "subtraction",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "36 : 6 = ?",
              "options": [
                "6",
                "7",
                "5",
                "4"
              ],
              "answer": "6",
              "explanation": "Karena 6 x 6 = 36."
            },
            {
              "type": "practice",
              "question": "56 : 8 = ?",
              "options": [
                "7",
                "8",
                "6",
                "9"
              ],
              "answer": "7",
              "explanation": "Karena 8 x 7 = 56."
            },
            {
              "type": "practice",
              "question": "81 : 9 = ?",
              "mode": "input",
              "answer": "9",
              "explanation": "Karena 9 x 9 = 81."
            },
            {
              "type": "practice",
              "question": "48 : 6 = ?",
              "mode": "input",
              "answer": "8",
              "explanation": "Karena 6 x 8 = 48."
            },
            {
              "type": "practice",
              "question": "63 : 7 = ?",
              "mode": "input",
              "answer": "9",
              "explanation": "Karena 7 x 9 = 63."
            },
            {
              "type": "practice",
              "question": "72 : 9 = ?",
              "mode": "input",
              "answer": "8",
              "explanation": "Karena 9 x 8 = 72."
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "name": "Stage 4",
      "title": "Pecahan Sederhana",
      "icon": Percent,
      "locked": true,
      "lessons": [
        {
          "key": "g3-s4-fractions-intro",
          "label": "Lesson 1",
          "title": "Mengenal pecahan sederhana",
          "description": "Mengenal pecahan setengah, sepertiga, dan seperempat.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Mengenal pecahan",
              "body": [
                "Pecahan menyatakan bagian dari sesuatu yang utuh.",
                "Pecahan ditulis dengan pembilang di atas dan penyebut di bawah."
              ],
              "points": [
                "1/2 dibaca setengah",
                "1/3 dibaca sepertiga",
                "1/4 dibaca seperempat"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: kue dibagi 2",
              "body": [
                "Sebuah kue dipotong 2 bagian sama besar."
              ],
              "expression": "1/2 + 1/2 = 1",
              "note": "Dua setengah menjadi satu utuh."
            },
            {
              "type": "example",
              "title": "Contoh: pizza dibagi 4",
              "body": [
                "Sebuah pizza dipotong 4 bagian sama besar."
              ],
              "expression": "1/4 + 1/4 + 1/4 + 1/4 = 1",
              "note": "Empat seperempat menjadi satu utuh."
            }
          ]
        },
        {
          "key": "g3-s4-fractions-intro-practice",
          "label": "Lesson 2",
          "title": "Latihan mengenal pecahan sederhana",
          "description": "Berlatih soal mengenal pecahan setengah, sepertiga, dan seperempat.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Sebuah kue dipotong menjadi 2 bagian sama besar. Nilai tiap bagian adalah ...",
              "options": [
                "1/2",
                "1/4",
                "2/3",
                "1/3"
              ],
              "answer": "1/2",
              "explanation": "Dipotong 2 sama besar menjadi 1/2."
            },
            {
              "type": "practice",
              "question": "Sebuah tali dibagi menjadi 4 bagian sama panjang. Nilai tiap bagian adalah ...",
              "options": [
                "1/2",
                "3/4",
                "1/4",
                "1/3"
              ],
              "answer": "1/4",
              "explanation": "Dibagi 4 sama panjang menjadi 1/4."
            },
            {
              "type": "practice",
              "question": "Sebuah roti dipotong menjadi 3 bagian sama besar. Nilai tiap bagian adalah ...",
              "options": [
                "1/4",
                "1/2",
                "2/3",
                "1/3"
              ],
              "answer": "1/3",
              "explanation": "Dipotong 3 sama besar menjadi 1/3."
            },
            {
              "type": "practice",
              "question": "Sebuah pizza dibagi 8 sama besar. Nilai tiap bagian adalah ...",
              "mode": "input",
              "answer": "1/8",
              "explanation": "Dibagi 8 sama besar menjadi 1/8."
            },
            {
              "type": "practice",
              "question": "Sebuah kue dibagi 5 sama besar. Nilai tiap bagian adalah ...",
              "mode": "input",
              "answer": "1/5",
              "explanation": "Dibagi 5 sama besar menjadi 1/5."
            },
            {
              "type": "practice",
              "question": "Sebuah benda dibagi 10 sama besar. Nilai tiap bagian adalah ...",
              "mode": "input",
              "answer": "1/10",
              "explanation": "Dibagi 10 sama besar menjadi 1/10."
            }
          ]
        },
        {
          "key": "g3-s4-fractions-equal",
          "label": "Lesson 3",
          "title": "Pecahan senilai",
          "description": "Mengenal pecahan yang bernilai sama.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Pecahan senilai",
              "body": [
                "Pecahan senilai adalah pecahan berbeda yang nilainya sama.",
                "Contoh: 1/2 = 2/4."
              ],
              "points": [
                "1/2 = 2/4 = 3/6"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 1/2 = 2/4",
              "body": [
                "Dua per empat sama dengan satu per dua."
              ],
              "expression": "1/2 = 2/4",
              "note": "Nilainya sama."
            },
            {
              "type": "example",
              "title": "Contoh: 1/3 = 2/6",
              "body": [
                "Dua per enam sama dengan satu per tiga."
              ],
              "expression": "1/3 = 2/6",
              "note": "Nilainya sama."
            }
          ]
        },
        {
          "key": "g3-s4-fractions-equal-practice",
          "label": "Lesson 4",
          "title": "Latihan pecahan senilai",
          "description": "Berlatih soal mengenal pecahan yang bernilai sama.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Pecahan senilai dengan 1/2 adalah ...",
              "options": [
                "2/4",
                "2/3",
                "1/4",
                "1/3"
              ],
              "answer": "2/4",
              "explanation": "1/2 = 2/4."
            },
            {
              "type": "practice",
              "question": "Pecahan senilai dengan 1/3 adalah ...",
              "options": [
                "2/4",
                "1/6",
                "2/6",
                "1/2"
              ],
              "answer": "2/6",
              "explanation": "1/3 = 2/6."
            },
            {
              "type": "practice",
              "question": "Pecahan senilai dengan 1/4 adalah ...",
              "mode": "input",
              "answer": "2/8",
              "explanation": "1/4 = 2/8."
            },
            {
              "type": "practice",
              "question": "Pecahan senilai dengan 1/2 adalah ...",
              "mode": "input",
              "answer": "3/6",
              "explanation": "1/2 = 3/6."
            },
            {
              "type": "practice",
              "question": "Pecahan senilai dengan 2/3 adalah ...",
              "mode": "input",
              "answer": "4/6",
              "explanation": "2/3 = 4/6."
            },
            {
              "type": "practice",
              "question": "Pecahan senilai dengan 1/5 adalah ...",
              "mode": "input",
              "answer": "2/10",
              "explanation": "1/5 = 2/10."
            }
          ]
        },
        {
          "key": "g3-s4-fractions-compare",
          "label": "Lesson 5",
          "title": "Membandingkan pecahan",
          "description": "Membandingkan pecahan sederhana.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Membandingkan pecahan",
              "body": [
                "Dengan pembilang 1, semakin besar penyebut semakin kecil nilainya.",
                "1/2 lebih besar dari 1/3 lebih besar dari 1/4."
              ],
              "points": [
                "1/2 > 1/3 > 1/4"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 1/2 ... 1/4",
              "body": [
                "1/2 lebih besar."
              ],
              "expression": "1/2 > 1/4",
              "note": "Setengah lebih besar."
            },
            {
              "type": "example",
              "title": "Contoh: 1/3 ... 1/5",
              "body": [
                "1/3 lebih besar."
              ],
              "expression": "1/3 > 1/5",
              "note": "Sepertiga lebih besar."
            }
          ]
        },
        {
          "key": "g3-s4-fractions-compare-practice",
          "label": "Lesson 6",
          "title": "Latihan membandingkan pecahan",
          "description": "Berlatih soal membandingkan pecahan sederhana.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Manakah yang lebih besar: 1/3 atau 1/4?",
              "options": [
                "1/3",
                "Tidak bisa",
                "Sama besar",
                "1/4"
              ],
              "answer": "1/3",
              "explanation": "1/3 lebih besar dari 1/4."
            },
            {
              "type": "practice",
              "question": "Manakah yang lebih besar: 1/2 atau 1/5?",
              "options": [
                "Sama besar",
                "Tidak bisa",
                "1/5",
                "1/2"
              ],
              "answer": "1/2",
              "explanation": "1/2 lebih besar dari 1/5."
            },
            {
              "type": "practice",
              "question": "Urutan dari terkecil: 1/2, 1/4, 1/3 adalah ...",
              "mode": "input",
              "answer": "1/4, 1/3, 1/2",
              "explanation": "Penyebut besar berarti nilai kecil."
            },
            {
              "type": "practice",
              "question": "Urutan dari terbesar: 1/2, 1/4, 1/3 adalah ...",
              "mode": "input",
              "answer": "1/2, 1/3, 1/4",
              "explanation": "Dari terbesar ke terkecil."
            },
            {
              "type": "practice",
              "question": "Manakah yang lebih kecil: 1/6 atau 1/3?",
              "mode": "input",
              "answer": "1/6",
              "explanation": "Penyebut 6 lebih besar."
            },
            {
              "type": "practice",
              "question": "Manakah yang lebih besar: 1/3 atau 1/8?",
              "mode": "input",
              "answer": "1/3",
              "explanation": "1/3 lebih besar dari 1/8."
            }
          ]
        },
        {
          "key": "g3-s4-fractions-add",
          "label": "Lesson 7",
          "title": "Menjumlahkan pecahan berpenyebut sama",
          "description": "Menjumlahkan pecahan dengan penyebut yang sama.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Menjumlahkan pecahan",
              "body": [
                "Jika penyebut sama, jumlahkan pembilangnya saja.",
                "1/4 + 1/4 = 2/4."
              ],
              "points": [
                "Penyebut tetap",
                "Pembilang dijumlahkan"
              ]
            },
            {
              "type": "example",
              "title": "Contoh: 1/4 + 1/4",
              "body": [
                "Jumlah pembilang 1 + 1 = 2."
              ],
              "expression": "1/4 + 1/4 = 2/4",
              "note": "Penyebut tetap 4."
            },
            {
              "type": "example",
              "title": "Contoh: 1/5 + 2/5",
              "body": [
                "Jumlah pembilang 1 + 2 = 3."
              ],
              "expression": "1/5 + 2/5 = 3/5",
              "note": "Penyebut tetap 5."
            }
          ]
        },
        {
          "key": "g3-s4-fractions-add-practice",
          "label": "Lesson 8",
          "title": "Latihan menjumlahkan pecahan berpenyebut sama",
          "description": "Berlatih soal menjumlahkan pecahan dengan penyebut yang sama.",
          "operation": "mixed",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "1/4 + 1/4 = ?",
              "options": [
                "2/2",
                "2/4",
                "2/8",
                "1/8"
              ],
              "answer": "2/4",
              "explanation": "1 + 1 = 2, penyebut tetap 4."
            },
            {
              "type": "practice",
              "question": "1/5 + 2/5 = ?",
              "options": [
                "2/5",
                "3/10",
                "3/0",
                "3/5"
              ],
              "answer": "3/5",
              "explanation": "1 + 2 = 3, penyebut tetap 5."
            },
            {
              "type": "practice",
              "question": "2/6 + 1/6 = ?",
              "mode": "input",
              "answer": "3/6",
              "explanation": "2 + 1 = 3, penyebut tetap 6."
            },
            {
              "type": "practice",
              "question": "1/3 + 1/3 = ?",
              "mode": "input",
              "answer": "2/3",
              "explanation": "1 + 1 = 2, penyebut tetap 3."
            },
            {
              "type": "practice",
              "question": "2/8 + 3/8 = ?",
              "mode": "input",
              "answer": "5/8",
              "explanation": "2 + 3 = 5, penyebut tetap 8."
            },
            {
              "type": "practice",
              "question": "1/10 + 4/10 = ?",
              "mode": "input",
              "answer": "5/10",
              "explanation": "1 + 4 = 5, penyebut tetap 10."
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "name": "Stage 5",
      "title": "Soal Cerita",
      "icon": Ruler,
      "locked": true,
      "lessons": [
        {
          "key": "g3-s5-story-add",
          "label": "Lesson 1",
          "title": "Soal cerita penjumlahan",
          "description": "Menyelesaikan soal cerita penjumlahan sampai 1.000.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita penjumlahan",
              "body": [
                "Kata \"jumlah\" atau \"seluruhnya\" menandakan penjumlahan."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ibu punya 250 telur, membeli 175 lagi."
              ],
              "expression": "250 + 175 = 425",
              "note": "Jumlah 425 telur."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 146 buku, datang 208 buku lagi."
              ],
              "expression": "146 + 208 = 354",
              "note": "Jumlah 354 buku."
            }
          ]
        },
        {
          "key": "g3-s5-story-add-practice",
          "label": "Lesson 2",
          "title": "Latihan soal cerita penjumlahan",
          "description": "Berlatih soal menyelesaikan soal cerita penjumlahan sampai 1.000.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Ibu punya 250 telur, lalu membeli 175 lagi. Berapa jumlah telur Ibu sekarang?",
              "options": [
                "425",
                "325",
                "415",
                "525"
              ],
              "answer": "425",
              "explanation": "250 + 175 = 425."
            },
            {
              "type": "practice",
              "question": "Perpustakaan punya 146 buku, datang 208 buku lagi. Berapa jumlahnya?",
              "options": [
                "344",
                "364",
                "354",
                "454"
              ],
              "answer": "354",
              "explanation": "146 + 208 = 354."
            },
            {
              "type": "practice",
              "question": "Panen 375 kg dan 248 kg. Berapa total panen?",
              "mode": "input",
              "answer": "623",
              "explanation": "375 + 248 = 623."
            },
            {
              "type": "practice",
              "question": "Ada 426 kursi, ditambah 389 kursi. Berapa jumlah kursi?",
              "mode": "input",
              "answer": "815",
              "explanation": "426 + 389 = 815."
            },
            {
              "type": "practice",
              "question": "Toko punya 268 roti, membuat 157 roti lagi. Berapa jumlahnya?",
              "mode": "input",
              "answer": "425",
              "explanation": "268 + 157 = 425."
            },
            {
              "type": "practice",
              "question": "Desa A berpenduduk 524 orang, Desa B 289 orang. Berapa jumlahnya?",
              "mode": "input",
              "answer": "813",
              "explanation": "524 + 289 = 813."
            }
          ]
        },
        {
          "key": "g3-s5-story-sub",
          "label": "Lesson 3",
          "title": "Soal cerita pengurangan",
          "description": "Menyelesaikan soal cerita pengurangan sampai 1.000.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita pengurangan",
              "body": [
                "Kata \"sisa\" atau \"tersisa\" menandakan pengurangan."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 812 buku, 457 buku dipinjam."
              ],
              "expression": "812 - 457 = 355",
              "note": "Sisa 355 buku."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 900 telur, 458 telur pecah."
              ],
              "expression": "900 - 458 = 442",
              "note": "Sisa 442 telur."
            }
          ]
        },
        {
          "key": "g3-s5-story-sub-practice",
          "label": "Lesson 4",
          "title": "Latihan soal cerita pengurangan",
          "description": "Berlatih soal menyelesaikan soal cerita pengurangan sampai 1.000.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Ada 812 buku, 457 buku dipinjam. Berapa sisa buku?",
              "options": [
                "455",
                "345",
                "365",
                "355"
              ],
              "answer": "355",
              "explanation": "812 - 457 = 355."
            },
            {
              "type": "practice",
              "question": "Pak Tani punya 900 telur, 458 telur pecah. Berapa sisa telur?",
              "options": [
                "432",
                "452",
                "542",
                "442"
              ],
              "answer": "442",
              "explanation": "900 - 458 = 442."
            },
            {
              "type": "practice",
              "question": "Kebun punya 703 bunga, 268 bunga dipetik. Berapa sisa?",
              "mode": "input",
              "answer": "435",
              "explanation": "703 - 268 = 435."
            },
            {
              "type": "practice",
              "question": "Gudang punya 604 karung, 236 karung dikirim. Berapa sisa?",
              "mode": "input",
              "answer": "368",
              "explanation": "604 - 236 = 368."
            },
            {
              "type": "practice",
              "question": "Hasil panen 521 kg, terjual 147 kg. Berapa sisa?",
              "mode": "input",
              "answer": "374",
              "explanation": "521 - 147 = 374."
            },
            {
              "type": "practice",
              "question": "Ada 750 kursi, 320 kursi dipakai. Berapa sisa kosong?",
              "mode": "input",
              "answer": "430",
              "explanation": "750 - 320 = 430."
            }
          ]
        },
        {
          "key": "g3-s5-story-mult",
          "label": "Lesson 5",
          "title": "Soal cerita perkalian",
          "description": "Menyelesaikan soal cerita perkalian.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita perkalian",
              "body": [
                "Kata \"setiap\" menandakan perkalian."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 7 kotak, setiap kotak berisi 9 kelereng."
              ],
              "expression": "7 x 9 = 63",
              "note": "Jumlah 63 kelereng."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 6 kotak, setiap kotak berisi 8 pensil."
              ],
              "expression": "6 x 8 = 48",
              "note": "Jumlah 48 pensil."
            }
          ]
        },
        {
          "key": "g3-s5-story-mult-practice",
          "label": "Lesson 6",
          "title": "Latihan soal cerita perkalian",
          "description": "Berlatih soal menyelesaikan soal cerita perkalian.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "Ada 7 kotak, setiap kotak berisi 9 kelereng. Berapa jumlah kelereng seluruhnya?",
              "options": [
                "16",
                "72",
                "56",
                "63"
              ],
              "answer": "63",
              "explanation": "7 x 9 = 63."
            },
            {
              "type": "practice",
              "question": "Ada 6 kotak, setiap kotak berisi 8 pensil. Berapa jumlah pensil seluruhnya?",
              "options": [
                "54",
                "42",
                "48",
                "86"
              ],
              "answer": "48",
              "explanation": "6 x 8 = 48."
            },
            {
              "type": "practice",
              "question": "Ada 9 keranjang, setiap keranjang berisi 8 mangga. Berapa jumlahnya?",
              "mode": "input",
              "answer": "72",
              "explanation": "9 x 8 = 72."
            },
            {
              "type": "practice",
              "question": "Ada 4 meja, setiap meja 7 kursi. Berapa jumlah kursi?",
              "mode": "input",
              "answer": "28",
              "explanation": "4 x 7 = 28."
            },
            {
              "type": "practice",
              "question": "Ada 8 dus, setiap dus berisi 6 gelas. Berapa jumlah gelas?",
              "mode": "input",
              "answer": "48",
              "explanation": "8 x 6 = 48."
            },
            {
              "type": "practice",
              "question": "Ada 5 rak, setiap rak berisi 9 buku. Berapa jumlah buku?",
              "mode": "input",
              "answer": "45",
              "explanation": "5 x 9 = 45."
            }
          ]
        },
        {
          "key": "g3-s5-story-mixed",
          "label": "Lesson 7",
          "title": "Soal cerita campuran",
          "description": "Menyelesaikan soal cerita campuran.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "text",
              "title": "Soal cerita campuran",
              "body": [
                "Bacalah dengan teliti untuk memilih operasi yang tepat."
              ]
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "36 permen dibagi rata kepada 6 anak."
              ],
              "expression": "36 : 6 = 6",
              "note": "Setiap anak 6 permen."
            },
            {
              "type": "example",
              "title": "Contoh",
              "body": [
                "Ada 5 kotak, setiap kotak berisi 7 pensil."
              ],
              "expression": "5 x 7 = 35",
              "note": "Jumlah 35 pensil."
            }
          ]
        },
        {
          "key": "g3-s5-story-mixed-practice",
          "label": "Lesson 8",
          "title": "Latihan soal cerita campuran",
          "description": "Berlatih soal menyelesaikan soal cerita campuran.",
          "operation": "story",
          "practiceCount": 0,
          "slides": [
            {
              "type": "practice",
              "question": "36 permen dibagi rata kepada 6 anak. Berapa permen untuk setiap anak?",
              "options": [
                "5",
                "7",
                "8",
                "6"
              ],
              "answer": "6",
              "explanation": "36 : 6 = 6."
            },
            {
              "type": "practice",
              "question": "Ada 5 kotak, setiap kotak berisi 7 pensil. Berapa jumlah pensil seluruhnya?",
              "options": [
                "30",
                "35",
                "40",
                "45"
              ],
              "answer": "35",
              "explanation": "5 x 7 = 35."
            },
            {
              "type": "practice",
              "question": "48 buku dibagi rata ke dalam 8 rak. Berapa buku di setiap rak?",
              "mode": "input",
              "answer": "6",
              "explanation": "48 : 8 = 6."
            },
            {
              "type": "practice",
              "question": "Ada 9 keranjang, setiap keranjang berisi 8 mangga. Berapa jumlahnya?",
              "mode": "input",
              "answer": "72",
              "explanation": "9 x 8 = 72."
            },
            {
              "type": "practice",
              "question": "42 bola dibagi rata ke dalam 7 keranjang. Berapa bola tiap keranjang?",
              "mode": "input",
              "answer": "6",
              "explanation": "42 : 7 = 6."
            },
            {
              "type": "practice",
              "question": "Ada 6 kotak, setiap kotak berisi 9 pensil. Berapa jumlah pensil?",
              "mode": "input",
              "answer": "54",
              "explanation": "6 x 9 = 54."
            }
          ]
        }
      ]
    }
  ]
}
}

export const fallbackGrade = { grade: '-', title: 'Segera hadir', subtitle: 'Materi untuk grade ini sedang disiapkan.', stages: [] }
const fallbackGradeEn = { grade: '-', title: 'Coming soon', subtitle: 'Materials for this grade are being prepared.', stages: [] }

function pickText(base, overlay) { return overlay ?? base }

const termMap = {
  Ribuan: 'Thousands',
  Ratusan: 'Hundreds',
  Puluhan: 'Tens',
  Satuan: 'Ones',
  'Sama besar': 'Equal',
  'Tidak bisa': 'Cannot tell'
}
const translateTerm = value => (typeof value === 'string' && termMap[value]) || value

function localizeSlide(slide, en) {
  if (!en) return slide
  return {
    ...slide,
    title: pickText(slide.title, en.title),
    body: pickText(slide.body, en.body),
    expression: pickText(slide.expression, en.expression),
    points: pickText(slide.points, en.points),
    note: pickText(slide.note, en.note),
    question: pickText(slide.question, en.question),
    options: en.options ?? (Array.isArray(slide.options) ? slide.options.map(translateTerm) : slide.options),
    answer: pickText(slide.answer, en.answer === undefined ? translateTerm(slide.answer) : en.answer),
    explanation: pickText(slide.explanation, en.explanation)
  }
}

function localizeLesson(lesson, en) {
  if (!en) return lesson
  return {
    ...lesson,
    title: pickText(lesson.title, en.title),
    description: pickText(lesson.description, en.description),
    slides: (lesson.slides || []).map((slide, index) => localizeSlide(slide, en.slides && en.slides[index]))
  }
}

export function localizePlan(plan, language) {
  if (!plan || String(language).slice(0, 2) !== 'en') return plan
  const en = curriculumEn[plan.grade]
  if (!en) return plan
  return {
    ...plan,
    title: pickText(plan.title, en.title),
    subtitle: pickText(plan.subtitle, en.subtitle),
    stages: (plan.stages || []).map(stage => {
      const enStage = en.stages && en.stages[stage.id]
      return {
        ...stage,
        name: pickText(stage.name, enStage && enStage.name),
        title: pickText(stage.title, enStage && enStage.title),
        lessons: (stage.lessons || []).map(lesson => localizeLesson(lesson, enStage && enStage.lessons && enStage.lessons[lesson.key]))
      }
    })
  }
}

export function planFor(grade, language) {
  const base = curriculum[grade]
  if (!base) {
    const fallback = String(language).slice(0, 2) === 'en' ? fallbackGradeEn : fallbackGrade
    return grade ? { ...fallback, grade } : fallback
  }
  return localizePlan(base, language)
}

export function allLessons(grade, language) {
  const plan = planFor(grade, language)
  const list = []
  for (const stage of plan.stages) if (!stage.locked) for (const lesson of stage.lessons || []) list.push({ ...lesson, stageId: stage.id, stageName: stage.name, stageTitle: stage.title })
  return list
}

export function findLesson(grade, lessonKey, language) {
  const plan = planFor(grade, language)
  for (const stage of plan.stages) for (const lesson of stage.lessons || []) if (lesson.key === lessonKey) return { ...lesson, stageId: stage.id, stageName: stage.name }
  return null
}
