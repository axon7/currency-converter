import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeCurrency } from "../actions/actions";

const CurrentRate = ({ data, changeCurrency, currentCurrency }) => {
  const [currency, setCurrency] = useState("");

  useEffect(() => {
    changeCurrency(currency);
  }, [currency]);

  const handleCurrencyChange = e => {
    setCurrency(e.target.value);
  };

  return (
    <div>
      <h1>
        1{" "}
        <select onChange={e => handleCurrencyChange(e)}>
          <option defaultChecked>-</option>
          {data.map((item, index) => {
            return (
              <option key={index} value={item.code}>
                {item.code}
              </option>
            );
          })}
        </select>{" "}
        = {currentCurrency ? currentCurrency.mid : "-"} PLN
      </h1>
      {Object.keys(currentCurrency).length === 0 ? (
        <p>Please select currency</p>
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  error: state.error,
  loading: state.loading,
  currentCurrency: state.currentCurrency
});

CurrentRate.propTypes = {
  changeCurrency: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCurrency: PropTypes.shape({
    mid: PropTypes.number,
    code: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, { changeCurrency })(CurrentRate);
