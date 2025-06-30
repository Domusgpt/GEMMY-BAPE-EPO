/**
 * @file MeditationModes.js
 * @description Meditation and therapeutic experiences using neural visualization
 * 
 * Provides guided consciousness journeys, breathing exercises, color therapy,
 * and AI-assisted meditation experiences
 */

export class MeditationModes {
    constructor(consciousnessEngine) {
        this.consciousnessEngine = consciousnessEngine;
        this.currentSession = null;
        this.isActive = false;
        
        // Meditation state
        this.breathingPhase = 'inhale';
        this.breathingTimer = 0;
        this.breathingCycle = 0;
        
        // Color therapy state
        this.currentChakra = 0;
        this.chakraColors = [
            [1.0, 0.0, 0.0], // Root - Red
            [1.0, 0.5, 0.0], // Sacral - Orange  
            [1.0, 1.0, 0.0], // Solar Plexus - Yellow
            [0.0, 1.0, 0.0], // Heart - Green
            [0.0, 0.5, 1.0], // Throat - Blue
            [0.3, 0.0, 0.8], // Third Eye - Indigo
            [0.8, 0.0, 1.0]  // Crown - Violet
        ];
        
        // Consciousness journey state
        this.journeyPhase = 'preparation';
        this.journeyInsights = [];
        
        console.log('🧘 Meditation Modes initialized');
    }
    
    /**
     * Start breathing meditation with geometric visualization
     */
    startBreathingMeditation(duration = 300000) { // 5 minutes default
        console.log('🫁 Starting Breathing Meditation');
        
        this.currentSession = {
            type: 'breathing',
            startTime: Date.now(),
            duration: duration,
            completed: false
        };
        
        this.isActive = true;
        this.breathingPhase = 'prepare';
        this.breathingTimer = 0;
        this.breathingCycle = 0;
        
        // Set consciousness state to dreaming for relaxation
        this.consciousnessEngine.setConsciousnessState('dreaming');
        
        // Start breathing rhythm
        this.startBreathingRhythm();
        
        // Visual guidance
        this.showBreathingGuidance();
        
        return this.currentSession;
    }
    
    /**
     * Start breathing rhythm with 4-7-8 pattern
     */
    startBreathingRhythm() {
        const breathingInterval = setInterval(() => {
            if (!this.isActive || this.currentSession?.type !== 'breathing') {
                clearInterval(breathingInterval);
                return;
            }
            
            this.updateBreathingPhase();
            this.visualizeBreathing();
            
            // Check if session completed
            const elapsed = Date.now() - this.currentSession.startTime;
            if (elapsed >= this.currentSession.duration) {
                this.completeBreathingMeditation();
                clearInterval(breathingInterval);
            }
        }, 100);
    }
    
    /**
     * Update breathing phase according to 4-7-8 pattern
     */
    updateBreathingPhase() {
        this.breathingTimer += 100;
        
        switch (this.breathingPhase) {
            case 'prepare':
                if (this.breathingTimer >= 3000) { // 3 second preparation
                    this.breathingPhase = 'inhale';
                    this.breathingTimer = 0;
                }
                break;
                
            case 'inhale':
                if (this.breathingTimer >= 4000) { // 4 seconds inhale
                    this.breathingPhase = 'hold';
                    this.breathingTimer = 0;
                }
                break;
                
            case 'hold':
                if (this.breathingTimer >= 7000) { // 7 seconds hold
                    this.breathingPhase = 'exhale';
                    this.breathingTimer = 0;
                }
                break;
                
            case 'exhale':
                if (this.breathingTimer >= 8000) { // 8 seconds exhale
                    this.breathingPhase = 'inhale';
                    this.breathingTimer = 0;
                    this.breathingCycle++;
                }
                break;
        }
    }
    
    /**
     * Visualize breathing with expanding/contracting geometry
     */
    visualizeBreathing() {
        const breathingProgress = this.breathingTimer / this.getPhaseDuration();
        
        // Calculate breathing visualization parameters
        let expansionFactor = 0.5;
        let breathingIntensity = 0.3;
        let colorShift = 0.0;
        
        switch (this.breathingPhase) {
            case 'prepare':
                expansionFactor = 0.5;
                breathingIntensity = 0.1;
                break;
                
            case 'inhale':
                // Gentle expansion
                expansionFactor = 0.5 + (breathingProgress * 0.4);
                breathingIntensity = 0.3 + (breathingProgress * 0.3);
                colorShift = breathingProgress * 0.2;
                break;
                
            case 'hold':
                // Stable expansion
                expansionFactor = 0.9;
                breathingIntensity = 0.6;
                colorShift = 0.2 + Math.sin(this.breathingTimer * 0.005) * 0.1;
                break;
                
            case 'exhale':
                // Gentle contraction
                expansionFactor = 0.9 - (breathingProgress * 0.4);
                breathingIntensity = 0.6 - (breathingProgress * 0.4);
                colorShift = 0.2 - (breathingProgress * 0.2);
                break;
        }
        
        // Apply to all visualizers
        this.consciousnessEngine.visualizers.forEach(visualizer => {
            if (visualizer.setParameter) {
                visualizer.setParameter('u_morphFactor', expansionFactor);
                visualizer.setParameter('u_synapticFiring', breathingIntensity);
                visualizer.setParameter('u_emotionalResonance', colorShift);
                visualizer.setParameter('u_consciousnessLevel', 0.7 + Math.sin(this.breathingTimer * 0.002) * 0.2);
            }
        });
    }
    
    /**
     * Get duration for current breathing phase
     */
    getPhaseLength() {
        switch (this.breathingPhase) {
            case 'prepare': return 3000;
            case 'inhale': return 4000;
            case 'hold': return 7000;
            case 'exhale': return 8000;
            default: return 1000;
        }
    }
    
    /**
     * Complete breathing meditation
     */
    completeBreathingMeditation() {
        console.log(`🫁 Breathing meditation completed: ${this.breathingCycle} cycles`);
        
        this.currentSession.completed = true;
        this.currentSession.cycles = this.breathingCycle;
        
        // Gentle return to normal state
        this.consciousnessEngine.setConsciousnessState('learning');
        
        this.showMeditationCompletion('breathing');
        this.isActive = false;
    }
    
    /**
     * Start color therapy meditation
     */
    startColorTherapy(duration = 420000) { // 7 minutes (1 minute per chakra)
        console.log('🌈 Starting Color Therapy');
        
        this.currentSession = {
            type: 'colorTherapy',
            startTime: Date.now(),
            duration: duration,
            completed: false
        };
        
        this.isActive = true;
        this.currentChakra = 0;
        
        // Set consciousness state to learning for healing
        this.consciousnessEngine.setConsciousnessState('learning');
        
        // Start chakra progression
        this.startChakraProgression();
        
        return this.currentSession;
    }
    
    /**
     * Progress through chakra colors
     */
    startChakraProgression() {
        const chakraInterval = setInterval(() => {
            if (!this.isActive || this.currentSession?.type !== 'colorTherapy') {
                clearInterval(chakraInterval);
                return;
            }
            
            this.visualizeChakraHealing();
            
            // Progress to next chakra every minute
            const elapsed = Date.now() - this.currentSession.startTime;
            const expectedChakra = Math.floor(elapsed / 60000); // 1 minute per chakra
            
            if (expectedChakra !== this.currentChakra && expectedChakra < this.chakraColors.length) {
                this.currentChakra = expectedChakra;
                this.showChakraTransition();
            }
            
            // Check if session completed
            if (elapsed >= this.currentSession.duration) {
                this.completeColorTherapy();
                clearInterval(chakraInterval);
            }
        }, 100);
    }
    
    /**
     * Visualize chakra healing colors
     */
    visualizeChakraHealing() {
        const chakraColor = this.chakraColors[this.currentChakra];
        const healingIntensity = 0.7 + Math.sin(Date.now() * 0.003) * 0.2;
        
        // Apply chakra color to all visualizers
        this.consciousnessEngine.visualizers.forEach(visualizer => {
            if (visualizer.setParameter) {
                visualizer.setParameter('u_primaryColor', chakraColor);
                visualizer.setParameter('u_memoryFormation', healingIntensity);
                visualizer.setParameter('u_emotionalResonance', 0.8);
                visualizer.setParameter('u_synapticFiring', 0.4);
            }
        });
    }
    
    /**
     * Show chakra transition
     */
    showChakraTransition() {
        const chakraNames = ['Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'];
        const chakraName = chakraNames[this.currentChakra];
        
        console.log(`🔮 Transitioning to ${chakraName} Chakra`);
        
        // Visual notification (could be implemented as UI element)
        this.showNotification(`Healing ${chakraName} Chakra`, this.chakraColors[this.currentChakra]);
    }
    
    /**
     * Complete color therapy
     */
    completeColorTherapy() {
        console.log('🌈 Color therapy completed');
        
        this.currentSession.completed = true;
        this.currentSession.chakrasHealed = this.chakraColors.length;
        
        // Return to awakening state
        this.consciousnessEngine.setConsciousnessState('awakening');
        
        this.showMeditationCompletion('colorTherapy');
        this.isActive = false;
    }
    
    /**
     * Start consciousness journey meditation
     */
    startConsciousnessJourney(duration = 900000) { // 15 minutes
        console.log('🧭 Starting Consciousness Journey');
        
        this.currentSession = {
            type: 'consciousnessJourney',
            startTime: Date.now(),
            duration: duration,
            completed: false
        };
        
        this.isActive = true;
        this.journeyPhase = 'preparation';
        this.journeyInsights = [];
        
        // Set consciousness state to processing for deep exploration
        this.consciousnessEngine.setConsciousnessState('processing');
        
        // Start consciousness journey
        this.startJourneyProgression();
        
        return this.currentSession;
    }
    
    /**
     * Progress through consciousness journey phases
     */
    startJourneyProgression() {
        const journeyPhases = [
            { name: 'preparation', duration: 120000, state: 'processing' },     // 2 minutes
            { name: 'exploration', duration: 300000, state: 'learning' },      // 5 minutes  
            { name: 'discovery', duration: 240000, state: 'awakening' },       // 4 minutes
            { name: 'integration', duration: 180000, state: 'dreaming' },      // 3 minutes
            { name: 'transcendence', duration: 60000, state: 'awakening' }     // 1 minute
        ];
        
        let currentPhaseIndex = 0;
        let phaseStartTime = Date.now();
        
        const journeyInterval = setInterval(() => {
            if (!this.isActive || this.currentSession?.type !== 'consciousnessJourney') {
                clearInterval(journeyInterval);
                return;
            }
            
            const elapsed = Date.now() - phaseStartTime;
            const currentPhase = journeyPhases[currentPhaseIndex];
            
            // Update journey visualization
            this.visualizeJourneyPhase(currentPhase, elapsed / currentPhase.duration);
            
            // Check if phase completed
            if (elapsed >= currentPhase.duration) {
                currentPhaseIndex++;
                if (currentPhaseIndex < journeyPhases.length) {
                    // Move to next phase
                    const nextPhase = journeyPhases[currentPhaseIndex];
                    this.journeyPhase = nextPhase.name;
                    this.consciousnessEngine.setConsciousnessState(nextPhase.state);
                    phaseStartTime = Date.now();
                    
                    this.generateJourneyInsight(currentPhase.name);
                    console.log(`🌊 Journey phase: ${nextPhase.name}`);
                } else {
                    // Journey completed
                    this.completeConsciousnessJourney();
                    clearInterval(journeyInterval);
                }
            }
        }, 100);
    }
    
    /**
     * Visualize consciousness journey phase
     */
    visualizeJourneyPhase(phase, progress) {
        let morphFactor = 0.5;
        let dimension = 3.5;
        let consciousnessLevel = 0.5;
        let neuralActivity = 0.3;
        
        switch (phase.name) {
            case 'preparation':
                morphFactor = 0.3 + progress * 0.2;
                consciousnessLevel = 0.3 + progress * 0.2;
                break;
                
            case 'exploration':
                morphFactor = 0.5 + Math.sin(progress * Math.PI * 4) * 0.3;
                dimension = 3.5 + progress * 0.3;
                consciousnessLevel = 0.5 + progress * 0.3;
                neuralActivity = 0.4 + Math.sin(progress * Math.PI * 6) * 0.2;
                break;
                
            case 'discovery':
                morphFactor = 0.8 + Math.sin(progress * Math.PI * 2) * 0.2;
                dimension = 3.8 + progress * 0.2;
                consciousnessLevel = 0.8 + progress * 0.2;
                neuralActivity = 0.6 + progress * 0.3;
                break;
                
            case 'integration':
                morphFactor = 1.0 - progress * 0.3;
                dimension = 4.0 - progress * 0.2;
                consciousnessLevel = 1.0 - progress * 0.2;
                neuralActivity = 0.9 - progress * 0.4;
                break;
                
            case 'transcendence':
                morphFactor = 0.7 + Math.sin(progress * Math.PI * 8) * 0.3;
                dimension = 3.8;
                consciousnessLevel = 1.0;
                neuralActivity = 1.0;
                break;
        }
        
        // Apply to all visualizers
        this.consciousnessEngine.visualizers.forEach(visualizer => {
            if (visualizer.setParameter) {
                visualizer.setParameter('u_morphFactor', morphFactor);
                visualizer.setParameter('u_dimension', dimension);
                visualizer.setParameter('u_consciousnessLevel', consciousnessLevel);
                visualizer.setParameter('u_synapticFiring', neuralActivity);
                visualizer.setParameter('u_dreamLogic', phase.name === 'transcendence' ? 0.8 : 0.2);
            }
        });
    }
    
    /**
     * Generate insights during consciousness journey
     */
    generateJourneyInsight(phaseName) {
        const insights = {
            preparation: [
                "Consciousness is like an ocean - vast, deep, and ever-changing",
                "Awareness begins with accepting what is, without judgment",
                "The mind is a tool; you are the one who wields it"
            ],
            exploration: [
                "Every thought is a wave in the ocean of consciousness",
                "The boundaries between self and universe are illusions",
                "Curiosity is the compass that guides inner exploration"
            ],
            discovery: [
                "True wisdom comes from knowing that you know nothing",
                "The present moment is the only reality that exists",
                "Love is the fundamental force that connects all consciousness"
            ],
            integration: [
                "Integration requires bringing insights into daily life",
                "Compassion for yourself is the foundation of wisdom",
                "Every moment offers an opportunity for awakening"
            ]
        };
        
        const phaseInsights = insights[phaseName] || ["The journey continues..."];
        const insight = phaseInsights[Math.floor(Math.random() * phaseInsights.length)];
        
        this.journeyInsights.push({
            phase: phaseName,
            insight: insight,
            timestamp: Date.now()
        });
        
        this.showInsight(insight);
    }
    
    /**
     * Complete consciousness journey
     */
    completeConsciousnessJourney() {
        console.log('🧭 Consciousness journey completed');
        
        this.currentSession.completed = true;
        this.currentSession.insights = this.journeyInsights;
        
        // Return to awakening state
        this.consciousnessEngine.setConsciousnessState('awakening');
        
        this.showMeditationCompletion('consciousnessJourney');
        this.isActive = false;
    }
    
    /**
     * Stop current meditation session
     */
    stopMeditation() {
        if (this.currentSession) {
            console.log(`⏹️ Stopping ${this.currentSession.type} meditation`);
            this.isActive = false;
            this.currentSession = null;
            
            // Return to normal state
            this.consciousnessEngine.setConsciousnessState('dreaming');
        }
    }
    
    /**
     * Show breathing guidance (placeholder - would be UI implementation)
     */
    showBreathingGuidance() {
        console.log('🫁 Showing breathing guidance');
        // Implementation would create UI elements for breathing guidance
    }
    
    /**
     * Show meditation completion (placeholder - would be UI implementation)
     */
    showMeditationCompletion(type) {
        console.log(`✅ ${type} meditation completed`);
        // Implementation would show completion UI with session statistics
    }
    
    /**
     * Show notification (placeholder - would be UI implementation)
     */
    showNotification(message, color) {
        console.log(`📢 ${message}`);
        // Implementation would show visual notification
    }
    
    /**
     * Show insight (placeholder - would be UI implementation)
     */
    showInsight(insight) {
        console.log(`💡 Insight: ${insight}`);
        // Implementation would show insight in UI
    }
    
    /**
     * Get current session status
     */
    getSessionStatus() {
        if (!this.currentSession) return null;
        
        const elapsed = Date.now() - this.currentSession.startTime;
        const progress = Math.min(elapsed / this.currentSession.duration, 1.0);
        
        return {
            type: this.currentSession.type,
            progress: progress,
            elapsed: elapsed,
            remaining: Math.max(this.currentSession.duration - elapsed, 0),
            phase: this.getCurrentPhase(),
            completed: this.currentSession.completed
        };
    }
    
    /**
     * Get current meditation phase
     */
    getCurrentPhase() {
        switch (this.currentSession?.type) {
            case 'breathing':
                return this.breathingPhase;
            case 'colorTherapy':
                const chakraNames = ['Root', 'Sacral', 'Solar Plexus', 'Heart', 'Throat', 'Third Eye', 'Crown'];
                return chakraNames[this.currentChakra];
            case 'consciousnessJourney':
                return this.journeyPhase;
            default:
                return 'inactive';
        }
    }
}