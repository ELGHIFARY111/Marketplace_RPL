import { useState, useEffect } from "react";
import api from "../../services/api";
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

const COLORS = ["#22c55e", "#3b82f6", "#ef4444", "#eab308", "#ec4899", "#8b5cf6"];

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/admin/dashboard-stats");
        setData(res.data);
      } catch (err) {
        console.error("Gagal mengambil dashboard stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(num);
  };

  const formatRupiahCompact = (num) => {
    if (num >= 1000000000) {
      return `Rp ${(num / 1000000000).toFixed(1).replace(".", ",")} Milyar`;
    }
    if (num >= 1000000) {
      return `Rp ${(num / 1000000).toFixed(1).replace(".", ",")} Jt`;
    }
    if (num >= 1000) {
      return `Rp ${(num / 1000).toFixed(0)} Rb`;
    }
    return `Rp ${num}`;
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-xl font-bold text-gray-600 animate-pulse">Memuat data dashboard...</div>
        </div>
      </AdminLayout>
    );
  }

  const stats = data?.stats || { totalCustomers: 0, ordersToday: 0, revenueMonth: 0, totalProducts: 0 };
  const salesMonthly = data?.salesMonthly || [];
  const orderStatus = data?.orderStatus || [];
  const weeklyOrders = data?.weeklyOrders || [];
  const bestSelling = data?.bestSelling || [];

  // Generate activities list
  const activities = [];
  if (data?.recentOrders && data.recentOrders.length > 0) {
    data.recentOrders.forEach((o) => {
      let icon = <ShoppingBag size={18} />;
      if (o.status_pesanan === "selesai") icon = <ShoppingBag size={18} className="text-green-500" />;
      if (o.status_pesanan === "dibatalkan") icon = <AlertTriangle size={18} className="text-red-500" />;
      if (o.status_pesanan === "dikirim") icon = <Truck size={18} className="text-blue-500" />;

      activities.push({
        icon,
        text: `Pesanan #${o.id_pesanan} sebesar ${formatRupiah(o.total_tagihan)} status: ${o.status_pesanan}`,
        time: new Date(o.tgl_pesan),
      });
    });
  }

  if (data?.lowStockItems && data.lowStockItems.length > 0) {
    data.lowStockItems.forEach((item) => {
      activities.push({
        icon: <AlertTriangle size={18} className="text-amber-500 animate-bounce" />,
        text: `Stok produk "${item.nama_produk}" (${item.warna}, ${item.ukuran}) sisa ${item.stok} pcs`,
        time: new Date(),
      });
    });
  }

  // Fallback if empty
  if (activities.length === 0) {
    activities.push({
      icon: <Bell size={18} className="text-gray-400" />,
      text: "Belum ada aktivitas terbaru hari ini.",
      time: new Date(),
    });
  }

  return (
    <AdminLayout>
      <div className="bg-primary-100 min-h-screen p-6 rounded-[20px]">
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
            value={Number(stats.totalCustomers).toLocaleString("id-ID")}
            icon={<Users size={24} />}
          />

          <StatCard
            title="Pesanan Hari Ini"
            value={Number(stats.ordersToday).toLocaleString("id-ID")}
            icon={<ShoppingBag size={24} />}
          />

          <StatCard
            title="Pendapatan Bulan Ini"
            value={formatRupiahCompact(stats.revenueMonth)}
            icon={<Wallet size={24} />}
          />

          <StatCard
            title="Total Produk"
            value={Number(stats.totalProducts).toLocaleString("id-ID")}
            icon={<Package size={24} />}
          />
        </div>

        {/* Chart Utama */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Penjualan Bulanan (6 Bulan Terakhir)
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesMonthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(val) => formatRupiahCompact(val)} />
                <Tooltip formatter={(value) => [formatRupiah(value), "Penjualan"]} />

                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#367C2B"
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
                  data={orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  dataKey="value"
                  label
                >
                  {orderStatus.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-2 text-xs">
              {orderStatus.map((entry, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                  <span className="capitalize">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bar Chart + Aktivitas */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <TrendingUp size={20} />
              Jumlah Transaksi 7 Hari Terakhir
            </h2>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />

                <Bar
                  dataKey="total"
                  fill="#367C2B"
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

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
              {activities.map((act, index) => (
                <ActivityItem
                  key={index}
                  icon={act.icon}
                  text={act.text}
                />
              ))}
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
                    Jumlah Terjual
                  </th>
                </tr>
              </thead>

              <tbody>
                {bestSelling.map((prod, index) => (
                  <tr key={index} className="border-b last:border-b-0">
                    <td className="py-3 font-medium text-gray-800">{prod.name}</td>
                    <td className="py-3 text-gray-600 font-bold">{prod.sold} pcs</td>
                  </tr>
                ))}
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