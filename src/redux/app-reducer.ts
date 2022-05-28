import { createSlice } from '@reduxjs/toolkit';

interface IAppStore {
  isModalVisible: boolean;
  modalAction: string;
  errorMessage: string;
}

const initialState: IAppStore = {
  isModalVisible: false,
  modalAction: '',
  errorMessage: '',
};

export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    handleVisibleModal(state, action) {
      state.isModalVisible = action.payload;
    },
    setModalAction(state, action) {
      state.modalAction = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});

export const { handleVisibleModal, setModalAction, setErrorMessage } = appReducer.actions;
export default appReducer.reducer;
