import React, { useState, useEffect } from "react";
import { Image } from "lucide-react";
import { Link } from "react-router-dom";

interface ApodData {
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export default function ApodPage() {
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/apod");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setApod(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch APOD data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Astronomy Picture of the Day
        </h2>
        <p className="text-gray-400 text-lg">
          Discover the universe, one picture at a time.
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

      {!loading && !error && apod && (
        <div className="glass-card p-6 rounded-lg border border-cyan-400 hover:scale-105 transition-transform duration-300 w-full max-w-2xl">
          <h3 className="font-bold text-2xl mb-4 text-center">{apod.title}</h3>
          {apod.media_type === "image" ? (
            <img
              src={apod.url}
              alt={apod.title}
              className="w-full h-auto rounded-lg mb-4"
            />
          ) : (
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                src={apod.url}
                title={apod.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg mb-4"
              ></iframe>
            </div>
          )}
          <p className="text-gray-300 text-base mb-4">{apod.explanation}</p>
          <p className="text-gray-500 text-sm">Date: {apod.date}</p>
        </div>
      )}
      {!loading && !error && !apod && (
        <p className="text-gray-400 text-center col-span-full">
          No APOD data available.
        </p>
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
