import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { testeTeste } from '../../services/api'; // Crie esta função no serviço

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getItemDetails = async () => {
      try {
        const data = await testeTeste();
        const itemDetails = data?.sections
          .flatMap((section: any) => section.items)
          .find((item: any) => item.id === parseInt(id as string));
        setItem(itemDetails);
      } catch (err) {
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
      <img src={item?.images[0].image} alt={item?.name} />
      <p>{item?.description}</p>
      <p>{item?.price} {item?.ccySymbol}</p>
      <button>Adicionar ao Carrinho</button>
    </div>
  );
};

export default ItemDetails;
