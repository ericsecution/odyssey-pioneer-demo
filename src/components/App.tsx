// src/components/App.tsx

import React from 'react';
import './App.css';
import AnimeList from './AnimeList';
import { GameProvider } from '../contexts/GameContext';

function App() {
  return (
    <GameProvider>
    <div className="App">
      <header className="App-header">
        Odyssey Pioneers - AniList Explorer
      </header>
      <main>
        <AnimeList />
      </main>
    </div>
    </GameProvider>
  );
}

export default App;
