import React, { useState, useEffect, useMemo, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import City from './components/City'

// Mock Market Cap Hook
const useMockMarketCap = () => {
  const [mcap, setMcap] = useState(3450)
  const stepCount = useRef(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMcap(prev => {
        const jump = 100 + Math.random() * 300 // 100-400 interval
        let next
        
        if (stepCount.current < 2) {
          // Up
          next = prev + jump
          stepCount.current += 1
        } else {
          // Down
          next = prev - jump
          stepCount.current = 0
        }
        
        // Keep it within bounds of the request (3.45k to 16.2k)
        if (next > 16200) {
          next = 16200 - jump
          stepCount.current = 2 // Force a down step next
        }
        if (next < 3450) {
          next = 3450 + jump
          stepCount.current = 0 // Force an up step next
        }
        
        return next
      })
    }, 1500) // Slower updates to see the jumps clearly
    return () => clearInterval(interval)
  }, [])

  return mcap
}

function App() {
  const mcap = useMockMarketCap()

  return (
    <div className="w-full h-full relative bg-[#050505]">
      {/* UI Overlay */}
      <div className="absolute top-8 left-8 z-10 pointer-events-none select-none">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <h1 className="text-5xl font-black text-white tracking-tighter italic">$CITY</h1>
        </div>
        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl">
          <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold mb-1">Live Market Cap</p>
          <div className="flex items-baseline gap-2">
            <p className="text-5xl font-mono font-bold text-white">
              {(mcap / 1000).toFixed(2)}k
            </p>
            <p className="text-green-400 font-mono text-sm font-bold">
              +{( (mcap / 3450 - 1) * 100 ).toFixed(2)}%
            </p>
          </div>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-1000 ease-out"
              style={{ width: `${Math.max(0, Math.min(100, ((mcap - 3450) / (16200 - 3450)) * 100))}%` }}
            />
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <p className="text-white/60 text-[10px] uppercase font-bold">Holders</p>
            <p className="text-white font-mono text-sm">1,242</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <p className="text-white/60 text-[10px] uppercase font-bold">24h Vol</p>
            <p className="text-white font-mono text-sm">$42.5k</p>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-8 right-8 z-10 text-right pointer-events-none">
        <p className="text-white/20 text-xs font-mono uppercase tracking-widest">
          Infinite City Engine v1.0.4
        </p>
        <p className="text-white/40 text-sm">
          City grows as $CITY pumps
        </p>
      </div>

      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={40} />
        <OrbitControls 
          autoRotate 
          autoRotateSpeed={0.2} 
          enableDamping 
          maxPolarAngle={Math.PI / 2.1}
          minDistance={10}
          maxDistance={50}
        />
        
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 30, 70]} />

        <ambientLight intensity={0.2} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        >
          <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20, 0.1, 50]} />
        </directionalLight>
        
        <pointLight position={[-10, 10, -10]} intensity={1} color="#3b82f6" />
        <pointLight position={[10, 5, -10]} intensity={1} color="#8b5cf6" />
        
        <City mcap={mcap} />
        
        <ContactShadows 
          position={[0, 0, 0]} 
          opacity={0.4} 
          scale={100} 
          blur={2} 
          far={10} 
          resolution={256} 
          color="#000000" 
        />
        
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <meshStandardMaterial color="#050505" roughness={1} />
        </mesh>

        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="night" />
      </Canvas>
    </div>
  )
}

export default App

