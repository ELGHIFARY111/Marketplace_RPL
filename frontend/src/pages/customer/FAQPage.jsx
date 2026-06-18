import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";

const faqData = [
  {
    kategori: "Pemesanan",
    items: [
      {
        q: "Bagaimana cara memesan produk di Zenfy?",
        a: "Pilih produk yang kamu inginkan, pilih ukuran dan warna, lalu klik 'Tambah ke Keranjang' atau langsung 'Checkout'. Ikuti langkah pengisian alamat, pilih jasa kirim, dan metode pembayaran.",
      },
      {
        q: "Apakah saya bisa memesan lebih dari 1 produk sekaligus?",
        a: "Tentu! Tambahkan beberapa produk ke keranjang belanja, lalu checkout semuanya sekaligus. Kamu juga bisa langsung checkout 1 produk dari halaman detail produk.",
      },
      {
        q: "Apakah ada minimal pembelian?",
        a: "Tidak ada minimal pembelian di Zenfy. Kamu bisa memesan bahkan hanya 1 item.",
      },
      {
        q: "Bagaimana cara menggunakan kode kupon?",
        a: "Di halaman checkout, terdapat kolom 'Kupon Diskon'. Masukkan kode kuponmu dan klik 'Gunakan'. Diskon akan otomatis diterapkan ke total pembayaran.",
      },
    ],
  },
  {
    kategori: "Pembayaran",
    items: [
      {
        q: "Metode pembayaran apa yang tersedia?",
        a: "Zenfy mendukung berbagai metode pembayaran: QRIS, GoPay, ShopeePay, Transfer Bank Virtual Account (BCA, BNI, BRI, Permata, Mandiri), serta pembayaran di minimarket (Alfamart & Indomaret).",
      },
      {
        q: "Apakah transaksi di Zenfy aman?",
        a: "Ya, sangat aman. Semua transaksi diproses melalui Midtrans, payment gateway terpercaya di Indonesia yang telah bersertifikat PCI-DSS.",
      },
      {
        q: "Berapa lama batas waktu pembayaran?",
        a: "Batas waktu pembayaran tergantung metode yang dipilih. Umumnya QRIS & e-wallet 15 menit, Virtual Account 24 jam, dan minimarket 24 jam. Jika melebihi batas waktu, pesanan akan otomatis dibatalkan.",
      },
      {
        q: "Bagaimana jika pembayaran saya gagal?",
        a: "Jika pembayaran gagal, silakan buat pesanan baru. Pastikan saldo atau limit kartu kamu mencukupi sebelum mencoba kembali. Hubungi CS kami jika masalah berlanjut.",
      },
    ],
  },
  {
    kategori: "Pengiriman",
    items: [
      {
        q: "Berapa lama estimasi pengiriman?",
        a: "Estimasi pengiriman tergantung jasa kurir dan kota tujuan, biasanya 1-7 hari kerja. Informasi estimasi akan ditampilkan saat kamu memilih jasa kirim di checkout.",
      },
      {
        q: "Jasa pengiriman apa yang tersedia?",
        a: "Zenfy bekerja sama dengan JNE, J&T, SiCepat, dan AnterAja. Kamu bisa memilih sesuai preferensi dan budget.",
      },
      {
        q: "Apakah saya bisa melacak pesanan saya?",
        a: "Ya! Setelah pesanan diproses, kamu akan mendapatkan nomor resi pengiriman yang bisa kamu lacak melalui website kurir yang bersangkutan.",
      },
      {
        q: "Apakah Zenfy melayani pengiriman ke seluruh Indonesia?",
        a: "Ya, Zenfy melayani pengiriman ke seluruh 34 provinsi di Indonesia.",
      },
    ],
  },
  {
    kategori: "Produk & Pengembalian",
    items: [
      {
        q: "Bagaimana jika produk yang saya terima tidak sesuai?",
        a: "Jika produk tidak sesuai deskripsi (salah ukuran, warna, atau cacat produksi), silakan hubungi Customer Service kami dalam 2x24 jam setelah barang diterima. Sertakan foto produk sebagai bukti.",
      },
      {
        q: "Apakah ukuran produk sesuai standar?",
        a: "Semua ukuran produk Zenfy mengikuti standar Indonesia. Kamu bisa melihat tabel ukuran di halaman detail produk masing-masing.",
      },
      {
        q: "Bagaimana cara merawat produk Zenfy?",
        a: "Cuci dengan air dingin atau hangat (maks 40°C), jangan diperas berlebihan, dan jangan dikeringkan dengan sinar matahari langsung. Label perawatan tersedia di setiap produk.",
      },
      {
        q: "Apakah produk Zenfy original?",
        a: "Semua produk yang dijual di Zenfy adalah produk original yang kami produksi sendiri. Kami tidak menjual produk replika atau KW.",
      },
    ],
  },
  {
    kategori: "Akun & Lainnya",
    items: [
      {
        q: "Bagaimana cara mendaftar akun Zenfy?",
        a: "Klik tombol 'Daftar' di halaman utama, isi data diri (nama, email, password), lalu verifikasi email. Akun kamu sudah siap digunakan.",
      },
      {
        q: "Saya lupa password, bagaimana caranya?",
        a: "Klik 'Lupa Password' di halaman login, masukkan email yang terdaftar, dan kami akan mengirimkan link reset password ke emailmu.",
      },
      {
        q: "Bagaimana cara menghubungi Customer Service Zenfy?",
        a: "Kamu bisa menghubungi CS kami melalui fitur 'Bantuan / CS' di halaman profil, atau melalui WhatsApp di +62 877-5866-8209.",
      },
    ],
  },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border rounded-xl overflow-hidden transition-all duration-300 ${
        open ? "border-black bg-white shadow-md" : "border-gray-200 bg-white"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#f3efe9] transition-colors"
      >
        <span className="font-serif font-bold text-base pr-4">{item.q}</span>
        {open ? (
          <ChevronUp size={20} className="shrink-0 text-[#b89578]" />
        ) : (
          <ChevronDown size={20} className="shrink-0 text-gray-400" />
        )}
      </button>

      {open && (
        <div className="px-6 pb-5">
          <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
            {item.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeKategori, setActiveKategori] = useState("Semua");

  const allKategori = ["Semua", ...faqData.map((f) => f.kategori)];

  const filteredData = faqData
    .map((section) => ({
      ...section,
      items: section.items.filter(
        (item) =>
          (activeKategori === "Semua" || section.kategori === activeKategori) &&
          (item.q.toLowerCase().includes(search.toLowerCase()) ||
            item.a.toLowerCase().includes(search.toLowerCase()))
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className="min-h-screen bg-[#f3efe9] text-black flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="px-20 pt-20 pb-14 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#b89578] mb-3">
          Pusat Bantuan
        </p>
        <h1 className="text-6xl font-serif font-bold mb-4">
          Pertanyaan yang Sering Diajukan
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mx-auto">
          Cari jawaban atas pertanyaanmu di bawah ini, atau hubungi tim kami langsung.
        </p>

        {/* Search */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Cari pertanyaan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full bg-white border border-gray-200 pl-12 pr-6 py-4 font-serif text-sm outline-none shadow-sm focus:border-black transition"
          />
        </div>
      </section>

      {/* Filter Kategori */}
      <section className="px-20 pb-6">
        <div className="flex gap-3 flex-wrap justify-center">
          {allKategori.map((kat) => (
            <button
              key={kat}
              onClick={() => setActiveKategori(kat)}
              className={`rounded-full px-5 py-2 text-sm font-serif font-bold transition ${
                activeKategori === kat
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:border-black"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </section>

      {/* FAQ Content */}
      <section className="px-20 pb-20 flex-1">
        {filteredData.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Search size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-serif text-lg">
              Tidak ada pertanyaan yang cocok dengan pencarianmu.
            </p>
          </div>
        ) : (
          <div className="space-y-12 max-w-4xl mx-auto">
            {filteredData.map((section) => (
              <div key={section.kategori}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-1 w-8 rounded-full bg-[#b89578]" />
                  <h2 className="text-xl font-serif font-bold">{section.kategori}</h2>
                </div>
                <div className="space-y-3">
                  {section.items.map((item, i) => (
                    <FaqItem key={i} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Masih ada pertanyaan? */}
      <section className="px-20 py-14 bg-black text-white text-center">
        <MessageCircle size={48} className="mx-auto mb-4 text-[#b89578]" />
        <h2 className="text-3xl font-serif font-bold mb-3">
          Masih Ada Pertanyaan?
        </h2>
        <p className="text-gray-400 mb-6">
          Tim Customer Service kami siap membantu kamu kapan saja.
        </p>
        <button
          onClick={() => navigate("/profil")}
          className="rounded-full bg-[#b89578] px-10 py-3 font-serif font-bold text-white hover:bg-[#a07c62] transition"
        >
          Hubungi CS
        </button>
      </section>

      <Footer />
    </div>
  );
}
