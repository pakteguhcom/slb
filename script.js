document.addEventListener('DOMContentLoaded', () => {
    // --- DATABASE OF QUESTIONS (NOMOR SUDAH URUT) ---
    const surveyQuestions = [
        { id: 1, type: 'radio', question: "Apakah kamu perempuan atau laki-laki?", options: ["Perempuan", "Laki-laki"] },
        { id: 2, type: 'radio', question: "Ada berapa keluarga yang tinggal bersama di rumahmu?", options: ["Hanya keluarga intiku sendiri (orang tua dan saudara kandungku saja).", "Keluargaku bersama satu keluarga lain.", "Keluargaku bersama dua keluarga lain.", "Keluargaku bersama tiga atau lebih keluarga lain."] },
        { id: 3, type: 'radio', question: "Apa jenjang sekolah tertinggi yang diselesaikan ibumu?", options: ["SD", "SMP", "SMA/SMK", "Diploma (D1, D2 atau D3)", "Sarjana (S1)", "Master (S2)", "Doktor (S3)", "Tidak tahu"] },
        { id: 4, type: 'radio', question: "Apa pekerjaan ayahmu?", options: ["Tidak bekerja", "Pensiunan", "Anggota militer/polisi", "Perwira militer/polisi", "Buruh/Karyawan kecil", "Bekerja mandiri/Wiraswasta kecil", "Tenaga pemasaran", "Pekerja administratif", "Manajer/Pimpinan", "Profesional", "Pejabat/Legislatif", "Pemilik usaha kecil", "Pemilik perusahaan besar", "Tidak tahu"] },
        { id: 5, type: 'radio', question: "Apa pekerjaan ibumu?", options: ["Tidak bekerja", "Pensiunan", "Anggota militer/polisi", "Perwira militer/polisi", "Buruh/Karyawan kecil", "Bekerja mandiri/Wiraswasta kecil", "Tenaga pemasaran", "Pekerja administratif", "Manajer/Pimpinan", "Profesional", "Pejabat/Legislatif", "Pemilik usaha kecil", "Pemilik perusahaan besar", "Tidak tahu"] },
        { id: 6, type: 'matrix', question: "Adakah barang-barang berikut di rumahmu?", rows: ["Meja belajar", "Kamar tidur untuk dirimu sendiri", "Tempat belajar yang tenang", "Listrik dan lampu untuk belajar di malam hari", "Komputer, laptop, atau tablet", "Perangkat lunak pendidikan", "Sambungan ke internet", "Alat baca buku digital"], columns: ["Tidak ada", "Ada"] },
        { id: 7, type: 'matrix', question: "Berapa jumlah buku-buku yang ada di rumahmu?", rows: ["Buku fiksi/sastra", "Buku sains/teknologi", "Buku seni/musik/desain", "Buku bahasa/kamus", "Buku penunjang tugas sekolah"], columns: ["Tidak ada", "Kira-kira 1-10 buku", "Kira-kira 11-25 buku", "Kira-kira 26-100 buku", "Kira-kira lebih dari 100 buku"] },
        { id: 8, type: 'matrix', question: "Dalam kegiatan pembelajaran, apakah hal berikut terjadi di kelasmu?", rows: ["Guru memberi kesempatan berdiskusi", "Guru masuk kelas tepat waktu", "Peralatan kelas tertata rapih", "Guru memonitor kemajuan tugas rutin", "Guru mengingatkan tenggat waktu & sanksi", "Guru memberikan penghargaan tugas baik"], columns: ["Tidak Pernah", "Jarang", "Sering", "Sangat sering"] },
        { id: 9, type: 'matrix', question: "Selama satu tahun terakhir ini, seberapa sering kamu mengalami hal berikut di kelas?", rows: ["Bisa mengerjakan tugas karena instruksi jelas", "Kelas dimulai dan diakhiri tepat waktu", "Siswa dilibatkan menyusun aturan kelas", "Guru konsisten menegakkan aturan"], columns: ["Tidak pernah atau sangat jarang", "Di beberapa pelajaran", "Di sebagian besar pelajaran", "Di semua pelajaran"] },
        { id: 10, type: 'matrix', question: "Dalam kegiatan pembelajaran, apakah hal berikut terjadi di kelasmu?", rows: ["Mendapatkan bantuan khusus dari guru", "Mendapatkan penjelasan ulang jika tidak mengerti"], columns: ["Tidak pernah atau sangat jarang", "Di beberapa pelajaran", "Di sebagian besar pelajaran", "Di semua pelajaran"] },
        { id: 11, type: 'matrix', question: "Dalam kegiatan pembelajaran, apakah hal berikut terjadi di kelasmu?", rows: ["Diberi tugas yang menantang", "Guru mendorong untuk meningkatkan kemampuan"], columns: ["Tidak Pernah", "Jarang", "Sering", "Sangat sering"] },
        { id: 12, type: 'matrix', question: "Selama satu tahun terakhir ini, apakah kamu mendapatkan hal berikut dari guru?", rows: ["Menerima hasil ujian yang sudah dinilai", "Mendapatkan komentar tertulis tentang tugas", "Mendapatkan saran perbaikan tugas"], columns: ["Tidak ada satu pun guru", "Ya, sebagian kecil guru", "Ya, sebagian besar guru", "Ya, semua guru"] },
        { id: 13, type: 'matrix', question: "Selama satu tahun terakhir ini, seberapa sering kamu mengalami hal berikut di kelas?", rows: ["Merasa tertekan hingga mencontek/curang", "Guru tidak membiarkanmu menyerah", "Guru percaya kamu mampu", "Guru menanyakan kabar sebelum kelas", "Guru merespon keluhan siswa", "Guru memberi komentar agar lebih mengerti", "Guru memberi komentar agar lebih percaya diri"], columns: ["Tidak pernah atau sangat jarang", "Di beberapa pelajaran", "Di sebagian besar pelajaran", "Di semua pelajaran"] },
        { id: 14, type: 'matrix', question: "Berdasarkan pengalamanmu pada satu tahun terakhir ini, bagaimana pendapatmu terkait pernyataan berikut?", rows: ["Guru mengaitkan materi pelajaran dengan materi sebelumnya", "Guru memberikan contoh-contoh nyata"], columns: ["Tidak pernah atau sangat jarang", "Di beberapa pelajaran", "Di sebagian besar pelajaran", "Di semua pelajaran"] },
        { id: 15, type: 'matrix', question: "Seberapa sesuai hal-hal berikut terjadi di sekolahmu?", rows: ["Guru menguasai materi sehingga pengetahuan bermakna", "Guru mengubah strategi jika siswa tidak bersemangat", "Guru tidak mempedulikan perbedaan kemampuan siswa"], columns: ["Sangat Tidak Sesuai", "Tidak Sesuai", "Sesuai", "Sangat Sesuai"] },
        { id: 16, type: 'matrix', question: "Selama satu tahun terakhir ini, seberapa sering guru melakukan hal-hal berikut?", rows: ["Guru memberikan contoh literasi numerik", "Guru meminta siswa memberikan contoh masalah matematika sehari-hari"], columns: ["Tidak pernah atau sangat jarang", "Di beberapa pelajaran", "Di sebagian besar pelajaran", "Di semua pelajaran"] },
        { id: 17, type: 'matrix', question: "Selama satu tahun terakhir ini, seberapa sering guru melakukan hal-hal berikut?", rows: ["Memberikan masalah untuk didiskusikan", "Meminta diskusi kelompok mencari solusi", "Meminta merangkum hasil diskusi kelas", "Meminta merangkum teks bacaan", "Membantu mengaitkan bacaan dengan kehidupan", "Menjelaskan dengan diagram/peta pikiran", "Membandingkan isi bacaan", "Menghubungkan topik matematika dengan topik lain", "Menghubungkan matematika dengan mapel lain"], columns: ["Tidak Pernah", "Jarang", "Sering", "Sangat sering"] },
        { id: 18, type: 'matrix', question: "Selama satu tahun terakhir ini, seberapa sering kamu mengalami hal berikut di kelas?", rows: ["Guru memberi tugas berbeda sesuai kecepatan siswa", "Siswa bisa berkonsultasi saat mengerjakan tugas", "Guru meminta siswa menjelaskan pemikirannya", "Guru melarang cara lain yang tidak diajarkan", "Guru menggunakan banyak contoh", "Guru menggunakan metode bervariasi", "Guru memperagakan materi agar lebih paham"], columns: ["Tidak pernah atau sangat jarang", "Di beberapa pelajaran", "Di sebagian besar pelajaran", "Di semua pelajaran"] },
        { id: 19, type: 'matrix', question: "Bagaimana pendapatmu mengenai hal-hal berikut ini?", rows: ["Siswa berkebutuhan khusus sulit diajak bekerja sama", "Siswa berkebutuhan khusus memiliki kelebihan unik"], columns: ["Sangat Tidak Setuju", "Tidak Setuju", "Setuju", "Sangat Setuju"] },
        { id: 20, type: 'matrix', question: "Bagaimana perasaanmu ketika berinteraksi dengan siswa berkebutuhan khusus?", rows: ["Kamu merasa tertarik untuk berinteraksi", "Kamu merasa takut saat berinteraksi"], columns: ["Sangat Tidak Sesuai", "Tidak Sesuai", "Sesuai", "Sangat Sesuai"] },
        { id: 21, type: 'matrix', scenario: 'Bayangkan situasi: Guru memperkenalkan siswa baru berkebutuhan khusus dan menanyakan siapa yang mau duduk sebangku dengannya.', question: "Seberapa besar kemungkinan Kamu merasakan hal berikut?", rows: ["Bersemangat", "Stres"], columns: ["Sangat tidak mungkin", "Tidak mungkin", "Mungkin", "Sangat mungkin", "Pasti"] },
        { id: 22, type: 'matrix', question: "Terkait situasi siswa baru berkebutuhan khusus, seberapa setuju Kamu dengan pernyataan berikut?", rows: ["Kamu akan menawarkan diri menjadi teman sebangku", "Siswa tersebut sepertinya akan sulit menyesuaikan diri"], columns: ["Sangat Tidak Setuju", "Tidak Setuju", "Setuju", "Sangat Setuju"] },
        { id: 23, type: 'matrix', question: "Coba pikirkan tentang sekolahmu. Seberapa kamu setuju atau tidak setuju dengan pernyataan-pernyataan berikut?", rows: ["Kamu merasa betah di Sekolah", "Kamu merasa dikucilkan di sekolah"], columns: ["Sangat Tidak Setuju", "Tidak Setuju", "Setuju", "Sangat Setuju"] },
        { id: 24, type: 'matrix', question: "Seberapa sesuai hal-hal berikut ini dengan keadaan sekolahmu?", rows: ["Guru tidak mengetahui ada kelompok siswa yang sering mengancam", "Para siswa merasa aman di lorong-lorong sekolah"], columns: ["Sangat Tidak Sesuai", "Tidak Sesuai", "Sesuai", "Sangat Sesuai"] }
    ];

    // --- DOM Elements ---
    const surveyForm = document.getElementById('survey-form');
    const infoSection = document.getElementById('info-section');
    const resultSection = document.getElementById('result-section');
    const startSurveyBtn = document.getElementById('start-survey-btn');
    const restartSurveyBtn = document.getElementById('restart-survey-btn');
    const instructionsModal = document.getElementById('instructions-modal');
    const closeInstructionsBtn = document.getElementById('close-instructions-btn');
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const questionsWrapper = document.getElementById('questions-wrapper');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const headerSubtitle = document.getElementById('header-subtitle');

    // --- State Variables ---
    let currentQuestionIndex = 0;
    let questionsGenerated = false;
    let questionCards = [];

    // --- Functions ---
    function generateQuestions() {
        if (questionsGenerated) return;

        surveyQuestions.forEach(q => {
            const questionCard = document.createElement('div');
            questionCard.className = 'question-card';
            questionCard.id = `question-card-${q.id}`;
            let questionHTML = `<h3>Soal Nomor ${q.id}</h3>`;
            if (q.scenario) {
                 questionHTML += `<p class="scenario"><i>${q.scenario}</i></p>`;
            }
            questionHTML += `<p class="main-question">${q.question}</p>`;

            if (q.type === 'radio') {
                questionHTML += `<div class="options-group">`;
                q.options.forEach((opt, index) => {
                    const optionId = `q${q.id}_opt${index}`;
                    const value = opt.replace(/[^a-zA-Z0-9]/g, "-");
                    questionHTML += `<div><input type="radio" id="${optionId}" name="q${q.id}" value="${value}" required><label for="${optionId}">${opt}</label></div>`;
                });
                questionHTML += `</div>`;
            } else if (q.type === 'matrix') {
                questionHTML += `<table class="question-table"><thead><tr><th>Pernyataan</th>`;
                q.columns.forEach(col => questionHTML += `<th>${col}</th>`);
                questionHTML += `</tr></thead><tbody>`;
                q.rows.forEach((row, rowIndex) => {
                    const questionName = `q${q.id}_${rowIndex}`;
                    questionHTML += `<tr><td>${row}</td>`;
                    q.columns.forEach((col, colIndex) => {
                        const optionId = `q${q.id}_r${rowIndex}_c${colIndex}`;
                        const value = col.replace(/[^a-zA-Z0-9]/g, "-");
                        questionHTML += `<td><input type="radio" id="${optionId}" name="${questionName}" value="${value}" required><label for="${optionId}"></label></td>`;
                    });
                    questionHTML += `</tr>`;
                });
                questionHTML += `</tbody></table>`;
            }
            questionCard.innerHTML = questionHTML;
            questionsWrapper.appendChild(questionCard);
        });

        questionCards = Array.from(questionsWrapper.children);
        questionsGenerated = true;
    }

    function showQuestion(index) {
        questionCards.forEach(card => card.classList.remove('active'));
        if (questionCards[index]) {
            questionCards[index].classList.add('active');
        }
        updateNavigation(index);
        updateProgress(index);
    }

    function updateNavigation(index) {
        prevBtn.disabled = index === 0;
        if (index === questionCards.length - 1) {
            nextBtn.classList.add('hidden');
            submitBtn.classList.remove('hidden');
        } else {
            nextBtn.classList.remove('hidden');
            submitBtn.classList.add('hidden');
        }
    }

    function updateProgress(index) {
        const progress = questionCards.length > 0 ? ((index + 1) / questionCards.length) * 100 : 0;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Soal ${index + 1} dari ${questionCards.length}`;
    }

    function validateCurrentQuestion() {
        const activeCard = questionCards[currentQuestionIndex];
        const inputs = activeCard.querySelectorAll('input[type="radio"]');
        
        const questionNames = new Set();
        inputs.forEach(input => questionNames.add(input.name));
        
        for (const name of questionNames) {
            const radioGroup = activeCard.querySelectorAll(`input[name="${name}"]`);
            if (!Array.from(radioGroup).some(radio => radio.checked)) {
                alert('Harap jawab semua pernyataan pada soal ini sebelum melanjutkan.');
                return false;
            }
        }
        return true;
    }

    // --- Event Listeners ---
    startSurveyBtn.addEventListener('click', () => {
        const namaSiswa = document.getElementById('namaSiswa').value;
        const kelasSiswa = document.getElementById('kelasSiswa').value;
        if (namaSiswa.trim() === '' || kelasSiswa.trim() === '') {
            alert('Silakan isi nama dan kelas terlebih dahulu.');
            return;
        }
        document.getElementById('result-nama').textContent = namaSiswa;
        document.getElementById('result-kelas').textContent = kelasSiswa;
        
        infoSection.classList.add('hidden');
        instructionsModal.classList.remove('hidden');
    });

    closeInstructionsBtn.addEventListener('click', () => {
        instructionsModal.classList.add('hidden');
        surveyForm.classList.remove('hidden');
        progressContainer.classList.remove('hidden');
        headerSubtitle.classList.add('hidden');
        showQuestion(currentQuestionIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        if (!validateCurrentQuestion()) return;
        if (currentQuestionIndex < questionCards.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    });

    surveyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!validateCurrentQuestion()) return;

        const formData = new FormData(surveyForm);
        const answers = {};
        for (let [key, value] of formData.entries()) {
            answers[key] = value;
        }
        displayAnalysis(answers);
        
        surveyForm.classList.add('hidden');
        progressContainer.classList.add('hidden');
        resultSection.classList.remove('hidden');
        headerSubtitle.textContent = "Berikut adalah hasil analisis dari jawaban Anda:";
        headerSubtitle.classList.remove('hidden');
        window.scrollTo(0, 0);
    });

    restartSurveyBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        surveyForm.reset();
        document.getElementById('namaSiswa').value = '';
        document.getElementById('kelasSiswa').value = '';
        
        resultSection.classList.add('hidden');
        infoSection.classList.remove('hidden');
        surveyForm.classList.add('hidden');
        headerSubtitle.textContent = "Isi data diri dan jawab semua pertanyaan dengan jujur sesuai kondisimu.";
    });

    function displayAnalysis(answers) {
        const analysisContent = document.getElementById('analysis-content');
        let html = '';
        
        const q6_internet = answers['q6_6'] === 'Ada';
        const q7_buku = (answers['q7_0'] !== 'Tidak-ada' || answers['q7_4'] !== 'Tidak-ada');
        html += `<div class="analysis-category"><h3>🏡 Dukungan Belajar di Rumah</h3>`;
        if (q6_internet && q7_buku) {
            html += `<p>Hasil survei menunjukkan kamu memiliki **akses internet dan buku yang memadai** di rumah. Ini adalah modal yang sangat baik untuk belajar mandiri. Manfaatkan fasilitas ini untuk memperluas pengetahuan di luar materi sekolah.</p>`;
        } else {
            html += `<p>Terdapat potensi tantangan dalam fasilitas belajar di rumah. Jika kamu merasa kekurangan sumber belajar seperti buku atau akses internet, **jangan ragu untuk berdiskusi dengan guru atau orang tua** untuk mencari solusi, seperti memanfaatkan perpustakaan sekolah.</p>`;
        }
        html += `</div>`;
        
        const q23_betah = answers['q23_0'].includes('Setuju');
        const q23_kucil = answers['q23_1'].includes('Tidak-Setuju');
        const q20_tertarik = answers['q20_0'].includes('Sesuai');
        html += `<div class="analysis-category"><h3>🤝 Iklim Keamanan & Kebinekaan</h3>`;
        if (q23_betah && q23_kucil && q20_tertarik) {
            html += `<p>Kamu merasa **aman, nyaman, dan tidak terkucilkan** di lingkungan sekolah. Kamu juga menunjukkan sikap terbuka terhadap keberagaman. Ini adalah tanda lingkungan sekolah yang sangat positif dan inklusif. Pertahankan sikap baikmu!</p>`;
        } else {
            html += `<p>Hasil analisismu menunjukkan adanya potensi masalah terkait rasa aman atau penerimaan di sekolah. Jika kamu merasa tidak nyaman, terancam, atau dikucilkan, **sangat penting untuk berbicara dengan guru BK, wali kelas, atau orang dewasa yang kamu percaya**. Sekolah seharusnya menjadi tempat yang aman untuk semua.</p>`;
        }
        html += `</div>`;
        
        const q9_jelas = answers['q9_0'].includes('sebagian-besar') || answers['q9_0'].includes('semua');
        const q10_bantuan = answers['q10_1'].includes('sebagian-besar') || answers['q10_1'].includes('semua');
        const q15_kuasai = answers['q15_0'].includes('Sesuai');
        html += `<div class="analysis-category"><h3>👩‍🏫 Kualitas Pengajaran</h3>`;
        if (q9_jelas && q10_bantuan && q15_kuasai) {
            html += `<p>Kamu merasa bahwa guru-gurumu **menguasai materi, memberikan instruksi yang jelas, dan siap membantu** saat kamu mengalami kesulitan. Ini menunjukkan kualitas pengajaran yang tinggi di sekolahmu. Teruslah aktif bertanya dan berdiskusi di kelas!</p>`;
        } else {
            html += `<p>Kamu mungkin merasa ada beberapa aspek pengajaran yang bisa ditingkatkan. Jika kamu sering merasa instruksi kurang jelas atau sulit mendapat bantuan, cobalah untuk **proaktif bertanya kepada guru setelah kelas** atau membentuk kelompok belajar dengan teman.</p>`;
        }
        html += `</div>`;
        
        analysisContent.innerHTML = html;
    }

    // --- INITIALIZE THE APP ---
    generateQuestions();
});
