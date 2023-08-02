// src/initialGameState.ts

import { GameState } from './types/gameState';

export const initialGameState: GameState = {
    resources: {
        fuel: 100,
        food: 100,
        materials: 50,
    },
    shipStatus: {
        health: 100,
        damage: 0,
        functionality: true,
    },
    currentLocation: 'Starting Point',
    decisions: [],
    encounters: [],
    watchlist: [],
};
