
import { SystemController } from '/GEMMY-BAPE-EPO/src/core/SystemController.js';
import { EPONarrativeManager } from '/GEMMY-BAPE-EPO/src/core/EPONarrativeManager.js';
import { EPOCore } from '/GEMMY-BAPE-EPO/src/core/EPOCore.js';

// Global error handler for better debugging
window.onerror = function(message, source, lineno, colno, error) {
    console.error("🚨 GLOBAL ERROR:", {
        message: message,
        source: source,
        line: lineno,
        column: colno,
        error: error,
        stack: error ? error.stack : 'No stack trace'
    });
    return false; // Allow default error handling to show in console
};

window.addEventListener('unhandledrejection', (event) => {
    console.error("Unhandled Promise Rejection:", event.reason);
});

// Initialize when page loads
window.addEventListener('load', async () => {
    console.log('🚀 Initializing VIB34D JSON-Driven System...');
    
    try {
        const epoNarrativeManager = new EPONarrativeManager();
        await epoNarrativeManager.loadPaper('/mnt/c/Users/millz/Desktop/GEMMY BAPE/The Entropic Principle of Organization (Final Draft) (1).docx.txt');
        window.epoNarrativeManager = epoNarrativeManager;

        const epoCore = new EPOCore();
        window.epoCore = epoCore;

        // Initialize the new JSON-driven SystemController
        const systemController = new SystemController(epoNarrativeManager, epoCore);
        
        // Make globally accessible for debugging and agent control
        window.systemController = systemController;
        window.homeMaster = systemController.homeMaster;

        // Narrative navigation controls
        const prevSectionBtn = document.getElementById('prev-section-btn');
        const nextSectionBtn = document.getElementById('next-section-btn');
        const currentSectionTitle = document.getElementById('current-section-title');

        const updateNarrativeDisplay = () => {
            const currentSection = epoNarrativeManager.getCurrentSection();
            if (currentSection) {
                currentSectionTitle.textContent = currentSection.title;
                // The visualizer will pick up the content from the manager in its update loop
            }
        };

        prevSectionBtn.addEventListener('click', () => {
            epoNarrativeManager.previousSection();
            updateNarrativeDisplay();
        });

        nextSectionBtn.addEventListener('click', () => {
            epoNarrativeManager.nextSection();
            updateNarrativeDisplay();
        });

        // Initial display update
        updateNarrativeDisplay();
        
        console.log('✅ VIB34D System fully operational!');
        console.log('🤖 Access via: window.agentAPI, window.systemController, window.homeMaster');
        
    } catch (error) {
        console.error('❌ VIB34D System initialization failed:', error);
        
        // Show error to user
        document.body.innerHTML = `
            <div style="background: #000; color: #ff0000; padding: 20px; font-family: monospace;">
                <h2>🚨 VIB34D System Error</h2>
                <p>Failed to initialize the JSON-driven system:</p>
                <pre>${error.message}</pre>
                <p>Check browser console for details.</p>
            </div>
        `;
    }
});
