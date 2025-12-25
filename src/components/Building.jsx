import React, { useMemo } from 'react'
import * as THREE from 'three'

const Building = ({ position, height, color, width = 0.8, depth = 0.8 }) => {
  const windowColor = useMemo(() => new THREE.Color('#ffcc00').multiplyScalar(Math.random() > 0.5 ? 1 : 0.2), [])
  
  return (
    <group position={position}>
      {/* Main Structure */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.2} />
      </mesh>
      
      {/* Windows (Simplified) */}
      {height > 1 && (
        <mesh position={[0, height / 2, 0]}>
          <boxGeometry args={[width + 0.01, height * 0.8, depth + 0.01]} />
          <meshStandardMaterial 
            color="#111" 
            emissive={windowColor} 
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}
      
      {/* Roof Detail */}
      <mesh position={[0, height + 0.05, 0]} castShadow>
        <boxGeometry args={[width * 0.6, 0.1, depth * 0.6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  )
}

export default Building
