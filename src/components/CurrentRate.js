import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeCurrency } from "../actions/actions";

const StyledSelect = styled.select`
  background-color: #dff5fc;
  font-size: 6vw;
  padding-top: 2%;
  height: 90%;
  border: 2px solid lightblue;
`;

const StyledRate = styled.div`
  display: flex;
  font-size: 8vw;
  justify-content: center;
  margin: 10px auto;
  align-items: center;
`;

const Alert = styled.p`
  color: darkred;
  font-weight: bold;
  text-align: center;
`;

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
      <StyledRate>
        <span>1</span>{" "}
        <StyledSelect onChange={e => handleCurrencyChange(e)}>
          <option defaultChecked>-</option>
          {data.map((item, index) => {
            return (
              <option key={index} value={item.code}>
                {item.code}
              </option>
            );
          })}
        </StyledSelect>{" "}
        <span>=</span>
        <span>
          {Object.entries(currency).length !== 0 ? currentCurrency.mid : "0"}
        </span>
        <span>PLN</span>
      </StyledRate>
      {Object.keys(currentCurrency).length === 0 ? (
        <Alert>Please select currency</Alert>
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
