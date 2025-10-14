class MusicManager {
    constructor() {
        this.tracks = [];
        this.currentTrackIndex = 0;
        this.audio = new Audio();
        this.volume = 1;
    }

    addTrack(trackUrl) {
        this.tracks.push(trackUrl);
    }

    play() {
        if (this.tracks.length > 0) {
            this.audio.src = this.tracks[this.currentTrackIndex];
            this.audio.volume = this.volume;
            this.audio.play();
        }
    }

    pause() {
        this.audio.pause();
    }

    next() {
        this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        this.play();
    }

    previous() {
        this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        this.play();
    }

    setVolume(volume) {
        this.volume = volume;
        this.audio.volume = this.volume;
    }

    playSoundEffect(effectUrl) {
        const effectAudio = new Audio(effectUrl);
        effectAudio.play();
    }
}

// Example usage:
const musicManager = new MusicManager();
musicManager.addTrack('track1.mp3');
musicManager.addTrack('track2.mp3');
musicManager.play();
musicManager.setVolume(0.5);
musicManager.playSoundEffect('spin.mp3');
musicManager.playSoundEffect('win.mp3');
