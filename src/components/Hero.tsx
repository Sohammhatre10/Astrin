import React from 'react';
import { Rocket, Star, Zap } from 'lucide-react';

interface HeroProps {
  onLaunchAgent: () => void;
}

export default function Hero({ onLaunchAgent }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <div className="cosmic-bg absolute inset-0 z-0"></div>
      
      <div className="text-center z-10 max-w-4xl mx-auto">
        <div className="mb-8 animate-float">
          <Rocket className="w-20 h-20 mx-auto text-cyan-400 mb-6" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text">
          ASTRIN
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Your Cosmic Companion
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
          Explore the universe, ask anything about space, and stay updated with real-time cosmic events. 
          Powered by advanced AI to be your guide through the cosmos.
        </p>
        
        <button
          onClick={onLaunchAgent}
          className="glass-card px-8 py-4 rounded-lg text-xl font-bold text-cyan-400 
                   hover:bg-cyan-400 hover:text-black transition-all duration-300
                   animate-glow border border-cyan-400 hover:scale-105 transform"
        >
          <div className="flex items-center gap-3">
            <Zap className="w-6 h-6" />
            Launch the Agent
            <Star className="w-6 h-6" />
          </div>
        </button>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="glass-card p-6 rounded-lg text-center">
            <Star className="w-8 h-8 mx-auto mb-3 text-purple-400" />
            <h3 className="text-lg font-bold mb-2">Live Updates</h3>
            <p className="text-gray-400 text-sm">Real-time cosmic events and space weather</p>
          </div>
          
          <div className="glass-card p-6 rounded-lg text-center">
            <Zap className="w-8 h-8 mx-auto mb-3 text-green-400" />
            <h3 className="text-lg font-bold mb-2">AI Assistant</h3>
            <p className="text-gray-400 text-sm">Ask anything about space and astronomy</p>
          </div>
          
          <div className="glass-card p-6 rounded-lg text-center">
            <Rocket className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
            <h3 className="text-lg font-bold mb-2">Space Explorer</h3>
            <p className="text-gray-400 text-sm">Journey through planets, stars, and galaxies</p>
          </div>
        </div>
      </div>
    </section>
  );
}