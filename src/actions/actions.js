import axios from "axios";

export const FETCH_CURRENT_RATE_PENDING = "FETCH_CURRENT_RATE_PENDING";
export const FETCH_CURRENT_RATE_SUCCESS = "FETCH_CURRENT_RATE_SUCCESS";
export const FETCH_CURRENT_RATE_FAILURE = "FETCH_CURRENT_RATE_FAILURE";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";

const URL =
  "https://cors-anywhere.herokuapp.com/http://api.nbp.pl/api/exchangerates/tables/A?format=json";

export const fetchCurrentRatePending = () => ({
  type: FETCH_CURRENT_RATE_PENDING
});

export const fetchCurrentRateFailure = error => ({
  type: FETCH_CURRENT_RATE_FAILURE,
  payload: { error }
});

export const fetchCurrentRateSuccess = data => ({
  type: FETCH_CURRENT_RATE_SUCCESS,
  payload: data.rates
});

export const fetchCurrentRate = () => async dispatch => {
  console.log("dupa");

  try {
    await dispatch(fetchCurrentRatePending());
    const res = await axios.get(URL);
    console.log(res);
    await dispatch(fetchCurrentRateSuccess(res.data[0]));
  } catch (error) {
    await dispatch(fetchCurrentRateFailure(error));
  }

  console.log("success");
};

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  payload: transaction
});

export const deleteTransaction = id => ({
  type: DELETE_TRANSACTION,
  payload: id
});

export const changeCurrency = currency => ({
  type: CHANGE_CURRENCY,
  payload: currency
});
