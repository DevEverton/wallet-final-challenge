import React from "react";
import css from "../styles/styles.module.css";

export default function TransactionCard() {
  return (
    <div className="row">
      <div className="col s12 m7">
        <div style={{ maxWidth: "30rem" }} className="card small">
          <div className="card-image">
            <span className={css.cardDate}>02</span>

            <img
              alt="Income Img"
              src={require("../images/cardGreen.jpg")}
            ></img>
            <span className="card-title">Receita</span>
          </div>
          <div className="card-content">
            <p className={css.cardDescription}>
              Consultoria em desenvolvimento de software.
            </p>
            <p className={css.cardValue}>R$350,00</p>
          </div>

          <div className={css.buttons}>
            <button
              style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}
              className="btn-floating waves-effect waves-light orange"
            >
              <i className="material-icons">edit</i>
            </button>
            <button className="btn-floating waves-effect waves-light red">
              <i className="material-icons">delete</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
