import {
  take,
  takeEvery,
  takeLatest,
  put,
  all,
  delay,
  fork,
  call,
} from 'redux-saga/effects'
import * as types from './actionType'

import {
  loadUsersSuccess,
  loadUsersError,
  createUserSuccess,
  createUserError,
  deleteUserSuccess,
  deleteUserError,
  updateUserSuccess,
  updateUserError,
} from './actions'

import {
  loadUsersApi,
  createUserApi,
  deleteUserApi,
  updateUserApi,
} from './api'

// GET USERS
export function* onLoadUsersStartAsync() {
  try {
    const response = yield call(loadUsersApi)
    if (response.status === 200) {
      yield delay(500)
      yield put(loadUsersSuccess(response.data))
    }
  } catch (error) {
    yield put(loadUsersError(error.response.data))
  }
}

// CREATE USER
export function* onCreateUserStartAsync({ payload }) {
  try {
    const response = yield call(createUserApi, payload)
    if (response.status === 200) {
      yield delay(500)
      yield put(createUserSuccess(response.data))
    }
  } catch (error) {
    yield put(createUserError(error.response.data))
  }
}

// DELETE USER
function* onDeleteUserStartAsync(userId) {
  try {
    const response = yield call(deleteUserApi, userId)
    if (response.status === 200) {
      yield delay(500)
      yield put(deleteUserSuccess(userId))
    }
  } catch (error) {
    yield put(deleteUserError(error.response.data))
  }
}

// UPDATE_USER
function* onUpdateUserStartAsync({ payload: { id, formValue } }) {
  try {
    const response = yield call(updateUserApi, id, formValue)
    if (response.status === 200) {
      put(updateUserSuccess())
    }
  } catch (error) {
    yield put(updateUserError(error.response.data))
  }
}

// START GET USERS
function* onLoadUsers() {
  yield takeEvery(types.LOAD_USERS_START, onLoadUsersStartAsync)
}

// START CREATE USER
function* onCreateUser() {
  yield takeLatest(types.CREATE_USER_START, onCreateUserStartAsync)
}

// START DELETE USER
function* onDeleteUser() {
  while (true) {
    const { payload: userId } = yield take(types.DELETE_USER_START)
    yield call(onDeleteUserStartAsync, userId)
  }
}

// START UPDATE USER
function* onUpdateUser() {
  yield takeLatest(types.UPDATE_USER_START, onUpdateUserStartAsync)
}

const userSagas = [
  fork(onLoadUsers),
  fork(onCreateUser),
  fork(onDeleteUser),
  fork(onUpdateUser),
]

export default function* rootSaga() {
  yield all([...userSagas])
}
