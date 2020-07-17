import React from "react";
import transactionDataService from "../src/services/TransactionService.js";

export default function App() {
  const getTransactions = (period) => {
    transactionDataService
      .getByPeriod(period)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>Desafio Final do Bootcamp Full Stack</h3>
      <button
        className="badge badge-danger mr-2"
        onClick={getTransactions("2020-08")}
      >
        GetAll
      </button>
    </div>
  );
}
