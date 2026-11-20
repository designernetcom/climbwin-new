import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ComparisonContext = createContext();

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within ComparisonProvider');
  }
  return context;
};

export const ComparisonProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);
  const maxCompareItems = 4;

  useEffect(() => {
    const saved = localStorage.getItem('compareList');
    if (saved) {
      try {
        setCompareList(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load comparison list:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (product) => {
    if (compareList.find(item => item.id === product.id)) {
      toast.info('Product already in comparison list');
      return;
    }

    if (compareList.length >= maxCompareItems) {
      toast.error(`You can only compare up to ${maxCompareItems} products at once`);
      return;
    }

    setCompareList(prev => [...prev, product]);
    toast.success('Added to comparison list');
  };

  const removeFromCompare = (productId) => {
    setCompareList(prev => prev.filter(item => item.id !== productId));
    toast.success('Removed from comparison');
  };

  const clearCompare = () => {
    setCompareList([]);
    toast.success('Comparison list cleared');
  };

  const isInCompare = (productId) => {
    return compareList.some(item => item.id === productId);
  };

  return (
    <ComparisonContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        maxCompareItems,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};
