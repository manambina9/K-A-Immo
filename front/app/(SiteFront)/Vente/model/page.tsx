// pages/realisation-3d.js
'use client'
import { useState, useRef, useEffect, Suspense } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Header from '../../../../component/header';
import { FiBox, FiCamera, FiLayout, FiVideo, FiZap } from 'react-icons/fi';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Loader } from '@react-three/drei';

// Composant 3D
function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

function ModelViewer() {
  return (
    <Canvas camera={{ position: [5, 2, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <spotLight position={[0, 10, 0]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model url="/image/vente/3d/maison.glb" />
      </Suspense>
      <OrbitControls 
        enableZoom={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={10}
      />
    </Canvas>
  );
}

export default function Realisation3D() {
  const [isLoading, setIsLoading] = useState(true);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('exterieur');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleModelLoad = () => {
    setModelLoaded(true);
  };

  return (
    <>
      <Head>
        <title>Réalisation 3D - Votre Agence Immobilière</title>
        <meta name="description" content="Service de modélisation 3D pour vos projets immobiliers" />
      </Head>
      <Header />
      
      <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900/50 text-white">
        <div className="container mx-auto px-4 py-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-200 to-purple-400 bg-clip-text text-transparent">
              Immersion 3D
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
              Plongez dans une expérience visuelle unique et explorez votre future propriété sous tous les angles
            </p>
          </motion.div>

          <div className="max-w-7xl mx-auto bg-slate-800/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Panel */}
                <motion.div className="space-y-8">
                  <div className="bg-indigo-900/20 p-6 rounded-xl border border-indigo-500/20">
                    <h2 className="text-2xl font-bold mb-6">Options de visualisation</h2>
                    <div className="space-y-4">
                      <button className="w-full flex items-center gap-3 p-3 hover:bg-indigo-900/10 rounded-lg transition">
                        <FiCamera className="w-6 h-6 text-indigo-400" />
                        <span>Visite virtuelle 360°</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 hover:bg-indigo-900/10 rounded-lg transition">
                        <FiVideo className="w-6 h-6 text-indigo-400" />
                        <span>Animation cinématique</span>
                      </button>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-slate-700/10 p-6 rounded-xl border border-slate-500/20">
                    <h3 className="font-bold mb-4">Progression du projet</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                        <span className="text-sm">Étude des plans</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
                        <span className="text-sm">Modélisation 3D</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Main 3D Viewer */}
                <div className="lg:col-span-2 relative h-[600px]">
                  <div className="relative h-full overflow-hidden rounded-xl border-2 border-indigo-500/30 bg-gradient-to-br from-slate-800 to-slate-900">
                    {isLoading ? (
                      <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500" />
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full"
                      >
                        <ModelViewer />
                        <Loader
                          containerStyles={{ background: 'transparent' }}
                          innerStyles={{ backgroundColor: '#6366f1' }}
                          barStyles={{ backgroundColor: '#e0e7ff' }}
                          dataStyles={{ color: '#e0e7ff' }}
                        />
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Tabs */}
            <div className="border-t border-slate-700/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-700/50">
                {['Architecture', 'Intérieur', 'Éclairage', 'Matériaux'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`p-6 text-left transition-colors ${
                      activeTab === tab.toLowerCase() 
                        ? 'bg-indigo-900/20 text-indigo-300' 
                        : 'bg-slate-800/30 hover:bg-slate-700/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <FiBox className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="font-medium">{tab}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div 
            className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Prêt à transformer votre projet ?</h3>
            <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
              Lancez-vous dans une expérience immersive et redéfinissez les limites de la conception immobilière
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold flex items-center justify-center gap-2 mx-auto hover:bg-opacity-90 transition"
            >
              Commencer la modélisation
              <FiZap className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </main>
    </>
  );
}