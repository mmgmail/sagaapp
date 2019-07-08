import { call, put, take, fork, all } from "redux-saga/effects";
import { Api } from 'AppApi';
import { GET_SOME_DATA, GET_CATEGORIES_DATA, actionCreators } from "../actions";
import { CATEGORIES } from 'AppConstans';
import _ from 'lodash'

export function* asyncFetchSomeData() {
  try {
    const data = yield call(Api.getSomeData);
    const serId = () => {
      const newData = [];
      for (let i = 0; i <= data.articles.length - 1; i++) {
        newData.push({ id: _.uniqueId(), ...data.articles[i] });
      }
      return newData;
    };
    const someData = yield call(serId);
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

export function* asyncFetchCategoriesData() {
  try {
    const results = yield call(Api.getCategoriesData);
    console.log('results', results);
    const serCombineCat = () => {
      const catResults = [];
      for (let i = 0; i <= results.length - 1; i++) {
        catResults.push({
          [CATEGORIES[i]]: { id: _.uniqueId(), ...results[i] }
        });
      }
      return catResults;
    };
    const catData = yield call(serCombineCat);
    yield put(actionCreators.catFetchSucceded(catData));
  } catch (e) {
    yield put(actionCreators.catFetchFailed(e));
  }
}

export function* watchFetchCategoriesData() {
  while (true) {
    const action = yield take(GET_CATEGORIES_DATA);
    yield* asyncFetchCategoriesData(action);
  }
}

export default function* rootSaga() {
  yield all([fork(watchFetchSomeData), fork(watchFetchCategoriesData)]);
}
