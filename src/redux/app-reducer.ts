import { createSlice } from '@reduxjs/toolkit';
import { modalActionEnum } from '../utils/enums';

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
    openErrorModal(state, action) {
      state.isModalVisible = true;
      state.modalAction = modalActionEnum.error;
      state.errorMessage = action.payload;
    },
  },
});

export const { handleVisibleModal, setModalAction, setErrorMessage, openErrorModal } =
  appReducer.actions;
export default appReducer.reducer;
