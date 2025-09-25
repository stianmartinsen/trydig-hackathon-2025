import { useSearchParams } from "react-router";

export default function Host() {
  const [searchParams] = useSearchParams();
  const gameId = searchParams.get("id");
  const password = searchParams.get("password");

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

          <div className="text-center text-gray-600">
            <p>Share these details with players to join your game</p>
          </div>
        </div>
      </div>
    </div>
  );
}