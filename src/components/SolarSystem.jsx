import Planet from "./Planet";
import Orbit from "./Orbit";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function SolarSystem({ onSelectPlanet }) {
  const systemRef = useRef();

  useFrame(() => {
    if (systemRef.current) {
      systemRef.current.rotation.y += 0.0005;
    }
  });

  const planets = [
    {
      name: "Matahari",
      textureUrl: "/textures/planets/matahari.jpg",
      size: 3,
      position: [0, 0, 0],
      rotationSpeed: 0.002,
      diameter: 1391000,
      distance: 0,
      moons: "Tidak ada",
      rotationPeriod: "25.4 hari (khatulistiwa)",
      revolutionPeriod: "225-250 juta tahun",
      fact: "Matahari adalah bintang pusat tata surya dan menyumbang 99.86% massa total tata surya.",
      emissive: "orange",
    },
    {
      name: "Merkurius",
      textureUrl: "/textures/planets/merkurius.jpg",
      size: 0.4,
      position: [5, 0, 0],
      rotationSpeed: 0.004,
      diameter: 4879,
      distance: 57910000,
      moons: 0,
      rotationPeriod: "58.6 hari",
      revolutionPeriod: "88 hari",
      fact: "Merkurius adalah planet terkecil dan terdekat dengan Matahari.",
    },
    {
      name: "Venus",
      textureUrl: "/textures/planets/venus.jpg",
      size: 0.95,
      position: [7, 0, 0],
      rotationSpeed: 0.002,
      diameter: 12104,
      distance: 108200000,
      moons: 0,
      rotationPeriod: "243 hari (retrograde)",
      revolutionPeriod: "225 hari",
      fact: "Venus memiliki atmosfer sangat tebal mostly CO2.",
    },
    {
      name: "Bumi",
      textureUrl: "/textures/planets/bumi.jpg",
      size: 1,
      position: [9, 0, 0],
      rotationSpeed: 0.01,
      diameter: 12742,
      distance: 149600000,
      moons: 1,
      rotationPeriod: "1 hari",
      revolutionPeriod: "365.25 hari",
      fact: "Bumi adalah satu-satunya planet yang diketahui memiliki kehidupan.",
    },
    {
      name: "Mars",
      textureUrl: "/textures/planets/mars.jpg",
      size: 0.8,
      position: [12, 0, 0],
      rotationSpeed: 0.008,
      diameter: 6779,
      distance: 227900000,
      moons: 2,
      rotationPeriod: "1.03 hari",
      revolutionPeriod: "687 hari",
      fact: "Mars sering disebut 'Planet Merah'.",
    },
    {
      name: "Jupiter",
      textureUrl: "/textures/planets/jupiter.jpg",
      size: 2.5,
      position: [18, 0, 0],
      rotationSpeed: 0.02,
      diameter: 139820,
      distance: 778500000,
      moons: 79,
      rotationPeriod: "9.93 jam",
      revolutionPeriod: "11.86 tahun",
      fact: "Jupiter adalah planet terbesar di tata surya.",
      ring: true,
    },
    {
      name: "Saturnus",
      textureUrl: "/textures/planets/saturnus.jpg",
      size: 2,
      position: [24, 0, 0],
      rotationSpeed: 0.018,
      diameter: 116460,
      distance: 1429000000,
      moons: 82,
      rotationPeriod: "10.7 jam",
      revolutionPeriod: "29.46 tahun",
      fact: "Saturnus terkenal dengan cincin spektakuler.",
      ring: true,
    },
    {
      name: "Uranus",
      textureUrl: "/textures/planets/uranus.jpg",
      size: 1.5,
      position: [30, 0, 0],
      rotationSpeed: 0.015,
      diameter: 50724,
      distance: 2871000000,
      moons: 27,
      rotationPeriod: "17.24 jam",
      revolutionPeriod: "84 tahun",
      fact: "Uranus berputar miring 98 derajat terhadap orbitnya.",
    },
    {
      name: "Neptunus",
      textureUrl: "/textures/planets/neptunus.jpg",
      size: 1.4,
      position: [36, 0, 0],
      rotationSpeed: 0.012,
      diameter: 49244,
      distance: 4495000000,
      moons: 14,
      rotationPeriod: "16.11 jam",
      revolutionPeriod: "164.8 tahun",
      fact: "Neptunus adalah planet terjauh dengan angin supersonik.",
    },
  ];

  return (
    <group ref={systemRef}>
      {planets.map((planet, i) => (
        <group key={i}>
          {planet.name !== "Matahari" && (
            <Orbit
              radius={planet.position[0]}
              color={i % 2 === 0 ? "#4a5568" : "#718096"}
              speed={0.00005 + 0.0001 * (i / planets.length)}
            />
          )}
          <Planet {...planet} onClick={() => onSelectPlanet(planet)} />
        </group>
      ))}
    </group>
  );
}

export default SolarSystem;
src/assets/music/Coldplay, BTS — My Universe.mp3