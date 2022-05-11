import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api/auth';
import { getUsers } from '../api/users';
import { IAuthInfo, IUserInfo } from '../utils/auth-types';

interface IAuthStore {
  login: string;
  token: string;
}

const initialState: IAuthStore = {
  login: '',
  token: '',
};

export const fetchSignUp = createAsyncThunk('reducer/fetchSignUp', async (args: IUserInfo) => {
  const { name, login, password } = args;
  const res = await signUp(name, login, password);
  return res;
});

export const fetchSignIn = createAsyncThunk('reducer/fetchSignIn', async (args: IAuthInfo) => {
  const { login, password } = args;
  const res = await signIn(login, password);
  return res;
});

export const getAllUsers = createAsyncThunk('reducer/getAllUsers', async (token: string) => {
  const res = await getUsers(token);
  return res;
});

export const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
  },
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
    builder.addCase(fetchSignUp.fulfilled, () => {
      console.log('user created'); //TODO delete log
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
      }
    });
  },
});

export const { setLogin } = authReducer.actions;

export default authReducer.reducer;
