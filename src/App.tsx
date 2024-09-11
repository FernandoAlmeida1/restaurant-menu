import React, { useEffect, useState } from "react";
import { fetchRestaurantDetails, testeTeste } from "./services/api";
import Tabs from "./components/Tabs/Tabs";
import HamburgerMenu from "./components/Drawer/Drawer";
import MenuSection from "./components/MenuSection/MenuSection";
import './App.css';

function App() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isMobile = window.innerWidth <= 600;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantData = await fetchRestaurantDetails();
        setRestaurant(restaurantData);

        const menuData = await testeTeste();
        setMenu(menuData);
      } catch (err) {
        setError("Erro ao carregar os dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div
      style={{
        backgroundColor: restaurant?.webSettings.backgroundColour,
      }}
    >
      <header
        style={{
          backgroundColor: restaurant?.webSettings.navBackgroundColour,
          color: restaurant?.webSettings.primaryColour,
          position: "relative",
          paddingBottom: isMobile ? "15px" : "20px",
        }}
      >
        <div className="header-content">
          {isMobile ? (
            <HamburgerMenu
              drawerOpen={drawerOpen}
              toggleDrawer={toggleDrawer}
              onTabChange={handleTabChange}
            />
          ) : (
            <Tabs tabValue={tabValue} onTabChange={handleTabChange} />
          )}
        </div>
        <img
          src={restaurant?.webSettings.bannerImage}
          alt="Banner"
          style={{
            width: "100%",
            height: isMobile ? "150px" : "300px",
            objectFit: "cover",
          }}
        />
        <h1 style={{ fontSize: isMobile ? "20px" : "32px" }}>
          {restaurant?.name}
        </h1>
      </header>

      <div style={{ width: "100%", paddingTop: isMobile ? "50px" : "60px" }}>
        {tabValue === 0 && menu?.sections && menu.sections.map((section) => (
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
    </div>
  );
}

export default App;
