import { useEffect, useState } from "react";
import { ApiClient, type GameStatusResponse } from "~/sdk";
import { getShootingDirection } from "~/shooting-direction";

const REFRESH_INTERVAL = 500; // 1 second

export function useGameState({
  gameID,
  token,
}: {
  gameID: string;
  token: string;
}) {
  const [gameState, setGameState] = useState<GameStatusResponse | null>(null);
  const [lastPlayerDirection, setLastPlayerDirection] = useState<
    "up" | "down" | "left" | "right"
  >("down");

  function handleKeyDown(event: KeyboardEvent) {
    if (event.code === "Space") {
      console.log("Dropping bomb!");
      apiClient.bombPlayer(gameID, token);
    }

    if (event.code === "KeyS") {
      // Convert lastPlayerDirection to API format
      const directionMap = {
        up: "north" as const,
        down: "south" as const,
        left: "west" as const,
        right: "east" as const,
      };

      const shootDirection = directionMap[lastPlayerDirection];
      console.log(`Shooting ${shootDirection}!`);
      apiClient.shootPlayer(gameID, token, shootDirection);
    }

    if (event.code === "KeyA") {
      const shootDirection = getShootingDirection(
        gameState?.pos ?? { x: 0, y: 0 },
        (gameState?.players ?? []).map((player) => player.pos),
        gameState?.maze ?? []
      );

      console.log(`Auto aim ${shootDirection}!`);
      apiClient.shootPlayer(gameID, token, shootDirection);
    }

    if (event.code === "ArrowUp") {
      apiClient.movePlayer(gameID, token, "north");
      setLastPlayerDirection("up");
    }

    if (event.code === "ArrowDown") {
      apiClient.movePlayer(gameID, token, "south");
      setLastPlayerDirection("down");
    }

    if (event.code === "ArrowLeft") {
      apiClient.movePlayer(gameID, token, "west");
      setLastPlayerDirection("left");
    }

    if (event.code === "ArrowRight") {
      apiClient.movePlayer(gameID, token, "east");
      setLastPlayerDirection("right");
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

      // Transpose the maze to fix 90-degree rotation
      if (res.maze && res.maze.length > 0) {
        const transposedMaze = res.maze[0].map((_, colIndex) =>
          res.maze.map((row) => row[colIndex])
        );
        res.maze = transposedMaze.reverse();
      }

      // Transpose the claims to fix 90-degree rotation
      if (res.claims && res.claims.length > 0) {
        const transposedClaims = res.claims[0].map((_, colIndex) =>
          res.claims.map((row) => row[colIndex])
        );
        res.claims = transposedClaims.reverse();
      }

      setGameState(res);
    }, REFRESH_INTERVAL);

    // Clean up
    return () => {
      tearDownKeyboardListeners();
      clearInterval(interval);
    };
  }, []);

  return { gameState, lastPlayerDirection };
}
