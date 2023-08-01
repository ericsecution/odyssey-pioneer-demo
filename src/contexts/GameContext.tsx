// src/contexts/GameContext.tsx

import React, { createContext, useState, useContext } from 'react';
import { GameState } from '../types/gameState';
import { initialGameState } from '../initialGameState';

interface GameProviderProps {
    children : React.ReactNode;
}

const GameContext = createContext<[GameState, React.Dispatch<React.SetStateAction<GameState>>] | undefined>(undefined);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [state, setState] = useState<GameState>(initialGameState);

    return (
        <GameContext.Provider value={[state, setState]}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameState = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGameState must be used within a GameProvider');
    }
    return context;
};
