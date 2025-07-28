import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice'; // This assumes userSlice.js exists in ../features/

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});