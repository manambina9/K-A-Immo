import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-[url('/image/house-bg.jpg')] bg-cover bg-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/image/maison/maison1.png')"
        }}
      >
      </div>
      
      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Nouveautés immobilières
        </h1>
        <p className="text-xl md:text-2xl mb-8 tracking-wider">
          EXCLUSIVITÉS IMOBI
        </p>
        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300">
          Explorer
        </button>
      </div>
    </div>
  );
};

export default Hero;