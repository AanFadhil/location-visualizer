import Avatar from 'components/Avatar'
import logo from 'assets/logo.svg'
import { Canvas } from '@react-three/fiber'
import Scene from './Scene'
import { OrbitControls } from '@react-three/drei'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const randoms = [
  [1, 2],
  [3, 4, 5],
  [6, 7]
]

function App() {
  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      <div className="h-screen sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <Canvas
          camera={{ position: [0, 0, 3], fov: 60 }}
          style={{ height: '100%', width: '100%', position: 'relative' }}
        >
          <ambientLight />
          <Scene />
          <OrbitControls />
        </Canvas>
      </div>
    </div>
  )
}

export default App
