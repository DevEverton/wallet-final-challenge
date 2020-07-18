import React from "react";
import css from "../styles/styles.module.css";

export default function StatusContainer() {
  return (
    <div className={css.statusContainer}>
      <p className={css.statusText}>Lançamentos:</p>
      <p className={css.statusText}>Receitas:</p>
      <p className={css.statusText}>Despesas:</p>
      <p className={css.statusText}>Saldo:</p>
    </div>
  );
}
