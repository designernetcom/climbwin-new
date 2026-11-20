# Production API Configuration Guide

This document explains the configuration for connecting the React frontend to the production API at `https://climb.rentalgurufurniture.com`.

## Configuration Summary

### Environment Variables

Both development and production environments are now configured to use the production API:

**Development (.env):**
```env
VITE_API_URL=https://climb.rentalgurufurniture.com/api/v1
VITE_BASE_URL=https://climb.rentalgurufurniture.com
```

**Production (.env.production):**
```env
VITE_API_URL=https://climb.rentalgurufurniture.com/api/v1
VITE_BASE_URL=https://climb.rentalgurufurniture.com
```

### Key Changes Made

1. **Environment Variables Updated**
   - Both `.env` and `.env.production` now point to `https://climb.rentalgurufurniture.com`
   - API endpoints: `https://climb.rentalgurufurniture.com/api/v1`
   - Image base URL: `https://climb.rentalgurufurniture.com`

2. **Image Helper Configuration** (src/utils/imageHelper.js)
   - Updated fallback URL to `https://climb.rentalgurufurniture.com`
   - Images now load from: `https://climb.rentalgurufurniture.com/uploads/media_xxx.png`

3. **CORS Configuration** (config/cors.php)
   - Fixed trailing slash issue in allowed origins
   - Added `https://www.climbwin.com` for www subdomain support
   - Supports credentials for authentication

4. **API Service** (src/services/api.js)
   - Already properly configured with:
     - Request interceptor for auth tokens
     - Response interceptor for error handling
     - Automatic 401 redirect to login
     - Comprehensive error logging

## Security Features

### ✅ Implemented Security Measures

1. **HTTPS Enforced**: All API calls use secure HTTPS
2. **Bearer Token Authentication**: Automatic token injection via interceptors
3. **CORS Protection**: Backend configured with specific allowed origins
4. **Credentials Support**: `supports_credentials: true` for cookie-based auth
5. **Error Handling**: Comprehensive error logging and user feedback
6. **401 Auto-Redirect**: Automatic logout and redirect on unauthorized access

### API Request Flow

```
User Action → React Component → API Service
                                    ↓
                            Add Bearer Token (Interceptor)
                                    ↓
                            HTTPS Request to API
                                    ↓
                            CORS Check (Backend)
                                    ↓
                            Process Request
                                    ↓
                            Response Interceptor
                                    ↓
                            Handle Errors/Success
                                    ↓
                            Update UI
```

## How to Use

### For Development

1. **Start the dev server:**
   ```bash
   cd react-frontend
   npm run dev
   ```

2. **Access the app:**
   - Open http://localhost:3000
   - All API calls will go to https://climbwin.com/api/v1

3. **Switch to Local API (if needed):**
   - Edit `.env` file:
     ```env
     VITE_API_URL=http://localhost:8000/api/v1
     VITE_BASE_URL=http://localhost:8000
     ```
   - Restart dev server

### For Production

1. **Build the app:**
   ```bash
   cd react-frontend
   npm run build
   ```

2. **Deploy the `dist` folder:**
   - The build automatically uses `.env.production`
   - Deploy to your hosting service (Netlify, Vercel, etc.)

## Testing the Configuration

### 1. Test API Connection

Open browser console and check for:
```
🔧 API Configuration: {
  baseURL: "https://climb.rentalgurufurniture.com/api/v1",
  env: "development"
}
```

### 2. Test API Request

Monitor console for successful requests:
```
📤 API Request: {
  method: "GET",
  url: "/products",
  fullURL: "https://climb.rentalgurufurniture.com/api/v1/products"
}

✅ API Response: {
  status: 200,
  url: "/products",
  data: {...}
}
```

### 3. Test Image Loading

- Navigate to any product page
- Check that images load from `https://climb.rentalgurufurniture.com/uploads/...`
- Open DevTools → Network → Filter by "Img" to verify URLs

### 4. Test Authentication

1. Login to the application
2. Check console for auth token:
   ```
   📤 API Request: {
     headers: {
       Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGc..."
     }
   }
   ```

## Troubleshooting

### Issue: Images Not Loading

**Symptoms:** Product images show broken/placeholder images

**Solutions:**
1. Check browser console for image URL errors
2. Verify `VITE_BASE_URL` is set correctly
3. Check that backend `/uploads` directory is accessible
4. Verify CORS allows image requests

**Quick Fix:**
```bash
# Restart dev server after .env changes
cd react-frontend
npm run dev
```

### Issue: CORS Errors

**Symptoms:** Console shows "CORS policy" errors

**Solutions:**
1. Verify backend CORS config includes your frontend URL
2. Check that `supports_credentials: true` in cors.php
3. Ensure no trailing slashes in allowed_origins
4. Clear browser cache and retry

**Check CORS Configuration:**
```php
// config/cors.php
'allowed_origins' => [
    'https://climb.rentalgurufurniture.com',
    'https://climbwin.com',
    'http://localhost:3000',
],
```

### Issue: 401 Unauthorized

**Symptoms:** Automatic logout or "Unauthorized" errors

**Solutions:**
1. Check that token is stored in localStorage
2. Verify token hasn't expired
3. Ensure Authorization header is being sent
4. Check backend authentication middleware

**Debug:**
```javascript
// In browser console
localStorage.getItem('token')
```

### Issue: Network Errors

**Symptoms:** "Network Error" or timeout messages

**Solutions:**
1. Verify API is accessible: Visit https://climb.rentalgurufurniture.com/api/v1
2. Check internet connection
3. Verify backend server is running
4. Check firewall/security settings

### Issue: Slow Loading

**Symptoms:** API requests take too long

**Solutions:**
1. Check network tab in DevTools for slow requests
2. Verify backend performance
3. Consider implementing:
   - Request caching
   - Lazy loading for images
   - Pagination for large datasets

## Environment Variable Reference

| Variable | Development | Production | Purpose |
|----------|------------|------------|---------|
| `VITE_API_URL` | `https://climb.rentalgurufurniture.com/api/v1` | `https://climb.rentalgurufurniture.com/api/v1` | API base URL |
| `VITE_BASE_URL` | `https://climb.rentalgurufurniture.com` | `https://climb.rentalgurufurniture.com` | Image base URL |

## Additional Notes

### Console Logging

- **Development:** Full logging enabled (all API requests/responses)
- **Production:** Console logs removed by Terser minification (see vite.config.js)

### Vite Proxy (Development Only)

The vite.config.js includes a proxy for `/api` requests in development:
```javascript
proxy: {
  '/api': {
    target: 'https://climb.rentalgurufurniture.com',
    changeOrigin: true,
    secure: false,
  }
}
```

This proxy is **only active during development** (`npm run dev`) and is not included in production builds.

### Performance Optimizations

The production build includes:
- Code splitting for vendor libraries
- Minification with Terser
- Console.log removal
- Chunk size optimization (1000kb warning limit)

## Need Help?

If you encounter issues not covered here:

1. Check browser console for detailed error messages
2. Review network tab for failed requests
3. Verify backend server status and logs
4. Ensure all dependencies are installed: `npm install`
5. Try clearing browser cache and restarting dev server

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check environment variables (in running app)
# Open browser console and type:
import.meta.env
```
