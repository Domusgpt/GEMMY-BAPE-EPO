
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_integrativePotential; // From EPOCore
uniform float u_dispersivePotential;  // From EPOCore
uniform float u_systemComplexity;     // From EPOCore
uniform vec3 u_baseColor;            // Background color
uniform vec3 u_darkMatterColor;      // Color for dark matter effects
uniform vec3 u_darkEnergyColor;      // Color for dark energy effects

// 3D noise function (e.g., Simplex noise)
// For simplicity, using a basic pseudo-random noise here.
float hash31(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
}

float noise3d(vec3 p) {
    vec3 ip = floor(p);
    vec3 fp = fract(p);
    fp = fp * fp * (3.0 - 2.0 * fp);

    float res = mix(mix(mix(hash31(ip), hash31(ip + vec3(1, 0, 0)), fp.x),
                        mix(hash31(ip + vec3(0, 1, 0)), hash31(ip + vec3(1, 1, 0)), fp.x), fp.y),
                    mix(mix(hash31(ip + vec3(0, 0, 1)), hash31(ip + vec3(1, 0, 1)), fp.x),
                        mix(hash31(ip + vec3(0, 1, 1)), hash31(ip + vec3(1, 1, 1)), fp.x), fp.y), fp.z);
    return res;
}

float fbm3d(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise3d(p); 
    f += 0.2500 * noise3d(p * 2.0); 
    f += 0.1250 * noise3d(p * 4.0); 
    f += 0.0625 * noise3d(p * 8.0); 
    return f;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 centeredUV = (uv * 2.0 - 1.0) * aspect;

    vec3 color = u_baseColor;

    // Create a 3D coordinate for noise sampling, evolving over time
    vec3 p = vec3(centeredUV * 5.0, u_time * 0.1);

    // Dark Matter: Subtle distortions/density based on integrative potential
    // Represents unseen mass, gravitational influence
    float darkMatterDensity = fbm3d(p + u_integrativePotential * 2.0) * 0.5; // Higher density with integration
    darkMatterDensity = smoothstep(0.3, 0.7, darkMatterDensity); // Sharpen the density

    vec3 darkMatterEffect = u_darkMatterColor * darkMatterDensity;

    // Dark Energy: Abstract expansion/voids based on dispersive potential
    // Represents unseen energy, accelerating expansion
    float darkEnergyVoid = fbm3d(p * 0.8 - u_dispersivePotential * 1.5) * 0.5; // More void with dispersion
    darkEnergyVoid = 1.0 - smoothstep(0.3, 0.7, darkEnergyVoid); // Invert for void effect

    vec3 darkEnergyEffect = u_darkEnergyColor * darkEnergyVoid;

    // Blend effects based on system complexity
    // Higher complexity might show a balance, lower complexity might emphasize one over the other
    float blendFactor = u_systemComplexity; // Use complexity to blend

    color = mix(color, darkMatterEffect, darkMatterDensity * blendFactor * 0.5);
    color = mix(color, darkEnergyEffect, darkEnergyVoid * (1.0 - blendFactor) * 0.5);

    // Add a subtle, pervasive background noise/texture
    float backgroundNoise = noise3d(p * 10.0) * 0.05;
    color += backgroundNoise;

    gl_FragColor = vec4(color, 1.0);
}
