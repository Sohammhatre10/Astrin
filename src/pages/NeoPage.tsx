import React, { useState, useEffect } from "react";
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";

interface NeoEvent {
  id: string;
  title: string;
  description: string;
  type: string;
  timestamp: string;
  severity: string;
  icon: string;
}

const severityColors = {
  low: "border-green-400 text-green-400",
  info: "border-cyan-400 text-cyan-400",
  moderate: "border-yellow-400 text-yellow-400",
  high: "border-purple-400 text-purple-400",
};

export default function NeoPage() {
  const [neos, setNeos] = useState<NeoEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNeos = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/neo");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNeos(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch NEO data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchNeos();
  }, []);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Near-Earth Objects
        </h2>
        <p className="text-gray-400 text-lg">
          Track asteroids and comets approaching Earth
        </p>
      </div>

      {loading && (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
        </div>
      )}

      {error && (
        <div className="text-red-500 text-center text-xl">Error: {error}</div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {neos.length > 0 ? (
            neos.map((neo) => {
              const severityClass =
                severityColors[neo.severity as keyof typeof severityColors] ||
                severityColors.info;
              return (
                <div
                  key={neo.id}
                  className={`glass-card p-6 rounded-lg border ${severityClass} hover:scale-105 transition-transform duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg bg-opacity-20 ${
                        neo.severity === "high"
                          ? "bg-purple-500"
                          : neo.severity === "moderate"
                          ? "bg-yellow-500"
                          : "bg-cyan-500"
                      }`}
                    >
                      <Circle className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">{neo.title}</h3>
                      <p className="text-gray-300 text-sm mb-3">
                        {neo.description}
                      </p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span className="capitalize">{neo.type}</span>
                        <span>{formatTimestamp(neo.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No Near-Earth Objects data available.
            </p>
          )}
        </div>
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
