import AdminLayout from "../../layouts/AdminLayout";

export default function ProfilePage() {
  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold mb-6">Profil</h1>

        <div className="grid grid-cols-2 gap-6">
          {/* Nama */}
          <div>
            <p className="font-semibold">Nama</p>
            <div className="bg-gray-300 rounded-lg p-3 mt-1">
              Arik Setiawan
            </div>
          </div>

          {/* Password */}
          <div>
            <p className="font-semibold">Kata Sandi</p>
            <div className="bg-gray-300 rounded-lg p-3 mt-1">
              ********
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold">Email</p>
            <div className="bg-gray-300 rounded-lg p-3 mt-1">
              arikgaming123@gmail.com
            </div>
          </div>

          {/* No Telp */}
          <div>
            <p className="font-semibold">No Telepon</p>
            <div className="bg-gray-300 rounded-lg p-3 mt-1">
              0895319052345
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="mt-6 flex items-center gap-2 text-black">
          🚪 Keluar
        </button>
      </div>
    </AdminLayout>
  );
}