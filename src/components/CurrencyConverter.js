import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCurrentRate } from "../actions/actions";
import CurrentRate from "./CurrentRate";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import Error from "./Error";

const StyledWrapper = styled.div`
  width: 90%;
  max-width: 790px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 20px auto;
  background-color: #c2e6f391;
  box-shadow: 1px 1px 10px #444;
  text-align: center;
  /* height: 100%; */
`;

const StyledAppTitle = styled.h2`
  margin: 0;
  background-color: lightblue;
  padding: 10px;
  width: 100%;
`;
const CurrencyConverter = ({ fetchCurrentRate, errorMessage }) => {
  const initFetch = useCallback(() => {
    fetchCurrentRate();
  }, [fetchCurrentRate]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <StyledWrapper>
      <StyledAppTitle>Currency converter</StyledAppTitle>
      {errorMessage ? (
        <Error error={errorMessage} />
      ) : (
        <>
          <CurrentRate />
          <TransactionForm />
          <TransactionList />
        </>
      )}
    </StyledWrapper>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  errorMessage: state.error.message,
  loading: state.loading
});

CurrencyConverter.propTypes = {
  fetchCurrentRate: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { fetchCurrentRate })(CurrencyConverter);
