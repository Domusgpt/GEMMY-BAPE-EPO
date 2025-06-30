// visualizers/EPODispersiveVisualizer.js
import { VisualizerBase } from './VisualizerBase.js'; // Assuming a base visualizer class or create one if needed

class EPODispersiveVisualizer extends VisualizerBase {
    constructor(gl, shaderManager, options = {}) {
        super(gl, shaderManager, options);
        this.dispersivePotential = 0.0; // Will be updated by EPOCore
        this.particleCount = 10000; // Initial particle count
        this.particlePositions = new Float32Array(this.particleCount * 3);
        this.particleVelocities = new Float32Array(this.particleCount * 3);
        this.particleColors = new Float32Array(this.particleCount * 4);

        this._initParticles();
        this.setupProgram('point', 'orthographic'); // Using a simple point geometry and orthographic projection for particles
    }

    _initParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            // Random initial positions within a cube
            this.particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 2.0;
            this.particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 2.0;
            this.particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.0;

            // Random initial velocities
            this.particleVelocities[i * 3 + 0] = (Math.random() - 0.5) * 0.01;
            this.particleVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            this.particleVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;

            // Random colors
            this.particleColors[i * 4 + 0] = Math.random();
            this.particleColors[i * 4 + 1] = Math.random();
            this.particleColors[i * 4 + 2] = Math.random();
            this.particleColors[i * 4 + 3] = 1.0; // Alpha
        }

        this.positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particlePositions, this.gl.DYNAMIC_DRAW);

        this.colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, this.particleColors, this.gl.STATIC_DRAW);
    }

    update(deltaTime, dispersivePotential, scaleFactor, narrativeTheme) {
        this.dispersivePotential = dispersivePotential;

        // Update particle positions based on velocities and dispersive potential
        for (let i = 0; i < this.particleCount; i++) {
            this.particlePositions[i * 3 + 0] += this.particleVelocities[i * 3 + 0] * deltaTime * (1.0 + this.dispersivePotential * 2.0) * scaleFactor;
            this.particlePositions[i * 3 + 1] += this.particleVelocities[i * 3 + 1] * deltaTime * (1.0 + this.dispersivePotential * 2.0) * scaleFactor;
            this.particlePositions[i * 3 + 2] += this.particleVelocities[i * 3 + 2] * deltaTime * (1.0 + this.dispersivePotential * 2.0) * scaleFactor;

            // Simple boundary check: wrap particles around
            if (this.particlePositions[i * 3 + 0] > 1.0) this.particlePositions[i * 3 + 0] -= 2.0;
            if (this.particlePositions[i * 3 + 0] < -1.0) this.particlePositions[i * 3 + 0] += 2.0;
            if (this.particlePositions[i * 3 + 1] > 1.0) this.particlePositions[i * 3 + 1] -= 2.0;
            if (this.particlePositions[i * 3 + 1] < -1.0) this.particlePositions[i * 3 + 1] += 2.0;
            if (this.particlePositions[i * 3 + 2] > 1.0) this.particlePositions[i * 3 + 2] -= 2.0;
            if (this.particlePositions[i * 3 + 2] < -1.0) this.particlePositions[i * 3 + 2] += 2.0;
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.bufferSubData(this.gl.ARRAY_BUFFER, 0, this.particlePositions);

        this.shaderManager.useProgram(this.programName);
        this.shaderManager.setUniform('u_dispersivePotential', 'float', this.dispersivePotential);
        this.shaderManager.setUniform('u_particleSize', 'float', (2.0 + this.dispersivePotential * 5.0) * scaleFactor);
        this.shaderManager.setUniform('u_scaleFactor', 'float', scaleFactor);

        // React to narrative theme
        switch (narrativeTheme) {
            case 'dispersive':
                this.shaderManager.setUniform('u_baseColor', 'vec3', [1.0, 0.2, 0.0]); // Red for dispersion
                this.shaderManager.setUniform('u_glitchColor', 'vec3', [1.0, 0.5, 0.0]);
                this.shaderManager.setUniform('u_particleSize', 'float', (5.0 + this.dispersivePotential * 10.0) * scaleFactor); // Larger particles
                break;
            case 'quantum':
                this.shaderManager.setUniform('u_baseColor', 'vec3', [0.0, 1.0, 1.0]); // Cyan for quantum
                this.shaderManager.setUniform('u_glitchColor', 'vec3', [0.5, 0.0, 1.0]);
                this.shaderManager.setUniform('u_particleSize', 'float', (1.0 + this.dispersivePotential * 2.0) * scaleFactor); // Smaller, more numerous
                break;
            case 'dark-forces':
                this.shaderManager.setUniform('u_baseColor', 'vec3', [0.1, 0.1, 0.1]); // Darker for dark forces
                this.shaderManager.setUniform('u_glitchColor', 'vec3', [0.3, 0.0, 0.3]);
                this.shaderManager.setUniform('u_particleSize', 'float', (3.0 + this.dispersivePotential * 7.0) * scaleFactor); // Medium size
                break;
            default:
                // Reset to default or neutral state
                this.shaderManager.setUniform('u_baseColor', 'vec3', [0.5, 0.5, 0.5]); // Grey default
                this.shaderManager.setUniform('u_glitchColor', 'vec3', [0.8, 0.8, 0.8]);
                this.shaderManager.setUniform('u_particleSize', 'float', (2.0 + this.dispersivePotential * 5.0) * scaleFactor);
                break;
        }
    }

    draw() {
        this.shaderManager.useProgram(this.programName);

        const positionAttributeLocation = this.shaderManager.getAttributeLocation('a_position');
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
        this.gl.vertexAttribPointer(positionAttributeLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionAttributeLocation);

        const colorAttributeLocation = this.shaderManager.getAttributeLocation('a_color');
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.vertexAttribPointer(colorAttributeLocation, 4, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(colorAttributeLocation);

        this.gl.drawArrays(this.gl.POINTS, 0, this.particleCount);
    }

    setupProgram(geometryTypeName, projectionMethodName) {
        const epoGLSL = {
            uniforms: `
                uniform float u_dispersivePotential;
                uniform float u_particleSize;
                uniform float u_scaleFactor;
            `,
            functions: `
                // Function to simulate turbulence/chaos for particle movement
                vec3 turbulence(vec3 p, float intensity) {
                    return p + sin(p * 10.0 + u_time * 5.0) * intensity;
                }
            `
        };
        this.programName = `particle-field-${geometryTypeName}-${projectionMethodName}-epo-dispersive`;
        this.shaderManager.createDynamicProgram(this.programName, geometryTypeName, projectionMethodName, epoGLSL);
    }

    dispose() {
        super.dispose();
        this.gl.deleteBuffer(this.positionBuffer);
        this.gl.deleteBuffer(this.colorBuffer);
    }
}

export { EPODispersiveVisualizer };
