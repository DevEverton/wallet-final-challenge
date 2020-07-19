import React from "react";

export default function Input({ min, max, value, id, label, onInputChange }) {
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    const id = event.target.id;
    onInputChange(newValue, id);
  };

  return (
    <div style={{ margin: "0.5rem 1.25rem " }} className="input-field">
      <input
        style={{ fontWeight: "200" }}
        type="number"
        value={value}
        min={min}
        max={max}
        id={id}
        onChange={handleInputChange}
      />
      <label className="active" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
