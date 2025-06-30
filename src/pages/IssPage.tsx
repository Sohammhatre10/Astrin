import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";

interface IssData {
  iss_position: {
    latitude: string;
    longitude: string;
  };
  timestamp: number;
  message: string;
}

export default function IssPage() {
  const [issData, setIssData] = useState<IssData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIssPosition = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/iss");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setIssData(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch ISS data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchIssPosition();
    const interval = setInterval(fetchIssPosition, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          International Space Station
        </h2>
        <p className="text-gray-400 text-lg">Real-time location of the ISS</p>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center text-xl">Error: {error}</div>
      )}

      {!loading && !error && issData ? (
        <div className="glass-card p-6 rounded-lg border border-cyan-400 hover:scale-105 transition-transform duration-300 w-full max-w-4xl h-[500px]">
          <h3 className="font-bold text-2xl mb-4 text-center">
            Current ISS Position
          </h3>
          <p className="text-gray-300 text-lg mb-4 text-center">
            Latitude: {issData.iss_position.latitude}, Longitude:{" "}
            {issData.iss_position.longitude}
          </p>
          <div className="w-full h-[350px] rounded-lg overflow-hidden flex items-center justify-center text-gray-300">
            Map functionality removed due to dependency issues.
          </div>
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-400 text-center">No ISS data available.</p>
        )
      )}

      <div className="mt-8">
        <Link
          to="/"
          className="glass-card px-6 py-3 rounded-lg text-lg text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
