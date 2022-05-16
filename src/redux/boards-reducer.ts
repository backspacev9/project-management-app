import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createBoard, createColumn, createTask, getAllBoards, getBoardById } from '../api/boards';
import { BoardInteface, ColumnInteface } from '../pages/board-page/components/Board/interface';
import { IBoard } from '../utils/board-types';
import { store } from './store';

interface IBoardsStore {
  boards: IBoard[];
  currentBoard: BoardInteface;
}

const initialState: IBoardsStore = {
  boards: [] as IBoard[],
  currentBoard: {} as BoardInteface,
};

export const getBoards = createAsyncThunk('reducer/getAllBoards', async (token: string) => {
  const res = await getAllBoards(token);
  return res;
});
export const getBoardByID = createAsyncThunk(
  'reducer/getBoardByID',
  async (args: { token: string; id: string }) => {
    const { token, id } = args;
    const res = await getBoardById(token, id);
    return res;
  }
);

//----------------POST Query-----------------
export const createOneBoard = createAsyncThunk(
  'reducer/createOneBoard',
  async (args: { token: string; title: string }) => {
    const { token, title } = args;
    const res = await createBoard(token, title);
    return res;
  }
);
export const createOneColumn = createAsyncThunk(
  'reducer/createOneColumn',
  async (args: { token: string; title: string; idBoard: string; order: number }) => {
    const { token, title, idBoard, order } = args;
    const res = await createColumn(token, title, idBoard, order);
    return res;
  }
);
export const createOneTask = createAsyncThunk(
  'reducer/createOneTask',
  async (args: {
    token: string;
    title: string;
    description: string;
    idBoard: string;
    idColumn: string;
    order: number;
    userId: string;
  }) => {
    const { token, title, description, idBoard, idColumn, order, userId } = args;
    const res = await createTask(token, title, description, idBoard, idColumn, order, userId);
    return res;
  }
);

export const boardsReducer = createSlice({
  name: 'boardsReducer',
  initialState,
  reducers: {
    sortTask(state, action: PayloadAction<ColumnInteface>) {
      const tasks =
        state.currentBoard.columns[state.currentBoard.columns.indexOf(action.payload)].tasks;
      state.currentBoard.columns[state.currentBoard.columns.indexOf(action.payload)].tasks =
        tasks.sort((a, b) => a.order - b.order);
    },
  },
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
    builder.addCase(getBoards.fulfilled, (state, action) => {
      if (action.payload) {
        state.boards = action.payload;
      }
    });
    builder.addCase(getBoardByID.fulfilled, (state, action) => {
      if (action.payload) {
        const sortedColumsByOrder = action.payload.columns.sort((a, b) => a.order - b.order);
        state.currentBoard = action.payload;
        state.currentBoard.columns = sortedColumsByOrder;
      }
    });
    //------POST-------//
    builder.addCase(createOneBoard.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('board-created');
      }
    });
    builder.addCase(createOneColumn.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('column-created');
      }
    });
    builder.addCase(createOneTask.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('task-created');
      }
    });
  },
});
export const { sortTask } = boardsReducer.actions;
export default boardsReducer.reducer;
