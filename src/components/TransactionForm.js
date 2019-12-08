import React, { useState } from "react";
import { connect } from "react-redux";
import { addTransaction } from "../actions/actions";

// import styled from "styled-components";

const TransactionForm = ({ addTransaction }) => {
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

  return (
    <form>
      <input
        onChange={updateForm}
        placeholder='Transaction name'
        value={form.transaction}
        name='transaction'
      />
      <input
        onChange={updateForm}
        placeholder='Amount'
        value={form.amount}
        name='amount'
      />
      <button
        type='button'
        onClick={() => {
          addTransaction(form);
          clearForm();
        }}
      >
        ADD TRANSACTION
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  error: state.error,
  loading: state.loading
});

export default connect(mapStateToProps, { addTransaction })(TransactionForm);
