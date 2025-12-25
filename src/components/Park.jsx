import React from 'react'
import { Float } from '@react-three/drei'

const Park = ({ position }) => {
  return (
    <group position={position}>
      {/* Grass Base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]} receiveShadow>
        <planeGeometry args={[0.95, 0.95]} />
        <meshStandardMaterial color="#1a3a1a" roughness={1} />
      </mesh>
      
      {/* Trees */}
      {[...Array(3)].map((_, i) => (
        <group key={i} position={[(Math.random() - 0.5) * 0.6, 0, (Math.random() - 0.5) * 0.6]}>
          <mesh position={[0, 0.1, 0]} castShadow>
            <cylinderGeometry args={[0.02, 0.03, 0.2]} />
            <meshStandardMaterial color="#3d2b1f" />
          </mesh>
          <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <mesh position={[0, 0.25, 0]} castShadow>
              <sphereGeometry args={[0.1, 8, 8]} />
              <meshStandardMaterial color="#2d5a27" />
            </mesh>
          </Float>
        </group>
      ))}
    </group>
  )
}

export default Park
