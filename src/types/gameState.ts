// src/types/gameState.ts

interface Title {
    romaji: string;
    english: string | null;
    native: string;
}

interface Encounter {
    id: number;
    title: Title;
    type: 'friendly' | 'hostile' | 'neutral';
    outcome: 'alliance' | 'conflict' | 'passed' | null;
}

interface GameState {
    resources: {
        fuel: number;
        food: number;
        materials: number;
    };
    shipStatus: {
        health: number;
        damage: number;
        functionality: boolean;
    };
    currentLocation: string;
    decisions: string[];
    encounters: Encounter[];
}

export type { GameState, Encounter, Title };
