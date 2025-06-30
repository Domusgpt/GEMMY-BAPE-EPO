// visualizers/VisualizerBase.js

class VisualizerBase {
    constructor(gl, shaderManager, options = {}) {
        if (!gl) throw new Error("WebGL context needed for VisualizerBase.");
        if (!shaderManager) throw new Error("ShaderManager needed for VisualizerBase.");
        this.gl = gl;
        this.shaderManager = shaderManager;
        this.options = options;
        this.programName = null;
    }

    // This method should be overridden by subclasses to set up their specific shader program
    setupProgram(geometryTypeName, projectionMethodName, epoGLSL = { uniforms: '', functions: '' }) {
        // Default implementation, can be extended or replaced
        this.programName = `base-visualizer-${geometryTypeName}-${projectionMethodName}`;
        this.shaderManager.createDynamicProgram(this.programName, geometryTypeName, projectionMethodName, epoGLSL);
    }

    // Update logic, to be overridden by subclasses
    update(deltaTime) {
        // Base update logic if any
    }

    // Draw logic, to be overridden by subclasses
    draw() {
        // Base draw logic if any
    }

    // Dispose of WebGL resources, to be extended by subclasses
    dispose() {
        if (this.programName) {
            this.shaderManager.useProgram(null); // Detach program
            // The ShaderManager handles actual program deletion
        }
        this.gl = null;
        this.shaderManager = null;
    }
}

export { VisualizerBase };
