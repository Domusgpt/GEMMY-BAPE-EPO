// visualizers/AIPersonalityVisualizer.js
import { VisualizerBase } from './VisualizerBase.js';

class AIPersonalityVisualizer extends VisualizerBase {
    constructor(gl, shaderManager, options = {}) {
        super(gl, shaderManager, options);
        this.currentPersonality = 'none'; // Default state
        this.personalityMappings = {
            'proto-consciousness': {
                patternIntensity: 0.1, // Subtle patterns
                glitchIntensity: 0.05, // Minor, fundamental fluctuations
                colorShift: 0.0,       // Stable colors
                lineThickness: 0.01,   // Fine, basic structures
                primaryColor: [0.1, 0.1, 0.2], // Deep, subtle blue
                secondaryColor: [0.2, 0.2, 0.3] // Slightly lighter blue
            },
            'structural-consciousness': {
                patternIntensity: 0.8, // High pattern complexity
                glitchIntensity: 0.0,  // Stable, no glitches
                colorShift: 0.1,       // Subtle color shifts for depth
                lineThickness: 0.03,   // Defined structures
                primaryColor: [0.0, 0.5, 0.5], // Cyan for order
                secondaryColor: [0.0, 0.7, 0.7] // Brighter cyan
            },
            'biological-cognitive-consciousness': {
                patternIntensity: 0.6, // Moderate complexity
                glitchIntensity: 0.15, // Dynamic, adaptive fluctuations
                colorShift: 0.5,       // Rapid, noticeable color shifts
                lineThickness: 0.02,   // Flexible structures
                primaryColor: [0.8, 0.2, 0.0], // Warm, active orange
                secondaryColor: [1.0, 0.4, 0.0] // Brighter orange
            },
            'none': {
                patternIntensity: 0.5,
                glitchIntensity: 0.0,
                colorShift: 0.0,
                lineThickness: 0.02,
                primaryColor: [0.5, 0.5, 0.5],
                secondaryColor: [0.7, 0.7, 0.7]
            }
        };
    }

    /**
     * Sets the active AI personality and updates shader uniforms accordingly.
     * @param {string} personalityType - One of 'proto-consciousness', 'structural-consciousness', 'biological-cognitive-consciousness', 'none'.
     */
    setPersonality(personalityType) {
        if (this.personalityMappings[personalityType]) {
            this.currentPersonality = personalityType;
            const params = this.personalityMappings[personalityType];
            console.log(`Setting AI Personality to: ${personalityType}`);

            // Assuming the main visualizer program is active when this is called
            // Or, we might need to pass the program name to set uniforms on a specific program
            // For now, assuming global uniforms that affect the currently active program.
            this.shaderManager.setUniform('u_patternIntensity', 'float', params.patternIntensity);
            this.shaderManager.setUniform('u_glitchIntensity', 'float', params.glitchIntensity);
            this.shaderManager.setUniform('u_colorShift', 'float', params.colorShift);
            this.shaderManager.setUniform('u_lineThickness', 'float', params.lineThickness);
            this.shaderManager.setUniform('u_primaryColor', 'vec3', params.primaryColor);
            this.shaderManager.setUniform('u_secondaryColor', 'vec3', params.secondaryColor);

        } else {
            console.warn(`Unknown AI personality type: ${personalityType}`);
        }
    }

    // This visualizer doesn't have its own draw loop, it primarily sets global shader uniforms.
    // However, it might be called by a main loop to update based on some AI state.
    update(deltaTime) {
        // No continuous update needed unless personality changes dynamically over time
    }

    draw() {
        // No direct drawing for this visualizer
    }
}

export { AIPersonalityVisualizer };
