import React from "react";
import css from "../styles/styles.module.css";

export default function TopContainer() {
  return (
    <div className={css.topContainer}>
      <p className={css.title}>wallet</p>
      <div className={css.addButton}>
        <button className="btn-floating waves-effect waves-light grey darken-3">
          <i className="material-icons">add</i>
        </button>
      </div>
    </div>
  );
}
