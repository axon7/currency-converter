import {
  FETCH_CURRENT_RATE_PENDING,
  FETCH_CURRENT_RATE_SUCCESS,
  FETCH_CURRENT_RATE_FAILURE
} from "../actions/actions";

const initialState = {
  data: [],
  loading: true,
  error: ""
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_RATE_PENDING:
      return {
        ...state,
        loading: true
      };
    case FETCH_CURRENT_RATE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case FETCH_CURRENT_RATE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default currencyReducer;
