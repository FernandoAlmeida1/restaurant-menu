import React, { useState } from "react";
import './Modal.css';
import RadioGroup from "../RadioGroup/RadioGroup";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    description: string | null;
    price: number;
    images: { id: number; image: string }[];
    modifiers?: {
      name: string;
      items: {
        id: number;
        name: string;
        price: number;
        available: boolean;
      }[];
    }[];
  } | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, item }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (!isOpen || !item) return null;

  const handleQuantityChange = (change: number) => {
    setQuantity(prevQuantity => Math.max(prevQuantity + change, 1));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <img src={item.images[0].image} alt={item.name} className="modal-item-image" />
        <h2 className="modal-item-name">{item.name}</h2>
        <p className="modal-item-description">
          {item.description || "Sem descrição"}
        </p>
        {item.modifiers && item.modifiers.map(modifier => (
          <RadioGroup
            key={modifier.name}
            name={modifier.name}
            options={modifier.items.map(option => ({
              id: option.id,
              name: option.name,
              price: option.price
            }))}
            selectedValue={selectedOption}
            onChange={handleOptionChange}
          />
        ))}
        <div className="modal-item-details">
          <p className="modal-item-price">R${item.price.toFixed(2)}</p>
        </div>
        <div className="modal-quantity-container">
          <button className="modal-quantity-button" onClick={() => handleQuantityChange(-1)}>-</button>
          <span className="modal-quantity">{quantity}</span>
          <button className="modal-quantity-button" onClick={() => handleQuantityChange(1)}>+</button>
        </div>
        <button className="modal-add-to-order-button">
          Add to Order - R${(item.price * quantity).toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Modal;
