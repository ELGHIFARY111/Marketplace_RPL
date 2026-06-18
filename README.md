<div align="center">
  <h1>🌟 Zenvy Apparel Marketplace</h1>
  <p>A premium, modern full-stack e-commerce platform for fashion and apparel.</p>

  <!-- Badges -->
  <img src="https://img.shields.io/badge/React-18.x-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/MySQL-Aiven-orange?style=for-the-badge&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/Vite-Bundler-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/Status-Production_Ready-success?style=for-the-badge" alt="Status" />
</div>

<br />

## 📖 About The Project

**Zenvy Apparel Marketplace** is a fully functional, production-ready e-commerce web application. Designed with a focus on modern UI/UX aesthetics (glassmorphism, smooth animations, premium typography), the platform provides a seamless shopping experience for customers and a powerful management interface for administrators.

### ✨ Key Features

**🛍️ For Customers:**
*   **Modern Storefront:** Beautiful product catalog with responsive grids and skeleton loading states.
*   **Smart Filtering:** Filter products by categories, sizes, colors, and search by keywords.
*   **Dynamic Cart & Checkout:** Real-time cart updates, multiple address management, and seamless checkout flows.
*   **Order Tracking & History:** Track order status in real-time, view past purchases, and leave product reviews/ratings.
*   **Customer Support:** Built-in ticketing system to contact CS directly from the profile.

**🛡️ For Administrators:**
*   **Analytics Dashboard:** Interactive charts (using Recharts) for revenue, order statistics, and customer metrics.
*   **Inventory Management:** Full CRUD operations for products, variants (colors/sizes), and dynamic image galleries.
*   **Order Fulfillment:** Manage order lifecycles (Pending -> Paid -> Processed -> Shipped -> Delivered).
*   **Promotions Engine:** Create and manage dynamic discount codes and cart coupons.
*   **CS Helpdesk:** Respond to customer support tickets and inquiries.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, React Router DOM, Axios, Lucide React (Icons), Recharts |
| **Backend** | Node.js, Express.js, JWT (JSON Web Tokens), Multer, Bcrypt, CORS |
| **Database** | MySQL (Hosted on Aiven), optimized with raw SQL queries |
| **Infrastructure** | Vercel (Frontend Hosting), Render (Backend Hosting) |
| **Architecture** | RESTful API, MVC Controller Pattern, In-Memory API Caching |

---

## 🚀 Getting Started (Local Development)

Follow these instructions to get a copy of the project up and running on your local machine.

### 1. Clone the repository
```bash
git clone https://github.com/ELGHIFARY111/Marketplace_RPL.git
cd Marketplace_RPL
```

### 2. Database Setup
Create a new MySQL database named `marketplace_db`. Import the provided database schema:
```bash
mysql -u root -p marketplace_db < backend/database/schema.sql
```
*(Note: If you have additional migration files like `migration_terkirim_rating.sql`, import them sequentially).*

### 3. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=marketplace_db
DB_PORT=3306
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=development
```
Start the backend server:
```bash
npm run dev
```

### 4. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The application will automatically open in your browser (usually `http://localhost:5173`).

---

## 🔐 Default Credentials

To access the Admin Dashboard for testing, use the following default credentials:

*   **Email:** `admin1@gmail.com`
*   **Password:** `123`

---

## 📂 Project Structure

```text
Marketplace_RPL/
├── backend/                  # Express.js Server
│   ├── config/               # Database connection strings
│   ├── controllers/          # Business logic & query execution
│   ├── middleware/           # JWT Auth & Multer upload middlewares
│   ├── routes/               # API endpoint definitions
│   ├── utils/                # Helper functions (Cache TTL, etc.)
│   └── database/             # SQL schema definitions
│
└── frontend/                 # React UI Client
    ├── src/
    │   ├── components/       # Reusable UI elements (Navbar, Loading, Alerts)
    │   ├── context/          # React Context (Auth State)
    │   ├── layouts/          # Page wrappers (AdminLayout)
    │   ├── pages/            # View components (Admin & Customer pages)
    │   └── services/         # Axios API configuration
    └── vercel.json           # Vercel deployment & routing config
```

---

## ⚙️ Deployment Notes

*   **Frontend (Vercel):** The project includes a `vercel.json` file configured for SPA routing (rewriting all traffic to `/index.html`) to prevent 404 errors on page refresh, alongside aggressive caching for static assets.
*   **Backend (Render):** Make sure to configure the Render environment variables to match your production Aiven MySQL credentials. Ensure the build command `npm install` and start command `node server.js` are correctly set.

<br />
<div align="center">
  <p>Built with ❤️ by the Zenvy Development Team.</p>
</div>
