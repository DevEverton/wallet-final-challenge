import React from "react";
import css from "../styles/styles.module.css";
import Input from "./Input.js";

export default function TopContainer() {
  return (
    <div className={css.topContainer}>
      <p className={css.title}>wallet</p>
    </div>
  );
}
