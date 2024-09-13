import React, { useState } from 'react';
import MenuSection from '../MenuSection/MenuSection';
import Card from '../Card/Card';
import Cart from "../Cart/Cart";
import Collapse from '../Collapse/Collapse'; 
import './MainContent.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: { id: number; image: string }[];
}

interface SectionItem {
  id: number;
  name: string;
  items: MenuItem[]; 
}

interface MainContentProps {
  tabValue: number;
  filteredMenu: { sections?: SectionItem[] } | null;
  isMobile: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ tabValue, filteredMenu, isMobile }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (itemId: number, name: string, price: number, quantity: number) => {
    setCart((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === itemId);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { id: itemId, name, price, quantity }];
      }
    });
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

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const sections = [
    { name: 'Burgers', image: 'https://preodemo.gumlet.io/usr/venue/7602/section/646fbe4c64a6f.png' },
    { name: 'Drinks', image: 'https://preodemo.gumlet.io/usr/venue/7602/section/646fbe5dc1bf3.png' },
    { name: 'Desserts', image: 'https://preodemo.gumlet.io/usr/venue/7602/section/646fbe93cb615.png' }
  ];

  const getFilteredSections = (name: string): SectionItem[] => {
    return filteredMenu?.sections?.filter(section => section.name === name) || [];
  };

  return (
    <div className={`main-content-container ${isMobile ? 'mobile' : ''}`}>
      {tabValue === 1 && <section><h2>Login</h2></section>}
      {tabValue === 2 && <section><h2>Contact</h2></section>}

      {isMobile && (
        <div>
          <div className="tabs mobile-tabs">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`tab ${activeTab === index ? 'active' : ''}`}
                onClick={() => handleTabChange(index)}
              >
                <img
                  src={section.image}
                  alt={section.name}
                  className="tab-image"
                />
                <div>{section.name}</div>
              </div>
            ))}
          </div>
          
          <div className="tab-content">
            {getFilteredSections(sections[activeTab].name).map(section => (
              <MenuSection
                key={section.id}
                name={section.name}
                items={section.items}
                isMobile={isMobile}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>

          <Collapse title="Burgers">
            {getFilteredSections('Burgers').map(section => (
              <MenuSection
                key={section.id}
                name={section.name}
                items={section.items}
                isMobile={isMobile}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </Collapse>

          <Collapse title="Drinks">
            {getFilteredSections('Drinks').map(section => (
              <MenuSection
                key={section.id}
                name={section.name}
                items={section.items}
                isMobile={isMobile}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </Collapse>

        </div>
      )}

      <div className={`card-container-wrapper ${isMobile ? 'mobile' : ''}`}>
        <div className="card-container">
          <Card
            title=""
            content={
              !isMobile ? (
                <div>
                  <div className="tabs">
                    {sections.map((section, index) => (
                      <div
                        key={index}
                        className={`tab ${activeTab === index ? 'active' : ''}`}
                        onClick={() => handleTabChange(index)}
                      >
                        <img
                          src={section.image}
                          alt={section.name}
                          className="tab-image"
                        />
                        <div>{section.name}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="tab-content">
                    {getFilteredSections(sections[activeTab].name).map(section => (
                      <MenuSection
                        key={section.id}
                        name={section.name}
                        items={section.items}
                        isMobile={isMobile}
                        handleAddToCart={handleAddToCart}
                      />
                    ))}
                  </div>

                  <Collapse title="Burgers">
                    {getFilteredSections('Burgers').map(section => (
                      <MenuSection
                        key={section.id}
                        items={section.items}
                        isMobile={isMobile}
                        handleAddToCart={handleAddToCart}
                      />
                    ))}
                  </Collapse>

                  <Collapse title="Drinks">
                    {getFilteredSections('Drinks').map(section => (
                      <MenuSection
                        key={section.id}
                        items={section.items}
                        isMobile={isMobile}
                        handleAddToCart={handleAddToCart}
                      />
                    ))}
                  </Collapse>

                </div>
              ) : (
                <div className="tab-content">
                  {getFilteredSections(sections[activeTab].name).map(section => (
                    <MenuSection
                      key={section.id}
                      name={section.name}
                      items={section.items}
                      isMobile={isMobile}
                      handleAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              )
            }
            width={isMobile ? '100%' : '600px'}
            height={isMobile ? 'auto' : 'auto'}
            opacity={1}
            mobile={isMobile}
          />

          <div className="main-content">
            {!isMobile && (
              <Card
                title="Carrinho"
                content={
                  <Cart
                    cart={cart}
                    handleUpdateCartQuantity={handleUpdateCartQuantity}
                    calculateSubtotal={calculateSubtotal}
                    calculateTotal={calculateTotal}
                  />
                }
                width={isMobile ? '100%' : '320px'}
                height={isMobile ? 'auto' : 'auto'}
                gap={isMobile ? '0' : '1px'}
                opacity={1}
                mobile={isMobile}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
