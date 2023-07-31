// src/animeQuery.ts
import { gql } from '@apollo/client';

export const GET_ANIME_BY_ID = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
        native
      }
      coverImage {
        large
      }
      description
      averageScore
      episodes
      genres
    }
  }
`;
