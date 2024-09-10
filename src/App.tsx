import React, { useEffect, useState } from "react";
import { fetchRestaurantDetails, testeTeste } from "./services/api"; // Importando os dois endpoints

interface WebSettings {
  bannerImage: string;
  backgroundColour: string;
  primaryColour: string;
  primaryColourHover: string;
  navBackgroundColour: string;
}

interface Restaurant {
  name: string;
  webSettings: WebSettings;
  address1: string;
  address2: string;
  city: string;
  description: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: { id: number; image: string }[];
}

interface MenuSection {
  id: number;
  name: string;
  items: MenuItem[];
}

interface Menu {
  id: number;
  name: string;
  sections: MenuSection[];
}

function App() {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar detalhes do restaurante
        const restaurantData = await fetchRestaurantDetails();
        setRestaurant(restaurantData);

        // Carregar menu
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

  return (
    <div style={{ backgroundColor: restaurant?.webSettings.backgroundColour }}>
      {/* Informações do Restaurante */}
      <header
        style={{
          backgroundColor: restaurant?.webSettings.navBackgroundColour,
          color: restaurant?.webSettings.primaryColour,
        }}
      >
        <img src={restaurant?.webSettings.bannerImage} alt="Banner" />
        <h1>{restaurant?.name}</h1>
      </header>

      <div>
        <p>
          Endereço: {restaurant?.address1}, {restaurant?.address2}
        </p>
        <p>Cidade: {restaurant?.city}</p>
        <p>
          Descrição: {restaurant?.description || "Nenhuma descrição disponível"}
        </p>
      </div>

      {/* Exibição do Menu */}
      <section>
        <h2>Menu</h2>
        {menu?.sections && menu.sections.map((section) => (
  <div key={section.id}>
    <h3>{section.name}</h3>
    {section.items && section.items.map((item) => (
      <div key={item.id} style={{ marginBottom: "20px" }}>
        <h4>{item.name}</h4>
        <p>{item.description || "Sem descrição"}</p>
        <p>Preço: R$ {item.price.toFixed(2)}</p>
        {item.images && item.images.length > 0 && (
          <img
            src={item.images[0].image}
            alt={item.name}
            style={{ width: "100px", height: "100px" }}
          />
        )}
      </div>
    ))}
  </div>
))}

      </section>
    </div>
  );
}

export default App;
