import { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

extend({ TextGeometry });

function Planet({ textureUrl, size, position, rotationSpeed, onClick, emissive, ring, name }) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const texture = useLoader(THREE.TextureLoader, textureUrl);

  // Load font dari public folder
  const [font, setFont] = useState();
  useEffect(() => {
    new FontLoader().load("/fonts/helvetiker_regular.typeface.json", setFont);
  }, []);

  useFrame(() => {
    mesh.current.rotation.y += rotationSpeed;
    mesh.current.scale.lerp(
      new THREE.Vector3(hovered ? 1.1 : 1, hovered ? 1.1 : 1, hovered ? 1.1 : 1),
      0.1
    );
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const audio = new Audio("/sounds/click.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
    onClick();
  };

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  return (
    <>
      {/* Planet Sphere */}
      <mesh
        ref={mesh}
        position={position}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={emissive || "black"}
          emissiveIntensity={emissive ? 0.6 : 0}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Ring */}
      {ring && (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2.2, 64]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Label Planet */}
      {font && (
        <mesh position={[position[0], position[1] - size - 0.5, position[2]]}>
          <textGeometry args={[name, { font, size: 0.5, height: 0.05 }]} />
          <meshBasicMaterial color="white" transparent opacity={0.8} />
        </mesh>
      )}
    </>
  );
}

export default Planet;
