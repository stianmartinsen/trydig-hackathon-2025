import { AStarFinder } from "astar-typescript";
import type { IPoint } from "astar-typescript/dist/interfaces/astar.interfaces";

// Example:
// getDirection(
//   [
//     [0, 0, 0, 0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0, 0, 0, 1],
//     [0, 0, 1, 1, 0, 1, 1, 0],
//     [0, 0, 1, 0, 0, 0, 1, 0],
//     [0, 0, 0, 0, 0, 0, 1, 0],
//     [1, 1, 1, 0, 1, 0, 1, 0],
//     [0, 0, 0, 0, 1, 0, 1, 0],
//     [0, 0, 1, 0, 0, 0, 0, 0],
//   ],
//   { x: 7, y: 3 },
//   { x: 1, y: 1 }
// );

export const getPath = (
  matrix: number[][],
  startPosition: IPoint,
  endPosition: IPoint
) => {
  const aStarInstance = new AStarFinder({
    grid: {
      matrix,
    },
    diagonalAllowed: false,
  });

  return aStarInstance.findPath(startPosition, endPosition);
};

export const getDirection = (
  matrix: number[][],
  startPosition: IPoint,
  endPosition: IPoint
) => {
  const path = getPath(matrix, startPosition, endPosition);

  if (path.length <= 1) {
    return "west";
  }

  const nearest = path[1];
  const difference = {
    x: nearest[0] - startPosition.x,
    y: nearest[1] - startPosition.y,
  };

  console.log("path", path);
  console.log("startPosition", startPosition);
  console.log("nearest", nearest);
  console.log("difference", difference);

  if (difference.x === 1) {
    return "east";
  }

  if (difference.x === -1) {
    return "west";
  }

  if (difference.y === -1) {
    return "north";
  }

  if (difference.y === 1) {
    return "south";
  }

  return "west";
};
