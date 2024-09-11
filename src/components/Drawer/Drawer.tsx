import React from 'react';
import './Drawer.css';

interface DrawerProps {
  open: boolean;
  onSelectTab: (index: number) => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onSelectTab }) => {
  return (
    <div className={`drawer ${open ? 'open' : ''}`}>
      <ul>
        <li onClick={() => onSelectTab(0)}>Menu</li>
        <li onClick={() => onSelectTab(1)}>Entrar</li>
        <li onClick={() => onSelectTab(2)}>Contato</li>
      </ul>
    </div>
  );
};

export default Drawer;
