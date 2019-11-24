// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import {
  SOME_FETCH_SUCCEEDED,
  SOME_FETCH_FAILED,
  IS_FETCHING,
  CAT_FETCH_SUCCEEDED,
  CAT_FETCH_FAILED,
  SET_SEEN_ARCTICLES
} from "../actions";

const initialState = {
  seenArticles: []
};

const home = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case IS_FETCHING: {
      return {
        ...state,
        isLoading: true
      };
    }
    case SOME_FETCH_SUCCEEDED: {
      return {
        ...state,
        someData: payload,
        isLoading: false
      };
    }
    case SOME_FETCH_FAILED: {
      return {
        ...state,
        message: payload,
        isLoading: false
      };
    }
    case CAT_FETCH_SUCCEEDED: {
      return {
        ...state,
        categoryData: payload,
        isLoading: false
      };
    }
    case CAT_FETCH_FAILED: {
      return {
        ...state,
        message: payload,
        isLoading: false
      };
    }
    case SET_SEEN_ARCTICLES: {
      state.seenArticles.push(payload);
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default home;
