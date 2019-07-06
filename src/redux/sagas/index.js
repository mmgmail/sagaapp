import { call, put, take, fork, all } from "redux-saga/effects";
import { Api } from 'AppApi';
import { GET_SOME_DATA, actionCreators } from "../actions";

export function* asyncFetchSomeData() {
  try {
		const someData = yield call(Api.getSomeData);
    yield put(actionCreators.someFetchSucceded(someData));
  } catch (e) {
    yield put(actionCreators.someFetchFailed(e));
  }
}

export function* watchFetchSomeData() {
  while (true) {
    const action = yield take(GET_SOME_DATA);
    yield* asyncFetchSomeData(action);
  }
}

export default function* rootSaga() {
  yield all([fork(watchFetchSomeData)]);
}
