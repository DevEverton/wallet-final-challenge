import React, { useState, useEffect } from "react";
import css from "../styles/styles.module.css";

export default function TransactionCard({
  id,
  day,
  category,
  description,
  value,
  type,
}) {
  const [color, setColor] = useState("");
  useEffect(() => {
    const colorPicker = {
      income: "#80ac7b",
      expense: "#e8505b",
    };
    switch (type) {
      case "+":
        setColor(colorPicker.income);
        break;
      case "-":
        setColor(colorPicker.expense);
        break;
      default:
        break;
    }
  }, [type]);
  return (
    <div className={css.transactionCard}>
      <div
        style={{ backgroundColor: color }}
        className={css.dateTransactionCard}
      >
        <span>{day}</span>
      </div>
      <div className={css.flexContainer}>
        <div className={css.categoryTransactionCard}>{category}</div>
        <div className={css.descriptionTransactionCard}>{description}</div>
        <div className={css.valueTransactionCard}>{value}</div>
      </div>
      <div className={css.buttonsTransactionCard}>
        <span
          style={{ color: "333333", marginRight: "0.5rem" }}
          className="material-icons"
        >
          edit
        </span>
        <span style={{ color: "333333" }} className="material-icons">
          delete
        </span>
      </div>
    </div>
  );
}
