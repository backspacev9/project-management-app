import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { createBoard, deleteBoard, getAllBoards, getBoardById, updateBoard } from '../api/boards';
import { IBoard, IBoardWithColumns } from '../utils/board-types';

interface IBoardsStore {
  boards: IBoard[];
  currentBoard: IBoardWithColumns;
}

const initialState: IBoardsStore = {
  boards: [] as IBoard[],
  currentBoard: {} as IBoardWithColumns,
};

export const getBoards = createAsyncThunk(
  'reducer/getAllBoards',
  async (token: string, { rejectWithValue }) => {
    try {
      const res = await getAllBoards(token);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error?.response?.data);
    }
  }
);

export const getBoardByID = createAsyncThunk(
  'reducer/getBoardByID',
  async (args: { token: string; id: string }, { rejectWithValue }) => {
    const { token, id } = args;
    try {
      const res = await getBoardById(token, id);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error?.response?.data);
    }
  }
);

//----------------POST Query-----------------
export const createOneBoard = createAsyncThunk(
  'reducer/createOneBoard',
  async (args: { token: string; title: string; description: string }, { rejectWithValue }) => {
    const { token, title, description } = args;
    try {
      const res = await createBoard(token, title, description);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error?.response?.data);
    }
  }
);

export const updateOneBoard = createAsyncThunk(
  'reducer/updateOneBoard',
  async (
    args: { token: string; idBoard: string; title: string; description: string },
    { rejectWithValue }
  ) => {
    const { token, idBoard, title, description } = args;
    try {
      const res = await updateBoard(token, idBoard, title, description);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error?.response?.data);
    }
  }
);
export const deleteOneBoard = createAsyncThunk(
  'reducer/deleteOneBoard',
  async (args: { token: string; idBoard: string }, { rejectWithValue }) => {
    const { token, idBoard } = args;
    try {
      const res = await deleteBoard(token, idBoard);
      return res;
    } catch (error) {
      if (error instanceof AxiosError) return rejectWithValue(error?.response?.data);
    }
  }
);

export const boardsReducer = createSlice({
  name: 'boardsReducer',
  initialState,
  reducers: {
    setCurrentBoard(state, action) {
      state.currentBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBoards.fulfilled, (state, action) => {
      if (action.payload) {
        state.boards = action.payload;
      }
    });
    builder.addCase(getBoardByID.fulfilled, (state, action) => {
      if (action.payload) {
        state.currentBoard = action.payload;
        state.currentBoard.columns = state.currentBoard.columns.sort((a, b) =>
          a.order > b.order ? 1 : -1
        );
      }
    });
    builder.addCase(createOneBoard.fulfilled, () => {});
    builder.addCase(deleteOneBoard.fulfilled, () => {});
    builder.addCase(updateOneBoard.fulfilled, () => {});
  },
});

export const { setCurrentBoard } = boardsReducer.actions;

export default boardsReducer.reducer;
