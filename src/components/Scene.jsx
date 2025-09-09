import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import SolarSystem from "./SolarSystem";
import Stars from "./Stars";
import InfoPanel from "./InfoPanel";
import Controls from "./Controls";
import Loading from "./Loading";

function Scene() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [cameraMode, setCameraMode] = useState("overview");

  const handleSelectPlanet = (planet) => {
    setSelectedPlanet(planet);
    if (cameraMode !== "focused") {
      setCameraMode("focused");
    }
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
    setCameraMode("overview");
  };

  return (
    <div className="relative w-full h-screen bg-black">
      <Canvas
        camera={{ position: [0, 20, 40], fov: 60 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#000000"]} />
        <fog attach="fog" args={["#000000", 10, 100]} />
        
        <Suspense fallback={<Loading />}>
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />
          
          <Stars />
          <SolarSystem onSelectPlanet={handleSelectPlanet} />
          
          <Controls 
            mode={cameraMode} 
            target={selectedPlanet ? selectedPlanet.position : [0, 0, 0]}
          />
        </Suspense>
      </Canvas>
      
      <InfoPanel planet={selectedPlanet} onClose={handleClosePanel} />
      
      <div className="absolute bottom-5 left-5 text-white text-sm bg-black/50 p-3 rounded-lg">
        <p>🔍 Scroll untuk zoom | 🖱️ Drag untuk memutar | 🌐 Klik planet untuk info</p>
      </div>
      
      <div className="absolute top-5 left-5 text-white">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Eksplorasi Tata Surya 3D
        </h1>
        <p className="text-sm text-gray-300">Jelajahi planet-planet dalam tata surya kita</p>
      </div>
    </div>
  );
}

export default Scene;