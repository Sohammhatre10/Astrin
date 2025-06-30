import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const [currentFact, setCurrentFact] = useState(
    "The universe is vast and full of wonders waiting to be discovered! 🌌"
  );

  return (
    <footer className="py-12 px-4 border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="glass-card p-6 rounded-lg mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-twinkle" />
              <h3 className="text-lg font-bold gradient-text">Cosmic Fact</h3>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-twinkle" />
            </div>
            <p className="text-gray-300 text-sm max-w-2xl mx-auto">
              {currentFact}
            </p>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p className="mb-2">
            <span className="gradient-text font-bold">Astrin</span> - Your
            Cosmic Companion
          </p>
          <p>
            Powered by{" "}
            <span className="text-cyan-400 font-bold">
              Together AI's LLaMA-3.3-70B-Instruct-Turbo
            </span>
          </p>
          <p className="mt-2 text-xs">
            Exploring the universe, one question at a time 🚀
          </p>
        </div>
      </div>
    </footer>
  );
}
