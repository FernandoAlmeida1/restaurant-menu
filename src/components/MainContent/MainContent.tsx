import React from 'react';
import MenuSection from '../MenuSection/MenuSection';

interface MenuItem {
  id: number;
  name: string;
  items: Array<{ name: string }>;
}

interface MainContentProps {
  tabValue: number;
  filteredMenu: MenuItem | null;
  isMobile: boolean;
}

const MainContent: React.FC<MainContentProps> = ({ tabValue, filteredMenu, isMobile }) => {
  return (
    <div style={{ width: "100%", paddingTop: isMobile ? "50px" : "60px" }}>
      {tabValue === 0 && filteredMenu?.sections && filteredMenu.sections.map((section) => (
        <MenuSection
          key={section.id}
          name={section.name}
          items={section.items}
          isMobile={isMobile}
        />
      ))}
      {tabValue === 1 && <section><h2>Entrar</h2></section>}
      {tabValue === 2 && <section><h2>Contato</h2></section>}
    </div>
  );
};

export default MainContent;
