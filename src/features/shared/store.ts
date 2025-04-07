import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './client.ts';

export const store = configureStore({
  reducer: {
    [appApi.reducerPath]: appApi.reducer, // Add the appApi reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appApi.middleware), // Add the appApi middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;