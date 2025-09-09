import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function Controls({ mode, target }) {
  const { camera } = useThree();
  const cameraTarget = useRef(new THREE.Vector3(...target));
  
  useEffect(() => {
    cameraTarget.current.set(...target);
  }, [target]);

  useFrame((state, delta) => {
    if (mode === "overview") {
      // Gerakan kamera melingkar di overview
      const time = state.clock.getElapsedTime();
      camera.position.x = Math.sin(time * 0.1) * 40;
      camera.position.z = Math.cos(time * 0.1) * 40;
      camera.position.y = 20;
      camera.lookAt(0, 0, 0);
    } else if (mode === "focused") {
      // Fokus ke planet yang dipilih
      const targetPosition = new THREE.Vector3(
        cameraTarget.current.x,
        cameraTarget.current.y + 5,
        cameraTarget.current.z + 10
      );
      
      camera.position.lerp(targetPosition, delta * 0.8);
      camera.lookAt(cameraTarget.current.x, cameraTarget.current.y, cameraTarget.current.z);
    }
  });

  return null;
}

export default Controls;