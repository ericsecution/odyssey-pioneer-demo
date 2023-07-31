// src/components/AnimeList.tsx
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ANIME_BY_ID } from '../animeQuery';

function AnimeList() {
    const { loading, error, data } = useQuery(GET_ANIME_BY_ID, {
        variables: { id: 15125 } // ID for the anime "Teekyuu"
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const anime = data.Media;

    return (
        <div>
            <h2>Anime Details:</h2>
            <img src={anime.coverImage.large} alt={anime.title.english || anime.title.romaji} />
            <h3>{anime.title.english || anime.title.romaji}</h3>
            <p>{anime.description}</p>
            <p>Average Score: {anime.averageScore}</p>
            <p>Episodes: {anime.episodes}</p>
            <p>Genres: {anime.genres.join(', ')}</p>
        </div>
    );
}

export default AnimeList;
