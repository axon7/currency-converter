import React, { useState } from "react";
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
    if (currentCurrency) {
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

export default connect(mapStateToProps, { addTransaction })(TransactionForm);
