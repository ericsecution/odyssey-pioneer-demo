// src/queries/animeQuery.ts

import { gql } from '@apollo/client';

export const GET_ANIMES = gql`
  query {
    Page(page: 1, perPage: 5) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
          english
          native
        }
        description
        averageScore
        episodes
        genres
        coverImage {
          large
        }
      }
    }
  }
`;
