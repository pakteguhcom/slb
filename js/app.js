// App.js - Main Application Logic
let participants = [];
let spinHistory = [];
let wheel, musicManager, groupManager;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    wheel = new SpinWheel('wheelCanvas');
    musicManager = new MusicManager();
    groupManager = new GroupManager();
    
    loadParticipantsFromStorage();
    loadHistoryFromStorage();
    initializeEventListeners();
    updateUI();
});

function initializeEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });
    
    // Participant management
    document.getElementById('addBtn').addEventListener('click', addParticipant);
    document.getElementById('participantInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addParticipant();
    });
    document.getElementById('clearAllBtn').addEventListener('click', clearAllParticipants);
    document.getElementById('saveListBtn').addEventListener('click', saveParticipants);
    document.getElementById('loadListBtn').addEventListener('click', loadParticipants);
    
    // Spin button
    document.getElementById('spinBtn').addEventListener('click', spinWheel);
    
    // Group division
    document.getElementById('divideGroupsBtn').addEventListener('click', divideGroups);
    document.getElementById('exportGroupsBtn').addEventListener('click', exportGroups);
    
    // Music controls
    document.getElementById('playPause').addEventListener('click', () => {
        musicManager.toggle();
        updateMusicUI();
    });
    document.getElementById('nextTrack').addEventListener('click', () => {
        musicManager.next();
        updateMusicUI();
    });
    document.getElementById('prevTrack').addEventListener('click', () => {
        musicManager.previous();
        updateMusicUI();
    });
    document.getElementById('volumeControl').addEventListener('input', (e) => {
        musicManager.setVolume(e.target.value);
        document.getElementById('volumeLabel').textContent = e.target.value + '%';
    });
    document.getElementById('musicSelector').addEventListener('change', (e) => {
        if (e.target.value) {
            musicManager.loadTrack(parseInt(e.target.value));
            updateMusicUI();
        }
    });
    
    // Settings
    document.getElementById('spinDuration').addEventListener('input', (e) => {
        wheel.setDuration(e.target.value);
        document.getElementById('durationLabel').textContent = e.target.value + 's';
    });
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            wheel.setTheme(btn.dataset.theme);
        });
    });
    
    // History
    document.getElementById('clearHistoryBtn').addEventListener('click', clearHistory);
}

function switchTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

function addParticipant() {
    const input = document.getElementById('participantInput');
    const name = input.value.trim();
    
    if (name && !participants.includes(name)) {
        participants.push(name);
        input.value = '';
        updateUI();
        saveToStorage();
    }
}

function removeParticipant(name) {
    participants = participants.filter(p => p !== name);
    updateUI();
    saveToStorage();
}

function clearAllParticipants() {
    if (confirm('Hapus semua peserta?')) {
        participants = [];
        updateUI();
        saveToStorage();
    }
}

function updateUI() {
    updateParticipantList();
    wheel.setParticipants(participants);
}

function updateParticipantList() {
    const list = document.getElementById('participantList');
    list.innerHTML = '';
    
    participants.forEach(name => {
        const item = document.createElement('div');
        item.className = 'participant-item';
        item.innerHTML = `
            <span>${name}</span>
            <button onclick="removeParticipant('${name}')">Hapus</button>
        `;
        list.appendChild(item);
    });
}

function spinWheel() {
    if (participants.length === 0) {
        alert('Tambahkan peserta terlebih dahulu!');
        return;
    }
    
    const spinBtn = document.getElementById('spinBtn');
    spinBtn.disabled = true;
    
    const autoPlayMusic = document.getElementById('autoPlayMusic').checked;
    const soundEffects = document.getElementById('soundEffects').checked;
    
    if (autoPlayMusic && !musicManager.isPlaying) {
        musicManager.play();
        updateMusicUI();
    }
    
    if (soundEffects) {
        musicManager.playSpinSound();
    }
    
    wheel.spin((winner) => {
        if (soundEffects) {
            musicManager.playWinSound();
        }
        
        displayWinner(winner);
        addToHistory(winner);
        
        if (document.getElementById('confetti').checked) {
            launchConfetti();
        }
        
        spinBtn.disabled = false;
    });
}

function displayWinner(winner) {
    const display = document.getElementById('winnerDisplay');
    display.innerHTML = `🎉 <strong>${winner}</strong> 🎉`;
    display.style.animation = 'none';
    setTimeout(() => {
        display.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

function addToHistory(winner) {
    const timestamp = new Date().toLocaleString('id-ID');
    spinHistory.unshift({ winner, timestamp });
    
    if (spinHistory.length > 50) spinHistory.pop();
    
    updateHistoryDisplay();
    saveHistoryToStorage();
}

function updateHistoryDisplay() {
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    
    spinHistory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = `${item.winner} - ${item.timestamp}`;
        list.appendChild(div);
    });
}

function clearHistory() {
    if (confirm('Hapus semua riwayat?')) {
        spinHistory = [];
        updateHistoryDisplay();
        saveHistoryToStorage();
    }
}

function divideGroups() {
    const groupCount = parseInt(document.getElementById('groupCount').value);
    
    if (participants.length === 0) {
        alert('Tambahkan peserta terlebih dahulu!');
        return;
    }
    
    const groups = groupManager.divideIntoGroups(participants, groupCount);
    displayGroups(groups);
}

function displayGroups(groups) {
    const display = document.getElementById('groupsDisplay');
    display.innerHTML = '';
    
    groups.forEach((group, index) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'group-item';
        groupDiv.innerHTML = `
            <h4>Kelompok ${index + 1} (${group.length} orang)</h4>
            <ul>
                ${group.map(member => `<li>${member}</li>`).join('')}
            </ul>
        `;
        display.appendChild(groupDiv);
    });
}

function exportGroups() {
    if (groupManager.getGroups().length === 0) {
        alert('Bagi kelompok terlebih dahulu!');
        return;
    }
    
    const text = groupManager.exportAsText();
    groupManager.downloadAsFile(text, `kelompok_${Date.now()}.txt`);
}

function updateMusicUI() {
    const playPauseBtn = document.getElementById('playPause');
    playPauseBtn.textContent = musicManager.isPlaying ? '⏸️' : '▶️';
    document.getElementById('currentTrack').textContent = '🎵 ' + musicManager.getCurrentTrackName();
}

function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#FFD700', '#F7DC6F'];
    
    for (let i = 0; i < 150; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            r: Math.random() * 6 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            spin: Math.random() * 0.2 - 0.1
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(p => {
            p.y += p.speed;
            p.angle += p.spin;
            p.x += Math.sin(p.angle) * 2;
            
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        });
        
        if (confetti.some(p => p.y < canvas.height)) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    
    animate();
}

function saveToStorage() {
    localStorage.setItem('spinwheelParticipants', JSON.stringify(participants));
}

function loadParticipantsFromStorage() {
    const saved = localStorage.getItem('spinwheelParticipants');
    if (saved) {
        participants = JSON.parse(saved);
    }
}

function saveParticipants() {
    saveToStorage();
    alert('Daftar peserta berhasil disimpan!');
}

function loadParticipants() {
    loadParticipantsFromStorage();
    updateUI();
    alert('Daftar peserta berhasil dimuat!');
}

function saveHistoryToStorage() {
    localStorage.setItem('spinwheelHistory', JSON.stringify(spinHistory));
}

function loadHistoryFromStorage() {
    const saved = localStorage.getItem('spinwheelHistory');
    if (saved) {
        spinHistory = JSON.parse(saved);
        updateHistoryDisplay();
    }
}
