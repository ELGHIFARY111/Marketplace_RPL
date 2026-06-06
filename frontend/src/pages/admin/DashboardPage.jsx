import {
  Users,
  ShoppingBag,
  Wallet,
  Package,
  Bell,
  TrendingUp,
  AlertTriangle,
  Truck,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import AdminLayout from "../../layouts/AdminLayout";

const salesData = [
  { month: "Jan", sales: 3200000 },
  { month: "Feb", sales: 4500000 },
  { month: "Mar", sales: 3900000 },
  { month: "Apr", sales: 5100000 },
  { month: "Mei", sales: 6200000 },
  { month: "Jun", sales: 7100000 },
];

const orderData = [
  { name: "Selesai", value: 79 },
  { name: "Diproses", value: 75 },
  { name: "Dibatalkan", value: 10 },
];

const weeklyData = [
  { day: "Sen", total: 15 },
  { day: "Sel", total: 22 },
  { day: "Rab", total: 18 },
  { day: "Kam", total: 30 },
  { day: "Jum", total: 27 },
  { day: "Sab", total: 35 },
  { day: "Min", total: 20 },
];

const COLORS = ["#22c55e", "#3b82f6", "#ef4444"];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Dashboard
          </h1>
          <p className="text-gray-500">
            Selamat datang di panel admin Zenvy
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Konsumen"
            value="15.345"
            icon={<Users size={24} />}
          />

          <StatCard
            title="Pesanan Hari Ini"
            value="154"
            icon={<ShoppingBag size={24} />}
          />

          <StatCard
            title="Pendapatan Bulan Ini"
            value="Rp 12,2 Jt"
            icon={<Wallet size={24} />}
          />

          <StatCard
            title="Total Produk"
            value="321"
            icon={<Package size={24} />}
          />
        </div>

        {/* Chart Utama */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Penjualan Bulanan
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#2563eb"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <ShoppingBag size={20} />
              Status Pesanan
            </h2>

            <div className="flex justify-center">
              <PieChart width={250} height={250}>
                <Pie
                  data={orderData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {orderData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </div>
          </div>
        </div>

        {/* Bar Chart + Aktivitas */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Penjualan 7 Hari Terakhir
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="total"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Aktivitas */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Bell size={20} />
              Aktivitas Terbaru
            </h2>

            <div className="space-y-4">
              <ActivityItem
                icon={<ShoppingBag size={18} />}
                text="Pesanan ORD-0450 berhasil dibayar"
              />

              <ActivityItem
                icon={<AlertTriangle size={18} />}
                text="Stok Kemeja Flanel tersisa 5 pcs"
              />

              <ActivityItem
                icon={<Users size={18} />}
                text="Konsumen baru telah mendaftar"
              />

              <ActivityItem
                icon={<Wallet size={18} />}
                text="Pendapatan hari ini Rp 1.250.000"
              />

              <ActivityItem
                icon={<Truck size={18} />}
                text="Pesanan ORD-0445 berhasil dikirim"
              />
            </div>
          </div>
        </div>

        {/* Produk Terlaris */}
        <div className="bg-white rounded-2xl shadow p-6 mt-8">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Package size={20} />
            Produk Terlaris
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Produk
                  </th>
                  <th className="text-left py-3">
                    Terjual
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-3">Kaos Basic</td>
                  <td>120</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Hoodie Zenvy</td>
                  <td>95</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Kemeja Flanel</td>
                  <td>78</td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">Polo Shirt</td>
                  <td>70</td>
                </tr>

                <tr>
                  <td className="py-3">Sweater</td>
                  <td>64</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
    
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-2xl shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-500 text-sm">
          {title}
        </h3>

        <div className="bg-gray-100 p-2 rounded-lg text-gray-700">
          {icon}
        </div>
      </div>

      <p className="text-3xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}

function ActivityItem({ icon, text }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="text-gray-600">
        {icon}
      </div>

      <p className="text-gray-700">
        {text}
      </p>
    </div>
  );
}