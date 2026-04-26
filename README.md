# Marketplace Apparel - Starter Template

Starter template lengkap untuk project Marketplace Apparel yang mencakup backend dan frontend.

## Struktur Folder

```
Marketplace_Starter/
├── backend/                    # Backend Node.js/Express
│   ├── config/                # Konfigurasi database
│   ├── controllers/           # Business logic
│   ├── middleware/            # Middleware (auth, upload)
│   ├── routes/               # Route definitions
│   ├── database/             # SQL schemas
│   ├── server.js             # Entry point
│   ├── package.json          # Dependencies
│   └── .env                  # Environment variables
│
└── frontend/                  # Frontend React/Vite
    ├── src/
    │   ├── components/       # Reusable components
    │   ├── context/         # Context API
    │   ├── layouts/         # Layout components
    │   ├── pages/           # Page components
    │   │   ├── admin/       # Admin pages
    │   │   ├── customer/    # Customer pages
    │   │   └── auth/        # Auth pages
    │   ├── services/        # API services
    │   ├── App.jsx          # Main app
    │   └── main.jsx         # Entry point
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── eslint.config.js
```

## Setup Backend

1. Navigate ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables (.env):
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=marketplace_db
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

4. Setup database:
```bash
# Buat database di MySQL
mysql -u root -p < database/schema.sql
```

5. Run server:
```bash
npm run dev    # Development dengan nodemon
npm start      # Production
```

## Setup Frontend

1. Navigate ke folder frontend:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Build untuk production:
```bash
npm run build
```

## Backend Routes Template

Sudah ada template untuk:
- `routes/auth.routes.js` - Authentication routes
- `controllers/auth.controller.js` - Auth controller
- Tambahkan routes lainnya sesuai kebutuhan

## Frontend Pages Template

Customer Pages:
- HomePage - Halaman utama
- KatalogPage - Daftar produk
- KeranjangPage - Shopping cart (perlu dibuat)
- ProfilPage - User profile (perlu dibuat)

Admin Pages:
- DashboardPage - Admin dashboard
- Tambahkan pages lainnya sesuai kebutuhan

Auth Pages:
- LoginPage - Halaman login
- RegisterPage - Halaman register
- ForgotPasswordPage (perlu dibuat)
- ResetPasswordPage (perlu dibuat)

## Component Template

Sudah ada:
- Navbar - Navigation bar
- Footer - Footer
- ProductCard - Product card
- AdminSidebar - Admin sidebar
- LoadingSpinner - Loading indicator

## Next Steps

1. ✅ Setup folder structure
2. ✅ Create starter templates
3. ⏳ Install backend dependencies
4. ⏳ Install frontend dependencies
5. ⏳ Setup database
6. ⏳ Implement authentication
7. ⏳ Add remaining pages dan components
8. ⏳ Connect frontend to backend APIs

## Technology Stack

**Backend:**
- Node.js
- Express.js
- MySQL
- JWT untuk authentication
- Multer untuk file upload

**Frontend:**
- React 18
- Vite
- React Router
- Axios
- CSS

## Notes

- Semua template sudah siap untuk dikembangkan
- Gunakan `.env` untuk environment variables
- Jangan lupa setup JWT_SECRET yang kuat
- Pastikan MySQL running sebelum start backend
- Frontend akan running di port 3000, backend di port 5000

---

**Happy Coding! 🚀**
