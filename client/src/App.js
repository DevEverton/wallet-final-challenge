import React, { useState, useEffect } from "react";
import transactionDataService from "../src/services/TransactionService.js";
import TransactionCard from "./components/TransactionCard.js";

export default function App() {
  const [transactions, setTransactions] = useState({});
  const [period, setPeriod] = useState("");

  useEffect(() => {
    const date = new Date();
    const yearMonthStr =
      date.getMonth() + 1 < 10
        ? `${date.getFullYear()}-0${date.getMonth() + 1}`
        : `${date.getFullYear()}-${date.getMonth() + 1}`;
    setPeriod(yearMonthStr);
  }, []);

  useEffect(() => {
    getTransactions(period);
  }, [period]);

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
  console.log(transactions);

  return (
    <div>
      <div className="container right">
        <h3>Desafio Final do Bootcamp Full Stack</h3>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </div>
    </div>
  );
}
