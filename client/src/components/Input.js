import React from "react";

export default function Input({ min, max, value, label, onInputChange }) {
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    onInputChange(newValue);
  };

  return (
    <div style={{ margin: "0 1.25rem " }} className="input-field">
      <input
        style={{ fontWeight: "200" }}
        type="text"
        value={value}
        min={min}
        max={max}
        id={"filtro"}
        onChange={handleInputChange}
      />
      <label className="active" htmlFor={"filtro"}>
        {label}
      </label>
    </div>
  );
}
