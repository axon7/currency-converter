import React from "react";

import { connect } from "react-redux";
import { deleteTransaction } from "../actions/actions";

const TransactionList = ({
  transactions,
  currentCurrency,
  deleteTransaction
}) => {
  let totalAmountInForeignCurrency = transactions.reduce((a, b) => {
    return Number(a) + Number(b.amount);
  }, 0);

  let biggestTransaction = transactions.sort((a, b) => b.amount - a.amount);
  console.log(biggestTransaction);
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
      =====================
      {transactions.length == 0 ? (
        <p>Add some</p>
      ) : (
        <div>
          Total amount: {totalAmountInForeignCurrency}
          {currentCurrency.code} ={" "}
          {Math.round(
            totalAmountInForeignCurrency * currentCurrency.mid * 100
          ) / 100}{" "}
          PLN
          <p>
            Biggest transaction:{biggestTransaction[0].amount}
            {currentCurrency.code}
          </p>
        </div>
      )}
      =====================
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: state.transactions,
  currentCurrency: state.currentCurrency
});

export default connect(mapStateToProps, { deleteTransaction })(TransactionList);
