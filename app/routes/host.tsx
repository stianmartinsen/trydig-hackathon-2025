import { useState } from "react";
import { useSearchParams } from "react-router";
import { ApiClient } from "~/sdk";
import { useGameParams } from "~/hooks/use-game-params";

export default function Host() {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("id");
  const password = searchParams.get("password");
  const [gameStarted, setGameStarted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { clearParams } = useGameParams();

  const handleStartGame = async () => {
    if (!gameId) {
      console.error("Missing game ID");
      return;
    }

    const client = new ApiClient();

    try {
      const response = await client.startGame(gameId);
      console.log("Start game response:", response);
      console.log("Game started successfully!");
      setGameStarted(true);
      setSuccessMessage("");
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  const handleStopGame = async () => {
    if (!gameId) {
      console.error("Missing game ID");
      return;
    }

    const client = new ApiClient();

    try {
      const response = await client.stopGame(gameId);
      console.log("Stop game response:", response);
      console.log("Game stopped successfully!");
      setGameStarted(false);
      setSuccessMessage("Game stopped successfully!");
      clearParams();
    } catch (error) {
      console.error("Failed to stop game:", error);
    }
  };

  const handleResetGame = async () => {
    if (!gameId) {
      console.error("Missing game ID");
      return;
    }

    const client = new ApiClient();

    try {
      const response = await client.resetGame(gameId);
      console.log("Reset game response:", response);
      console.log("Game reset successfully!");
      setGameStarted(false);
      setSuccessMessage("");
    } catch (error) {
      console.error("Failed to reset game:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Game Host Dashboard</h1>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Game Details</h2>
            <p><strong>Game ID:</strong> {gameId}</p>
            <p><strong>Password:</strong> {password}</p>
          </div>

          <div className="space-y-3">
            {!gameStarted ? (
              <button
                onClick={handleStartGame}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-xl transition-colors"
              >
                Start Game
              </button>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-800 font-semibold">✅ Game Started Successfully!</p>
                <p className="text-green-600 text-sm mt-1">Players can now begin playing</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleStopGame}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Stop Game
              </button>
              <button
                onClick={handleResetGame}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Reset Game
              </button>
            </div>
          </div>

          <div className="text-center text-gray-600">
            <p>Share these details with players to join your game</p>
          </div>
        </div>
      </div>
    </div>
  );
}