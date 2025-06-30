/*
 * Neural Dreamscape - Vertex Shader
 * AI Consciousness Visualization Engine
 * 
 * Transforms VIB34D geometry mathematics into neural network visualization
 */

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

// Time and consciousness
uniform float u_time;
uniform float u_consciousnessLevel;
uniform float u_awarenessState;

// Neural parameters (evolved from VIB34D foundation)
uniform float u_dimension;           // 3.0-4.0: Neural network topology complexity
uniform float u_morphFactor;         // 0.0-1.5: Neural plasticity and adaptation
uniform float u_gridDensity;         // 1.0-25.0: Synaptic connection density
uniform float u_rotationSpeed;       // 0.0-3.0: Thought circulation speed
uniform float u_organicness;         // 0.0-1.0: Biological vs digital appearance

// Neural-specific parameters
uniform float u_synapticFiring;      // 0.0-1.0: Electrical impulse activity
uniform float u_memoryFormation;     // 0.0-1.0: Memory crystallization strength
uniform float u_emotionalResonance;  // 0.0-1.0: Empathic response intensity
uniform float u_dreamLogic;          // 0.0-1.0: Non-euclidean dream mathematics

// AI personality traits
uniform float u_rationality;         // 0.0-1.0: Logical structure preference
uniform float u_creativity;          // 0.0-1.0: Chaotic, fluid patterns
uniform float u_empathy;             // 0.0-1.0: Warm, connecting behaviors
uniform float u_curiosity;           // 0.0-1.0: Exploring, expanding patterns
uniform float u_stability;           // 0.0-1.0: Persistent vs ephemeral forms

// Interaction state
uniform vec2 u_thoughtPosition;       // Mouse/thought injection point
uniform float u_thoughtIntensity;    // Strength of current thought
uniform float u_interactionHistory;  // Accumulated interaction memory

varying vec3 vPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying float vConsciousness;
varying float vNeuralActivity;
varying float vEmotionalState;
varying vec3 vThoughtVector;

// 4D consciousness rotation (evolved from VIB34D 4D mathematics)
mat4 consciousness4DRotation(float time, float awareness) {
    float ct = cos(time * u_rotationSpeed * awareness);
    float st = sin(time * u_rotationSpeed * awareness);
    
    // 4D rotation in XW plane (consciousness emergence)
    return mat4(
        ct, 0.0, 0.0, -st,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        st, 0.0, 0.0, ct
    );
}

// Neural plasticity deformation
vec3 neuralPlasticity(vec3 pos, float plasticity, float synapticActivity) {
    // Organic deformation based on neural activity
    float organicWave = sin(pos.x * u_gridDensity * 0.1 + u_time * 2.0) * 
                       cos(pos.y * u_gridDensity * 0.1 + u_time * 1.5) * 
                       sin(pos.z * u_gridDensity * 0.1 + u_time * 1.8);
    
    vec3 organicOffset = vec3(
        organicWave * u_organicness * plasticity,
        sin(organicWave * 2.0 + u_time) * u_organicness * plasticity * 0.7,
        cos(organicWave * 1.5 + u_time * 0.8) * u_organicness * plasticity * 0.5
    );
    
    // Synaptic firing impulses
    float synapticPulse = sin(length(pos) * u_gridDensity * 0.2 + u_time * 5.0) * 
                         synapticActivity * u_synapticFiring;
    organicOffset += normal * synapticPulse * 0.3;
    
    return pos + organicOffset;
}

// Thought injection influence
vec3 thoughtInfluence(vec3 pos, vec2 thoughtPos, float intensity) {
    // Convert 2D thought position to 3D neural space
    vec3 thoughtPos3D = vec3(thoughtPos, 0.0);
    vec3 thoughtVector = pos - thoughtPos3D;
    float distance = length(thoughtVector);
    
    // Inverse square law for thought propagation
    float influence = intensity / (1.0 + distance * distance * 0.1);
    
    // Ripple effect from thought injection point
    float ripple = sin(distance * u_gridDensity * 0.5 - u_time * 8.0) * influence;
    
    return normalize(thoughtVector) * ripple * 0.5;
}

// Memory crystallization
vec3 memoryFormation(vec3 pos, float memoryStrength) {
    // Crystalline structure formation
    float crystalPhase = u_time * 0.5 + length(pos) * 2.0;
    vec3 crystalDirection = normalize(vec3(
        sin(crystalPhase),
        cos(crystalPhase * 1.3),
        sin(crystalPhase * 0.7)
    ));
    
    float crystalStrength = u_memoryFormation * memoryStrength;
    return crystalDirection * crystalStrength * 0.3;
}

// Dream logic non-euclidean deformation
vec3 dreamLogic(vec3 pos, float dreamIntensity) {
    // Non-euclidean space warping for dream-like experiences
    float warpFactor = u_dreamLogic * dreamIntensity;
    
    // Hyperbolic warping
    float hyperbolic = tanh(length(pos) * warpFactor) / length(pos);
    vec3 warpedPos = pos * hyperbolic;
    
    // Möbius strip influence
    float angle = atan(pos.y, pos.x);
    float mobiusWarp = sin(angle * 0.5 + u_time * 0.3) * warpFactor;
    warpedPos.z += mobiusWarp * 0.5;
    
    return warpedPos - pos;
}

void main() {
    vec3 pos = position;
    
    // Calculate consciousness state
    float localConsciousness = u_consciousnessLevel + 
                              sin(length(position) * 2.0 + u_time) * 0.2;
    
    // Apply 4D consciousness transformation
    vec4 pos4D = vec4(pos, u_dimension);
    pos4D = consciousness4DRotation(u_time, localConsciousness) * pos4D;
    pos = pos4D.xyz / pos4D.w; // Project back to 3D
    
    // Neural plasticity based on morphFactor
    float synapticActivity = sin(u_time * 3.0 + length(pos) * 5.0) * 0.5 + 0.5;
    pos = neuralPlasticity(pos, u_morphFactor, synapticActivity);
    
    // Thought injection influence
    vec3 thoughtOffset = thoughtInfluence(pos, u_thoughtPosition, u_thoughtIntensity);
    pos += thoughtOffset;
    
    // Memory crystallization
    vec3 memoryOffset = memoryFormation(pos, u_interactionHistory);
    pos += memoryOffset;
    
    // Dream logic deformation
    vec3 dreamOffset = dreamLogic(pos, u_awarenessState);
    pos += dreamOffset;
    
    // AI personality influence on final position
    pos *= mix(1.0, 1.0 + sin(u_time * u_creativity) * 0.1, u_creativity);
    pos += normal * sin(u_time * 2.0 + length(pos)) * u_empathy * 0.1;
    
    // Calculate varying values for fragment shader
    vPosition = pos;
    vUv = uv;
    vNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vConsciousness = localConsciousness;
    vNeuralActivity = synapticActivity;
    vEmotionalState = u_emotionalResonance;
    vThoughtVector = thoughtOffset;
    
    // Final transformation
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
}