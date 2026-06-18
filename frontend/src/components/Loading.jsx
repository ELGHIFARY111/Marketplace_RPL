/**
 * Komponen loading yang reusable:
 * - PageLoader: loading di dalam area konten (Navbar tetap terlihat)
 * - SectionLoader: loading di dalam panel/card
 * - ProductSkeleton: skeleton card mirip kartu produk
 * - InlineSpinner: spinner kecil untuk tombol
 */

// ─── Centered content-area loader (Navbar TETAP terlihat) ────
export function PageLoader({ message = "Memuat..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5">
      {/* Animated ring */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-[#e7e1d9]" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#b89578] animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#a47f63] animate-spin [animation-duration:1.5s]" />
        <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-[#8a6547] animate-spin [animation-duration:2s]" />
      </div>

      <div className="text-center">
        <p className="text-xl font-serif font-medium text-gray-700 tracking-wide">
          Zenvy
        </p>
        <p className="text-sm text-gray-400 mt-1 animate-pulse">{message}</p>
      </div>
    </div>
  );
}

// ─── Inside panel/card loader (untuk AdminLayout, dll) ───────
export function SectionLoader({ message = "Memuat data..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-4 border-[#e7e1d9]" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#b89578] animate-spin" />
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-[#a47f63] animate-spin [animation-duration:1.5s]" />
      </div>
      <p className="text-sm text-gray-400 animate-pulse">{message}</p>
    </div>
  );
}

// ─── Skeleton card (mirip kartu produk di HomePage) ──────────
export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-t-[28px] rounded-b-[12px] border border-gray-200 bg-[#fcfcfc] animate-pulse">
      {/* Image area */}
      <div className="bg-[#f0ece6] h-[252px] relative p-4 rounded-t-[28px]">
        <div className="absolute left-4 top-3 flex gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300" />
          <div className="h-4 w-4 rounded-full bg-gray-300" />
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="w-28 h-28 rounded-xl bg-gray-200" />
        </div>
      </div>
      {/* Info area */}
      <div className="bg-white p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        <div className="h-5 bg-gray-200 rounded-md w-1/2" />
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function ProductSkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-4 gap-x-10 gap-y-8">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Inline spinner (untuk tombol, section kecil) ────────────
export function InlineSpinner({ size = 20, color = "#b89578" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2.5}
      strokeLinecap="round"
      className="animate-spin"
    >
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

