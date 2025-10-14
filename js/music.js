// Music.js - Background Music & Sound Effects Management
class MusicManager {
    constructor() {
        this.bgMusic = document.getElementById('backgroundMusic');
        this.spinSound = document.getElementById('spinSound');
        this.winSound = document.getElementById('winSound');
        this.currentTrackIndex = -1;
        this.isPlaying = false;
        
        this.tracks = [
            { name: 'Dramatic Suspense 1', url: 'https://www.bensound.com/bensound-music/bensound-actionable.mp3' },
            { name: 'Intense Build Up 2', url: 'https://www.bensound.com/bensound-music/bensound-epic.mp3' },
            { name: 'Tension Rising 3', url: 'https://www.bensound.com/bensound-music/bensound-theelevatorbossanova.mp3' },
            { name: 'Epic Drums 4', url: 'https://www.bensound.com/bensound-music/bensound-dubstep.mp3' },
            { name: 'Mysterious Ambient 5', url: 'https://www.bensound.com/bensound-music/bensound-instinct.mp3' }
        ];
        
        this.init();
    }
    
    init() {
        this.bgMusic.volume = 0.5;
        this.bgMusic.addEventListener('ended', () => this.next());
    }
    
    loadTrack(index) {
        if (index >= 0 && index < this.tracks.length) {
            this.currentTrackIndex = index;
            this.bgMusic.src = this.tracks[index].url;
            return this.tracks[index].name;
        }
        return '';
    }
    
    play() {
        if (this.currentTrackIndex >= 0) {
            this.bgMusic.play().catch(err => console.log('Playback prevented:', err));
            this.isPlaying = true;
        }
    }
    
    pause() {
        this.bgMusic.pause();
        this.isPlaying = false;
    }
    
    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }
    
    next() {
        const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.loadTrack(nextIndex);
        if (this.isPlaying) this.play();
    }
    
    previous() {
        const prevIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.loadTrack(prevIndex);
        if (this.isPlaying) this.play();
    }
    
    setVolume(volume) {
        this.bgMusic.volume = volume / 100;
    }
    
    playSpinSound() {
        this.spinSound.currentTime = 0;
        this.spinSound.play().catch(err => console.log('Sound effect error:', err));
    }
    
    playWinSound() {
        this.winSound.currentTime = 0;
        this.winSound.play().catch(err => console.log('Sound effect error:', err));
    }
    
    getCurrentTrackName() {
        return this.currentTrackIndex >= 0 ? this.tracks[this.currentTrackIndex].name : 'Pilih Musik';
    }
}
