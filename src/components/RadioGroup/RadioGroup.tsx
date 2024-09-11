import React, { ChangeEvent } from "react";
import './RadioGroup.css';

interface RadioGroupProps {
  name: string;
  options: {
    id: number;
    name: string;
    price: number;
  }[];
  selectedValue: number | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <div className="radio-group">
      <p className="radio-group-title">{name}</p>
      {options.map(option => (
        <label key={option.id} className="radio-group-option">
          <input
            type="radio"
            name={name}
            value={option.id}
            checked={selectedValue === option.id}
            onChange={onChange}
          />
          <span className="radio-group-label">
            {option.name} (R${option.price.toFixed(2)})
          </span>
        </label>
      ))}
    </div>
  );
};

export default RadioGroup;
