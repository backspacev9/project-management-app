import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api/auth';
import { IAuthInfo, IAuthStore, IUserInfo } from '../utils/auth-types';

const initialState: IAuthStore = {
  name: '',
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

export const authReducer = createSlice({
  name: 'reducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      if (action.payload) {
        state.name = action.payload.name;
        state.login = action.payload.login;
      }
    });
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      console.log(action.payload);
    });
  },
});

export default authReducer.reducer;
