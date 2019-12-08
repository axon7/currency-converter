import React from "react";
import { connect } from "react-redux";

const TransactionList = ({ transactions, currentCurrency }) => {
  return (
    <div>
      {transactions.map((item, index) => {
        return (
          <div key={index}>
            <p>{item.transaction}</p>
            <p>
              {Math.round(item.amount * currentCurrency.mid * 100) / 100}PLN
            </p>
            <button onClick={() => console.log(index)}>Delete</button>
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

export default connect(mapStateToProps)(TransactionList);
