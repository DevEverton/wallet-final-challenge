import React, { useState, useEffect } from "react";
import transactionDataService from "../src/services/TransactionService.js";

export default function App() {
  const [transactions, setTransactions] = useState({});
  const [period, setPeriod] = useState("");

  useEffect(() => {
    const date = new Date();
    getTransactions("2020-08");
    setPeriod(`${date.getFullYear()}-${date.getMonth() + 1}`);
  }, []);

  const getTransactions = async (period) => {
    try {
      const transactionsByPeriod = await transactionDataService.getByPeriod(
        period
      );
      setTransactions(transactionsByPeriod.data);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(period);

  return (
    <div>
      <h3>Desafio Final do Bootcamp Full Stack</h3>
      <p>{JSON.stringify(transactions)}</p>
    </div>
  );
}
