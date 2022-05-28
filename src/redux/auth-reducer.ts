import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../api/auth';
import { IAuthInfo, IUserInfo } from '../utils/auth-types';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';

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
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error?.response?.data.message);
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
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error?.response?.data.message);
    }
  }
);

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
    setMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignUp.fulfilled, (state, action) => {
      if (action.payload) {
        state.errorMessage = 'User successfully created.';
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
        Cookies.set('token', action.payload.token, { expires: 7 });
      }
    });
  },
});

export const { setToken, setMessage, setAuth } = authReducer.actions;

export default authReducer.reducer;
