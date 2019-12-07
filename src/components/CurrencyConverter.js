import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchCurrentRate } from "../actions/actions";
import CurrentRate from "./CurrentRate";
// import styled from "styled-components";

const CurrencyConverter = props => {
  useEffect(() => {
    props.fetchCurrentRate();
  }, []);
  return (
    <div>
      <h1>currency converter</h1>
      <CurrentRate />
      <input placeholder='Transaction name' />
      <input placeholder='Euro amount' />
      <button onClick={console.log("add transaction")}>ADD TRANSACTION</button>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  error: state.error,
  loading: state.loading
});

export default connect(mapStateToProps, { fetchCurrentRate })(
  CurrencyConverter
);
