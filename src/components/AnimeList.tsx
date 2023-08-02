// src/components/AnimeList.tsx

import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIMES } from '../queries/animeQuery';
import { useGameState } from '../contexts/GameContext';
import { GameState } from '../types/gameState';

function AnimeList() {
	const { loading, error, data } = useQuery(GET_ANIMES);
	const [gameState, setGameState] = useGameState();
	const [currentCard, setCurrentCard] = useState(0);

	const handleWatch = (animeId: number) => {
		setGameState((prevState: GameState) => ({
			...prevState,
			watchlist: [...prevState.watchlist, animeId],
		}));
	};

	const handleSkip = (animeId: number) => {
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
		</div>
	);
}

export default AnimeList;
