import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createColumn, getAllColumns, updateColumn } from '../api/columns';
import { IColumn } from '../utils/board-types';

interface IColumnsStore {
  columns: IColumn[];
}
const initialState: IColumnsStore = {
  columns: [] as Array<IColumn>,
};

export const getColumns = createAsyncThunk(
  'reducer/getColumns',
  async (args: { token: string; id: string }) => {
    const { token, id } = args;
    const res = await getAllColumns(token, id);
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
export const updateOneColumn = createAsyncThunk(
  'reducer/updateColumn',
  async (args: {
    token: string;
    title: string;
    idBoard: string;
    idColumn: string;
    order: number;
  }) => {
    const { token, title, idBoard, idColumn, order } = args;
    const res = await updateColumn(token, title, idBoard, idColumn, order);
    return res;
  }
);

export const columnsReducer = createSlice({
  name: 'columnsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //TODO add peinding and failed cases
    builder.addCase(getColumns.fulfilled, (state, action) => {
      if (action.payload) {
        state.columns = action.payload;
      }
    });
    builder.addCase(createOneColumn.fulfilled, (state, action) => {
      if (action.payload) {
        state.columns.push(action.payload);
        console.log('column-created');
      }
    });
    builder.addCase(updateOneColumn.fulfilled, (state, action) => {
      if (action.payload) {
        console.log('column-updated');
      }
    });
  },
});

export default columnsReducer.reducer;
