import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUser, getUserById, getUsers, updateUser } from '../api/users';
import { IUsers } from '../utils/auth-types';

interface IUsersStore {
  users: IUsers[];
  currentUser: IUsers;
}

const initialState: IUsersStore = {
  users: [] as IUsers[],
  currentUser: {} as IUsers,
};

export const getAllUsers = createAsyncThunk(
  'reducer/getAllUsers',
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await getUsers(token);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      return rejectWithValue(code);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'reducer/getCurrentUser',
  async (args: { token: string; id: string }, { rejectWithValue }) => {
    const { token, id } = args;
    try {
      const res = await getUserById(token, id);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      return rejectWithValue(code);
    }
  }
);

export const deleteCurrentUser = createAsyncThunk(
  'reducer/deleteCurrentUser',
  async (args: { token: string; id: string }, { rejectWithValue }) => {
    const { token, id } = args;
    try {
      const res = await deleteUser(token, id);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      return rejectWithValue(code);
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  'reducer/updateCurrentUser',
  async (
    args: { token: string; id: string; name: string; login: string; password: string },
    { rejectWithValue }
  ) => {
    const { token, id, name, login, password } = args;
    try {
      const res = await updateUser(token, id, name, login, password);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      return rejectWithValue(code);
    }
  }
);

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
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      if (action.payload) {
        state.currentUser = action.payload;
      }
    });
  },
});

export const {} = usersReducer.actions;
export default usersReducer.reducer;
