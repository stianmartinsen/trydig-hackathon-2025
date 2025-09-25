import { useSearchParams } from "react-router";
import { ApiClient } from "~/sdk";

export default function Game() {
  const [searchParams] = useSearchParams();
  const gameID = searchParams.get("gameID");
  const playerId = searchParams.get("id");
  const token = searchParams.get("token");
  const name = searchParams.get("name");

  const handleFetchStatus = async () => {
    if (!gameID || !token) {
      console.error("Missing game ID or token");
      return;
    }

    const client = new ApiClient({
      bearerToken: token,
    });

    console.log("created with token", token);

    try {
      const status = await client.getPlayerStatus(gameID, token);
      console.log("Player status:", status);
    } catch (error) {
      console.error("Failed to fetch player status:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-6">
          Game Player Dashboard
        </h1>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Player Details</h2>
            <p>
              <strong>Game ID:</strong> {gameID}
            </p>
            <p>
              <strong>Player ID:</strong> {playerId}
            </p>
            <p>
              <strong>Token:</strong> {token}
            </p>
            <p>
              <strong>Team Name:</strong> {name}
            </p>
          </div>

          <button
            onClick={handleFetchStatus}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            Fetch Status (Check Console)
          </button>

          <div className="text-center text-gray-600">
            <p>Ready to play the game!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
