# Data Fetching Guide - How the React App Fetches API Data

## 🎯 Your React App is Running!

**Access it here:** http://localhost:3001

The app is now fetching data from your Laravel API at: `https://api.rentalgurufurniture.com/api/v1`

---

## 📊 How Data Fetching Works

### Architecture Overview

```
React Components
    ↓
Context API (State Management)
    ↓
Service Functions (API calls)
    ↓
Axios HTTP Client
    ↓
Laravel API Backend
    ↓
Database
```

---

## 🔧 Service Layer (API Calls)

All API calls are centralized in the `src/services/` directory:

### 1. Product Service (`src/services/productService.js`)

```javascript
import api from './api';

export const productService = {
  // GET /api/v1/products
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // GET /api/v1/products/{id}
  getProduct: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // GET /api/v1/products/featured/list
  getFeaturedProducts: async (params = {}) => {
    const response = await api.get('/products/featured/list', { params });
    return response.data;
  },
};
```

### 2. Category Service (`src/services/categoryService.js`)

```javascript
export const categoryService = {
  // GET /api/v1/categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // GET /api/v1/brands
  getBrands: async () => {
    const response = await api.get('/brands');
    return response.data;
  },
};
```

### 3. Cart Service (`src/services/cartService.js`)

```javascript
export const cartService = {
  // GET /api/v1/cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response.data;
  },

  // POST /api/v1/cart
  addToCart: async (data) => {
    const response = await api.post('/cart', data);
    return response.data;
  },
};
```

---

## 🎨 Context API (State Management)

### CartContext Example (`src/contexts/CartContext.jsx`)

```javascript
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], subtotal: 0, total: 0 });

  // Fetch cart data from API
  const fetchCart = async () => {
    try {
      const response = await cartService.getCart();
      if (response.success) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Auto-fetch cart when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  return (
    <CartContext.Provider value={{ cart, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};
```

---

## 📄 Page Components (Using Services & Context)

### Home Page (`src/pages/Home.jsx`)

```javascript
import { productService } from '../services';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // API Call: GET /api/v1/products/featured/list?per_page=8
        const response = await productService.getFeaturedProducts({ per_page: 8 });

        if (response.success) {
          setFeaturedProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
```

### Products Page (`src/pages/Products.jsx`)

```javascript
import { productService } from '../services';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Convert URL params to object
        const params = Object.fromEntries(searchParams);

        // API Call: GET /api/v1/products?category=furniture&sort_by=newest
        const response = await productService.getProducts(params);

        if (response.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProducts();
  }, [searchParams]); // Re-fetch when URL params change

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
```

### Product Detail Page (`src/pages/ProductDetail.jsx`)

```javascript
import { useParams } from 'react-router-dom';
import { productService } from '../services';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // API Call: GET /api/v1/products/slug/{slug}
        const response = await productService.getProductBySlug(slug);

        if (response.success) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchProduct();
  }, [slug]);

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>${product?.price}</p>
    </div>
  );
};
```

---

## 🛒 Cart Operations (Using Context)

### Adding to Cart

```javascript
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    // API Call: POST /api/v1/cart
    await addToCart({
      product_id: product.id,
      qty: 1,
      purchase_type: 'buy'
    });
    // Cart context automatically updates
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
};
```

### Viewing Cart

```javascript
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, updateCartItem, removeCartItem } = useCart();

  return (
    <div>
      <h1>Cart ({cart.item_count} items)</h1>
      {cart.items.map(item => (
        <div key={item.id}>
          <h3>{item.product.name}</h3>
          <p>${item.price}</p>
          <button onClick={() => updateCartItem(item.id, item.qty + 1)}>+</button>
          <span>{item.qty}</span>
          <button onClick={() => updateCartItem(item.id, item.qty - 1)}>-</button>
          <button onClick={() => removeCartItem(item.id)}>Remove</button>
        </div>
      ))}
      <p>Total: ${cart.total}</p>
    </div>
  );
};
```

---

## 🔐 Authentication & Protected Routes

### Login

```javascript
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // API Call: POST /api/v1/login
    const result = await login({
      email: 'test@example.com',
      password: 'password123'
    });

    if (result.success) {
      // Token automatically stored in localStorage
      // User redirected to home page
      navigate('/');
    }
  };
};
```

### Using Auth Token in Requests

The `src/services/api.js` file automatically adds the token to all requests:

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 📡 Real-Time Data Flow Example

### When you click "Add to Cart":

1. **User clicks button** in `ProductCard.jsx`
2. **Component calls** `addToCart()` from `CartContext`
3. **Context calls** `cartService.addToCart(data)`
4. **Service makes** `POST /api/v1/cart` request via Axios
5. **Laravel API** receives request, validates, saves to database
6. **API returns** success response with updated cart
7. **Context updates** cart state with new data
8. **All components** using `useCart()` re-render with new cart data
9. **Header shows** updated cart count badge
10. **Cart page shows** new item

---

## 🎬 Live Data Fetching in Action

### Open Your Browser DevTools:

1. **Visit:** http://localhost:3001
2. **Press F12** to open DevTools
3. **Go to Network tab**
4. **Refresh the page**

You'll see API requests like:
```
GET https://api.rentalgurufurniture.com/api/v1/products/featured/list?per_page=8
GET https://api.rentalgurufurniture.com/api/v1/products/type/new_arrival?per_page=8
```

Click on any request to see:
- **Headers**: Auth token, content-type
- **Response**: JSON data from API
- **Preview**: Formatted data view

---

## 🧪 Testing Data Fetching

### Method 1: Browser Console

Open http://localhost:3001, press F12, go to Console:

```javascript
// Test product service
fetch('https://api.rentalgurufurniture.com/api/v1/products')
  .then(r => r.json())
  .then(data => console.log(data));

// Test categories
fetch('https://api.rentalgurufurniture.com/api/v1/categories')
  .then(r => r.json())
  .then(data => console.log(data));
```

### Method 2: React DevTools

1. Install React DevTools extension
2. Open DevTools → Components tab
3. Select any component
4. View props and state
5. See real data from API

---

## 📝 API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {
    // Paginated response
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "name": "Product Name",
        "price": 99.99,
        "thumb_image": "/uploads/products/image.jpg",
        // ... more product data
      }
    ],
    "total": 50,
    "per_page": 12
  }
}
```

Or for single items:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Product Name",
    "price": 99.99
  }
}
```

---

## 🐛 Debugging Data Fetching Issues

### Check these in order:

1. **API is accessible:**
   ```bash
   curl https://api.rentalgurufurniture.com/api/v1/categories
   ```

2. **React app is running:**
   - Check http://localhost:3001 loads

3. **Network tab shows requests:**
   - Open DevTools → Network
   - Look for API calls
   - Check if they're successful (200) or failing (404, 500)

4. **Check Console for errors:**
   - CORS errors?
   - Authentication errors?
   - Network errors?

5. **Verify .env file:**
   ```
   VITE_API_URL=https://api.rentalgurufurniture.com/api/v1
   ```

---

## 🎯 Common Use Cases

### Fetch Products with Filters

```javascript
const response = await productService.getProducts({
  category: 'furniture',
  price_min: 100,
  price_max: 500,
  sort_by: 'price_low',
  per_page: 20
});
```

### Search Products

```javascript
const response = await productService.getProducts({
  search: 'sofa',
  per_page: 12
});
```

### Get Rental Products

```javascript
const response = await productService.getProducts({
  for_rent: true,
  per_page: 12
});
```

### Add Product to Cart with Rental

```javascript
await cartService.addToCart({
  product_id: 1,
  qty: 1,
  purchase_type: 'rent',
  rental_duration: 6  // months
});
```

---

## 🚀 Next Steps

1. **Browse the app**: http://localhost:3001
2. **Register an account**: Click Register in header
3. **Browse products**: View all products
4. **Add to cart**: Click "Add to Cart" on any product
5. **View cart**: Click cart icon in header
6. **Check Network tab**: See all API calls in real-time!

---

## 📚 File Locations

- **Services**: `src/services/`
- **Contexts**: `src/contexts/`
- **Pages**: `src/pages/`
- **Components**: `src/components/`
- **API Config**: `src/services/api.js`
- **Environment**: `.env`

---

**Your app is now live and fetching data from the API! 🎉**

Visit http://localhost:3001 to see it in action!
