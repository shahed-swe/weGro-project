import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { weGroMusic } from './services/wegro';

export const store = configureStore({
  reducer: {
    [weGroMusic.reducerPath]: weGroMusic.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(weGroMusic.middleware),  
});
