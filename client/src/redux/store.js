import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { weGroMusic } from './services/wegro';
import { authentication } from './services/auth';
import { MusicService } from './services/music';

export const store = configureStore({
  reducer: {
    [weGroMusic.reducerPath]: weGroMusic.reducer,
    [MusicService.reducerPath]: MusicService.reducer,
    player: playerReducer,
    [authentication.reducerPath]: authentication.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(weGroMusic.middleware)
  .concat(MusicService.middleware)
  .concat(authentication.middleware),  
});
