import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../api/users';
import { IUsers } from '../utils/auth-types';

interface IUsersStore {
  users: IUsers[];
}

const initialState: IUsersStore = {
  users: [] as IUsers[],
};

export const getAllUsers = createAsyncThunk('reducer/getAllUsers', async (token: string) => {
  const res = await getUsers(token);
  return res;
});

export const usersReducer = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      if (action.payload) {
        state.users = action.payload;
      }
    });
  },
});

export default usersReducer.reducer;
