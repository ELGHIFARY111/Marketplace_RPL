import AdminLayout from "../../layouts/AdminLayout";

export default function ProfilePage() {
  return (
    <AdminLayout>
      <div>
        <div className="flex items-center gap-0">
          <img
              src="../icon/icon_user.png"
              alt="icon_profil"
              className="right-[4rem] w-[60px] object-contain z-0"
            /> 
          <h1 className="text-[3rem] font-bold ml-1">Profil</h1>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Nama */}
          <div>
            <p className="font-semibold">Nama</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              Arik Setiawan
            </div>
          </div>

          {/* Password */}
          <div>
            <p className="font-semibold">Kata Sandi</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              ********
            </div>
          </div>

          {/* Email */}
          <div>
            <p className="font-semibold">Email</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              arikgaming123@gmail.com
            </div>
          </div>

          {/* No Telp */}
          <div>
            <p className="font-semibold">No Telepon</p>
            <div className="bg-[#F3EFEC] rounded-lg p-3 mt-1">
              0895319052345
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="mt-6 flex items-center gap-2 text-[20px] font-serif ml-auto">
          <img
            src="../icon/icon_keluar.png"
            alt="icon_keluar"
            className="right-[4rem] w-[20px] object-contain z-0"
          /> 
          Keluar
        </button>
      </div>
    </AdminLayout>
  );
}