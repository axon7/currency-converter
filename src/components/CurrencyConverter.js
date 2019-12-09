import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentRate } from "../actions/actions";
import CurrentRate from "./CurrentRate";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

const CurrencyConverter = ({ fetchCurrentRate }) => {
  useEffect(() => {
    fetchCurrentRate();
  }, []);
  return (
    <div>
      <h1>currency converter</h1>
      <CurrentRate />
      <TransactionForm />
      <TransactionList />
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  error: state.error,
  loading: state.loading
});

CurrencyConverter.propTypes = {
  fetchCurrentRate: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { fetchCurrentRate })(
  CurrencyConverter
);
