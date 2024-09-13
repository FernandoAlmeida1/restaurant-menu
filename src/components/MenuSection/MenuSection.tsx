import React, { useState } from "react";
import { useTranslation } from 'react-i18next'; // Importa o hook useTranslation
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
  const { t } = useTranslation();
  const [selectedItem, setSelectedItem] = useState<null | MenuItem>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const handleItemClick = (item: MenuItem) => {
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
      handleAddToCart(item.id, item.name, item.price, quantity);
    }
    closeModal();
  };

  return (
    <div className="menu-section">
      <h3>{name || t('menu')}</h3>
      {items && items.length > 0 ? (
        items.map((item) => (
          <div key={item.id} className="menu-item" onClick={() => handleItemClick(item)}>
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
                  : item.description || t('no_description')}
              </p>
              <p className="menu-item-price">R${item.price.toFixed(2)}</p>
            </div>
            {item.images && item.images.length > 0 && (
              <img src={item.images[0].image} alt={item.name} className="menu-item-image" />
            )}
          </div>
        ))
      ) : (
        <p>{t('no_items_available')}</p>
      )}
  
      <Modal isOpen={isModalOpen} onClose={closeModal} item={selectedItem} onAddToOrder={handleAddToOrder} />
    </div>
  );
};

export default MenuSection;
