import React from "react";
import css from "../styles/styles.module.css";

export default function StatusCard({ description, value }) {
  return (
    <div className={css.statusCard}>
      <p className={css.statusDescription}>{description}</p>
      <p className={css.statusValue}>{value}</p>
    </div>
  );
}
