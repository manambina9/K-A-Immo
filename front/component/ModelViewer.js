// components/ModelViewer.js
'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function ModelViewer() {
  return (
    <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Model url="/images/vente/3d/maison.glb" />
      <OrbitControls 
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}