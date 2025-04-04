import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const appApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getAppSettings: builder.query<undefined, undefined>({
      query: () => '/app/settings',
    }),
    postSomething: builder.mutation<boolean, boolean>({
      query: (data) => ({
        url: '/app/something',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});