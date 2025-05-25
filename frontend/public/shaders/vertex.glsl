precision mediump float;
varying vec2 vUv;
uniform float u_time;

void main() {
  vUv = uv;
  vec3 pos = position + normal * 0.2 * sin(uv.x * 10.0 + u_time);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}