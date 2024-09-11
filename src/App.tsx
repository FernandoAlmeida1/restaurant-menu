import React, { useEffect, useState } from "react";
import { fetchRestaurantDetails, testeTeste } from "./services/api";
import Header from "./components/Header/Header";
import MenuSection from "./components/MenuSection/MenuSection";
import SearchBar from "./components/SearchBar/SearchBar";
import './App.css';

function App() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [filteredMenu, setFilteredMenu] = useState<Menu | null>(null); // Estado para o menu filtrado
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantData = await fetchRestaurantDetails();
        setRestaurant(restaurantData);

        const menuData = await testeTeste();
        setMenu(menuData);
        setFilteredMenu(menuData); // Inicialmente, o menu filtrado é o menu completo
      } catch (err) {
        setError("Erro ao carregar os dados");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (newValue: number) => {
    setTabValue(newValue);
    setDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearch = (query: string) => {
    if (menu) {
      const filtered = {
        ...menu,
        sections: menu.sections.map(section => ({
          ...section,
          items: section.items.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
        }))
      };
      setFilteredMenu(filtered);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app-container">
      <Header
        bannerImage={restaurant?.webSettings.bannerImage || ""}
        navBackgroundColour={restaurant?.webSettings.navBackgroundColour || ""}
        primaryColour={restaurant?.webSettings.primaryColour || ""}
        isMobile={isMobile}
        drawerOpen={drawerOpen}
        onToggleDrawer={toggleDrawer}
        tabValue={tabValue}
        onTabChange={handleTabChange}
      />

      <SearchBar onSearch={handleSearch} />

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
    </div>
  );
}

export default App;
