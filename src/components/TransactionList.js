import React from "react";

import { connect } from "react-redux";
import { deleteTransaction } from "../actions/actions";

const TransactionList = ({
  transactions,
  currentCurrency,
  deleteTransaction
}) => {
  return (
    <div>
      {transactions.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.transaction}</p>
            <p>
              {item.amount} {currentCurrency.code} =
              {Math.round(item.amount * currentCurrency.mid * 100) / 100}PLN
            </p>
            <button onClick={() => deleteTransaction(index)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: state.transactions,
  currentCurrency: state.currentCurrency
});

export default connect(mapStateToProps, { deleteTransaction })(TransactionList);
