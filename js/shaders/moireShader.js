const MoireShader = {
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,

    fragmentShader: `
        uniform vec3 color;
        uniform float moireDensity;
        uniform float moireSpeed;
        uniform float time;
        uniform vec2 resolution;

        void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            float pattern = sin(uv.x * moireDensity + time * moireSpeed) * sin(uv.y * moireDensity + time * moireSpeed);
            gl_FragColor = vec4(color * pattern, 1.0);
        }
    `
};

export { MoireShader };