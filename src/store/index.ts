import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import smsAuthReducer from './slices/smsAuthSlice';
import postsReducer from './slices/postsSlice';
import galleryReducer from './slices/gallerySlice';
import usersReducer from './slices/usersSlice';
import statesReducer from './slices/statesSlice';
import lgasReducer from './slices/lgasSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    smsAuth: smsAuthReducer,
    posts: postsReducer,
    gallery: galleryReducer,
    users: usersReducer,
    states: statesReducer,
    lgas: lgasReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;