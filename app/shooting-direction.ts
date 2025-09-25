type Point = { x: number; y: number };
type Direction = "north" | "east" | "south" | "west";

/**
 * Returns the direction to shoot:
 * - If any opponent is visible in a straight line (no walls/players blocking),
 *   returns the direction to the NEAREST visible opponent.
 * - Otherwise, returns the direction pointing toward the average (centroid)
 *   of all opponents.
 * - Returns null if `otherPlayers` is empty.
 *
 * Matrix convention: 0 = open, 1 = wall.
 */
export function getShootingDirection(
  player: Point,
  otherPlayers: Point[],
  matrix: number[][]
): Direction {
  if (otherPlayers.length === 0) {
    return "west";
  }

  // 1) Check visible targets (row/column, no blockers)
  const playerSet = new Set(otherPlayers.map((p) => `${p.x},${p.y}`));
  let best: { dir: Direction; dist: number } | null = null;

  for (const opp of otherPlayers) {
    const los = lineOfSight(player, opp, matrix, playerSet);
    if (!los.visible) {
      continue;
    }

    const dir = directionTo(player, opp);
    const dist = Math.abs(opp.x - player.x) + Math.abs(opp.y - player.y);
    if (!best || dist < best.dist) best = { dir, dist };
  }

  if (best) {
    return best.dir;
  }

  // 2) No one visible: aim toward the average position of opponents
  const avg = averagePoint(otherPlayers);
  const vx = avg.x - player.x;
  const vy = avg.y - player.y;

  if (Math.abs(vx) >= Math.abs(vy)) {
    return vx >= 0 ? "east" : "west";
  } else {
    return vy >= 0 ? "south" : "north";
  }
}

/* -------------------- Internals -------------------- */

function inBounds(m: number[][], p: Point): boolean {
  return p.y >= 0 && p.y < m.length && p.x >= 0 && p.x < m[0].length;
}

/**
 * True line of sight if aligned (same x or y) and there are no walls (1)
 * and no other players strictly between `from` and `to`.
 */
function lineOfSight(
  from: Point,
  to: Point,
  matrix: number[][],
  playerSet: Set<string>
): { visible: boolean } {
  // Must be aligned
  if (!(from.x === to.x || from.y === to.y)) {
    return { visible: false };
  }

  const stepX = Math.sign(to.x - from.x);
  const stepY = Math.sign(to.y - from.y);

  let x = from.x + stepX;
  let y = from.y + stepY;

  while (!(x === to.x && y === to.y)) {
    if (!inBounds(matrix, { x, y })) {
      return { visible: false };
    }
    if (matrix[y][x] === 1) {
      return { visible: false }; // wall blocks
    }
    if (playerSet.has(`${x},${y}`)) {
      return { visible: false }; // another player blocks
    }
    x += stepX;
    y += stepY;
  }
  return { visible: true };
}

function directionTo(from: Point, to: Point): Direction {
  if (to.x === from.x) {
    return to.y < from.y ? "north" : "south";
  }
  // else same row
  return to.x > from.x ? "east" : "west";
}

function averagePoint(points: Point[]): { x: number; y: number } {
  const n = points.length;
  let sx = 0,
    sy = 0;
  for (const p of points) {
    sx += p.x;
    sy += p.y;
  }
  return { x: sx / n, y: sy / n };
}
