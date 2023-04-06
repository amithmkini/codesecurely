import React, { useState } from 'react';

type DecimalProps = {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}

const DecimalInput: React.FC<DecimalProps> = ({ label, value, onValueChange }) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if ( newValue == '' || /^(0|1|0\.(\d{1,2})?)$/.test(newValue)) {
      onValueChange(newValue);
    }
  }

  return (
    <div className="flex flex-row items-center">
      <label htmlFor="decimal-input" className="mr-2">
        {label}
      </label>
      <input
        type="text"
        id="decimal-input"
        value={value}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-1 w-20"
      />
    </div>
  );
};

export default DecimalInput;