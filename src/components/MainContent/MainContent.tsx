import React, { useState } from 'react';
import MenuSection from '../MenuSection/MenuSection';
import Card from '../Card/Card';
import './MainContent.css';

interface MenuItem {
  id: number;
  name: string;
  items: Array<{ name: string }>;
  sections?: Array<{ id: number; name: string; items: Array<{ name: string }> }>;
}

interface MainContentProps {
  tabValue: number;
  filteredMenu: MenuItem | null;
  isMobile: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ tabValue, filteredMenu, isMobile }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
  };

  const sections = [
    { name: 'Burgers', image: 'https://preodemo.gumlet.io/usr/venue/7602/section/646fbe4c64a6f.png' },
    { name: 'Drinks', image: 'https://preodemo.gumlet.io/usr/venue/7602/section/646fbe5dc1bf3.png' },
    { name: 'Desserts', image: 'https://preodemo.gumlet.io/usr/venue/7602/section/646fbe93cb615.png' }
  ];

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
            {filteredMenu?.sections
              .filter(section => section.name === sections[activeTab].name)
              .map(section => (
                <MenuSection
                  key={section.id}
                  name={section.name}
                  items={section.items}
                  isMobile={isMobile}
                />
              ))}
          </div>
        </div>
      )}

      <div className={`card-container-wrapper ${isMobile ? 'mobile' : ''}`}>
        <div className="card-container">
          <Card
            title="Main Card"
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
                    {filteredMenu?.sections
                      .filter(section => section.name === sections[activeTab].name)
                      .map(section => (
                        <MenuSection
                          key={section.id}
                          name={section.name}
                          items={section.items}
                          isMobile={isMobile}
                        />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="tab-content">
                  {filteredMenu?.sections
                    .filter(section => section.name === sections[activeTab].name)
                    .map(section => (
                      <MenuSection
                        key={section.id}
                        name={section.name}
                        items={section.items}
                        isMobile={isMobile}
                      />
                    ))}
                </div>
              )
            }
            width={isMobile ? '100%' : '600px'}
            height={isMobile ? 'auto' : '1071px'}
            opacity={1}
            mobile={isMobile}
          />
          {!isMobile && (
            <Card
              title="Cart Card"
              content={<div>Cart card content</div>}
              width={isMobile ? '100%' : '320px'}
              height={isMobile ? 'auto' : '129px'}
              gap={isMobile ? '0' : '1px'}
              opacity={1}
              mobile={isMobile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
