import { useEffect, useState } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";


const ICONS = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

const STYLES = {
  success: {
    bar:  "bg-green-500",
    icon: "text-green-500",
    bg:   "bg-white border-l-4 border-green-500",
    title: "Berhasil",
  },
  error: {
    bar:  "bg-red-500",
    icon: "text-red-500",
    bg:   "bg-white border-l-4 border-red-500",
    title: "Gagal",
  },
  warning: {
    bar:  "bg-yellow-400",
    icon: "text-yellow-500",
    bg:   "bg-white border-l-4 border-yellow-400",
    title: "Peringatan",
  },
  info: {
    bar:  "bg-blue-500",
    icon: "text-blue-500",
    bg:   "bg-white border-l-4 border-blue-500",
    title: "Informasi",
  },
};

const DURATION = 4000; // ms sebelum auto-close

function AlertItem({ alert, onClose }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  const style = STYLES[alert.type] || STYLES.info;
  const Icon  = ICONS[alert.type]  || Info;

  // Masuk dengan animasi slide-in
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // Auto-close setelah DURATION
  useEffect(() => {
    const t = setTimeout(() => handleClose(), DURATION);
    return () => clearTimeout(t);
  }, []);

  function handleClose() {
    setLeaving(true);
    setTimeout(() => onClose(alert.id), 300);
  }

  return (
    <div
      className={`
        flex items-start gap-3 w-80 rounded-xl shadow-lg p-4 mb-3
        ${style.bg}
        transition-all duration-300 ease-out
        ${visible && !leaving
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"}
      `}
      style={{ minWidth: "18rem" }}
    >
      {/* Icon */}
      <div className="mt-0.5 shrink-0">
        <Icon className={`w-5 h-5 ${style.icon}`} />
      </div>

      {/* Teks */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide leading-none mb-1">
          {style.title}
        </p>
        <p className="text-sm text-gray-800 leading-snug break-words">
          {alert.message}
        </p>
      </div>

      {/* Tombol tutup */}
      <button
        onClick={handleClose}
        className="shrink-0 text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
        aria-label="Tutup notifikasi"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-1 rounded-bl-xl ${style.bar} animate-progress-bar`}
        style={{ "--duration": `${DURATION}ms` }}
      />
    </div>
  );
}

export default function PopupAlert({ alerts = [], onClose }) {
  if (alerts.length === 0) return null;

  return (
    <div
      className="fixed top-5 right-5 z-[9999] flex flex-col items-end pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {alerts.map((alert) => (
        <div key={alert.id} className="pointer-events-auto relative">
          <AlertItem alert={alert} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
