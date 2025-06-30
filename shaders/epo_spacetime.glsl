precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_integrativePotential; // From EPOCore
uniform vec3 u_gridColor; // Color of the grid lines
uniform vec3 u_warpColor; // Color for warping effects

varying vec2 v_uv;

float grid(vec2 uv, float scale) {
    vec2 p = uv * scale;
    vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p);
    float line = min(grid.x, grid.y);
    return 1.0 - min(line, 1.0);
}

void main() {
    vec2 uv = v_uv;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 centeredUV = (uv * 2.0 - 1.0) * aspect;

    // Base grid
    float baseGrid = grid(centeredUV, 20.0);

    // Warping effect based on integrative potential
    float warpFactor = u_integrativePotential * 0.5; // Max warp at high integration
    vec2 warpedUV = centeredUV;
    warpedUV.x += sin(centeredUV.y * 10.0 + u_time * 0.5) * warpFactor * 0.1;
    warpedUV.y += cos(centeredUV.x * 12.0 + u_time * 0.7) * warpFactor * 0.1;

    float warpedGrid = grid(warpedUV, 20.0);

    // Combine grids, with more warping visible at higher integrative potential
    float finalGrid = mix(baseGrid, warpedGrid, u_integrativePotential);

    vec3 color = u_gridColor * finalGrid;

    // Add a subtle glow/color shift based on warp intensity
    color += u_warpColor * finalGrid * warpFactor * 0.5;

    // Make the grid more prominent with higher integrative potential
    color *= (0.5 + u_integrativePotential * 0.5);

    gl_FragColor = vec4(color, finalGrid * (0.2 + u_integrativePotential * 0.8)); // Alpha based on grid visibility
}
