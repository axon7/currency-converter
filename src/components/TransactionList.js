import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTransaction } from "../actions/actions";

const TransactionList = ({
  transactions,
  currentCurrency,
  deleteTransaction
}) => {
  const totalAmountInForeignCurrency = transactions.reduce((a, b) => {
    return Number(a) + Number(b.amount);
  }, 0);

  const sortedTransactions = transactions.sort((a, b) => b.amount - a.amount);

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
            <button type='button' onClick={() => deleteTransaction(index)}>
              Delete
            </button>
          </div>
        );
      })}
      {transactions.length === 0 ? (
        <p>Your transaction list is empty. Please add some</p>
      ) : (
        <div>
          Total amount: {totalAmountInForeignCurrency}
          {currentCurrency.code} ={" "}
          {Math.round(
            totalAmountInForeignCurrency * currentCurrency.mid * 100
          ) / 100}{" "}
          PLN
          <p>
            Biggest transaction:{sortedTransactions[0].amount}
            {currentCurrency.code}
          </p>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  transactions: state.transactions,
  currentCurrency: state.currentCurrency
});

TransactionList.propTypes = {
  deleteTransaction: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentCurrency: PropTypes.shape({
    mid: PropTypes.number,
    code: PropTypes.string
  }).isRequired
};

export default connect(mapStateToProps, { deleteTransaction })(TransactionList);
