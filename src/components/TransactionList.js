import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteTransaction } from "../actions/actions";

const ListItem = styled.div`
  background-color: white;
  width: 90%;
  margin-top: 10px;
  box-shadow: 1px 1px 3px #999;

  button {
    background-color: red;
    border: none;
    color: white;
    margin-bottom: 10px;
    cursor: pointer;
    border-radius: 5px;
    padding: 6px;
  }
`;

const ListWithTransactions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  @media (min-width: 760px) {
    width: 70%;
    margin-bottom: 4%;
  }
`;

const Summary = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  align-items: center;
  margin: 10px 10px 15px 0;

  p {
    overflow-wrap: break-word;
    width: 100%;
    margin: 0;
  }
  @media (min-width: 760px) {
    width: 27%;
    align-self: flex-start;
  }
`;

const AllTransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 760px) {
    flex-direction: row;
  }
`;

const TransactionTitle = styled.p`
  font-size: 22px;
  margin: 5px 0 0 0;
  color: darkgreen;
  font-weight: bold;
  overflow-wrap: break-word;
`;

const SummaryTitle = styled.p`
  font-weight: bold;
  margin-top: 6px;
`;

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
    <AllTransactionInfo>
      <ListWithTransactions>
        {transactions.map((item, index) => {
          return (
            <ListItem key={index}>
              <TransactionTitle>{item.transaction}</TransactionTitle>
              <p style={{ overflowWrap: "break-word" }}>{`${item.amount} ${
                currentCurrency.code
              } = ${Math.round(item.amount * currentCurrency.mid * 100) /
                100} PLN`}</p>

              <button type='button' onClick={() => deleteTransaction(index)}>
                Delete
              </button>
            </ListItem>
          );
        })}
      </ListWithTransactions>

      {transactions.length === 0 ? null : (
        <Summary>
          <SummaryTitle>Total amount</SummaryTitle>
          <p>{`${totalAmountInForeignCurrency} ${
            currentCurrency.code
          } = ${Math.round(
            totalAmountInForeignCurrency * currentCurrency.mid * 100
          ) / 100} PLN`}</p>
          <SummaryTitle>Biggest transaction:</SummaryTitle>
          <p>{`${sortedTransactions[0].transaction}: ${
            sortedTransactions[0].amount
          } ${currentCurrency.code} = ${Math.round(
            sortedTransactions[0].amount * currentCurrency.mid * 100
          ) / 100} PLN`}</p>
        </Summary>
      )}
    </AllTransactionInfo>
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
