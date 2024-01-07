#version 300 es

precision highp float;

in vec3 position;

uniform mat4 model;
uniform mat4 view;
uniform mat4 proj;

void main() {
    gl_PointSize = 20.0;
    gl_Position = proj * view * model * vec4(position, 1);
}
