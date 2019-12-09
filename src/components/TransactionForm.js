import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addTransaction } from "../actions/actions";

// import styled from "styled-components";

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
    <form onSubmit={e => handleSubmit(e)}>
      <input
        onChange={updateForm}
        placeholder='Transaction name'
        value={form.transaction}
        name='transaction'
        required
      />
      <input
        onChange={updateForm}
        placeholder='Amount'
        value={form.amount}
        name='amount'
        type='number'
        required
      />
      <button type='submit'>ADD TRANSACTION</button>
    </form>
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
