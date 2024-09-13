import React from 'react';
import QuantityControl from '../QuantityControl/QuantityControl';

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

const Cart: React.FC<CartProps> = ({
  cart,
  handleUpdateCartQuantity,
  calculateSubtotal,
  calculateTotal
}) => {
  return (
    <div className="cart">
      <h4>Carrinho</h4>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - 
            <QuantityControl 
              quantity={item.quantity} 
              onChange={(amount) => handleUpdateCartQuantity(item.id, amount)} 
            />
            {item.quantity} x R${item.price.toFixed(2)} = R${(item.price * item.quantity).toFixed(2)}
          </li>
        ))}
      </ul>
      <p>Subtotal: R${calculateSubtotal().toFixed(2)}</p>
      <p>Total: R${calculateTotal().toFixed(2)}</p>
    </div>
  );
};

export default Cart;
