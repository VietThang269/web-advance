import { selectorUser } from './selector';
import { UserState } from 'store/app/user/slice/types';
import {
  call,
  put,
  take,
  fork,
  takeEvery,
  select,
  takeLatest,
} from 'redux-saga/effects';
import { userActions } from '.';
import { PayLoadUser } from './types';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

function* login() {
  try {
    const user: UserState = yield select(selectorUser);
    const data: PayLoadUser = {
      username: user.username,
      password: user.password,
    };

    const response: any = yield call(() => {
      return axios.post('https://ttvnapi.com/v1/login', data);
    });

    console.log('response', response.data);

    if (response.data.data) {
      localStorage.setItem('token', JSON.stringify(response.data.data.token));
      yield put(userActions.loginSuccess(response.data));
    } else {
      yield put(userActions.loginFailure(response.data));
    }
  } catch (error) {
    console.log('Error', error);
  }
}

function* logout() {
  localStorage.removeItem('token');
}

export function* userSaga() {
  yield takeLatest(userActions.loginRequest.type, login);
  yield takeLatest(userActions.logout.type, logout);
}
