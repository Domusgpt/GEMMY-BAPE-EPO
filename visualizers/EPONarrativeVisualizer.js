
// visualizers/EPONarrativeVisualizer.js
import { VisualizerBase } from '/GEMMY-BAPE-EPO/visualizers/VisualizerBase.js';

class EPONarrativeVisualizer extends VisualizerBase {
    constructor(gl, shaderManager, options = {}) {
        super(gl, shaderManager, options);
        this.textCanvas = document.createElement('canvas');
        this.textContext = this.textCanvas.getContext('2d');
        this.texture = null;
        this.planeBuffer = null;
        this.currentText = '';

        // Set up a basic program for rendering a textured plane
        this.setupProgram('plane', 'orthographic'); // Using a simple plane geometry and orthographic projection
    }

    // This visualizer will not use the default setupProgram, as it renders text on a plane.
    // It will use a custom shader for text rendering.
    setupProgram() {
        const vertexShaderSource = `
            attribute vec4 a_position;
            attribute vec2 a_texCoord;
            varying vec2 v_texCoord;
            uniform mat4 u_projectionMatrix;
            uniform mat4 u_modelViewMatrix;

            void main() {
                v_texCoord = a_texCoord;
                gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;

            varying vec2 v_texCoord;
            uniform sampler2D u_texture;
            uniform float u_integrativePotential; // For dynamic text effects
            uniform float u_dispersivePotential;  // For dynamic text effects
            uniform float u_systemComplexity;     // For dynamic text effects
            uniform float u_time;

            void main() {
                vec4 texColor = texture2D(u_texture, v_texCoord);

                // Dynamic text effects based on EPO potentials
                float alpha = texColor.a;
                vec3 finalColor = texColor.rgb;

                // Integrative Potential: More solid, clear text
                alpha *= (0.5 + u_integrativePotential * 0.5);

                // Dispersive Potential: More glitched, fragmented text
                float glitchFactor = u_dispersivePotential * 0.3; // Max 30% glitch
                if (glitchFactor > 0.01) {
                    float glitchNoise = fract(sin(dot(v_texCoord * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
                    if (glitchNoise < glitchFactor) {
                        // Simple horizontal shift glitch
                        float shift = (glitchNoise - glitchFactor * 0.5) * 0.1;
                        finalColor = texture2D(u_texture, fract(v_texCoord + vec2(shift, 0.0))).rgb;
                        alpha *= (1.0 - glitchFactor); // Make glitched parts more transparent
                    }
                }

                // System Complexity: Overall vibrancy and clarity
                finalColor *= (0.5 + u_systemComplexity * 0.5);

                // Subtle flicker for quantum reality feel
                finalColor += (fract(sin(u_time * 10.0 + v_texCoord.x * 50.0) * 1000.0) - 0.5) * 0.05 * u_dispersivePotential;

                gl_FragColor = vec4(finalColor, alpha);
            }
        `;

        const vs = this.shaderManager._compileShader('narrativeVS', vertexShaderSource, this.gl.VERTEX_SHADER);
        const fs = this.shaderManager._compileShader('narrativeFS', fragmentShaderSource, this.gl.FRAGMENT_SHADER);
        this.programName = 'epo-narrative-visualizer';
        this.shaderManager._createProgram(this.programName, vs, fs);

        // Set up plane geometry (a simple quad)
        const positions = [
            -1.0, -1.0, 0.0, // Bottom-left
             1.0, -1.0, 0.0, // Bottom-right
            -1.0,  1.0, 0.0, // Top-left
             1.0,  1.0, 0.0  // Top-right
        ];
        this.planeBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.planeBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

        const texCoords = [
            0.0, 1.0, // Bottom-left
            1.0, 1.0, // Bottom-right
            0.0, 0.0, // Top-left
            1.0, 0.0  // Top-right
        ];
        this.texCoordBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);

        // Create texture
        this.texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255])); // Blue pixel
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    }

    updateText(text) {
        if (this.currentText === text) return; // No change needed
        this.currentText = text;

        // Render text to canvas
        this.textCanvas.width = 1024; // Power of 2 for texture
        this.textCanvas.height = 1024;
        this.textContext.clearRect(0, 0, this.textCanvas.width, this.textCanvas.height);
        this.textContext.font = '24px Arial';
        this.textContext.fillStyle = 'white';
        this.textContext.textAlign = 'left';
        this.textContext.textBaseline = 'top';

        const words = text.split(' ');
        let line = '';
        let y = 10;
        const lineHeight = 30;
        const maxWidth = this.textCanvas.width - 20;

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = this.textContext.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                this.textContext.fillText(line, 10, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        this.textContext.fillText(line, 10, y);

        // Update texture from canvas
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.textCanvas);
    }

    update(deltaTime, potentials, narrativeTheme) {
        // Potentials: { integrative, dispersive, complexity }
        this.shaderManager.useProgram(this.programName);
        this.shaderManager.setUniform('u_integrativePotential', 'float', potentials.integrative);
        this.shaderManager.setUniform('u_dispersivePotential', 'float', potentials.dispersive);
        this.shaderManager.setUniform('u_systemComplexity', 'float', potentials.complexity);
        this.shaderManager.setUniform('u_time', 'float', this.shaderManager.time);

        // React to narrative theme for text rendering
        switch (narrativeTheme) {
            case 'integrative':
                this.textContext.fillStyle = '#00FFFF'; // Cyan for integration
                this.textContext.font = 'bold 28px Arial';
                break;
            case 'dispersive':
                this.textContext.fillStyle = '#FF0000'; // Red for dispersion
                this.textContext.font = 'italic 24px Arial';
                break;
            case 'epf':
                this.textContext.fillStyle = '#FFD700'; // Gold for EPF
                this.textContext.font = '26px "Times New Roman"';
                break;
            case 'consciousness':
                this.textContext.fillStyle = '#FF00FF'; // Magenta for consciousness
                this.textContext.font = '30px "Courier New"';
                break;
            case 'quantum':
                this.textContext.fillStyle = '#00FF00'; // Green for quantum
                this.textContext.font = '22px "Space Mono"';
                break;
            case 'dark-forces':
                this.textContext.fillStyle = '#808080'; // Grey for dark forces
                this.textContext.font = '20px Arial';
                break;
            case 'allometric':
                this.textContext.fillStyle = '#FFA500'; // Orange for allometric
                this.textContext.font = '28px Arial';
                break;
            default:
                this.textContext.fillStyle = 'white';
                this.textContext.font = '24px Arial';
                break;
        }
        // Re-render text with new style if needed
        this.updateText(this.currentText);

    draw() {
        this.shaderManager.useProgram(this.programName);

        // Set up attributes
        const positionLocation = this.shaderManager.getAttributeLocation('a_position');
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.planeBuffer);
        this.gl.vertexAttribPointer(positionLocation, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(positionLocation);

        const texCoordLocation = this.shaderManager.getAttributeLocation('a_texCoord');
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
        this.gl.vertexAttribPointer(texCoordLocation, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(texCoordLocation);

        // Set up texture
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
        this.shaderManager.setUniform('u_texture', 'int', 0);

        // Set up matrices (simple orthographic projection for now)
        const projectionMatrix = mat4.create();
        mat4.ortho(projectionMatrix, -1, 1, -1, 1, -1, 1); // Left, right, bottom, top, near, far
        this.shaderManager.setUniform('u_projectionMatrix', 'mat4', projectionMatrix);

        const modelViewMatrix = mat4.create();
        // You can add transformations here to move/rotate the plane
        this.shaderManager.setUniform('u_modelViewMatrix', 'mat4', modelViewMatrix);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }

    dispose() {
        super.dispose();
        this.gl.deleteBuffer(this.planeBuffer);
        this.gl.deleteBuffer(this.texCoordBuffer);
        this.gl.deleteTexture(this.texture);
    }
}

export { EPONarrativeVisualizer };
