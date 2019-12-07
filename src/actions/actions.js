import axios from "axios";

export const FETCH_CURRENT_RATE_PENDING = "FETCH_CURRENT_RATE_PENDING";
export const FETCH_CURRENT_RATE_SUCCESS = "FETCH_CURRENT_RATE_SUCCESS";
export const FETCH_CURRENT_RATE_FAILURE = "FETCH_CURRENT_RATE_FAILURE";

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
  payload: data.rates[7]
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
