export interface ApiConfig {
  bearerToken?: string;
}

export interface CreateGameResponse {
  id: number;
  password: string;
}

export interface JoinGameParams {
  gameID: string;
  password: string;
  name: string;
  color: string;
}

export interface JoinGameResponse {
  id: number;
  token: string;
  name: string;
}

export interface Position {
  x: number;
  y: number;
}

export const MazeTile = {
  EMPTY: 0,
  WALL: 1,
  OUT_OF_BOUNDS: 2,
  PLAYER: 3,
} as const;

export interface PlayerInfo {
  name: string;
  id: number;
  styles: {
    color?: string;
  };
  pos: Position;
  team: number;
}

export interface GameStatusResponse {
  name: string;
  id: number;
  pos: Position;
  team: number;
  maze: number[][];
  claims: number[][];
  objects: unknown[];
  players: PlayerInfo[];
}
