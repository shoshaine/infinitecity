import React, { useMemo } from 'react'
import Building from './Building'
import Park from './Park'
import Road from './Road'
import * as THREE from 'three'

// Simple hash function for deterministic randomness
const hash = (x, z) => {
  const h = Math.sin(x * 12.9898 + z * 78.233) * 43758.5453123
  return h - Math.floor(h)
}

const City = ({ mcap }) => {
  // City radius grows with mcap
  // 3.45k -> radius 5
  // 16.2k -> radius 15
  const radius = Math.floor(THREE.MathUtils.mapLinear(mcap, 3450, 16200, 5, 15))
  
  const grid = useMemo(() => {
    const items = []
    // We iterate over a larger area but only show what's within the current radius
    // To make it feel "infinite" or growing, we can keep the loop fixed and just filter
    const maxRadius = 20 
    
    for (let x = -maxRadius; x <= maxRadius; x++) {
      for (let z = -maxRadius; z <= maxRadius; z++) {
        const dist = Math.sqrt(x * x + z * z)
        if (dist > radius) continue

        const h = hash(x, z)
        const pos = [x, 0, z]
        const key = `${x}-${z}`

        // Road system
        if (x % 4 === 0 || z % 4 === 0) {
          items.push(<Road key={key} position={pos} rotation={x % 4 === 0 ? 0 : Math.PI / 2} />)
        } 
        // Parks
        else if (h > 0.85) {
          items.push(<Park key={key} position={pos} />)
        } 
        // Buildings
        else {
          // Height also scales with mcap slightly for a "growing" effect
          const baseHeight = 0.5 + h * 2
          const growthFactor = THREE.MathUtils.mapLinear(mcap, 3450, 16200, 1, 3)
          const height = baseHeight * growthFactor
          
          const color = new THREE.Color().setHSL(0.6 + h * 0.1, 0.8, 0.4 + h * 0.2)
          items.push(<Building key={key} position={pos} height={height} color={color} />)
        }
      }
    }
    return items
  }, [radius, mcap])

  return <group>{grid}</group>
}

export default City
