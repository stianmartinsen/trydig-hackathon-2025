import type { Route } from "./+types/home";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Game Start" },
    { name: "description", content: "Start your game!" },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Welcome to the Game
        </h1>
        <div className="space-y-4">
          <Link
            to="/start"
            className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
          >
            Start Game
          </Link>
          <Link
            to="/join"
            className="block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
          >
            Join Game
          </Link>
        </div>
      </div>
    </div>
  );
}
