import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { stat } from 'fs';
import { createBoard, getAllBoards, getBoardById } from '../api/boards';
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
      if (error instanceof Error) return rejectWithValue(error.message);
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
      if (error instanceof Error) return rejectWithValue(error.message);
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
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const boardsReducer = createSlice({
  name: 'boardsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
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
    //------POST-------//
    builder.addCase(createOneBoard.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('board-created');
      }
    });
  },
});

export default boardsReducer.reducer;
