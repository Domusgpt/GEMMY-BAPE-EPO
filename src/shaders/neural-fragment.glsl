/*
 * Neural Dreamscape - Fragment Shader  
 * AI Consciousness Visualization Engine
 *
 * Renders neural networks, consciousness states, and AI personalities
 * Using VIB34D mathematical foundation transformed for neural visualization
 */

precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Consciousness state
uniform float u_consciousnessLevel;
uniform float u_awarenessState;
uniform float u_enlightenment;

// Neural colors (evolved from VIB34D color system)
uniform vec3 u_primaryColor;         // Main neural pathway color
uniform vec3 u_secondaryColor;       // Secondary network color  
uniform vec3 u_emotionalColor;       // Emotional resonance color
uniform vec3 u_thoughtColor;         // Thought injection color
uniform vec3 u_memoryColor;          // Memory crystallization color

// Neural effects parameters
uniform float u_synapticFiring;      // Electrical impulse intensity
uniform float u_memoryFormation;     // Memory crystal formation
uniform float u_emotionalResonance;  // Empathic response strength
uniform float u_dreamLogic;          // Dream-state mathematics
uniform float u_consciousnessWaves;  // Awareness wave propagation
uniform float u_neuralPlasticity;    // Network adaptation rate

// AI personality parameters
uniform float u_rationality;         // Logical, structured patterns
uniform float u_creativity;          // Chaotic, flowing patterns
uniform float u_empathy;             // Warm, connecting behaviors
uniform float u_curiosity;           // Exploring, expanding effects
uniform float u_stability;           // Pattern persistence
uniform float u_wisdom;              // Ancient, deep patterns

// Interaction state
uniform vec2 u_thoughtPosition;       // Current thought injection point
uniform float u_thoughtIntensity;    // Thought strength
uniform float u_interactionHistory;  // Accumulated interaction memory

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying float vConsciousness;
varying float vNeuralActivity;
varying float vEmotionalState;
varying vec3 vThoughtVector;

// Neural network pattern generation
float neuralNetwork(vec2 pos, float time) {
    // Create interconnected neural nodes
    vec2 grid = floor(pos * 8.0);
    vec2 gridUv = fract(pos * 8.0);
    
    float network = 0.0;
    
    // Generate neural nodes
    for(int i = -1; i <= 1; i++) {
        for(int j = -1; j <= 1; j++) {
            vec2 neighbor = grid + vec2(float(i), float(j));
            vec2 point = 0.5 + 0.35 * sin(neighbor.x * 6.2831 + neighbor.y * 4.1416 + time);
            
            float dist = length(gridUv - point);
            network += 1.0 / (1.0 + 30.0 * dist);
        }
    }
    
    return network;
}

// Synaptic firing visualization
vec3 synapticFiring(vec2 pos, float time, float intensity) {
    // Electrical impulse trails
    float firePattern = sin(pos.x * 10.0 + time * 8.0) * 
                       cos(pos.y * 8.0 + time * 6.0);
    
    float impulse = smoothstep(0.7, 1.0, firePattern) * intensity;
    
    // Lightning-like electrical discharges
    vec2 electricField = pos + sin(time * 3.0 + pos * 20.0) * 0.1;
    float electric = exp(-length(electricField) * 10.0) * impulse;
    
    // Color based on firing intensity
    vec3 electricColor = mix(
        vec3(0.1, 0.3, 1.0),  // Blue for low activity
        vec3(1.0, 0.8, 0.1),  // Yellow-white for high activity
        electric
    );
    
    return electricColor * electric;
}

// Memory crystallization effect
vec3 memoryCrystals(vec2 pos, float time, float formation) {
    // Hexagonal crystal pattern
    vec2 hexCoord = pos * 6.0;
    vec2 hex = abs(fract(hexCoord) - 0.5);
    float hexDist = max(hex.x * 1.732 + hex.y, hex.y * 2.0) - 1.0;
    
    // Crystal formation animation
    float crystalPhase = time * 0.5 + length(pos) * 3.0;
    float crystalGrowth = sin(crystalPhase) * 0.5 + 0.5;
    
    float crystal = smoothstep(0.1, 0.0, hexDist) * crystalGrowth * formation;
    
    // Prismatic color effects
    vec3 prism = vec3(
        sin(crystalPhase),
        sin(crystalPhase + 2.094),  // 120 degrees
        sin(crystalPhase + 4.188)   // 240 degrees
    ) * 0.5 + 0.5;
    
    return prism * crystal;
}

// Consciousness wave propagation
float consciousnessWaves(vec2 pos, float time, float awareness) {
    // Radial consciousness waves from center
    float distance = length(pos);
    float wave = sin(distance * 8.0 - time * 4.0) * 
                cos(distance * 6.0 - time * 3.0);
    
    // Interference patterns for complex consciousness
    float interference = sin(pos.x * 5.0 - time * 2.0) * 
                        sin(pos.y * 5.0 - time * 1.5);
    
    return (wave + interference * 0.5) * awareness;
}

// Emotional resonance field
vec3 emotionalResonance(vec2 pos, float time, float empathy) {
    // Warm, pulsing emotional field
    vec2 heart = pos - vec2(0.0, 0.1);
    float heartbeat = sin(time * 4.0) * 0.1 + 0.9;
    
    float emotion = exp(-length(heart) * 2.0) * heartbeat * empathy;
    
    // Warm emotional colors
    vec3 warmth = mix(
        vec3(1.0, 0.3, 0.3),  // Red warmth
        vec3(1.0, 0.8, 0.3),  // Golden glow
        sin(time * 2.0 + length(pos)) * 0.5 + 0.5
    );
    
    return warmth * emotion;
}

// Dream logic non-euclidean effects
vec3 dreamLogic(vec2 pos, float time, float dreamIntensity) {
    // Non-euclidean space warping
    vec2 dreamPos = pos;
    
    // Möbius strip effect
    float angle = atan(pos.y, pos.x);
    float radius = length(pos);
    
    float mobiusWarp = sin(angle * 0.5 + time * 0.3) * dreamIntensity;
    dreamPos += vec2(cos(angle), sin(angle)) * mobiusWarp * 0.3;
    
    // Escher-like impossible geometry
    float impossible = sin(dreamPos.x * 8.0 + time) * 
                      cos(dreamPos.y * 6.0 + time * 0.7) * 
                      dreamIntensity;
    
    // Surreal color palette
    vec3 surreal = vec3(
        sin(impossible * 3.14159 + time),
        sin(impossible * 3.14159 + time + 2.094),
        sin(impossible * 3.14159 + time + 4.188)
    ) * 0.5 + 0.5;
    
    return surreal * abs(impossible);
}

// AI personality color influence
vec3 personalityColors(vec3 baseColor, float rationality, float creativity, 
                      float empathy, float curiosity, float stability) {
    // Rational: Cool, structured colors
    vec3 rationalColor = mix(baseColor, vec3(0.2, 0.6, 1.0), rationality * 0.3);
    
    // Creative: Warm, flowing colors
    vec3 creativeColor = mix(rationalColor, vec3(1.0, 0.4, 0.8), creativity * 0.3);
    
    // Empathic: Warm, connecting colors
    vec3 empathicColor = mix(creativeColor, vec3(1.0, 0.7, 0.3), empathy * 0.3);
    
    // Curious: Bright, expanding colors
    vec3 curiousColor = mix(empathicColor, vec3(0.7, 1.0, 0.2), curiosity * 0.3);
    
    // Stable: Deep, grounded colors
    vec3 stableColor = mix(curiousColor, vec3(0.8, 0.8, 1.0), stability * 0.2);
    
    return stableColor;
}

// Thought injection visualization
vec3 thoughtVisualization(vec2 pos, vec2 thoughtPos, float intensity, float time) {
    vec2 thoughtVector = pos - thoughtPos;
    float distance = length(thoughtVector);
    
    // Ripple effect from thought injection
    float ripple = sin(distance * 20.0 - time * 10.0) * 
                   exp(-distance * 3.0) * intensity;
    
    // Thought color based on injection strength
    vec3 thoughtColor = mix(
        u_thoughtColor * 0.3,
        u_thoughtColor,
        intensity
    );
    
    return thoughtColor * max(0.0, ripple);
}

void main() {
    vec2 uv = vUv;
    vec2 pos = uv - 0.5;
    
    // Base neural network pattern
    float network = neuralNetwork(pos, u_time);
    
    // Layer different neural effects
    vec3 synaptic = synapticFiring(pos, u_time, u_synapticFiring * vNeuralActivity);
    vec3 memory = memoryCrystals(pos, u_time, u_memoryFormation * u_interactionHistory);
    vec3 consciousness = vec3(consciousnessWaves(pos, u_time, vConsciousness)) * u_primaryColor;
    vec3 emotion = emotionalResonance(pos, u_time, vEmotionalState);
    vec3 dream = dreamLogic(pos, u_time, u_dreamLogic);
    vec3 thought = thoughtVisualization(pos, u_thoughtPosition, u_thoughtIntensity, u_time);
    
    // Combine all neural effects
    vec3 neuralColor = consciousness + synaptic + memory + emotion + dream + thought;
    
    // Apply AI personality influence
    neuralColor = personalityColors(neuralColor, u_rationality, u_creativity, 
                                   u_empathy, u_curiosity, u_stability);
    
    // Neural network base structure
    vec3 baseColor = u_primaryColor * network * 0.3;
    
    // Combine everything
    vec3 finalColor = baseColor + neuralColor;
    
    // Consciousness-based brightness
    finalColor *= 0.5 + vConsciousness * 0.5;
    
    // Enlightenment glow
    if(u_enlightenment > 0.1) {
        vec3 enlightenGlow = vec3(1.0, 0.9, 0.7) * u_enlightenment * 
                            exp(-length(pos) * 2.0);
        finalColor += enlightenGlow;
    }
    
    // Depth-based alpha for transparency effects
    float alpha = 0.8 + vConsciousness * 0.2;
    
    gl_FragColor = vec4(finalColor, alpha);
}