import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://shazam-core.p.rapidapi.com/v1";

export const shazamCoreApi = createApi({
  reducerPath: "shazamCoreApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key",
        "12beaa3bb5mshe27ba2336fa51cap18e54ejsn65209445a9fc"
      );
      headers.set("X-RapidAPI-Host", "shazam-core.p.rapidapi.com");

      return headers;
    },
  }),
  endpoints: (build) => ({
    getTopCharts: build.query({ query: () => `/charts/world` }),
    getSongsByGenre: build.query({
      query: (genre) => `/charts/genre-world?genre_code=${genre}`,
    }),
    getSongDetails: build.query({
      query: ({ songid }) => `/tracks/details?track_id=${songid}`,
    }),
    getRelatedSongs: build.query({
      query: ({ songid }) => `/tracks/related?track_id=${songid}`,
    }),
    getArtistDetails: build.query({
      query: ({ name, artistId }) => `/artists/details?artist_id=${artistId}`,
    }),
    getSongsByLocation: build.query({
      query: (country_code) => `/charts/country?country_code=${country_code}`,
    }),
    getSongsBySearch: build.query({
      query: (searchTerm) =>
        `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`,
    }),
  }),
});

// this is returned from the instance of createApi...(we destructure)
export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongDetailsQuery,
  useGetRelatedSongsQuery,
  useGetArtistDetailsQuery,
  useGetSongsByLocationQuery,
  useGetSongsBySearchQuery,
} = shazamCoreApi;
