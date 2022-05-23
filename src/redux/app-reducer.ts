import { createSlice } from '@reduxjs/toolkit';

interface IAppStore {
  isModalVisible: boolean;
  modalPage: any;
}

const initialState: IAppStore = {
  isModalVisible: false,
  modalPage: null,
};

export const appReducer = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    handleVisibleModal(state, action) {
      state.isModalVisible = action.payload;
    },
    setModalPage(state, action) {
      state.modalPage = action.payload;
    },
  },
});

export const { handleVisibleModal, setModalPage } = appReducer.actions;
export default appReducer.reducer;
