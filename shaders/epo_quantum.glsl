
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_systemComplexity; // From EPOCore
uniform float u_dispersivePotential; // From EPOCore
uniform vec3 u_baseColor;
uniform vec3 u_glitchColor;

// Hash function for pseudo-random numbers
float hash12(vec2 p) {
    float h = dot(p, vec2(127.1, 311.7));
    return fract(sin(h) * 43758.5453123);
}

// 2D noise function
float noise2d(vec2 p) {
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    fp = fp * fp * (3.0 - 2.0 * fp);

    return mix(mix(hash12(ip), hash12(ip + vec2(1.0, 0.0)), fp.x),
               mix(hash12(ip + vec2(0.0, 1.0)), hash12(ip + vec2(1.0, 1.0)), fp.x), fp.y);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 centeredUV = (uv * 2.0 - 1.0) * aspect;

    vec3 color = u_baseColor;

    // Probabilistic glitches based on dispersive potential
    float glitchThreshold = 0.9 - u_dispersivePotential * 0.8; // More glitches with higher dispersion
    float glitchNoise = hash12(centeredUV * 100.0 + u_time * 50.0);

    if (glitchNoise > glitchThreshold) {
        // Apply a visual glitch effect
        float glitchAmount = (glitchNoise - glitchThreshold) / (1.0 - glitchThreshold);
        glitchAmount *= u_dispersivePotential; // Intensity scales with dispersive potential

        // Simple color shift glitch
        color = mix(color, u_glitchColor, glitchAmount);

        // Pixelation/blocky effect
        vec2 pixelatedUV = floor(centeredUV * (100.0 * glitchAmount)) / (100.0 * glitchAmount);
        color += noise2d(pixelatedUV * 5.0) * glitchAmount * 0.2;
    }

    // "Collapsing" patterns based on system complexity
    float collapseFactor = 1.0 - u_systemComplexity; // More collapse with lower complexity
    float patternNoise = noise2d(centeredUV * 20.0 + u_time * 2.0);

    // Introduce subtle interference patterns
    float interference = sin(centeredUV.x * 50.0 + u_time * 3.0) + cos(centeredUV.y * 60.0 + u_time * 4.0);
    interference = fract(interference * 0.1) * 2.0 - 1.0; // Normalize to -1 to 1

    color += interference * collapseFactor * 0.1; // More interference with lower complexity

    // Add a subtle flicker based on quantum uncertainty
    color += (hash12(gl_FragCoord.xy + u_time * 100.0) - 0.5) * 0.05 * u_dispersivePotential;

    gl_FragColor = vec4(color, 1.0);
}
