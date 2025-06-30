attribute vec4 a_position;
attribute vec4 a_color;
varying vec4 v_color;
uniform float u_particleSize;
uniform mat4 u_projectionMatrix;
uniform mat4 u_modelViewMatrix;

void main() {
    v_color = a_color;
    gl_Position = u_projectionMatrix * u_modelViewMatrix * a_position;
    gl_PointSize = u_particleSize / gl_Position.w; // Scale point size by depth
}
