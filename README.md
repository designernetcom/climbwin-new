# Rental Marketplace - React Frontend

A modern React.js frontend for the multi-vendor rental and e-commerce marketplace, built with React, Vite, Tailwind CSS, and integrates with the Laravel API.

## Features

- 🎨 **Modern UI/UX** - Clean, responsive design matching the original Laravel Blade templates
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development and builds
- 🎯 **TypeScript Ready** - Fully compatible with TypeScript (easily convertible)
- 🔐 **Authentication** - Complete auth system with Laravel Sanctum
- 🛒 **Shopping Cart** - Full cart management with rental duration support
- ❤️ **Wishlist** - Save favorite products
- 💳 **Multiple Payment Gateways** - Stripe, PayPal, Razorpay, COD
- 📱 **Responsive Design** - Mobile-first approach
- 🎭 **State Management** - React Context API for global state
- 🚀 **API Integration** - Complete integration with Laravel API

## Tech Stack

- **React 18** - Modern React with Hooks
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **React Icons** - Icon library
- **Swiper** - Modern slider library
- **SweetAlert2** - Beautiful modals and alerts

## Project Structure

```
react-frontend/
├── public/                # Static files
├── src/
│   ├── components/       # Reusable components
│   │   ├── layout/       # Layout components (Header, Footer)
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/         # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── pages/            # Page components
│   │   ├── auth/         # Login, Register
│   │   ├── dashboard/    # User dashboard pages
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   └── ...
│   ├── services/         # API services
│   │   ├── api.js        # Axios instance
│   │   ├── authService.js
│   │   ├── productService.js
│   │   ├── cartService.js
│   │   ├── categoryService.js
│   │   └── index.js      # All services export
│   ├── App.jsx           # Main App component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles + Tailwind
├── .env                  # Environment variables
├── index.html            # HTML template
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── README.md             # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Laravel API backend running

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd react-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   # Create .env file in the root of react-frontend directory
   ```

   Add the following to `.env`:
   ```
   VITE_API_URL=https://api.rentalgurufurniture.com/api/v1
   VITE_BASE_URL=https://api.rentalgurufurniture.com
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

   The app will run on `http://localhost:3000`

5. **Build for production:**
   ```bash
   npm run build
   ```

   Production files will be in the `dist` directory.

## API Configuration

The frontend is configured to communicate with the Laravel API. Update the API URL in `.env`:

```
VITE_API_URL=https://api.rentalgurufurniture.com/api/v1
VITE_BASE_URL=https://api.rentalgurufurniture.com
```

The API client (`src/services/api.js`) automatically:
- Adds authentication tokens to requests
- Handles 401 unauthorized responses
- Sets proper headers

## Key Features Implementation

### Authentication

The app uses Laravel Sanctum for authentication:

```javascript
// Login
import { useAuth } from './contexts/AuthContext';

const { login } = useAuth();
await login({ email, password });
```

Tokens are stored in localStorage and automatically added to API requests.

### Cart Management

Cart uses database-based storage via API (stateless):

```javascript
import { useCart } from './contexts/CartContext';

const { cart, addToCart, updateCartItem, removeCartItem } = useCart();

// Add to cart
await addToCart({
  product_id: 1,
  qty: 2,
  purchase_type: 'rent',
  rental_duration: 6
});
```

### Wishlist

```javascript
import { useWishlist } from './contexts/WishlistContext';

const { wishlist, toggleWishlist } = useWishlist();

// Toggle wishlist
await toggleWishlist(productId);
```

### Protected Routes

Routes that require authentication use the `ProtectedRoute` component:

```javascript
<Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>
```

## Available Routes

### Public Routes
- `/` - Home page
- `/products` - Product listing
- `/products/:slug` - Product detail
- `/about` - About page
- `/contact` - Contact page
- `/login` - Login
- `/register` - Register

### Protected Routes (require authentication)
- `/cart` - Shopping cart
- `/checkout` - Checkout
- `/wishlist` - Wishlist
- `/dashboard` - User dashboard
- `/dashboard/profile` - User profile
- `/dashboard/orders` - Order history
- `/dashboard/orders/:id` - Order detail
- `/payment-success` - Payment success page

## Styling

The app uses Tailwind CSS with custom configuration:

### Custom Colors
```javascript
primary: {
  DEFAULT: '#0D3C36',    // Dark teal
  light: '#104D43',
  dark: '#082921',
}
secondary: {
  DEFAULT: '#7355b0',    // Purple
}
accent: {
  DEFAULT: '#FF6B35',    // Orange
}
```

### Utility Classes
```css
.btn              # Base button
.btn-primary      # Primary button
.btn-secondary    # Secondary button
.btn-accent       # Accent button
.btn-outline      # Outline button
.card             # Card container
.badge            # Badge/pill
.input            # Input field
.gradient-bg      # Gradient background
```

## State Management

The app uses React Context API for global state:

- **AuthContext** - User authentication state
- **CartContext** - Shopping cart state
- **WishlistContext** - Wishlist state

## API Services

All API calls are abstracted into service functions:

```javascript
// Product Service
import { productService } from './services';

const products = await productService.getProducts({ per_page: 12 });
const product = await productService.getProduct(id);

// Cart Service
import { cartService } from './services';

await cartService.addToCart(data);
await cartService.updateCartItem(id, { qty: 2 });

// Order Service
import { orderService } from './services';

await orderService.createOrder(orderData);
const orders = await orderService.getOrders();
```

## Development Tips

### Adding New Pages

1. Create page component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link in Header/Footer

### Adding New API Endpoints

1. Add service function in appropriate service file in `src/services/`
2. Export from `src/services/index.js`
3. Use in components via import

### Styling Components

Use Tailwind utility classes for styling. Custom styles go in `src/index.css`.

Example:
```jsx
<div className="card p-6 hover:shadow-xl transition">
  <h2 className="text-2xl font-bold text-primary mb-4">Title</h2>
  <button className="btn btn-primary">Click Me</button>
</div>
```

## Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy
Upload the `dist` folder contents to your web server or use services like:
- Vercel
- Netlify
- AWS S3 + CloudFront
- DigitalOcean App Platform

## Environment Variables

Create a `.env` file:

```
VITE_API_URL=https://api.rentalgurufurniture.com/api/v1
VITE_BASE_URL=https://api.rentalgurufurniture.com
```

For production, update to your production API URL.

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your Laravel backend has CORS configured:

1. In Laravel `config/cors.php`:
```php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:3000'], // Add your frontend URL
```

2. Install Laravel CORS package if not installed:
```bash
composer require fruitcake/laravel-cors
```

### API Not Connecting

1. Check `.env` file has correct API URL
2. Ensure Laravel API is running
3. Check Laravel API routes are accessible
4. Verify authentication token is being sent

### Build Errors

1. Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Clear Vite cache:
```bash
rm -rf node_modules/.vite
```

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Create pull request

## License

This project is part of the Rental Marketplace system.

## Support

For issues or questions:
- Check the API documentation in `../API_DOCUMENTATION.md`
- Review Laravel backend setup
- Check browser console for errors
- Verify API responses in Network tab

## Next Steps

### To Complete Implementation

1. **Enhance Pages:**
   - Complete Checkout page with address selection
   - Add payment gateway integrations (Stripe, PayPal)
   - Enhance Dashboard pages with real data
   - Add product review functionality
   - Implement vendor pages

2. **Add Features:**
   - Product search with autocomplete
   - Advanced filtering
   - Product comparisons
   - Order tracking
   - Live chat/messaging
   - Notifications

3. **Optimization:**
   - Add React Query for caching
   - Implement code splitting
   - Add lazy loading
   - Optimize images
   - Add PWA support

4. **Testing:**
   - Add unit tests (Jest/Vitest)
   - Add component tests (React Testing Library)
   - Add E2E tests (Playwright/Cypress)

## Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

---

Built with ❤️ using React + Vite + Tailwind CSS
