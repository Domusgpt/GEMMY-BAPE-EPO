void main() {
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 uv = (v_uv * 2.0 - 1.0) * aspect;

    // Apply magnification/parallax based on u_magnificationFactor
    vec2 magnifiedUV = uv * (1.0 / u_magnificationFactor);

    vec3 rayOrigin = vec3(0.0, 0.0, -2.5);
    vec3 rayDirection = normalize(vec3(magnifiedUV, 1.0));

    float camRotY = u_time * 0.05 * u_rotationSpeed + u_audioMid * 0.1;
    float camRotX = sin(u_time * 0.03 * u_rotationSpeed) * 0.15 + u_audioHigh * 0.1;
    mat4 camMat = rotXY(camRotX) * rotYZ(camRotY);
    rayDirection = (camMat * vec4(rayDirection, 0.0)).xyz;

    vec3 p = rayDirection * 1.5;
    float latticeValue = calculateLattice(p);

    vec3 color = mix(u_backgroundColor, u_primaryColor, latticeValue);
    color = mix(color, u_secondaryColor, smoothstep(0.2, 0.7, u_audioMid) * latticeValue * 0.6);

    // Apply moire pattern
    float moire = moirePattern(uv, u_moireIntensity);
    color += moire * 0.2; // Add subtle moire effect

    // Apply glassmorphism effect
    color = applyGlassmorphism(color, uv, u_glassmorphismFactor);

    if (abs(u_colorShift) > 0.01) {
        vec3 hsv = rgb2hsv(color);
        hsv.x = fract(hsv.x + u_colorShift * 0.5 + u_audioHigh * 0.1);
        color = hsv2rgb(hsv);
    }
    color *= (0.8 + u_patternIntensity * 0.7);

    if (u_glitchIntensity > 0.001) {
         float glitch = u_glitchIntensity * (0.5 + 0.5 * sin(u_time * 8.0 + p.y * 10.0));
         vec2 offsetR = vec2(cos(u_time*25.), sin(u_time*18.+p.x*5.)) * glitch * 0.2 * aspect;
         vec2 offsetB = vec2(sin(u_time*19.+p.y*6.), cos(u_time*28.)) * glitch * 0.15 * aspect;
         vec3 pR = normalize(vec3(uv + offsetR/aspect, 1.0));
         pR = (camMat*vec4(pR,0.0)).xyz * 1.5;
         vec3 pB = normalize(vec3(uv + offsetB/aspect, 1.0));
         pB = (camMat*vec4(pB,0.0)).xyz * 1.5;
         float latticeR = calculateLattice(pR);
         float latticeB = calculateLattice(pB);
         vec3 colorR = mix(u_backgroundColor, u_primaryColor, latticeR);
         colorR = mix(colorR, u_secondaryColor, smoothstep(0.2, 0.7, u_audioMid) * latticeR * 0.6);
         vec3 colorB = mix(u_backgroundColor, u_primaryColor, latticeB);
         colorB = mix(colorB, u_secondaryColor, smoothstep(0.2, 0.7, u_audioMid) * latticeB * 0.6);
         if (abs(u_colorShift) > 0.01) {
             vec3 hsvR=rgb2hsv(colorR);
             hsvR.x=fract(hsvR.x+u_colorShift*0.5+u_audioHigh*0.1);
             colorR=hsv2rgb(hsvR);
             vec3 hsvB=rgb2hsv(colorB);
             hsvB.x=fract(hsvB.x+u_colorShift*0.5+u_audioHigh*0.1);
             colorB=hsv2rgb(hsvB);
         }
         color = vec3(colorR.r, color.g, colorB.b);
         color *= (0.8 + u_patternIntensity * 0.7);
    }
    color = pow(clamp(color, 0.0, 1.5), vec3(0.9));
    gl_FragColor = vec4(color, 1.0);
}
