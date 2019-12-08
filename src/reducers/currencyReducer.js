import {
  FETCH_CURRENT_RATE_PENDING,
  FETCH_CURRENT_RATE_SUCCESS,
  FETCH_CURRENT_RATE_FAILURE,
  ADD_TRANSACTION,
  CHANGE_CURRENCY,
  DELETE_TRANSACTION
} from "../actions/actions";

const initialState = {
  data: [],
  loading: true,
  error: "",
  transactions: [],
  currentCurrency: ""
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
    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      };
    case CHANGE_CURRENCY:
      console.log(action.payload);
      let currency = action.payload;
      let rate = state.data.filter(item => item.code === currency);
      console.log(rate);
      return {
        ...state,
        currentCurrency: rate[0]
      };
    case DELETE_TRANSACTION:
      let filteredTransaction = state.transactions.filter(
        (item, index) => index !== action.payload
      );
      return {
        ...state,
        transactions: filteredTransaction
      };
    default:
      return state;
  }
};

export default currencyReducer;
