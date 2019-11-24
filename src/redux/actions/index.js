import { createAction } from 'redux-actions';

export const GET_SOME_DATA = 'GET_SOME_DATA';
export const SOME_FETCH_SUCCEEDED = 'SOME_FETCH_SUCCEEDED';
export const SOME_FETCH_FAILED = 'SOME_FETCH_FAILED';
export const IS_FETCHING = 'IS_FETCHING';
export const GET_CATEGORIES_DATA = 'GET_CATEGORIES_DATA';
export const CAT_FETCH_SUCCEEDED = 'CAT_FETCH_SUCCEEDED';
export const CAT_FETCH_FAILED = 'CAT_FETCH_FAILED';
export const SET_SEEN_ARCTICLES = 'SET_SEEN_ARCTICLES';

export const actionCreators = {
  isFetching: createAction(IS_FETCHING),
  getSomeData: createAction(GET_SOME_DATA),
  someFetchSucceded: createAction(SOME_FETCH_SUCCEEDED),
  someFetchFailed: createAction(SOME_FETCH_FAILED),
  getCategoriesData: createAction(GET_CATEGORIES_DATA),
  catFetchSucceded: createAction(CAT_FETCH_SUCCEEDED),
  catFetchFailed: createAction(CAT_FETCH_FAILED),
  setSeenArticles: createAction(SET_SEEN_ARCTICLES)
};
