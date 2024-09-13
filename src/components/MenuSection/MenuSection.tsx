import React, { useState } from "react";
import Modal from "../Modal/Modal";
import './MenuSection.css';

interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: { id: number; image: string }[];
}

interface MenuSectionProps {
  name?: string;
  items: MenuItem[];
  handleAddToCart: (itemId: number, name: string, price: number, quantity: number) => void;
  isMobile?: boolean;
}

const MenuSection: React.FC<MenuSectionProps> = ({ name, items, handleAddToCart }) => {
  const [selectedItem, setSelectedItem] = useState<null | MenuItem>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleAddToOrder = (itemId: number, quantity: number) => {
    const item = items.find((item) => item.id === itemId);
    if (item) {
      handleAddToCart(item.id, item.name, item.price, quantity);
    }
    closeModal();
  };

  return (
    <div className="menu-section">
      <h3>{name}</h3>
      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="menu-item" onClick={() => handleItemClick(item)}>
            <div className="menu-item-details">
              <h4 className="menu-item-name">{item.name}</h4>
              <p className="menu-item-description">
              {item.description && item.description.length > 20
                ? `${item.description.substring(0, 52)}...`
                : item.description || "Sem descrição"}
            </p>
              <p>R${item.price.toFixed(2)}</p>
            </div>
            {item.images && item.images.length > 0 && (
              <img src={item.images[0].image} alt={item.name} className="menu-item-image" />
            )}
          </div>
        ))
      ) : (
        <p>No items available</p>
      )}
  
      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} onAddToOrder={handleAddToOrder} />
    </div>
  );
  
};

export default MenuSection;
