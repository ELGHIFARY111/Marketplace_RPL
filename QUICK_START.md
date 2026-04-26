// Quick Start Guide
# QUICK START GUIDE - Marketplace Apparel

## 1️⃣ Setup Backend

```bash
cd backend
npm install
```

**Configure .env file:**
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=marketplace_db
JWT_SECRET=your_very_secret_key_12345
NODE_ENV=development
```

**Setup Database:**
```bash
# Login ke MySQL
mysql -u root -p

# Create database
CREATE DATABASE marketplace_db;
USE marketplace_db;

# Import schema
mysql -u root -p marketplace_db < database/schema.sql
```

**Run Backend:**
```bash
npm run dev   # dengan auto-reload
# atau
npm start     # production
```

Backend akan running di `http://localhost:5000`

---

## 2️⃣ Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend akan running di `http://localhost:3000`

---

## 3️⃣ Implementasi Checklist

### Backend
- [ ] Implement Auth (Login/Register)
- [ ] Connect all controllers ke database
- [ ] Implement semua routes
- [ ] Add file upload untuk product images
- [ ] Implement JWT authentication
- [ ] Add error handling & validation

### Frontend
- [ ] Setup routing (React Router)
- [ ] Create all pages
- [ ] Connect API services
- [ ] Implement authentication flow
- [ ] Add styling (CSS)
- [ ] Implement loading states
- [ ] Add form validation

---

## 📁 File Structure Summary

**Backend:**
```
backend/
├── server.js           ← Entry point
├── config/db.js        ← Database config
├── middleware/         ← Auth, upload
├── controllers/        ← Business logic
├── routes/            ← API endpoints
└── database/schema.sql ← Database schema
```

**Frontend:**
```
frontend/
├── src/
│   ├── App.jsx         ← Main component
│   ├── main.jsx        ← Entry point
│   ├── components/     ← Reusable components
│   ├── pages/         ← Page components
│   ├── services/api.js ← API calls
│   └── context/       ← State management
├── index.html
└── vite.config.js
```

---

## 🔗 API Endpoints Template

**Auth:**
- POST `/api/auth/login` - Login
- POST `/api/auth/register` - Register

**Products:**
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product detail
- POST `/api/products` - Create product (admin)

**Categories:**
- GET `/api/categories` - Get all categories

**Orders:**
- GET `/api/orders` - Get user orders
- POST `/api/orders` - Create order

**Cart:**
- GET `/api/cart` - Get cart items
- POST `/api/cart` - Add to cart
- DELETE `/api/cart/:id` - Remove from cart

---

## ⚠️ Important Notes

1. **Environment Variables**: Don't commit `.env` file
2. **Database**: Make sure MySQL is running before starting backend
3. **Port Conflicts**: 
   - Backend: 5000
   - Frontend: 3000
   - MySQL: 3306
4. **CORS**: Already configured in `server.js`
5. **Authentication**: Use JWT tokens (bearer token in header)

---

## 🚀 Troubleshooting

**Backend won't start:**
- Check if port 5000 is available
- Check MySQL connection settings
- Check `.env` file exists

**Frontend won't start:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check if port 3000 is available

**Database connection error:**
- Check MySQL is running
- Check username/password in `.env`
- Check database name is correct

---

## 📚 Next Steps

1. Start backend server
2. Start frontend dev server
3. Begin implementing features
4. Test API endpoints using Postman/Thunder Client
5. Connect frontend forms to API
6. Implement authentication
7. Deploy when ready

Good luck! 🎉
