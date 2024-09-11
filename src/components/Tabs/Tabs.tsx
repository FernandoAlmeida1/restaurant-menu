import React from "react";
import './Tabs.css'; 

interface TabsProps {
  tabValue: number;
  onTabChange: (newValue: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabValue, onTabChange }) => {
  return (
    <ul className="tabs">
      <li
        className={`tab-item ${tabValue === 0 ? "selected" : ""}`}
        onClick={() => onTabChange(0)}
      >
        Menu
      </li>
      <li
        className={`tab-item ${tabValue === 1 ? "selected" : ""}`}
        onClick={() => onTabChange(1)}
      >
        Entrar
      </li>
      <li
        className={`tab-item ${tabValue === 2 ? "selected" : ""}`}
        onClick={() => onTabChange(2)}
      >
        Contato
      </li>
    </ul>
  );
};

export default Tabs;
