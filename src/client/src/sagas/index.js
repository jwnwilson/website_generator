import { takeEvery, all, put } from 'redux-saga/effects';

function* actionWatcher() {
}

export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
