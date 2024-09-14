import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; 
import { fetchRestaurantDetails, fetchRestaurantMenu } from '../../services/api';
import Header from '../../components/Header/Header';
import SearchBar from '../../components/SearchBar/SearchBar';
import MainContent from '../../components/MainContent/MainContent';
import Loading from '../../components/Loading/Loading';  
import './Home.css';

export interface Restaurant {
  webSettings: {
    bannerImage: string;
    navBackgroundColour: string;
    primaryColour: string;
  };
}

export interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: { id: number; image: string }[]; 
}

export interface SectionItem {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface Menu {
  sections: SectionItem[];
}

const Home: React.FC = () => {
  const { t } = useTranslation(); 
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [filteredMenu, setFilteredMenu] = useState<Menu | null>(null);
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

        const menuData = await fetchRestaurantMenu();
        setMenu(menuData);
        setFilteredMenu(menuData);
      } catch {
        setError(t("error")); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

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
        sections: menu.sections.map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
          )
        }))
      };
      setFilteredMenu(filtered);
    }
  };

  if (loading) return <Loading />;  
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
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

      {tabValue === 0 && (
        <MainContent
          tabValue={tabValue}
          filteredMenu={filteredMenu}
          isMobile={isMobile}
        />
      )}

      {tabValue === 1 && <section><h2>{t("login")}</h2></section>}
      {tabValue === 2 && <section><h2>{t("contact")}</h2></section>} 
    </div>
  );
};

export default Home;
