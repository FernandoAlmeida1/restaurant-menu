import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRestaurantMenu } from '../../services/api';

interface MenuItem {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: { id: number; image: string }[];
  ccySymbol: string;
}

interface SectionItem {
  id: number;
  name: string;
  items: MenuItem[];
}

interface Menu {
  sections: SectionItem[];
}

const ItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<MenuItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const data: Menu = await fetchRestaurantMenu();
        // Convert id to a number only if it's defined
        const itemId = id ? parseInt(id, 10) : NaN;
        const itemDetails = data.sections
          .flatMap((section) => section.items)
          .find((item) => item.id === itemId);
        setItem(itemDetails || null);
      } catch {
        setError('Erro ao carregar os detalhes do item');
      } finally {
        setLoading(false);
      }
    };

    getItemDetails();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{item?.name}</h1>
      {item?.images[0] && <img src={item.images[0].image} alt={item.name} />}
      <p>{item?.description}</p>
      <p>{item?.price} {item?.ccySymbol}</p>
      <button>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ItemDetails;
