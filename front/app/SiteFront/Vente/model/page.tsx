'use client'
import Head from '../../../../component/header';
import Footer from '../../../../component/footer';
import { useState } from 'react';
import styles from '../../../../public/css/Modelisation3D.module.css'; // Fichier CSS spécifique
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

// Modèles 3D (à importer depuis des fichiers GLTF)
const HouseModel1 = () => {
  const { scene } = useGLTF('/models/house1.glb');
  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
};

const HouseModel2 = () => {
  const { scene } = useGLTF('/models/house2.glb');
  return <primitive object={scene} scale={1} position={[0, -1, 0]} />;
};

const HOUSES = [
  {
    id: 1,
    title: "Maison moderne",
    description: "Une maison contemporaine avec des espaces ouverts et une architecture épurée.",
    image: "/image/3d/house1-thumbnail.jpg",
    model: HouseModel1,
  },
  {
    id: 2,
    title: "Maison traditionnelle",
    description: "Une maison classique avec un design chaleureux et fonctionnel.",
    image: "/image/3d/house2-thumbnail.jpg",
    model: HouseModel2,
  },
];

export default function Modelisation3D() {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  interface House {
    id: number;
    title: string;
    description: string;
    image: string;
    model: React.FC;
  }

  const handleHouseClick = (house: House) => {
    setSelectedHouse(house);
  };

  const closeViewer = () => {
    setSelectedHouse(null);
  };

  return (
    <>
      <Head />
      <main>
        {/* Hero Section */}
        <div className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.heroTitle}>Modélisation 3D des Maisons</h1>
            <p className={styles.heroSubtitle}>
              Explorez nos modèles 3D interactifs pour visualiser vos futures maisons.
            </p>
          </div>
        </div>

        {/* Liste des maisons */}
        <div className={`${styles.container} ${styles.houseGrid}`}>
          {HOUSES.map((house) => (
            <div key={house.id} className={styles.houseCard} onClick={() => handleHouseClick(house)}>
              <div className={styles.houseImageContainer}>
                <img src={house.image} alt={house.title} className={styles.houseImage} />
              </div>
              <div className={styles.houseContent}>
                <h3 className={styles.houseTitle}>{house.title}</h3>
                <p className={styles.houseDescription}>{house.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visualiseur 3D */}
        {selectedHouse && (
          <div className={styles.viewerOverlay}>
            <div className={styles.viewerContainer}>
              <button className={styles.closeButton} onClick={closeViewer}>
                &times;
              </button>
              <Canvas camera={{ position: [0, 10, 20], fov: 25 }}>
                <Suspense fallback={null}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                  <pointLight position={[-10, -10, -10]} />
                  <selectedHouse.model />
                  <OrbitControls />
                  <Environment preset="sunset" background />
                </Suspense>
              </Canvas>
              <div className={styles.houseDetails}>
                <h2>{selectedHouse.title}</h2>
                <p>{selectedHouse.description}</p>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}