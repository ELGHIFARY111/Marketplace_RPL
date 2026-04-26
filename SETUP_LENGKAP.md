// README untuk Setup Instructions yang lebih detail
# Setup Instructions Lengkap

## Prerequisites

- Node.js (v14 atau lebih tinggi)
- npm atau yarn
- MySQL Server
- Text Editor atau IDE (VS Code recommended)

## Backend Setup

### 1. Navigate ke backend folder
```bash
cd backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Buat dan configure .env file
Buat file `.env` di folder backend dengan isi:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=marketplace_db
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
```

### 4. Setup Database
```bash
# Masuk ke MySQL CLI
mysql -u root -p

# Di MySQL CLI, jalankan:
CREATE DATABASE marketplace_db;
USE marketplace_db;
EXIT;

# Kemudian import schema dari command line:
mysql -u root -p marketplace_db < database/schema.sql
```

### 5. Start Backend Server
```bash
npm run dev     # Development mode dengan auto-reload
# atau
npm start       # Production mode
```

Server akan jalan di `http://localhost:5000`

---

## Frontend Setup

### 1. Navigate ke frontend folder
```bash
cd frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Backend URL (optional)
Update `src/services/api.js` jika backend tidak di `http://localhost:5000`

### 4. Start Development Server
```bash
npm run dev
```

Frontend akan jalan di `http://localhost:3000`

### 5. Build untuk Production
```bash
npm run build
```

---

## Implementasi Features

### Phase 1: Authentication
- [ ] Implement login endpoint
- [ ] Implement register endpoint
- [ ] Add token storage in frontend
- [ ] Create protected routes

### Phase 2: Products
- [ ] Create product CRUD endpoints
- [ ] Implement product search/filter
- [ ] Add image upload
- [ ] Display products in frontend

### Phase 3: Cart & Orders
- [ ] Implement shopping cart
- [ ] Create order system
- [ ] Add order tracking
- [ ] Implement checkout flow

### Phase 4: Admin Features
- [ ] Admin dashboard
- [ ] Product management
- [ ] User management
- [ ] Order management

### Phase 5: Additional Features
- [ ] Reviews & ratings
- [ ] Promotions & vouchers
- [ ] Customer service messaging
- [ ] Shipping integration

---

## Folder Structures

### Backend Controllers
Setiap controller menghandle business logic untuk resource tertentu:
- `auth.controller.js` - Authentication logic
- `produk.controller.js` - Product operations
- `pesanan.controller.js` - Order operations
- `keranjang.controller.js` - Cart operations
- `kategori.controller.js` - Category operations
- `user.controller.js` - User profile operations
- dst...

### Backend Routes
Setiap route file menghubungkan HTTP endpoints dengan controller:
- `auth.routes.js` - Authentication endpoints
- `produk.routes.js` - Product endpoints
- `pesanan.routes.js` - Order endpoints
- dst...

### Frontend Pages
Organized by role (admin/customer) dan fitur:
- `pages/auth/` - Login, Register, Password Reset
- `pages/customer/` - Customer-facing pages
- `pages/admin/` - Admin dashboard & management pages

### Frontend Components
Reusable components:
- `Navbar.jsx` - Navigation bar
- `Footer.jsx` - Footer
- `ProductCard.jsx` - Product display card
- `AdminSidebar.jsx` - Admin navigation
- `LoadingSpinner.jsx` - Loading indicator

---

## Common Issues & Solutions

### Database Connection Error
**Error:** "Can't connect to MySQL server"
**Solution:**
1. Pastikan MySQL running
2. Cek username/password di .env file
3. Verify database name di .env

### Port Already in Use
**Error:** "EADDRINUSE: address already in use :::5000"
**Solution:**
```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process
taskkill /PID <PID> /F

# Or change port di .env file
```

### Dependencies Installation Error
**Solution:**
```bash
# Delete node_modules dan package-lock.json
rm -rf node_modules package-lock.json

# Install again
npm install
```

### CORS Error
Sudah dikonfigurasi di `server.js`. Jika masih error:
1. Check backend CORS settings
2. Verify frontend API URL di `src/services/api.js`

---

## API Testing

### Using Postman
1. Download & install [Postman](https://www.postman.com/downloads/)
2. Create requests untuk test endpoints
3. Set headers: `Content-Type: application/json`
4. Set auth header: `Authorization: Bearer <token>`

### Example Requests
```
// Login
POST http://localhost:5000/api/auth/login
Body: { "email": "user@example.com", "password": "password" }

// Get Products
GET http://localhost:5000/api/products

// Create Product (dengan Auth)
POST http://localhost:5000/api/products
Headers: Authorization: Bearer <token>
Body: { "name": "Product Name", "price": 50000, ... }
```

---

## Deployment Checklist

- [ ] Environment variables properly configured
- [ ] Database backups created
- [ ] All endpoints tested
- [ ] Frontend built for production
- [ ] SSL certificate installed
- [ ] Database optimized
- [ ] Error logging implemented
- [ ] API rate limiting added
- [ ] Security headers configured
- [ ] CORS properly restricted in production

---

## Useful Commands

```bash
# Backend commands
npm run dev                # Start with nodemon
npm start                  # Start production server
npm test                   # Run tests

# Frontend commands
npm run dev                # Start dev server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run linter

# MySQL commands
mysql -u root -p          # Login to MySQL
SHOW DATABASES;           # List databases
USE marketplace_db;       # Select database
SHOW TABLES;              # List tables
DESC users;               # Show table structure
SELECT * FROM users;      # Query data
```

---

Happy coding! 🚀
