import React, { useState, useEffect } from "react";
import { Cloud, Thermometer, Wind, Sunrise, Sunset } from "lucide-react";
import { Link } from "react-router-dom";

interface MarsWeather {
  sol_keys: string[];
  validity_checks: any;
  [key: string]: any;
}

export default function MarsWeatherPage() {
  const [weatherData, setWeatherData] = useState<MarsWeather[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarsWeather = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/mars-weather");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch Mars weather data:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchMarsWeather();
  }, []);

  return (
    <section className="py-20 px-4 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Mars Weather
        </h2>
        <p className="text-gray-400 text-lg">
          Daily weather updates from the Red Planet
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

      {!loading && !error && weatherData && weatherData.length > 0 ? (
        <div className="glass-card p-6 rounded-lg border border-cyan-400 hover:scale-105 transition-transform duration-300 w-full max-w-2xl">
          <h3 className="font-bold text-2xl mb-4 text-center">
            Latest Mars Weather (Sol {weatherData[0].sol})
          </h3>
          {weatherData.slice(0, 1).map((solData) => {
            const terrestrialDate = new Date(
              solData.terrestrial_date
            ).toLocaleDateString();
            const minTemp = solData.min_temp;
            const maxTemp = solData.max_temp;
            const pressure = solData.pressure;
            const sunrise = solData.sunrise
              ? new Date(`2000-01-01T${solData.sunrise}`).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "N/A";
            const sunset = solData.sunset
              ? new Date(`2000-01-01T${solData.sunset}`).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "N/A";

            return (
              <div key={solData.id} className="mb-4">
                <p className="text-gray-300 text-lg mb-2">
                  Terrestrial Date: {terrestrialDate}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-purple-400" />
                    <span>Min Temp: {minTemp}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-orange-400" />
                    <span>Max Temp: {maxTemp}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5 text-blue-400" />
                    <span>Pressure: {pressure} Pa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sunrise className="w-5 h-5 text-yellow-400" />
                    <span>Sunrise: {sunrise}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sunset className="w-5 h-5 text-red-400" />
                    <span>Sunset: {sunset}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        !loading &&
        !error && (
          <p className="text-gray-400 text-center">
            No Mars weather data available.
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
