import { storage } from "../storage";

const ACCESS_TOKEN_KEY = "auth:accessToken";
const REFRESH_TOKEN_KEY = "auth:refreshToken";
const USER_KEY = "auth:user";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
};

export type SessionState = {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
};

let inMemoryAccessToken: string | null = null;

export const getSession = (): SessionState => {
  const accessToken = storage.getString(ACCESS_TOKEN_KEY) ?? null;
  const refreshToken = storage.getString(REFRESH_TOKEN_KEY) ?? null;
  const userJson = storage.getString(USER_KEY);
  const user = userJson ? (JSON.parse(userJson) as AuthUser) : null;

  inMemoryAccessToken = accessToken;

  return { user, accessToken, refreshToken };
};

export const setSession = (state: SessionState): void => {
  if (state.accessToken) {
    storage.set(ACCESS_TOKEN_KEY, state.accessToken);
    inMemoryAccessToken = state.accessToken;
  } else {
    storage.remove(ACCESS_TOKEN_KEY);
    inMemoryAccessToken = null;
  }

  if (state.refreshToken) {
    storage.set(REFRESH_TOKEN_KEY, state.refreshToken);
  } else {
    storage.remove(REFRESH_TOKEN_KEY);
  }

  if (state.user) {
    storage.set(USER_KEY, JSON.stringify(state.user));
  } else {
    storage.remove(USER_KEY);
  }
};

export const clearSession = (): void => {
  storage.remove(ACCESS_TOKEN_KEY);
  storage.remove(REFRESH_TOKEN_KEY);
  storage.remove(USER_KEY);
  inMemoryAccessToken = null;
};

export const getAccessTokenFromMemory = (): string | null => inMemoryAccessToken;

export const setAccessTokenInMemory = (token: string | null): void => {
  inMemoryAccessToken = token;
};
