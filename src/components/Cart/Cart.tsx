import React from "react";
import QuantityControl from "../QuantityControl/QuantityControl";
import "./Cart.css";

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
}

const EURO_CONVERSION_RATE = 6.17;

const Cart: React.FC<CartProps> = ({
  cart,
  handleUpdateCartQuantity,
  calculateSubtotal,
  calculateTotal,
}) => {
  const isEmpty = cart.length === 0;

  const subtotalInEuros = calculateSubtotal() / EURO_CONVERSION_RATE;

  return (
    <div className="cart">
      <span className="cart-title">Carrinho</span>
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
            <p>Subtotal: </p>
            <p>£{subtotalInEuros.toFixed(2)}</p>
          </div>
          <div className="cart-total-subtotal">
            <p className="cart-title-calculation">Total:</p>
            <p className="cart-value-calculation">R${calculateTotal().toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
