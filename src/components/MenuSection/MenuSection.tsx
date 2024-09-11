import React from "react";

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
    <div>
      <h3>{name}</h3>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px" }}>
          <h4>{item.name}</h4>
          <p>{item.description || "Sem descrição"}</p>
          <p>Preço: R$ {item.price.toFixed(2)}</p>
          {item.images && item.images.length > 0 && (
            <img
              src={item.images[0].image}
              alt={item.name}
              style={{
                width: isMobile ? "75px" : "100px",
                height: isMobile ? "75px" : "100px",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuSection;
