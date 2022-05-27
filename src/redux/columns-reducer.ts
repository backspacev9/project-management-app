import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createColumn,
  deleteColumn,
  getAllColumns,
  getColumnById,
  updateColumn,
} from '../api/columns';
import { IColumn } from '../utils/columns-type';

interface IColumnsStore {
  columns: IColumn[];
  currentColumnId: string;
}
const initialState: IColumnsStore = {
  columns: [] as Array<IColumn>,
  currentColumnId: '',
};

export const getColumns = createAsyncThunk(
  'reducer/getColumns',
  async (args: { token: string; id: string }, { rejectWithValue }) => {
    const { token, id } = args;
    try {
      const res = await getAllColumns(token, id);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);
export const getOneColumn = createAsyncThunk(
  'reducer/getColumnById',
  async (args: { token: string; idBoard: string; idColumn: string }, { rejectWithValue }) => {
    const { token, idBoard, idColumn } = args;
    try {
      const res = await getColumnById(token, idBoard, idColumn);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);
export const createOneColumn = createAsyncThunk(
  'reducer/createOneColumn',
  async (args: { token: string; title: string; idBoard: string }, { rejectWithValue }) => {
    const { token, title, idBoard } = args;
    try {
      const res = await createColumn(token, title, idBoard);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);
export const updateOneColumn = createAsyncThunk(
  'reducer/updateColumn',
  async (
    args: {
      token: string;
      title: string;
      idBoard: string;
      idColumn: string;
      order: number;
    },
    { rejectWithValue }
  ) => {
    const { token, title, idBoard, idColumn, order } = args;
    try {
      const res = await updateColumn(token, title, idBoard, idColumn, order);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);
export const deleteOneColumn = createAsyncThunk(
  'reducer/deleteOneColumn',
  async (args: { token: string; idBoard: string; idColumn: string }, { rejectWithValue }) => {
    const { token, idBoard, idColumn } = args;
    try {
      const res = await deleteColumn(token, idBoard, idColumn);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const columnsReducer = createSlice({
  name: 'columnsReducer',
  initialState,
  reducers: {
    setCurrentColumnId(state, action) {
      state.currentColumnId = action.payload;
    },
  },
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
    builder.addCase(getColumns.fulfilled, (state, action) => {
      if (action.payload) {
        state.columns = action.payload.sort((a, b) => (a.order > b.order ? 1 : -1));
      }
    });
    builder.addCase(createOneColumn.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('column-created');
      }
    });
    builder.addCase(updateOneColumn.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('column-updated--', action.payload);
      }
    });
    builder.addCase(deleteOneColumn.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('column-deleted--', action.payload);
      }
    });
  },
});

export const { setCurrentColumnId } = columnsReducer.actions;

export default columnsReducer.reducer;
