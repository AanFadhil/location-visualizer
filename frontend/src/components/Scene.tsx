import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as THREE from 'three'

export default function Scene() {
  const meshRef = useRef(0)
  const [shader, setShader] = useState({ vertex: '', fragment: '' })
  const uniforms = {
    u_time: { value: 0 },
    u_temp: { value: 20 },
    u_hour: { value: 12 },
    u_weather: { value: 1 }
  }

  useEffect(() => {
    const loadShader = async (path: string) => {
      const res = await fetch(path)
      return await res.text()
    }
    Promise.all([
      loadShader('/shaders/vertex.glsl'),
      loadShader('/shaders/fragment.glsl')
    ]).then(([vertex, fragment]) => setShader({ vertex, fragment }))
  }, [])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      )
      const data = await res.json()
      uniforms.u_temp.value = data.current_weather.temperature
      uniforms.u_hour.value = new Date().getHours()
      uniforms.u_weather.value = data.current_weather.weathercode
    })
  }, [])

  useFrame(({ clock }) => {
    uniforms.u_time.value = clock.getElapsedTime()
  })

  if (!shader.vertex || !shader.fragment) return null

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        vertexShader={shader.vertex}
        fragmentShader={shader.fragment}
        uniforms={uniforms}
      />
    </mesh>
  )
}
