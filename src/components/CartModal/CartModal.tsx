import React from "react";
import { useTranslation } from 'react-i18next'; 
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
  onCheckout: () => void; 
}

const EURO_CONVERSION_RATE = 6.17;

const CartModal: React.FC<CartProps> = ({
  cart,
  handleUpdateCartQuantity,
  calculateSubtotal,
  calculateTotal,
  isOpen,
  onClose,
  onCheckout
}) => {
  const { t } = useTranslation(); 
  const isEmpty = cart.length === 0;

  const subtotal = calculateSubtotal();
  const subtotalInEuros = subtotal / EURO_CONVERSION_RATE;

  if (!isOpen) return null;

  const handleUpdateQuantity = (itemId: number, amount: number) => {
    handleUpdateCartQuantity(itemId, amount);

    const updatedCart = cart.filter(item => item.id !== itemId || item.quantity + amount > 0);
    const isCartNowEmpty = updatedCart.every(item => item.quantity === 0);

    if (isCartNowEmpty) {
      onClose(); 
    }
  };

  const handleCheckout = () => {
    onCheckout(); 
    onClose(); 
  };

  return (
    <div className="cart-modal-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <span className="cart-modal-title">{t('cart_title')}</span>
        {isEmpty ? (
          <p className="cart-empty-message">{t('cart_empty_message')}</p>
        ) : (
          <>
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-details">
                  <span className="cart-item-name">{item.name}</span>
                  <QuantityControl
                    quantity={item.quantity}
                    onChange={(amount) => handleUpdateQuantity(item.id, amount)}
                  />
                </div>
                <span className="cart-item-price">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <div className="cart-total-subtotal">
            </div>
            <div className="cart-total-subtotal">
              <p>Subtotal:</p>
              <p>€{subtotalInEuros.toFixed(2)}</p> 
            </div>
            <div className="cart-total-subtotal">
              <p className="cart-title-calculation">{t('total')}:</p>
              <p className="cart-value-calculation">R${calculateTotal().toFixed(2)}</p>
            </div>
            <button className="cart-checkout-button" onClick={handleCheckout}>
              {t('checkout_now')}
            </button>
            <button className="cart-close-button" onClick={onClose}>&times;</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
