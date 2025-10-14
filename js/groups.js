class GroupManager {
    constructor() {
        this.groups = [];
    }

    divideIntoGroups(members, groupSize) {
        this.groups = [];
        for (let i = 0; i < members.length; i += groupSize) {
            this.groups.push(members.slice(i, i + groupSize));
        }
    }

    getGroups() {
        return this.groups;
    }

    exportAsText() {
        return this.groups.map((group, index) => `Group ${index + 1}: ${group.join(", ")}`).join("\n");
    }

    exportAsJSON() {
        return JSON.stringify(this.groups, null, 2);
    }

    downloadAsFile(filename) {
        const blob = new Blob([this.exportAsText()], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}