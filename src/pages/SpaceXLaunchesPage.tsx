import React, { useState, useEffect } from "react";
import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  details: string | null;
  links: {
    webcast: string | null;
    article: string | null;
    wikipedia: string | null;
  };
}

export default function SpaceXLaunchesPage() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/spacex-launches"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setLaunches(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch SpaceX launches data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          SpaceX Upcoming Launches
        </h2>
        <p className="text-gray-400 text-lg">
          Stay informed about future SpaceX missions
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

      {!loading && !error && launches.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
          {launches.map((launch) => (
            <div
              key={launch.id}
              className="glass-card p-6 rounded-lg border border-cyan-400 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-cyan-500 bg-opacity-20">
                  <Rocket className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{launch.name}</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {launch.details || "No details available."}
                  </p>
                  <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                    <span>{formatTimestamp(launch.date_utc)}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {launch.links.webcast && (
                      <a
                        href={launch.links.webcast}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-400 hover:underline"
                      >
                        Watch Live
                      </a>
                    )}
                    {launch.links.article && (
                      <a
                        href={launch.links.article}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline"
                      >
                        Article
                      </a>
                    )}
                    {launch.links.wikipedia && (
                      <a
                        href={launch.links.wikipedia}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:underline"
                      >
                        Wikipedia
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-400 text-center">
            No SpaceX launch data available.
          </p>
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
