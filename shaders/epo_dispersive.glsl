precision highp float;
varying vec4 v_color;
uniform float u_dispersivePotential;
uniform float u_time;

// Function to simulate turbulence/chaos for particle movement
vec3 turbulence(vec3 p, float intensity) {
    return p + sin(p * 10.0 + u_time * 5.0) * intensity;
}

void main() {
    // Simple circular particle
    float r = 0.0;
    vec2 c = gl_PointCoord - 0.5;
    r = dot(c, c);
    if (r > 0.25) {
        discard;
    }

    // Vary particle color and alpha based on dispersive potential
    vec4 finalColor = v_color;
    finalColor.rgb *= (0.5 + u_dispersivePotential * 0.5); // Brighter with higher dispersion
    finalColor.a = 1.0 - r * 2.0; // Fade out towards edge
    finalColor.a *= (0.2 + u_dispersivePotential * 0.8); // More opaque with higher dispersion

    // Add a subtle chaotic flicker
    finalColor.rgb += sin(u_time * 10.0 + gl_FragCoord.x * 0.1) * u_dispersivePotential * 0.1;

    gl_FragColor = finalColor;
}
