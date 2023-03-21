import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', process.env.SHAZAM_API_KEY);
      return headers;
    }
  }),
  // endpoints: (builder) => ({
  //   //
  //   }),
  // })
});

export const { } = shazamCoreApi;