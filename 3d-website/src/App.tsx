import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

function RotatingBox({ position, color }: { position: [number, number, number], color: string }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.3
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.3 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? '#ffffff' : color} />
    </mesh>
  )
}

function RotatingSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    meshRef.current.rotation.x += 0.005
    meshRef.current.rotation.y += 0.008
    meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5) * 0.5
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.5 : 1.2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={hovered ? '#60a5fa' : '#3b82f6'} 
        wireframe={hovered}
      />
    </mesh>
  )
}

function RotatingTorus({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.z += 0.005
    meshRef.current.position.z = position[2] + Math.sin(state.clock.elapsedTime * 0.8) * 0.4
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={hovered ? 1.2 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusGeometry args={[1, 0.4, 16, 100]} />
      <meshStandardMaterial 
        color={hovered ? '#a78bfa' : '#8b5cf6'}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <spotLight position={[0, 10, 0]} angle={0.3} penumbra={1} intensity={1} />
      
      <RotatingSphere position={[0, 0, 0]} />
      <RotatingBox position={[-3, 2, -2]} color="#ef4444" />
      <RotatingBox position={[3, -1, -1]} color="#10b981" />
      <RotatingBox position={[2, 2, 2]} color="#f59e0b" />
      <RotatingTorus position={[-2, -2, 1]} />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <OrbitControls enableZoom={true} enablePan={false} />
    </>
  )
}

function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="flex flex-col items-center justify-center h-full px-4">
          <div className="text-center space-y-6 max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 animate-fade-in">
              Welcome to 3D Space
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Explore interactive 3D objects in a beautiful immersive environment
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Get Started
              </button>
              <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <p className="text-gray-300 text-sm">
            Drag to rotate • Scroll to zoom • Hover over objects to interact
          </p>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
    </div>
  )
}

export default App
