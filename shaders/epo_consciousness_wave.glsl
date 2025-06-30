precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_eventPosition; // Normalized coordinates (0-1) of the event origin
uniform float u_eventIntensity; // Intensity of the event (0-1)
uniform vec3 u_waveColor; // Color of the consciousness wave
uniform float u_waveSpeed; // Speed of the wave propagation
uniform float u_waveWidth; // Width of the wave

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 centeredUV = (uv * 2.0 - 1.0) * aspect;
    vec2 eventPosAspect = (u_eventPosition * 2.0 - 1.0) * aspect;

    float dist = distance(centeredUV, eventPosAspect);

    // Create a pulsating wave effect
    float wave = sin(dist * 20.0 - u_time * u_waveSpeed);
    wave = abs(wave); // Make it a positive pulse
    wave = smoothstep(u_waveWidth - 0.1, u_waveWidth + 0.1, wave); // Sharpen the wave

    // Attenuate the wave over distance and time
    float attenuation = max(0.0, 1.0 - dist * 0.5); // Fade with distance
    attenuation *= max(0.0, 1.0 - (u_time * u_waveSpeed - dist * 20.0) * 0.1); // Fade with time

    float finalWave = wave * attenuation * u_eventIntensity;

    vec3 color = u_waveColor * finalWave;

    // Blend with existing background (assuming this is an overlay shader)
    // For now, just output the wave color. Blending will happen in the main render loop.
    gl_FragColor = vec4(color, finalWave);
}
