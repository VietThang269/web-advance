import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { userSaga } from './saga';
import { PayLoadUser, User, UserState } from './types';

export const initialState: UserState = {
  id: 0,
  username: '',
  password: '',
  token: JSON.parse(localStorage.getItem('token') || 'false') || '',
  role: 0,
  status: 0,
  createTime: 0,
  error: 0,
  message: '',
  isLoading: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<PayLoadUser>) {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.isLoading = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        data: any;
        error: number;
        message: string;
      }>,
    ) {
      state.id = action.payload.data.id;
      state.token = action.payload.data.token;
      state.role = action.payload.data.role;
      state.status = action.payload.data.status;
      state.createTime = action.payload.data.createTime;

      state.error = action.payload.error;
      state.message = action.payload.message;
      state.isLoading = false;
    },
    loginFailure(
      state,
      action: PayloadAction<{
        error: number;
        message: string;
      }>,
    ) {
      state.username = '';
      state.password = '';
      state.error = action.payload.error;
      state.message = action.payload.message;
      state.isLoading = false;
    },
    logout(state, action: PayloadAction<string>) {
      state.id = 0;
      state.username = '';
      state.password = '';
      state.token = '';
      state.role = 0;
      state.status = 0;
      state.createTime = 0;
    },
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: 'user', saga: userSaga });
  return { actions: slice.actions };
};
