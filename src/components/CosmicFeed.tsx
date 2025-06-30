import React from "react";
import { Link } from "react-router-dom";
import { Rocket, Satellite, Sun, Cloud, Globe, Image } from "lucide-react";

interface ApiLink {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ElementType;
  color: string;
}

const apiLinks: ApiLink[] = [
  {
    id: "neo",
    name: "Near-Earth Objects",
    description: "Track asteroids and comets approaching Earth.",
    path: "/neo",
    icon: Satellite,
    color: "text-cyan-400",
  },
  {
    id: "apod",
    name: "Astronomy Picture of the Day",
    description: "Discover the universe, one picture at a time.",
    path: "/apod",
    icon: Image,
    color: "text-purple-400",
  },
  {
    id: "mars-weather",
    name: "Mars Weather",
    description: "Daily weather updates from the Red Planet.",
    path: "/mars-weather",
    icon: Cloud,
    color: "text-orange-400",
  },
  {
    id: "iss",
    name: "ISS Location",
    description: "Real-time location of the International Space Station.",
    path: "/iss",
    icon: Globe,
    color: "text-green-400",
  },
  {
    id: "spacex-launches",
    name: "SpaceX Launches",
    description: "Stay informed about future SpaceX missions.",
    path: "/spacex-launches",
    icon: Rocket,
    color: "text-red-400",
  },
];

export default function CosmicFeed() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Explore Cosmic Data
          </h2>
          <p className="text-gray-400 text-lg">
            Dive deeper into specific cosmic phenomena and missions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.id}
                to={link.path}
                className={`glass-card p-6 rounded-lg border border-cyan-400 hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center ${link.color}`}
              >
                <Icon className="w-12 h-12 mb-4" />
                <h3 className="font-bold text-xl mb-2">{link.name}</h3>
                <p className="text-gray-300 text-sm">{link.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
