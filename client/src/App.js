import React, { useState, useEffect } from "react";
import transactionDataService from "../src/services/TransactionService.js";
import TransactionCard from "./components/TransactionCard.js";
import TopContainer from "./components/TopContainer.js";
import Input from "./components/Input.js";
import StatusCard from "./components/StatusCard.js";
import css from "./styles/styles.module.css";

export default function App() {
  const [transactions, setTransactions] = useState({});
  const [period, setPeriod] = useState("");
  const [transactionsIncomes, setTransactionsIncomes] = useState(0);

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

  useEffect(() => {
    getTransactionsIncomes(transactions);
  }, [transactions]);

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

  const getTransactionsIncomes = async (transactions) => {
    try {
      const incomes = await transactions
        .filter((transaction) => transaction.type === "+")
        .reduce((acc, transaction) => {
          return acc + transaction.value;
        }, 0);
      setTransactionsIncomes(incomes);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = () => {};

  return (
    <div>
      <div className="container">
        <TopContainer />
        <div className={css.statusContanier}>
          <StatusCard description={"Lançamentos"} value={transactions.length} />
          <StatusCard description={"Receitas"} value={transactionsIncomes} />
          <StatusCard />
          <StatusCard />
        </div>

        <Input
          id={"filtro"}
          label={"Filtro"}
          value={""}
          min={0}
          max={100000}
          onInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}
