// Groups.js - Automatic Group Division Logic
class GroupManager {
    constructor() {
        this.groups = [];
    }
    
    divideIntoGroups(participants, numberOfGroups) {
        if (participants.length === 0 || numberOfGroups < 2) {
            return [];
        }
        
        // Shuffle participants for random distribution
        const shuffled = [...participants].sort(() => Math.random() - 0.5);
        
        // Initialize groups
        this.groups = Array.from({ length: numberOfGroups }, () => []);
        
        // Distribute participants evenly
        shuffled.forEach((participant, index) => {
            const groupIndex = index % numberOfGroups;
            this.groups[groupIndex].push(participant);
        });
        
        return this.groups;
    }
    
    getGroups() {
        return this.groups;
    }
    
    exportAsText() {
        let text = '📋 HASIL PEMBAGIAN KELOMPOK\n';
        text += '=' .repeat(40) + '\n\n';
        
        this.groups.forEach((group, index) => {
            text += `Kelompok ${index + 1} (${group.length} orang):\n`;
            group.forEach((member, i) => {
                text += `  ${i + 1}. ${member}\n`;
            });
            text += '\n';
        });
        
        text += '=' .repeat(40) + '\n';
        text += `Total: ${this.groups.reduce((sum, g) => sum + g.length, 0)} peserta dalam ${this.groups.length} kelompok`;
        
        return text;
    }
    
    exportAsJSON() {
        return JSON.stringify({
            totalGroups: this.groups.length,
            totalParticipants: this.groups.reduce((sum, g) => sum + g.length, 0),
            groups: this.groups.map((group, index) => ({
                groupNumber: index + 1,
                memberCount: group.length,
                members: group
            }))
        }, null, 2);
    }
    
    downloadAsFile(content, filename, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}
