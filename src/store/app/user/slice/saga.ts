import { call, put, take, fork, takeEvery } from 'redux-saga/effects';
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
      return userActions.loginSuccess.type;
    } else {
      yield put(userActions.loginFailure(response.data));
      return userActions.loginFailure.type;
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
    const action: PayloadAction<PayLoadUser> = yield take(
      userActions.loginRequest.type,
    );
    const data = yield call(handleLogin, action.payload);
    if (data === userActions.loginSuccess.type) {
      yield take(userActions.logout.type);
      yield call(handleLogout);
    }
  }
}

export default function* userSaga() {
  yield fork(watchLoginFlow);
}
