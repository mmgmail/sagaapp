import { call, put, take, fork, all } from "redux-saga/effects";
import { Api } from 'AppApi';
import { GET_SOME_DATA, actionCreators } from "../actions";
import _ from 'lodash'

export function* asyncFetchSomeData(url) {
  try {
    const data = yield call(Api.getSomeData);
    const setDataId = () => {
      const someData = [];
      for (let i = 0; i <= data.articles.length - 1; i++) {
        someData.push({ id: _.uniqueId(), ...data.articles[i] });
      }
      return someData;
    };
    const someData = yield call(setDataId);
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
