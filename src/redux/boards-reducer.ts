import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoard, getAllBoards } from '../api/boards';
import { IBoard } from '../utils/board-types';

interface IBoardsStore {
  boards: IBoard[];
}

const initialState: IBoardsStore = {
  boards: [] as IBoard[],
};

export const getBoards = createAsyncThunk('reducer/getAllBoards', async (token: string) => {
  const res = await getAllBoards(token);
  return res;
});

export const createOneBoard = createAsyncThunk(
  'reducer/createOneBoard',
  async (args: { token: string; title: string }) => {
    const { token, title } = args;
    const res = await createBoard(token, title);
    return res;
  }
);

export const boardsReducer = createSlice({
  name: 'usersReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
    builder.addCase(getBoards.fulfilled, (state, action) => {
      if (action.payload) {
        state.boards = action.payload;
      }
    });
    builder.addCase(createOneBoard.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('board-created');
      }
    });
  },
});

export default boardsReducer.reducer;
