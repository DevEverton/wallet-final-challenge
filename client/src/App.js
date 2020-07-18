import React, { useState, useEffect } from "react";
import transactionDataService from "../src/services/TransactionService.js";
import TransactionCard from "./components/TransactionCard.js";
import TopContainer from "./components/TopContainer.js";
import Input from "./components/Input.js";
import css from "./styles/styles.module.css";

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
  const handleInputChange = () => {};

  return (
    <div>
      <div className="container">
        <TopContainer />
        <div className="row l12 s6">
          <div className="col">
            <button
              style={{ marginTop: "1.75rem" }}
              className="btn waves-effect waves-light"
            >
              <i className="material-icons">add</i>
            </button>
          </div>
          <div className="col l11 s5">
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
      </div>
    </div>
  );
}
