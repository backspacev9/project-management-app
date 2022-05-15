import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api/auth';
import { getUsers } from '../api/users';
import { IAuthInfo, IUserInfo } from '../utils/auth-types';
import { HttpErrors } from '../utils/enums';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

interface IAuthStore {
  login: string;
  userId: string;
  token: string;
  isAuth: boolean;
  errorMessage: string;
}

interface JwtPayload {
  iat: number;
  login: string;
  userId: string;
}

const initialState: IAuthStore = {
  login: '',
  userId: '',
  token: '',
  isAuth: false,
  errorMessage: '',
};

export const fetchSignUp = createAsyncThunk(
  'reducer/fetchSignUp',
  async (args: IUserInfo, { rejectWithValue }) => {
    const { name, login, password } = args;
    try {
      const res = await signUp(name, login, password);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      return rejectWithValue(code);
    }
  }
);

export const fetchSignIn = createAsyncThunk(
  'reducer/fetchSignIn',
  async (args: IAuthInfo, { rejectWithValue }) => {
    const { login, password } = args;
    try {
      const res = await signIn(login, password);
      return res;
    } catch (error: any) {
      const code: number = error.response.status;
      return rejectWithValue(code);
    }
  }
);

export const getAllUsers = createAsyncThunk('reducer/getAllUsers', async (token: string) => {
  const res = await getUsers(token);
  return res;
});

export const authReducer = createSlice({
  name: 'authReducer',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      const decoded = jwtDecode<JwtPayload>(action.payload);
      state.userId = decoded.userId;
      state.login = decoded.login;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.rejected, (state, action) => {
      //TODO figure out why doesn't return error code
      switch (action.payload) {
        case HttpErrors.Conflict:
          state.errorMessage = 'Sorry, this user already exists.';
          break;
      }
    });
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
      if (action.payload) {
        state.token = action.payload.token;
        const decoded = jwtDecode<JwtPayload>(action.payload.token);
        state.userId = decoded.userId;
        state.login = decoded.login;
        state.errorMessage = '';
        state.isAuth = true;
        Cookies.set('token', action.payload.token, { expires: 1 });
      }
    });
    builder.addCase(fetchSignIn.rejected, (state, action) => {
      switch (action.payload) {
        case HttpErrors.Forbidden:
          state.errorMessage = "Login or password isn't correct";
          break;
      }
    });
  },
});

export const { setToken } = authReducer.actions;

export default authReducer.reducer;
