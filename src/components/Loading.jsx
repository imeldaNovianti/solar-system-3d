import { Html } from "@react-three/drei";

function Loading() {
  return (
    <Html center>
      <div className="text-white text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg">Memuat alam semesta...</p>
      </div>
    </Html>
  );
}

export default Loading;