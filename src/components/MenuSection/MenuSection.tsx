import React, { useState } from "react";
import Modal from '../Modal/Modal'; // Importar o Modal
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

  return (
    <div className="menu-section">
      <h3>{name}</h3>
      {items.map((item) => (
        <div
          key={item.id}
          className="menu-item"
          onClick={() => handleItemClick(item)} // Adiciona o evento de clique
        >
          <div className="menu-item-details">
            <h4 className="menu-item-name">{item.name}</h4>
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
      />
    </div>
  );
};

export default MenuSection;
