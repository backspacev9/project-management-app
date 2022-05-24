import { createSlice } from '@reduxjs/toolkit';

interface IAppStore {
  isModalVisible: boolean;
  modalAction: string;
}

const initialState: IAppStore = {
  isModalVisible: false,
  modalAction: '',
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
  },
});

export const { handleVisibleModal, setModalAction } = appReducer.actions;
export default appReducer.reducer;
