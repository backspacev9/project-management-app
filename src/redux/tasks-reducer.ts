import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addFile, getFile } from '../api/file';
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../api/tasks';
import { ITask } from '../utils/task-types';

interface ITasksStore {
  tasks: ITask[];
  currentTask: ITask;
}

export interface IFile {
  filename: string;
  fileSize: number;
}

const initialState: ITasksStore = {
  tasks: [] as ITask[],
  currentTask: {} as ITask,
};

export const getAllTasks = createAsyncThunk(
  'reducer/getAllTasks',
  async (args: { token: string; boardId: string; columnId: string }, { rejectWithValue }) => {
    const { token, boardId, columnId } = args;
    try {
      const res = await getTasks(token, boardId, columnId);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const getOneTask = createAsyncThunk(
  'reducer/getOneTask',
  async (
    args: { token: string; boardId: string; columnId: string; taskId: string },
    { rejectWithValue }
  ) => {
    const { token, boardId, columnId, taskId } = args;
    try {
      const res = await getTask(token, boardId, columnId, taskId);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const createOneTask = createAsyncThunk(
  'reducer/createOneTask',
  async (
    args: {
      token: string;
      boardId: string;
      columnId: string;
      title: string;
      description: string;
      userId: string;
    },
    { rejectWithValue }
  ) => {
    const { token, boardId, columnId, title, description, userId } = args;
    try {
      const res = await createTask(token, boardId, columnId, title, description, userId);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const updateOneTask = createAsyncThunk(
  'reducer/updateOneTask',
  async (
    args: {
      token: string;
      boardId: string;
      columnId: string;
      taskId: string;
      title: string;
      order: number;
      description: string;
      userId: string;
    },
    { rejectWithValue }
  ) => {
    const { token, boardId, columnId, taskId, title, order, description, userId } = args;
    try {
      const res = await updateTask(
        token,
        boardId,
        columnId,
        taskId,
        title,
        order,
        description,
        userId
      );
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const deleteOneTask = createAsyncThunk(
  'reducer/deleteOneTask',
  async (
    args: { token: string; boardId: string; columnId: string; taskId: string },
    { rejectWithValue }
  ) => {
    const { token, boardId, columnId, taskId } = args;
    try {
      const res = await deleteTask(token, boardId, columnId, taskId);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  'reducer/uploadFile',
  async (args: { token: string; taskId: string; file: File }, { rejectWithValue }) => {
    const { token, taskId, file } = args;
    try {
      const res = await addFile(token, taskId, file);
      console.log(res);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const downloadFile = createAsyncThunk(
  'reducer/downloadFile',
  async (args: { token: string; taskId: string; fileName: string }, { rejectWithValue }) => {
    const { token, taskId, fileName } = args;
    try {
      const res = await getFile(token, taskId, fileName);
      console.log(res);
      return res;
    } catch (error) {
      if (error instanceof Error) return rejectWithValue(error.message);
    }
  }
);

export const tasksReducer = createSlice({
  name: 'tasksReducer',
  initialState,
  reducers: {
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
    changeCurrentTaskTitle(state, action) {
      state.currentTask.title = action.payload;
    },
    changeCurrentTaskDescr(state, action) {
      state.currentTask.description = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTasks.fulfilled, (state, action) => {
      if (action.payload) {
        state.tasks = action.payload;
      }
    });
    builder.addCase(getOneTask.fulfilled, (state, action) => {
      if (action.payload) {
      }
    });
    builder.addCase(createOneTask.fulfilled, (state, action) => {
      if (action.payload) {
        state.tasks.push(action.payload);
      }
    });
    builder.addCase(updateOneTask.fulfilled, (state, action) => {
      if (action.payload) {
        const taskIndex = state.tasks.findIndex((task) => task.id === action.payload?.id);
        if (taskIndex > 0) {
          state.tasks.splice(taskIndex, 1, action.payload);
        }
      }
    });
    builder.addCase(deleteOneTask.fulfilled, () => {});
    builder.addCase(uploadFile.fulfilled, () => {
      console.log('file is uploaded');
    });
    builder.addCase(downloadFile.fulfilled, () => {});
  },
});
export const { setCurrentTask, changeCurrentTaskTitle, changeCurrentTaskDescr } =
  tasksReducer.actions;
export default tasksReducer.reducer;
