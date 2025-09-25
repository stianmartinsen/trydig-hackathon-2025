import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ApiClient } from "~/sdk";

export default function Join() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gameID: "",
    password: "",
    name: "",
    color: "#FF0000",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const client = new ApiClient();

    try {
      const response = await client.joinGame(formData);
      console.log("Joined game successfully!", response);

      // Navigate to game route with response data as URL params
      navigate(`/game?gameID=${formData.gameID}&id=${response.id}&token=${response.token}&name=${response.name}`);
    } catch (error) {
      console.error("Failed to join game:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Join Game</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="gameID"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Game ID
            </label>
            <input
              type="text"
              id="gameID"
              name="gameID"
              value={formData.gameID}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Game Password
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Team Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="color"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Team Color
            </label>
            <input
              type="color"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="w-full h-10 px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Join Game
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
