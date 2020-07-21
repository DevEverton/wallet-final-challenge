import React, { useState, useEffect } from "react";
import css from "../styles/styles.module.css";

export default function StatusCard({ id, description, value }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    const colorPicker = {
      income: "#80ac7b",
      expense: "#e8505b",
    };
    switch (id) {
      case "income":
      case "balance":
        setColor(colorPicker.income);
        break;
      case "expense":
        setColor(colorPicker.expense);
        break;
      default:
        break;
    }
  }, [id]);

  return (
    <div style={{ backgroundColor: color }} className={css.statusCard}>
      <p className={css.statusDescription}>{description}</p>
      <p className={css.statusValue}>{value}</p>
    </div>
  );
}
