import React from "react";
import './MenuSection.css'; // Ensure the CSS file is imported

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
  return (
    <div className="menu-section">
      <h3>{name}</h3>
      {items.map((item) => (
        <div key={item.id} className="menu-item">
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
    </div>
  );
};

export default MenuSection;
