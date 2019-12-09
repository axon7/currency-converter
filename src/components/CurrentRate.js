import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { changeCurrency } from "../actions/actions";
// import styled from "styled-components";

const CurrentRate = ({ data, changeCurrency, currentCurrency }) => {
  const [currency, setCurrency] = useState("");

  const handleCurrencyChange = e => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    changeCurrency(currency);
  }, [currency]);

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
      {!currentCurrency ? <p>Please select currency</p> : null}
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  error: state.error,
  loading: state.loading,
  currentCurrency: state.currentCurrency
});

export default connect(mapStateToProps, { changeCurrency })(CurrentRate);
