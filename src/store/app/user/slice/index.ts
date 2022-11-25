import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import userSaga from './saga';
import { PayLoadUser, User, UserState } from './types';

// export const initialState: UserState = {
//   user: JSON.parse(localStorage.getItem('user') || 'false') || undefined,
//   error: 0,
//   message: '',
//   isLoading: false,
// };

export const initialState: UserState = {
  user: JSON.parse(localStorage.getItem('user') || 'false') || {
    id: 0,
    username: '',
    token: '',
    role: 0,
    status: 0,
    createTime: 0,
  },
  error: 0,
  message: '',
  isLoading: false,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<PayLoadUser>) {
      state.isLoading = true;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        data: User;
        error: number;
        message: string;
      }>,
    ) {
      state.user = action.payload.data;
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
      state.user = {
        id: 0,
        username: '',
        token: '',
        role: 0,
        status: 0,
        createTime: 0,
      };
      state.error = action.payload.error;
      state.message = action.payload.message;
      state.isLoading = false;
    },
    logout(state, action: PayloadAction<string>) {
      state.user = {
        id: 0,
        username: '',
        token: '',
        role: 0,
        status: 0,
        createTime: 0,
      };
    },
  },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: 'user', saga: userSaga });
  return { actions: slice.actions };
};
