import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { signIn, signUp } from '../api/auth';
import { getUsers } from '../api/users';
import { IAuthInfo, IUserInfo } from '../utils/auth-types';
import { HttpErrors } from '../utils/enums';

interface IAuthStore {
  login: string;
  token: string;
  isAuth: boolean;
  errorMessage: string;
}

const initialState: IAuthStore = {
  login: '',
  token: '',
  isAuth: false,
  errorMessage: '',
};

export const fetchSignUp = createAsyncThunk('reducer/fetchSignUp', async (args: IUserInfo) => {
  const { name, login, password } = args;
  const res = await signUp(name, login, password);
  return res;
});

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
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
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
        state.errorMessage = '';
        state.isAuth = true;
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

export const { setLogin } = authReducer.actions;

export default authReducer.reducer;
