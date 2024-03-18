import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { authentication } from './services/auth';
import { MusicService } from './services/music';

export const store = configureStore({
  reducer: {
    [MusicService.reducerPath]: MusicService.reducer,
    player: playerReducer,
    [authentication.reducerPath]: authentication.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(MusicService.middleware)
  .concat(authentication.middleware),  
});
