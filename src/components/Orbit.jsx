import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Orbit({ radius, color = "#4a5568", speed = 0.0001 }) {
  const segments = 128;
  const orbitRef = useRef();
  
  useFrame(() => {
    if (orbitRef.current) {
      orbitRef.current.rotation.x += speed;
    }
  });

  const geometry = new THREE.RingGeometry(radius - 0.005, radius + 0.005, segments);
  const material = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6
  });

  return (
    <mesh 
      ref={orbitRef} 
      geometry={geometry} 
      material={material} 
      rotation={[-Math.PI / 2, 0, 0]}
      renderOrder={1}
    />
  );
}

export default Orbit;