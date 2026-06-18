import AdminLayout from "../../../layouts/AdminLayout";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import PopupAlert from "../../../components/PopupAlert";
import useAlert from "../../../components/useAlert";
import { SectionLoader } from "../../../components/Loading";

export default function PesanCSDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { alerts, showAlert, closeAlert } = useAlert();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchMessageDetail = async () => {
    try {
      const res = await api.get(`/cs/${id}`);
      setMessage(res.data);
      if (res.data?.balasan) {
        setReplyText(res.data.balasan);
      }
    } catch (error) {
      console.error("Gagal memuat detail pesan CS:", error);
      showAlert("Gagal memuat detail pesan", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchMessageDetail();
    }
  }, [id]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) {
      showAlert("Balasan tidak boleh kosong!", "warning");
      return;
    }

    try {
      setSubmitting(true);
      await api.post(`/cs/${id}/reply`, { reply: replyText });
      showAlert("Balasan berhasil dikirim", "success");
      fetchMessageDetail();
    } catch (error) {
      console.error("Gagal mengirim balasan:", error);
      showAlert(error.response?.data?.message || "Gagal mengirim balasan", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  if (loading) {
    return (
      <AdminLayout>
        <SectionLoader message="Memuat detail pesan..." />
      </AdminLayout>
    );
  }

  if (!message) {
    return (
      <AdminLayout>
        <p className="text-red-500 py-6 text-center">Pesan tidak ditemukan</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <PopupAlert alerts={alerts} onClose={closeAlert} />
      <div className="cs-detail-page w-full">

        {/* HEADER */}
        <div className="flex items-end gap-2">
          <h1 className="text-[3rem] font-bold">
            Customer Service
          </h1>
          <span className="text-lg font-semibold mb-2">
            Detail Pesan
          </span>
        </div>

        {/* GARIS */}
        <div className="w-full h-[2px] bg-primary-200 mb-6"></div>

        {/* TOMBOL KEMBALI */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => navigate("/admin/cs")}
            className="px-8 py-2 rounded-md bg-gray-400 text-white font-semibold hover:bg-gray-500 transition"
          >
            Kembali
          </button>
        </div>

        {/* DETAILS CARD */}
        <div className="bg-white border-2 border-[#D9D9D9] rounded-[15px] p-6 mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4 border-b pb-4">
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Nama Pengirim</p>
              <p className="font-bold text-gray-800">{message.nama_lengkap}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Email Pengirim</p>
              <p className="font-bold text-gray-800">{message.email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Tanggal Masuk</p>
              <p className="font-bold text-gray-800">{formatDate(message.tgl_kirim)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 font-bold uppercase">Status Balasan</p>
              <span className={`inline-block px-2 py-0.5 mt-1 rounded text-xs font-bold uppercase ${
                message.status_balasan === 'dibalas'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {message.status_balasan}
              </span>
            </div>
          </div>

          <div className="mb-2">
            <p className="text-xs text-gray-500 font-bold uppercase">Subjek</p>
            <p className="font-bold text-lg text-gray-800 mb-4">{message.subjek}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 font-bold uppercase">Isi Pesan</p>
            <div className="bg-primary-100 p-4 rounded-lg border border-primary-200 text-gray-800 mt-1 whitespace-pre-wrap">
              {message.isi_pesan}
            </div>
          </div>
        </div>

        {/* REPLY BLOCK */}
        <div className="bg-white border-2 border-[#D9D9D9] rounded-[15px] p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Balasan Dukungan</h3>

          <form onSubmit={handleSubmitReply} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-600 mb-2">
                Tulis Balasan
              </label>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tulis pesan tanggapan Anda di sini..."
                className="w-full bg-primary-100 border border-primary-200 rounded-lg p-4 h-36 outline-none focus:border-black transition"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="px-8 py-2 rounded-md bg-black text-white font-semibold hover:bg-[#b89578] transition disabled:opacity-60"
              >
                {submitting ? "Mengirim..." : message.balasan ? "Perbarui Balasan" : "Kirim Balasan"}
              </button>
            </div>
          </form>
        </div>

      </div>
    </AdminLayout>
  );
}
