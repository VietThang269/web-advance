import { call, put, take, fork } from 'redux-saga/effects';
import { userActions } from '.';
import { PayLoadUser } from './types';
import axios from 'axios';
import { PayloadAction } from '@reduxjs/toolkit';

function* handleLogin(payload: PayLoadUser) {
  try {
    const response = yield call(() => {
      return axios.post('https://ttvnapi.com/v1/login', payload);
    });

    if (response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
      yield put(userActions.loginSuccess(response.data));
    } else {
      yield put(userActions.loginFailure(response.data));
    }
  } catch (error) {
    // yield put(userActions.loginFailure(data));
  }
}

function* handleLogout() {
  localStorage.removeItem('user');
}

function* watchLoginFlow() {
  while (true) {
    const user = Boolean(localStorage.getItem('user'));
    console.log('before ', user);

    if (!user) {
      console.log('LOGIN SAGA');
      const action: PayloadAction<PayLoadUser> = yield take(
        userActions.loginRequest.type,
      );
      yield fork(handleLogin, action.payload);
    }
    yield take(userActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* userSaga() {
  yield fork(watchLoginFlow);
}
