import React, { useState, useEffect } from "react";
import transactionDataService from "../src/services/TransactionService.js";
import TransactionCard from "./components/TransactionCard.js";
import TopContainer from "./components/TopContainer.js";
import Input from "./components/Input.js";
import StatusCard from "./components/StatusCard.js";
import css from "./styles/styles.module.css";
import SelectPeriod from "./components/SelectPeriod.js";

export default function App() {
  const [transactions, setTransactions] = useState({});
  const [period, setPeriod] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [input, setInput] = useState("");
  const [transactionsIncomes, setTransactionsIncomes] = useState(0);
  const [transactionsExpenses, setTransactionsExpenses] = useState(0);
  const [transactionsCards, setTransactionsCards] = useState([]);

  useEffect(() => {
    const dates = getYearMonth();
    setPeriod(dates.yearMonthStr);
    setSelectedMonth(dates.month);
    setSelectedYear(dates.year);
  }, []);

  useEffect(() => {
    getTransactions(period);
  }, [period]);

  useEffect(() => {
    setPeriod(`${selectedYear}-${selectedMonth}`);
  }, [selectedYear, selectedMonth]);

  useEffect(() => {
    searchEngine(input);
  }, [input]);

  useEffect(() => {
    getTransactionsIncomes(transactions);
    getTransactionsExpenses(transactions);
    buildTransactionsCards(transactions);
  }, [transactions]);

  const getYearMonth = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month =
      date.getMonth() + 1 < 10
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    const yearMonthStr = `${year}-${month}`;
    return { year, month, yearMonthStr };
  };

  const getTransactions = async (period) => {
    try {
      const transactionsByPeriod = await transactionDataService.getByPeriod(
        period
      );

      await transactionsByPeriod.data.sort((a, b) => {
        return a.day - b.day;
      });
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

  const getTransactionsExpenses = async (transactions) => {
    try {
      const expenses = await transactions
        .filter((transaction) => transaction.type === "-")
        .reduce((acc, transaction) => {
          return acc + transaction.value;
        }, 0);
      setTransactionsExpenses(expenses);
    } catch (err) {
      console.log(err);
    }
  };

  const buildTransactionsCards = async (transactions) => {
    try {
      let transactionsCards = [];
      await transactions.forEach((transaction) => {
        transactionsCards.push(
          <TransactionCard
            key={transaction._id}
            id={transaction._id}
            day={transaction.day}
            category={transaction.category}
            description={transaction.description}
            value={transaction.value.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
            type={transaction.type}
          />
        );
      });
      setTransactionsCards(transactionsCards);
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (newValue) => {
    setInput(newValue);
  };

  const handleMonthChange = (newValue) => {
    setSelectedMonth(newValue);
  };
  const handleYearChange = (newValue) => {
    setSelectedYear(newValue);
  };

  const searchEngine = async (description) => {
    const removeAccents = (text) => {
      text = text.toLowerCase();
      text = text.replace(new RegExp("[ÁÀÂÃ]", "gi"), "a");
      text = text.replace(new RegExp("[ÉÈÊ]", "gi"), "e");
      text = text.replace(new RegExp("[ÍÌÎ]", "gi"), "i");
      text = text.replace(new RegExp("[ÓÒÔÕ]", "gi"), "o");
      text = text.replace(new RegExp("[ÚÙÛ]", "gi"), "u");
      text = text.replace(new RegExp("[Ç]", "gi"), "c");
      return text;
    };
    try {
      let descriptionLowerCase = description.toLowerCase();

      let newTransactions = JSON.parse(JSON.stringify(transactions));

      newTransactions.forEach((transaction) => {
        transaction.description = removeAccents(transaction.description);
      });

      const itemsFound = newTransactions.filter((transaction) =>
        transaction.description.includes(descriptionLowerCase)
      );

      const transactionsToShow = [];

      itemsFound.forEach((item) => {
        const found = transactions.find((transaction) => {
          return transaction._id === item._id;
        });
        transactionsToShow.push(found);
      });

      if (description.length === 0) {
        getTransactions(period);
      } else {
        setTransactions(transactionsToShow);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        <TopContainer />
        <div className={css.statusContanier}>
          <StatusCard
            id={"transactions"}
            description={"Lançamentos"}
            value={transactions.length}
          />
          <StatusCard
            id={"income"}
            description={"Receitas"}
            value={transactionsIncomes.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          />
          <StatusCard
            id={"expense"}
            description={"Despesas"}
            value={transactionsExpenses.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          />
          <StatusCard
            id={"balance"}
            description={"Saldo"}
            value={(transactionsIncomes - transactionsExpenses).toLocaleString(
              "pt-br",
              {
                style: "currency",
                currency: "BRL",
              }
            )}
          />
        </div>
        <SelectPeriod
          month={selectedMonth}
          year={selectedYear}
          onMonthChange={handleMonthChange}
          onYearChange={handleYearChange}
        />
        <Input
          id={"filtro"}
          label={"Filtro"}
          value={input}
          min={0}
          max={100000}
          onInputChange={handleInputChange}
        />

        <div className={css.scrollView}>
          {transactionsCards.slice(0, transactionsCards.length / 2)}
        </div>
        <div className={css.scrollView}>
          {transactionsCards.slice(
            transactionsCards.length / 2,
            transactionsCards.length
          )}
        </div>
      </div>
    </div>
  );
}
