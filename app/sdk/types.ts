export interface ApiConfig {
  baseURL: string;
  bearerToken?: string;
}

export interface CreateGameResponse {
  id: number;
  password: string;
}