import { motion } from "framer-motion";
import { useEffect } from "react";

function InfoPanel({ planet, onClose }) {
  // Efek suara ketika panel terbuka
  useEffect(() => {
    if (planet) {
      const audio = new Audio("/sounds/panel-open.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, [planet]);

  // Kalau tidak ada planet, jangan render panel
  if (!planet) return null;

  const handleClose = () => {
    const audio = new Audio("/sounds/panel-close.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});
    onClose();
  };

  return (
    <motion.div
      className="absolute top-5 right-5 w-80 bg-black/90 backdrop-blur-md text-white p-5 rounded-2xl shadow-xl border border-white/10 z-50"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ type: "spring", damping: 20 }}
    >
      <div className="flex justify-between items-center mb-4 border-b border-white/20 pb-3">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400">
          {planet.name}
        </h2>
        <button
          onClick={handleClose}
          className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded-md text-sm transition-all duration-200 transform hover:scale-105"
        >
          ✕ Tutup
        </button>
      </div>

      <div className="space-y-2">
        <p className="flex justify-between">
          <span className="font-semibold text-blue-300">Diameter:</span>
          <span>{planet.diameter.toLocaleString("id-ID")} km</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-blue-300">Jarak dari Matahari:</span>
          <span>{planet.distance.toLocaleString("id-ID")} km</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-blue-300">Satelit Alami:</span>
          <span>{planet.moons}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-blue-300">Periode Rotasi:</span>
          <span>{planet.rotationPeriod}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-semibold text-blue-300">Periode Revolusi:</span>
          <span>{planet.revolutionPeriod}</span>
        </p>
      </div>

      <div className="mt-4 p-3 bg-white/5 rounded-lg">
        <p className="text-sm italic text-justify text-gray-200">{planet.fact}</p>
      </div>

      <div className="mt-4 flex justify-center">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm transition-colors"
          onClick={() => {
            const audio = new Audio("/sounds/select.mp3");
            audio.volume = 0.3;
            audio.play().catch(() => {});
            // Aksi tambahan bisa ditambahkan di sini
          }}
        >
          Jelajahi Lebih Lanjut
        </button>
      </div>
    </motion.div>
  );
}

export default InfoPanel;











