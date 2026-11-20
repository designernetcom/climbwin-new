import { useEffect, useState } from 'react';
import { flashSaleService } from '../services/flashSaleService';
import ProductCard from '../components/ProductCard';
import { FiClock } from 'react-icons/fi';

const FlashSale = () => {
  const [flashSales, setFlashSales] = useState([]);
  const [endDate, setEndDate] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFlashSales();
  }, []);

  useEffect(() => {
    if (endDate) {
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [endDate]);

  const fetchFlashSales = async () => {
    try {
      const response = await flashSaleService.getFlashSales({ show_at_home: false });
      if (response.success) {
        setFlashSales(response.data.items);
        setEndDate(response.data.end_date);
      }
    } catch (error) {
      console.error('Error fetching flash sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTimeLeft = () => {
    if (!endDate) return;

    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const difference = end - now;

    if (difference > 0) {
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    } else {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading flash sales...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Flash Sale</h1>
        <p className="text-gray-600 text-center mb-6">
          Grab these amazing deals before time runs out!
        </p>

        {/* Countdown Timer */}
        {endDate && (
          <div className="flex justify-center items-center gap-4 bg-red-50 p-6 rounded-lg max-w-2xl mx-auto">
            <FiClock className="text-red-600 text-3xl" />
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Sale ends in</p>
              <div className="flex gap-4">
                <div className="bg-white px-4 py-2 rounded shadow">
                  <div className="text-2xl font-bold text-red-600">{timeLeft.days}</div>
                  <div className="text-xs text-gray-600">Days</div>
                </div>
                <div className="bg-white px-4 py-2 rounded shadow">
                  <div className="text-2xl font-bold text-red-600">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-600">Hours</div>
                </div>
                <div className="bg-white px-4 py-2 rounded shadow">
                  <div className="text-2xl font-bold text-red-600">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-600">Minutes</div>
                </div>
                <div className="bg-white px-4 py-2 rounded shadow">
                  <div className="text-2xl font-bold text-red-600">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-600">Seconds</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {flashSales.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {flashSales.map((item) => (
            <ProductCard key={item.id} product={item.product} showBadge={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No flash sale items available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default FlashSale;
