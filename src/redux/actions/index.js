import { createAction } from 'redux-actions';

export const GET_SOME_DATA = 'GET_SOME_DATA';
export const SOME_FETCH_SUCCEEDED = 'SOME_FETCH_SUCCEEDED';
export const SOME_FETCH_FAILED = 'SOME_FETCH_FAILED';
export const IS_FETCHING = 'IS_FETCHING';

export const actionCreators = {
  isFetching: createAction(IS_FETCHING),
  getSomeData: createAction(GET_SOME_DATA),
  someFetchSucceded: createAction(SOME_FETCH_SUCCEEDED),
  someFetchFailed: createAction(SOME_FETCH_FAILED)
};
