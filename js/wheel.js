// Wheel.js - Spin Wheel Logic
class SpinWheel {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.participants = [];
        this.currentRotation = 0;
        this.isSpinning = false;
        this.spinDuration = 5000;
        this.colorTheme = 'rainbow';
        this.colorThemes = {
            rainbow: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'],
            ocean: ['#006994', '#13293D', '#247BA0', '#1B98E0', '#006994', '#13293D', '#247BA0', '#1B98E0'],
            sunset: ['#FF6B6B', '#EE5A6F', '#F29E4C', '#EFEA5A', '#F1C453', '#F29E4C', '#EE5A6F', '#FF6B6B'],
            forest: ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2', '#B7E4C7', '#D8F3DC', '#52B788']
        };
        this.init();
    }

    init() {
        this.drawWheel();
    }

    setParticipants(participants) {
        this.participants = participants;
        this.drawWheel();
    }

    setTheme(theme) {
        this.colorTheme = theme;
        this.drawWheel();
    }

    setDuration(duration) {
        this.spinDuration = duration * 1000;
    }

    drawWheel() {
        if (this.participants.length === 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = 'white';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Tambahkan peserta untuk memulai', this.canvas.width / 2, this.canvas.height / 2);
            return;
        }

        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const colors = this.colorThemes[this.colorTheme];
        const arc = (2 * Math.PI) / this.participants.length;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(this.currentRotation);

        for (let i = 0; i < this.participants.length; i++) {
            const angle = i * arc;
            this.ctx.beginPath();
            this.ctx.fillStyle = colors[i % colors.length];
            this.ctx.moveTo(0, 0);
            this.ctx.arc(0, 0, radius, angle, angle + arc);
            this.ctx.lineTo(0, 0);
            this.ctx.fill();
            this.ctx.stroke();

            this.ctx.save();
            this.ctx.rotate(angle + arc / 2);
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = 'white';
            this.ctx.font = 'bold 16px Arial';
            this.ctx.fillText(this.participants[i], radius * 0.65, 0);
            this.ctx.restore();
        }

        this.ctx.restore();
    }

    spin(callback) {
        if (this.isSpinning || this.participants.length === 0) return;

        this.isSpinning = true;
        const totalRotation = Math.random() * 360 + 1440 + 360 * 5;
        const startTime = Date.now();
        const startRotation = this.currentRotation;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / this.spinDuration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.currentRotation = startRotation + (totalRotation * easeOut * Math.PI / 180);
            this.drawWheel();

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.isSpinning = false;
                const winnerIndex = this.getWinnerIndex();
                if (callback) callback(this.participants[winnerIndex]);
            }
        };

        animate();
    }

    getWinnerIndex() {
        const normalizedRotation = (this.currentRotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const arc = (2 * Math.PI) / this.participants.length;
        const pointerAngle = (2 * Math.PI - normalizedRotation + Math.PI / 2) % (2 * Math.PI);
        return Math.floor(pointerAngle / arc) % this.participants.length;
    }
}