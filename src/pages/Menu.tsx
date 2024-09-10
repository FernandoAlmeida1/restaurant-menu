import React, { useEffect, useState } from 'react';
import { fetchMenuDetails } from '../services/api'; // Verifique o caminho

const Menu = () => {
  const [menu, setMenu] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const data = await fetchMenuDetails();
        setMenu(data);
      } catch (err) {
        setError('Erro ao carregar o menu');
      } finally {
        setLoading(false);
      }
    };

    getMenuData();
  }, []);

  if (loading) return <div>Carregando menu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Menu</h1>
      {menu && <pre>{JSON.stringify(menu, null, 2)}</pre>}
    </div>
  );
};

export default Menu;
