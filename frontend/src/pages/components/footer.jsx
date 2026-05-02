export default function Footer() {
  return (
    <footer id="footer" className="mt-20 bg-[#e7e1d9] px-16 py-8">
      <div className="grid grid-cols-4 gap-10">
        <div>
          <h2 className="text-4xl font-medium drop-shadow-md">Zenfy</h2>
          <p className="mt-20 text-sm">All right reserved@2026</p>
        </div>

        <div className="border-l-4 border-gray-300 pl-10">
          <h3 className="font-semibold">Zenfy</h3>
          <p className="mt-2 text-sm">Tentang Kami</p>
          <p className="mt-2 text-sm">FAQ</p>
        </div>

        <div className="border-l-4 border-gray-300 pl-10">
          <h3 className="font-semibold">kontak</h3>
          <p className="mt-2 text-sm">+62 877-5866-8209</p>
          <p className="mt-2 text-sm">Zenfy.id</p>
        </div>

        <div className="border-l-4 border-gray-300 pl-10">
          <h3 className="font-semibold">Ikuti Kami di</h3>
          <p className="mt-2 text-sm">Instagram</p>
          <p className="mt-2 text-sm">Facebook</p>
          <p className="mt-2 text-sm">TikTok</p>
        </div>
      </div>
    </footer>
  );
}