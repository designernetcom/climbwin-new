# API Testing Guide

## Quick Test - Fetch Data from API

### Method 1: Using curl (Command Line)

```bash
# Test Categories
curl https://api.rentalgurufurniture.com/api/v1/categories

# Test Products
curl https://api.rentalgurufurniture.com/api/v1/products

# Test Featured Products
curl https://api.rentalgurufurniture.com/api/v1/products/featured/list

# Test Brands
curl https://api.rentalgurufurniture.com/api/v1/brands

# Test with Authentication (after login)
curl -H "Authorization: Bearer YOUR_TOKEN" https://api.rentalgurufurniture.com/api/v1/cart
```

### Method 2: Using Browser

Open your browser and visit:
- https://api.rentalgurufurniture.com/api/v1/categories
- https://api.rentalgurufurniture.com/api/v1/products
- https://api.rentalgurufurniture.com/api/v1/brands

### Method 3: Using the React App

The React components already have data fetching built-in. Here's how it works:

#### Example: Home.jsx fetches data

```javascript
// In src/pages/Home.jsx
import { productService } from '../services';

useEffect(() => {
  const fetchProducts = async () => {
    try {
      // Fetch featured products
      const featured = await productService.getFeaturedProducts({ per_page: 8 });

      // Fetch new arrivals
      const newProducts = await productService.getProductsByType('new_arrival', { per_page: 8 });

      if (featured.success) {
        setFeaturedProducts(featured.data.data);
      }
      if (newProducts.success) {
        setNewArrivals(newProducts.data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchProducts();
}, []);
```

#### Example: Products.jsx fetches with filters

```javascript
// In src/pages/Products.jsx
import { productService } from '../services';

const fetchProducts = async () => {
  try {
    const params = Object.fromEntries(searchParams);
    const response = await productService.getProducts(params);

    if (response.success) {
      setProducts(response.data.data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Example: Cart operations

```javascript
// Using CartContext
import { useCart } from '../contexts/CartContext';

const { cart, addToCart } = useCart();

// Add to cart
await addToCart({
  product_id: 1,
  qty: 2,
  purchase_type: 'buy'
});

// Cart data is automatically fetched and stored in context
console.log(cart.items); // Array of cart items
console.log(cart.total); // Total price
```

### Testing in React DevTools

1. **Start the React app:**
   ```bash
   cd react-frontend
   npm run dev
   ```

2. **Open browser:** http://localhost:3000

3. **Open DevTools:** Press F12

4. **Check Network tab:**
   - You'll see API requests to `/api/v1/...`
   - Click on any request to see the response data

5. **Check Console:**
   - Any errors will show here
   - You can also manually test:
   ```javascript
   // In browser console
   fetch('https://api.rentalgurufurniture.com/api/v1/categories')
     .then(r => r.json())
     .then(data => console.log(data));
   ```

### Common API Calls

```javascript
// Import services
import {
  productService,
  categoryService,
  cartService,
  authService
} from './services';

// Get all products
const products = await productService.getProducts({
  per_page: 12,
  sort_by: 'newest'
});

// Get products with filters
const filtered = await productService.getProducts({
  category: 'furniture',
  price_min: 100,
  price_max: 500,
  for_rent: true
});

// Get single product
const product = await productService.getProduct(1);

// Get categories
const categories = await categoryService.getCategories();

// Login
const result = await authService.login({
  email: 'test@example.com',
  password: 'password123'
});

// Add to cart (requires auth)
await cartService.addToCart({
  product_id: 1,
  qty: 2,
  purchase_type: 'buy'
});
```

### Debugging Tips

1. **Check API URL in .env:**
   ```
   VITE_API_URL=https://api.rentalgurufurniture.com/api/v1
   ```

2. **Check Network tab in DevTools:**
   - Look for failed requests (red)
   - Check request headers
   - Check response data

3. **Check Console for errors:**
   - CORS errors
   - 404 errors
   - Authentication errors

4. **Test API directly:**
   - Use Postman or Thunder Client
   - Or just use curl/browser

### Troubleshooting

**If you see CORS errors:**
1. Update `config/cors.php` in Laravel
2. Add your React dev server URL to allowed origins
3. Run `php artisan config:clear`

**If API returns 404:**
1. Check the URL is correct
2. Verify routes exist: `php artisan route:list --path=api`
3. Check Apache mod_rewrite is enabled

**If authentication doesn't work:**
1. Check token is being sent in headers
2. Verify Sanctum is configured
3. Check localStorage has the token

### Example: Manual Fetch Test

Create a test component to verify API connection:

```jsx
// src/pages/Test.jsx
import { useEffect, useState } from 'react';

const Test = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.rentalgurufurniture.com/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API Error:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>API Test</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default Test;
```

Then add route in App.jsx:
```jsx
<Route path="/test" element={<Test />} />
```

Visit http://localhost:3000/test to see the API data!
