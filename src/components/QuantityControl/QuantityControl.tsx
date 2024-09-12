import React from "react";

interface QuantityControlProps {
  quantity: number;
  onChange: (amount: number) => void;
}

const QuantityControl: React.FC<QuantityControlProps> = ({ quantity, onChange }) => {
  const handleQuantityChange = (amount: number) => {
    if (quantity + amount >= 0) { 
      onChange(amount);
    }
  };

  return (
    <div className="modal-quantity-container">
      <button
        className="modal-quantity-button-subtraction"
        onClick={() => handleQuantityChange(-1)}
      >
        -
      </button>
      <span className="modal-quantity">{quantity}</span>
      <button
        className="modal-quantity-button-addition"
        onClick={() => handleQuantityChange(1)}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
