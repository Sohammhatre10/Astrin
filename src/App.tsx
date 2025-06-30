import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Starfield from "./components/Starfield";
import Hero from "./components/Hero";
import CosmicFeed from "./components/CosmicFeed";
import ChatAgent from "./components/ChatAgent";
import Footer from "./components/Footer";
import NeoPage from "./pages/NeoPage";
import ApodPage from "./pages/ApodPage";
import MarsWeatherPage from "./pages/MarsWeatherPage";
import IssPage from "./pages/IssPage";
import SpaceXLaunchesPage from "./pages/SpaceXLaunchesPage";

function App() {
  const [showChat, setShowChat] = useState(false);

  const handleLaunchAgent = () => {
    setShowChat(true);
    const chatSection = document.getElementById("chat-agent");
    chatSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Starfield />

      <div className="relative z-10">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero onLaunchAgent={handleLaunchAgent} />
                <CosmicFeed />
                {showChat && (
                  <div id="chat-agent">
                    <ChatAgent />
                  </div>
                )}
              </>
            }
          />
          <Route path="/neo" element={<NeoPage />} />
          <Route path="/apod" element={<ApodPage />} />
          <Route path="/mars-weather" element={<MarsWeatherPage />} />
          <Route path="/iss" element={<IssPage />} />
          <Route path="/spacex-launches" element={<SpaceXLaunchesPage />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
