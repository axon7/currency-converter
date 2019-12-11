import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { connect } from "react-redux";
import { deleteTransaction } from "../actions/actions";
import { convertToPLN, findBiggest, calculateTotalSum } from "../utils";

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
  }
`;

const AllTransactionInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  @media (min-width: 760px) {
    flex-direction: row;
    align-items: flex-start;
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

const TransactionList = ({ transactions, currentCurrency, deleteTransaction }) => {
  const rate = currentCurrency.mid;
  const { code } = currentCurrency;

  const biggestTransaction = findBiggest(transactions, "amount");
  const totalSum = calculateTotalSum(transactions, "amount");

  return (
    <AllTransactionInfo>
      <ListWithTransactions>
        {transactions.map((item, index) => {
          return (
            <ListItem key={index}>
              <TransactionTitle>{item.transaction}</TransactionTitle>
              <p>{`${item.amount} ${code} = ${convertToPLN(item.amount, rate)} PLN`}</p>

              <button type='button' onClick={() => deleteTransaction(index)}>
                Delete
              </button>
            </ListItem>
          );
        })}
      </ListWithTransactions>

      {transactions.length === 0 ? null : (
        <Summary>
          <div style={{ marginBottom: "15px" }}>
            <SummaryTitle>Total amount</SummaryTitle>
            <p>{`${totalSum} ${code} = ${convertToPLN(totalSum, rate)} PLN`}</p>
          </div>
          <div>
            <SummaryTitle>Biggest transaction:</SummaryTitle>
            <p>{`${biggestTransaction.transaction}: ${biggestTransaction.amount} ${code} = ${convertToPLN(biggestTransaction.amount, rate)} PLN`}</p>
          </div>
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
