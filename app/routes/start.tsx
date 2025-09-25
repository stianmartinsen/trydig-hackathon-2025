import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ApiClient } from "~/sdk";

export default function Start() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    size: 50,
    distribution: 0,
    timelimit: 600,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const client = new ApiClient();

    try {
      const response = await client.createGame(formData);
      console.log("Game created successfully!", response);

      // Navigate to host route with response data as URL params
      navigate(`/host?id=${response.id}&password=${response.password}`);
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Start New Game</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="size"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Grid Size
            </label>
            <input
              type="number"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              min="10"
              max="100"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="distribution"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Obstacle Distribution (-1 to 1)
            </label>
            <input
              type="number"
              id="distribution"
              name="distribution"
              value={formData.distribution}
              onChange={handleChange}
              min="-1"
              max="1"
              step="0.1"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="timelimit"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Time Limit (seconds)
            </label>
            <input
              type="number"
              id="timelimit"
              name="timelimit"
              value={formData.timelimit}
              onChange={handleChange}
              min="30"
              max="10000"
              defaultValue={6000}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Create Game
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
