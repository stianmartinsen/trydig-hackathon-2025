import { useEffect, useState } from "react";
import { ApiClient, type GameStatusResponse } from "~/sdk";

export function useGameState({
  gameID,
  token,
}: {
  gameID: string;
  token: string;
}) {
  const [gameState, setGameState] = useState<GameStatusResponse | null>(null);

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Space") {
      console.log("Space pressed");
    }

    if (event.code === "ArrowUp") {
      console.log("ArrowUp pressed");
    }

    if (event.code === "ArrowDown") {
      console.log("ArrowDown pressed");
    }

    if (event.code === "ArrowLeft") {
      console.log("ArrowLeft pressed");
    }

    if (event.code === "ArrowRight") {
      console.log("ArrowRight pressed");
    }
  }

  function setUpKeyboardListeners() {
    document.addEventListener("keydown", handleKeyDown);
  }

  function tearDownKeyboardListeners() {
    document.removeEventListener("keydown", handleKeyDown);
  }

  const apiClient = new ApiClient({ bearerToken: token });

  // Initialize the game state
  useEffect(() => {
    setUpKeyboardListeners();

    // The main game loop, updates the game state every second
    const interval = setInterval(async () => {
      const res = await apiClient.getPlayerStatus(gameID, token);
      console.log(res);
      setGameState(res);
    }, 500);

    // Clean up
    return () => {
      tearDownKeyboardListeners();
      clearInterval(interval);
    };
  }, []);

  return gameState;
}
