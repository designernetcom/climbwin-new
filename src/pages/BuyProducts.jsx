import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Products from './Products';

const BuyProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Automatically set is_rentable=0 for buy products
    const params = new URLSearchParams(searchParams);
    if (!params.has('is_rentable')) {
      params.set('is_rentable', '0');
      setSearchParams(params, { replace: true });
    }
  }, []);

  return <Products defaultRentable="0" pageTitle="Products For Sale" />;
};

export default BuyProducts;
