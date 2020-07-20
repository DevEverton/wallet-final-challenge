import React from "react";
import css from "../styles/styles.module.css";

export default function TransactionCard({
  id,
  date,
  category,
  description,
  value,
}) {
  return (
    <div className={css.transactionCard}>
      <div className={css.dateTransactionCard}>
        <span>02</span>
      </div>
      <div className={css.flexContainer}>
        <div className={css.categoryTransactionCard}>Receita</div>
        <div className={css.descriptionTransactionCard}>
          Consultoria de desenvolvimento de software. Consultoria de
          desenvolvimento de software.
        </div>
        <div className={css.valueTransactionCard}>R$ 1500,00</div>
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
