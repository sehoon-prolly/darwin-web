import type { GameState } from "../types/game";

const STORAGE_KEY = "beagle-voyage-mvp-state";

export function saveGameState(state: GameState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadGameState(): GameState | null {
  const rawState = window.localStorage.getItem(STORAGE_KEY);

  if (!rawState) {
    return null;
  }

  try {
    return JSON.parse(rawState) as GameState;
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearGameState() {
  window.localStorage.removeItem(STORAGE_KEY);
}
