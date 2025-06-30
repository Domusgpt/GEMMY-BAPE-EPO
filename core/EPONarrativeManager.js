

// core/EPONarrativeManager.js

class EPONarrativeManager {
    constructor() {
        this.paperContent = '';
        this.sections = [];
        this.currentSectionIndex = 0;
    }

    async loadPaper(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.paperContent = await response.text();
            this._parseSections();
            console.log('Paper loaded and parsed successfully.');
        } catch (error) {
            console.error('Error loading or parsing paper:', error);
        }
    }

    _parseSections() {
        // This is a simplified parsing. In a real scenario, you'd use more robust
        // text processing to identify chapters, sub-sections, etc.
        // For now, let's split by double newlines as a basic paragraph/section separator.
        const rawSections = this.paperContent.split(/\n\n+/);
        this.sections = rawSections.map((content, index) => ({
            id: `section-${index}`,
            title: `Section ${index + 1}`,
            content: content.trim()
        })).filter(section => section.content.length > 0);

        // Attempt to extract titles from the first line of each section if it looks like a heading
        this.sections.forEach(section => {
            const firstLine = section.content.split('\n')[0];
            if (firstLine.length < 100 && firstLine.toUpperCase() === firstLine) { // Heuristic for a title
                section.title = firstLine;
            }
        });
    }

    getSection(index) {
        if (index >= 0 && index < this.sections.length) {
            this.currentSectionIndex = index;
            return this.sections[index];
        }
        return null;
    }

    getCurrentSection() {
        return this.getSection(this.currentSectionIndex);
    }

    nextSection() {
        if (this.currentSectionIndex < this.sections.length - 1) {
            this.currentSectionIndex++;
            return this.sections[this.currentSectionIndex];
        }
        return null;
    }

    previousSection() {
        if (this.currentSectionIndex > 0) {
            this.currentSectionIndex--;
            return this.sections[this.currentSectionIndex];
        }
        return null;
    }

    getSectionCount() {
        return this.sections.length;
    }

    getSectionTheme(sectionContent) {
        const lowerCaseContent = sectionContent.toLowerCase();

        if (lowerCaseContent.includes('entropic principle of organization') || lowerCaseContent.includes('epo')) {
            return 'epo-overview';
        } else if (lowerCaseContent.includes('integrative drive') || lowerCaseContent.includes('epo-i') || lowerCaseContent.includes('order') || lowerCaseContent.includes('complexity') || lowerCaseContent.includes('gravity') || lowerCaseContent.includes('spacetime')) {
            return 'integrative';
        } else if (lowerCaseContent.includes('dispersive drive') || lowerCaseContent.includes('epo-d') || lowerCaseContent.includes('chaos') || lowerCaseContent.includes('dissipation') || lowerCaseContent.includes('dark energy')) {
            return 'dispersive';
        } else if (lowerCaseContent.includes('entropic potential field') || lowerCaseContent.includes('epf') || lowerCaseContent.includes('field')) {
            return 'epf';
        } else if (lowerCaseContent.includes('informational panpsychism') || lowerCaseContent.includes('consciousness') || lowerCaseContent.includes('reflex')) {
            return 'consciousness';
        } else if (lowerCaseContent.includes('quantum reality') || lowerCaseContent.includes('phase shifts') || lowerCaseContent.includes('probabilistic')) {
            return 'quantum';
        } else if (lowerCaseContent.includes('dark matter') || lowerCaseContent.includes('dark energy') || lowerCaseContent.includes('unseen forces')) {
            return 'dark-forces';
        } else if (lowerCaseContent.includes('allometric scaling') || lowerCaseContent.includes('scaling laws') || lowerCaseContent.includes('growth patterns')) {
            return 'allometric';
        }
        return 'default';
    }
}

export { EPONarrativeManager };

