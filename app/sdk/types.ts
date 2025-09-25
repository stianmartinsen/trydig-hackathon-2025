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
  X: number;
  Y: number;
}

export const MazeTile = {
  EMPTY: 0,
  WALL: 1,
  OUT_OF_BOUNDS: 2,
  PLAYER: 3,
} as const;

export enum ObjectType {
  BOMB = 1,
}

export interface PlayerInfo {
  name: string;
  id: number;
  styles: {
    head: string;
    body: string;
    feet: string;
    foot: string;
    arm: string;
    color?: string;
  };
  pos: Position;
  team: number;
}

export interface GameObject {
  id: number;
  type: number;
  direction: string;
  pos: Position;
  owner: PlayerInfo;
}

export interface GameStatusResponse {
  name: string;
  id: number;
  pos: Position;
  team: number;
  maze: number[][];
  claims: number[][];
  objects: GameObject[];
  players: PlayerInfo[];
}
