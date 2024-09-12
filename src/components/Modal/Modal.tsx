import React, { useState } from "react";
import "./Modal.css";

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
    setQuantity((prevQuantity) => Math.max(prevQuantity + change, 1));
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(Number(event.target.value));
  };

  const getSelectedOptionPrice = () => {
    if (!item.modifiers || selectedOption === null) return 0;

    for (const modifier of item.modifiers) {
      const selected = modifier.items.find((option) => option.id === selectedOption);
      if (selected) {
        return selected.price;
      }
    }
    return 0;
  };

  const totalPrice = (item.price + getSelectedOptionPrice()) * quantity;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        <img
          src={item.images[0].image}
          alt={item.name}
          className="modal-item-image"
        />
        <div style={{ padding: "12px" }}>
          <p className="modal-item-name">{item.name}</p>
          <p className="modal-item-description">
            {item.description || "Sem descrição"}
          </p>
        </div>
        <div>
          {item.modifiers &&
            item.modifiers.map((modifier) => (
              <div key={modifier.name}>
                <div
                  style={{
                    padding: "8px",
                    background: "#F8F9FA",
                  }}
                >
                  <h2 className="modifier-name">{modifier.name}</h2>
                  <p className="select-option">Select 1 option</p>
                </div>

                {modifier.items.map((option) => (
                  <div className="modifier-option" key={option.id}>
                    <div className="modifier-option-details">
                      <p className="option-name">{option.name}</p>
                      <p className="option-price">
                        R${option.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="radio-group-container">
                      <input
                        type="radio"
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={handleOptionChange}
                        disabled={!option.available}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backdropFilter: "blur(10px)"}}>
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
          <button className="modal-add-to-order-button">
            Add to Order  •  R$ {totalPrice.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
