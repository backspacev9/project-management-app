import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-reducer';
import boardsReducer from './boards-reducer';
import usersReducer from './users-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    boards: boardsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
