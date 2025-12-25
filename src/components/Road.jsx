import React from 'react'

const Road = ({ position, rotation = 0 }) => {
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Asphalt */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} receiveShadow>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>
      
      {/* Markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <planeGeometry args={[0.05, 0.4]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

export default Road
