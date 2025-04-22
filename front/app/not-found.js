'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function CustomError({ statusCode }) {
  useEffect(() => {
    // Animation pour les particules d'arrière-plan
    const canvas = document.getElementById('error-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const particles = [];
      const particleCount = 150; // Augmenter le nombre de particules
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 4 + 1;
          this.speedX = Math.random() * 2 - 1;
          this.speedY = Math.random() * 2 - 1;
          this.color = `hsla(${Math.random() * 60 + 220}, 70%, 50%, ${Math.random() * 0.5 + 0.3})`; // Ajouter de la transparence
          this.alpha = Math.random() * 0.5 + 0.3; // Transparence aléatoire
        }
        
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          
          // Rebondir sur les bords
          if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
          if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
          
          // Faire disparaître et réapparaître les particules
          this.alpha += Math.random() * 0.02 - 0.01;
          if (this.alpha < 0.1) this.alpha = 0.1;
          if (this.alpha > 0.8) this.alpha = 0.8;
        }
        
        draw() {
          ctx.save();
          ctx.globalAlpha = this.alpha;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }
      
      const init = () => {
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      };
      
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Ajouter un dégradé de fond
        const gradient = ctx.createRadialGradient(
          canvas.width / 2,
          canvas.height / 2,
          0,
          canvas.width / 2,
          canvas.height / 2,
          Math.max(canvas.width, canvas.height) / 2
        );
        gradient.addColorStop(0, 'rgba(15, 15, 45, 0.8)');
        gradient.addColorStop(1, 'rgba(0, 0, 20, 1)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (const particle of particles) {
          particle.update();
          particle.draw();
        }
        requestAnimationFrame(animate);
      };
      
      init();
      animate();
      
      window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
    }
  }, []);
  
  return (
    <div className="error-container">
      <canvas id="error-canvas" className="error-canvas"></canvas>
      <div className="error-content">
        <div className="error-glitch" data-text={statusCode || '404'}>
          {statusCode || '404'}
        </div>
        <h1 className="error-title">Oups ! Quelque chose s&apos;est mal passé</h1>
        <p className="error-message">
          {statusCode
            ? `Une erreur ${statusCode} s&apos;est produite sur le serveur`
            : "Nous ne trouvons pas la page que vous cherchez"}
        </p>
        <div className="error-actions">
          <Link href="/">
            <button className="error-button">Retour à l&apos;accueil</button>
          </Link>
        </div>
      </div>
      
      <style jsx global>{`
        body, html {
          margin: 0;
          padding: 0;
          height: 100%;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: #0f0f2d;
        }
        
        .error-container {
          position: relative;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          overflow: hidden;
        }
        
        .error-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .error-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 2rem;
          max-width: 600px;
          background: rgba(20, 20, 50, 0.7);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .error-glitch {
          font-size: 10rem;
          font-weight: 900;
          position: relative;
          text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                       -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                       0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          animation: glitch 2s infinite;
        }
        
        .error-glitch::before,
        .error-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .error-glitch::before {
          left: 0.05em;
          text-shadow: -0.05em 0 red;
          animation: glitch-anim 2s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
        }
        
        .error-glitch::after {
          left: -0.05em;
          text-shadow: -0.05em 0 blue;
          animation: glitch-anim2 2s infinite;
          clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
        }
        
        .error-title {
          font-size: 2.5rem;
          margin: 1.5rem 0;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        
        .error-message {
          font-size: 1.25rem;
          margin-bottom: 2rem;
          line-height: 1.6;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
        }
        
        .error-button {
          background: linear-gradient(45deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          padding: 1rem 2rem;
          font-size: 1.1rem;
          border-radius: 50px;
          cursor: pointer;
          transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .error-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
          background: linear-gradient(45deg, #8b5cf6, #6366f1);
        }
        
        @keyframes glitch {
          0% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                         -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                         0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          14% {
            text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                         -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                         0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
          }
          15% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                         0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                         -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          49% {
            text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                         0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                         -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          50% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                         0.05em 0 0 rgba(0, 255, 0, 0.75),
                         0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          99% {
            text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                         0.05em 0 0 rgba(0, 255, 0, 0.75),
                         0 -0.05em 0 rgba(0, 0, 255, 0.75);
          }
          100% {
            text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                         -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                         -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
          }
        }
        
        @keyframes glitch-anim {
          0% { top: 0; left: 0; }
          20% { top: -5px; left: -3px; }
          40% { top: 2px; left: 2px; }
          60% { top: 5px; left: -2px; }
          80% { top: -3px; left: 5px; }
          100% { top: 0; left: 0; }
        }
        
        @keyframes glitch-anim2 {
          0% { top: 0; left: 0; }
          20% { top: 3px; left: 5px; }
          40% { top: -2px; left: -2px; }
          60% { top: -5px; left: 3px; }
          80% { top: 2px; left: -4px; }
          100% { top: 0; left: 0; }
        }
        
        @media (max-width: 768px) {
          .error-glitch {
            font-size: 6rem;
          }
          
          .error-title {
            font-size: 1.8rem;
          }
          
          .error-message {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}