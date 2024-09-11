import React from "react";
import Tabs from "../Tabs/Tabs";
import Drawer from "../Drawer/Drawer";
import "./Header.css";

interface HeaderProps {
  bannerImage: string;
  navBackgroundColour: string;
  primaryColour: string;
  isMobile: boolean;
  drawerOpen: boolean;
  onToggleDrawer: () => void;
  tabValue: number;
  onTabChange: (newValue: number) => void;
}

const Header: React.FC<HeaderProps> = ({
  bannerImage,
  navBackgroundColour,
  primaryColour,
  isMobile,
  drawerOpen,
  onToggleDrawer,
  tabValue,
  onTabChange,
}) => {
  const getSelectedTabName = (tabValue: number) => {
    switch (tabValue) {
      case 0:
        return "Menu";
      case 1:
        return "Entrar";
      case 2:
        return "Contato";
      default:
        return "";
    }
  };

  return (
    <header
      style={{
        backgroundColor: navBackgroundColour,
        color: primaryColour,
        position: "relative",
      }}
    >
      <div className="header-content">
        {isMobile ? (
          <>
            <button className="drawer-button" onClick={onToggleDrawer}>
              ☰
            </button>
            <Drawer open={drawerOpen} onSelectTab={onTabChange} />

            <div className="selected-tab-name">
              <div>{getSelectedTabName(tabValue)}</div>
            </div>
          </>
        ) : (
          <div className="tabs-container">
            <Tabs tabValue={tabValue} onTabChange={onTabChange} />
          </div>
        )}
      </div>

      <img
        src={bannerImage}
        alt="Banner"
        className="banner-image"
        style={{
          width: "100%",
          height: isMobile ? "150px" : "300px",
          objectFit: "cover",
        }}
      />
    </header>
  );
};

export default Header;
