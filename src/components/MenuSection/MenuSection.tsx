import React, { useState } from "react";
import Modal from "../Modal/Modal";
import QuantityControl from "../QuantityControl/QuantityControl";
import './MenuSection.css';

interface MenuSectionProps {
  name: string;
  items: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    images: { id: number; image: string }[];
  }[];
  isMobile: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const MenuSection: React.FC<MenuSectionProps> = ({ name, items, isMobile }) => {
  const [selectedItem, setSelectedItem] = useState<null | {
    id: number;
    name: string;
    description: string | null;
    price: number;
    images: { id: number; image: string }[];
  }>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleItemClick = (item: {
    id: number;
    name: string;
    description: string | null;
    price: number;
    images: { id: number; image: string }[];
  }) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleAddToOrder = (itemId: number, quantity: number) => {
    setAddedItems((prev) => [...prev, itemId]); 
    const item = items.find((item) => item.id === itemId);
    if (item) {
      setCart((prev) => {
        const existingItem = prev.find((cartItem) => cartItem.id === itemId);
        if (existingItem) {
          return prev.map((cartItem) =>
            cartItem.id === itemId
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          );
        } else {
          return [...prev, { id: itemId, name: item.name, price: item.price, quantity }];
        }
      });
    }
    closeModal();
  };

  const handleUpdateCartQuantity = (itemId: number, amount: number) => {
    setCart((prev) => {
      return prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + amount } : item
      ).filter(item => item.quantity > 0); 
    });
  };

  const calculateSubtotal = () => {
    return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal(); 
  };
  return (
    <div className="menu-section">
      <h3>{name}</h3>
      {items.map((item) => (
        <div
          key={item.id}
          className="menu-item"
          onClick={() => handleItemClick(item)}
        >
          <div className="menu-item-details">
            <h4 className="menu-item-name">
            {addedItems.includes(item.id) && (
              <span className="item-quantity-circle">
                {addedItems.filter(id => id === item.id).length}
              </span>
            )}
              {item.name}
            </h4>
            <p className="menu-item-description">
              {item.description && item.description.length > 20
                ? `${item.description.substring(0, 52)}...`
                : item.description || "Sem descrição"}
            </p>
            <p className="menu-item-price">R${item.price.toFixed(2)}</p>
          </div>
          {item.images && item.images.length > 0 && (
            <img
              src={item.images[0].image}
              alt={item.name}
              className="menu-item-image"
            />
          )}
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        onAddToOrder={(itemId, quantity) => handleAddToOrder(itemId, quantity)}
      />

      <div className="cart">
        <h4>Cart</h4>
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
    </div>
  );
};

export default MenuSection;
