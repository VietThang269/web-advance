import { createSlice } from '@reduxjs/toolkit';
import { useInjectReducer } from 'redux-injectors';
import { User } from './types';

export const initialState: User = {
  id: 0,
  username: '',
  token: '',
  role: 0,
  status: 0,
  // createTime:
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
