import {
  SOME_FETCH_SUCCEEDED,
  SOME_FETCH_FAILED,
  IS_FETCHING
} from "../actions";

const home = (state = {}, action) => {
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
    default:
      return state;
  }
};

export default home;
