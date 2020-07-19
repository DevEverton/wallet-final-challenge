import React, { useState, useEffect } from "react";
import css from "../styles/styles.module.css";

export default function StatusCard({ id, description, value }) {
  const [color, setColor] = useState("");

  useEffect(() => {
    const colorPicker = {
      income: "#14b1ab",
      expense: "#e8505b",
    };
    switch (id) {
      case "income" || "balance":
        setColor("green");
        break;
      case "expense":
        setColor(colorPicker.expense);
      default:
        break;
    }
  }, [id]);

  return (
    <div className={css.statusCard}>
      <p className={css.statusDescription}>{description}</p>
      <p style={{ color: `${color}` }} className={css.statusValue}>
        {value}
      </p>
    </div>
  );
}
