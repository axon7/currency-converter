import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { changeCurrency } from "../actions/actions";

const StyledSelect = styled.select`
  background-color: #dff5fc;
  font-size: 22px;
  height: 80%;
  border: 2px solid lightblue;
  cursor: pointer;

  option {
    font-size: 18px;
  }
`;

const StyledRate = styled.div`
  display: flex;
  height: 50px;
  font-size: 22px;
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

  const selectForm = (
    <StyledSelect onChange={e => handleCurrencyChange(e)}>
      <option defaultChecked>-</option>
      {data.map((item, index) => {
        return (
          <option key={index} value={item.code}>
            {item.code}
          </option>
        );
      })}
    </StyledSelect>
  );

  return (
    <div>
      <StyledRate>
        <p>
          1 {selectForm}{" "}
          {`= ${
            Object.entries(currency).length !== 0 ? currentCurrency.mid : "0"
          } PLN`}
        </p>
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
