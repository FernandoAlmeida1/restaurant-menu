import React, { useState } from "react";
import Modal from "../Modal/Modal";
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

  const handleAddToOrder = (itemId: number) => {
    setAddedItems((prev) => [...prev, itemId]); 
    closeModal(); 
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
        onAddToOrder={handleAddToOrder} 
      />
    </div>
  );
};

export default MenuSection;
