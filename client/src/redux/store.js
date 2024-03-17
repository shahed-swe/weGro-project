import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { weGroMusic } from './services/wegro';
import { authentication } from './services/auth';

export const store = configureStore({
  reducer: {
    [weGroMusic.reducerPath]: weGroMusic.reducer,
    player: playerReducer,
    [authentication.reducerPath]: authentication.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(weGroMusic.middleware)
  .concat(authentication.middleware),  
});
