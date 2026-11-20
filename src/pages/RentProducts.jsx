import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Products from './Products';

const RentProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Automatically set is_rentable=1 for rent products
    const params = new URLSearchParams(searchParams);
    if (!params.has('is_rentable')) {
      params.set('is_rentable', '1');
      setSearchParams(params, { replace: true });
    }
  }, []);

  return <Products defaultRentable="1" pageTitle="Products For Rent" />;
};

export default RentProducts;
