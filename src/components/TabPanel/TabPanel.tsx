import React from 'react';
import './TabPanel.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={`tabpanel ${value === index ? 'active' : ''}`}
    >
      {value === index && <div className="tabpanel-content">{children}</div>}
    </div>
  );
};

export default TabPanel;
