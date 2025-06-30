precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_integrativePotential;
uniform float u_dispersivePotential;
uniform float u_systemComplexity;
uniform vec3 u_backgroundColor;
uniform vec3 u_primaryColor;
uniform vec3 u_secondaryColor;

// Simple 3D noise function (e.g., Perlin or Simplex noise)
// For simplicity, using a basic pseudo-random noise here.
float hash(vec3 p) {
    return fract(sin(dot(p, vec3(12.9898, 78.233, 37.719))) * 43758.5453);
}

float noise(vec3 p) {
    vec3 ip = floor(p);
    vec3 fp = fract(p);
    fp = fp * fp * (3.0 - 2.0 * fp);

    float res = mix(mix(mix(hash(ip), hash(ip + vec3(1, 0, 0)), fp.x),
                        mix(hash(ip + vec3(0, 1, 0)), hash(ip + vec3(1, 1, 0)), fp.x), fp.y),
                    mix(mix(hash(ip + vec3(0, 0, 1)), hash(ip + vec3(1, 0, 1)), fp.x),
                        mix(hash(ip + vec3(0, 1, 1)), hash(ip + vec3(1, 1, 1)), fp.x), fp.y), fp.z);
    return res;
}

float fbm(vec3 p) {
    float f = 0.0;
    f += 0.5000 * noise(p);
    f += 0.2500 * noise(p * 2.0);
    f += 0.1250 * noise(p * 4.0);
    f += 0.0625 * noise(p * 8.0);
    return f;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 centeredUV = (uv * 2.0 - 1.0) * aspect;

    // Create a ray for volumetric sampling
    vec3 rayOrigin = vec3(0.0, 0.0, -5.0);
    vec3 rayDirection = normalize(vec3(centeredUV, 1.0));

    vec3 color = u_backgroundColor;

    float totalDensity = 0.0;
    float steps = 30.0;
    float stepSize = 0.2;

    for (float i = 0.0; i < steps; i++) {
        vec3 p = rayOrigin + rayDirection * (i * stepSize);
        p += u_time * 0.1; // Animate noise

        // Modulate noise based on EPO potentials
        float complexityInfluence = u_systemComplexity * 2.0 - 1.0; // -1 to 1
        float integrativeInfluence = u_integrativePotential * 2.0 - 1.0;
        float dispersiveInfluence = u_dispersivePotential * 2.0 - 1.0;

        // Adjust frequency and amplitude based on EPO state
        float freq = 1.0 + integrativeInfluence * 2.0; // Higher freq with integration
        float amp = 1.0 + dispersiveInfluence * 0.5; // More intense with dispersion

        float density = fbm(p * freq) * amp;

        // Add a subtle reaction to complexity
        density += noise(p * 5.0 + u_time * 0.5) * u_systemComplexity * 0.5;

        // Accumulate density
        totalDensity += density;
    }

    totalDensity /= steps; // Average density

    // Map density to color, blending between primary and secondary based on complexity
    vec3 epfColor = mix(u_primaryColor, u_secondaryColor, u_systemComplexity);
    color = mix(color, epfColor, totalDensity * 0.5); // Blend with background

    // Add a subtle glow based on integrative potential
    color += u_primaryColor * u_integrativePotential * 0.1;

    // Add a subtle chaotic flicker based on dispersive potential
    color += u_secondaryColor * u_dispersivePotential * (noise(uv.xyx * 10.0 + u_time * 20.0) - 0.5) * 0.05;

    gl_FragColor = vec4(color, 1.0);
}
