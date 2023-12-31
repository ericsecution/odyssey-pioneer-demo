// src/components/AnimeList.tsx

import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '../queries/animeQuery';
import { useGameState } from '../contexts/GameContext';
import { GameState } from '../types/gameState';

function AnimeList() {
	const { loading, error, data } = useQuery(GET_ANIMES);
	const [gameState, setGameState] = useGameState();
	const [currentCard, setCurrentCard] = useState(0);
	const [message, setMessage] = useState<string | null>(null);
	const [remainingTime, setRemainingTime] = useState(300);
	const [dayComplete, setDayComplete] = useState(false);

	const initialFuel = gameState.resources.fuel;
	const initialFood = gameState.resources.food;
	const initialMaterials = gameState.resources.materials;
	const initialMorale = gameState.morale;

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - 1);
    
            if (remainingTime <= 0) {
                setDayComplete(true);
                clearInterval(interval);  // End the interval when the timer reaches 0.
            } else if (remainingTime % 60 === 0) {
                setGameState((prevState) => ({
                    ...prevState,
                    resources: {
                        ...prevState.resources,
                        food: prevState.resources.food - 5,
                        materials: prevState.resources.materials - 2,
                    },
                }));
            } else if (remainingTime % 91 === 0) {
                const randomEvent = Math.random();
                if (randomEvent >= 0.5) {
                    // Bonus Resources found!
                    setGameState((prevState) => ({
                        ...prevState,
                        resources: {
                            ...prevState.resources,
                            food: prevState.resources.food + 10,
                            materials: prevState.resources.materials + 5,
                        },
                    }));
                    setMessage(`Bonus: +10 food, +5 materials!`);
                } else {
                    // unexpected challenge
                    setGameState((prevState) => ({
                        ...prevState,
                        shipStatus: {
                            ...prevState.shipStatus,
                            damage: prevState.shipStatus.damage + 10,
                        },
                    }));
                    setMessage('Unexpected: Ship took damage!');
                }
            }
        }, 1000);
    
        return () => clearInterval(interval);  // Clean up on component unmount
    }, [remainingTime, setGameState]);
    

    const handleWatch = (animeId: number) => {
        setGameState((prevState) => ({
            ...prevState,
            watchlist: [...prevState.watchlist, animeId],
            resources: {
                ...prevState.resources,
                fuel: Math.max(prevState.resources.fuel - 10, 0),  // Ensure fuel doesn't go below 0
            },
            morale: prevState.morale + 5,
        }));
    };
    

	const handleSkip = (animeId: number) => {
		setMessage('Opportunity missed!');
		console.log(`Skipped anime with ID: ${animeId}`);
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	console.log('Current card:', currentCard);

	return (
		<div className='anime-list'>
			{data.Page.media.map((anime: any, index: number) => {
				if (index !== currentCard) return null;

				return (
					<div className='anime-card' key={anime.id}>
						{/* Front of the card */}
						<div className='card-front'>
							<img src={anime.coverImage.large} alt={anime.title.romaji} />
							<h3>{anime.title.romaji}</h3>
							<p>
								{anime.description
									// .replace(/<br><br>/g, ' ')
									// .replace(/<br> <br>/g, ' ')
									.replace(/<br>/g, ' ')
									.replace(/<i>/g, '')
									.replace(/<\/i>/g, '')}
							</p>

							<button onClick={() => handleWatch(anime.id)}>Watch</button>
							<button onClick={() => handleSkip(anime.id)}>Skip</button>
						</div>
						{/* Back of the card */}
						<div className='card-back'>
							<h4>Additional Info</h4>
							<p>Average Score: {anime.averageScore}</p>
							<p>Episodes: {anime.episodes}</p>
							<p>Genres: {anime.genres.join(', ')}</p>
						</div>
					</div>
				);
			})}
			<div className='button-container'>
				<button
					className='nav-button'
					onClick={() =>
						setCurrentCard(
							(prev) =>
								(prev - 1 + data.Page.media.length) %
								data.Page.media.length
						)
					}
				>
					← Prev
				</button>
				<button
					className='nav-button'
					onClick={() =>
						setCurrentCard((prev) => (prev + 1) % data.Page.media.length)
					}
				>
					Next →
				</button>
			</div>
			<div className='game-state-display'>
				<p>Fuel: {gameState.resources.fuel}</p>
				<p>Food: {gameState.resources.food}</p>
				<p>Materials: {gameState.resources.materials}</p>
				<p>Morale: {gameState.morale}</p>
				{message && <p>{message}</p>}
			</div>
            <p>Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}</p>


            {/* Conditional rendering (i.e. only shows if the Day is Complete) */}
			{dayComplete && (
				<div className='day-summary'>
					<h2>Day complete!</h2>
					<p>Here's what happened today:</p>
					<p>Fuel consumed: {initialFuel - gameState.resources.fuel}</p>
					<p>Food consumed: {initialFood - gameState.resources.food}</p>
					<p>
						Materials consumed:{' '}
						{initialMaterials - gameState.resources.materials}
					</p>
					<p>Morale change: {gameState.morale - initialMorale}</p>
				</div>
			)}
		</div>
	);
}

export default AnimeList;
