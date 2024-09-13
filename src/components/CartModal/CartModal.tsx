import React from "react";
import QuantityControl from "../QuantityControl/QuantityControl";
import "./CartModal.css";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartProps {
  cart: CartItem[];
  handleUpdateCartQuantity: (itemId: number, amount: number) => void;
  calculateSubtotal: () => number;
  calculateTotal: () => number;
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartProps> = ({
  cart,
  handleUpdateCartQuantity,
  calculateSubtotal,
  calculateTotal,
  isOpen,
  onClose
}) => {
  const isEmpty = cart.length === 0;

  if (!isOpen) return null;

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <span className="cart-modal-title">Carrinho</span>
        {isEmpty ? (
          <p className="cart-empty-message">Seu carrinho está vazio</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <QuantityControl
                    quantity={item.quantity}
                    onChange={(amount) => handleUpdateCartQuantity(item.id, amount)}
                  />
                </div>
                <span className="cart-item-price">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="cart-total-subtotal">
              <p>Subtotal:</p>
              <p>R${calculateSubtotal().toFixed(2)}</p>
            </div>
            <div className="cart-total-subtotal">
              <p className="cart-title-calculation">Total:</p>
              <p className="cart-value-calculation">R${calculateTotal().toFixed(2)}</p>
            </div>
            <button className="cart-close-button" onClick={onClose}>Fechar</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
