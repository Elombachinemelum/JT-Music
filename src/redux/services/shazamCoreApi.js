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
    getTopCharts: build.query({ query: (name) => `/charts/world` }),
  }),
});

// this is returned from the instance of createApi...(we destructure)
export const { useGetTopChartsQuery } = shazamCoreApi;
