import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Stars({ count = 5000 }) {
  const points = useRef();

  const { geometry } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 50 + Math.random() * 500; 
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      if (Math.random() > 0.95) {
        color.setHSL(0.6, 1.0, 0.7 + Math.random() * 0.3); // Biru
      } else if (Math.random() > 0.9) {
        color.setHSL(0.0, 1.0, 0.7 + Math.random() * 0.3); // Merah
      } else {
        color.setHSL(0.0, 0.0, 0.7 + Math.random() * 0.3); // Putih
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    return { geometry };
  }, [count]);

  useFrame(() => {
    if (points.current) points.current.rotation.y += 0.0001;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={1.5}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  );
}

export default Stars;
