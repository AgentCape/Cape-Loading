import { useState, useEffect } from 'react';
import { isDebug, useNuiEvent } from './hooks/useNui';

export default function App() {
  const [visible, setVisible] = useState(isDebug);
  const [progress, setProgress] = useState(0);

  useNuiEvent('open', () => setVisible(true));
  useNuiEvent('close', () => setVisible(false));

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black" />
      
      {/* Particle effect */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo area */}
        <div className="mb-16">
          <h1 className="text-7xl font-black text-white mb-2 tracking-tighter">
            Timeless
            <span className="block text-4xl font-light mt-1 text-blue-400">RP</span>
          </h1>
        </div>

        {/* Loading bar container */}
        <div className="w-96 max-w-[90vw] mb-8">
          <div className="bg-gray-800 rounded-full h-1 overflow-hidden backdrop-blur-sm border border-blue-500/30">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-gray-400 text-sm font-light tracking-widest uppercase">
          Loading {Math.min(Math.floor(progress), 100)}%
        </p>

        {/* Loading dots animation */}
        <div className="mt-8 flex justify-center gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full"
              style={{
                animation: 'pulse 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
