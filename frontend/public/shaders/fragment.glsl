precision mediump float;
uniform float u_time;
uniform float u_temp;
uniform float u_hour;
uniform float u_weather;

varying vec2 vUv;

void main() {
  vec3 color = vec3(
    0.5 + 0.5 * sin(u_time + vUv.x * 10.0),
    0.5 + 0.5 * cos(u_time + vUv.y * 10.0),
    0.5 + 0.5 * sin(u_time)
  );

  color.r += u_temp * 0.005;
  color.b -= u_temp * 0.002;

  gl_FragColor = vec4(color, 1.0);
}