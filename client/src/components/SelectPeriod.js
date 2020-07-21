import React from "react";
import css from "../styles/styles.module.css";

export default function SelectPeriod({
  month,
  year,
  onMonthChange,
  onYearChange,
}) {
  const handleMonthChange = (event) => {
    const newValue = event.target.value;
    onMonthChange(newValue);
  };

  const handleYearChange = (event) => {
    const newValue = event.target.value;
    onYearChange(newValue);
  };
  return (
    <div className={css.selectPeriod}>
      <div className={css.select}>
        <select
          value={month}
          className="browser-default"
          onChange={handleMonthChange}
        >
          <option value="01">Jan</option>
          <option value="02">Fev</option>
          <option value="03">Mar</option>
          <option value="04">Abr</option>
          <option value="05">Mai</option>
          <option value="06">Jun</option>
          <option value="07">Jul</option>
          <option value="08">Ago</option>
          <option value="09">Set</option>
          <option value="10">Out</option>
          <option value="11">Nov</option>
          <option value="12">Dez</option>
        </select>
      </div>

      <div className={css.select}>
        <select
          value={year}
          className="browser-default"
          onChange={handleYearChange}
        >
          <option value="2019">2019</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
        </select>
      </div>
    </div>
  );
}
