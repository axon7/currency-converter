import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTransaction } from "../actions/actions";

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 2%;

  input {
    width: 100%;
    margin: 1% 0 1% 0;
    height: 30px;
    border: 2px solid lightblue;
    padding-left: 5px;
    font-family: inherit;
  }

  button {
    width: 100%;
    height: 28px;
    margin-top: 4%;
    background-color: #20a420;
    color: white;
    cursor: pointer;
    border: none;
  }
`;

const TransactionForm = ({ addTransaction, currentCurrency }) => {
  const [form, setFormData] = useState({
    transaction: "",
    amount: ""
  });

  const updateForm = e =>
    setFormData({
      ...form,
      [e.target.name]: e.target.value
    });

  const clearForm = () => {
    setFormData({ transaction: "", amount: "" });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Object.keys(currentCurrency).length !== 0) {
      addTransaction(form);
      clearForm();
    }
  };

  return (
    <StyledForm onSubmit={e => handleSubmit(e)}>
      <input
        onChange={updateForm}
        placeholder='Transaction name'
        value={form.transaction}
        name='transaction'
        required
      />
      <input
        onChange={updateForm}
        placeholder='Amount in foreign currency'
        value={form.amount}
        name='amount'
        type='number'
        required
      />
      <button type='submit'>ADD</button>
    </StyledForm>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  error: state.error,
  loading: state.loading,
  currentCurrency: state.currentCurrency
});

TransactionForm.propTypes = {
  addTransaction: PropTypes.func.isRequired,
  currentCurrency: PropTypes.shape({
    mid: PropTypes.number,
    code: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, { addTransaction })(TransactionForm);
