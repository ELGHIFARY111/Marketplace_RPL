/**
 * Komponen loading yang reusable:
 * - PageLoader: full-screen spinner (untuk route loading, profil, dsb)
 * - ProductSkeleton: skeleton card yang mirip tampilan produk (untuk HomePage)
 * - InlineSpinner: spinner kecil untuk tombol atau section kecil
 */

// ─── Full-page loader ────────────────────────────────────────
export function PageLoader({ message = "Memuat..." }) {
  return (
    <div className="min-h-screen bg-[#f3efe9] flex flex-col items-center justify-center gap-5">
      {/* Animated ring */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-[#e7e1d9]" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#b89578] animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#a47f63] animate-spin [animation-duration:1.5s]" />
        <div className="absolute inset-4 rounded-full border-2 border-transparent border-t-[#8a6547] animate-spin [animation-duration:2s]" />
      </div>

      <div className="text-center">
        <p className="text-2xl font-serif font-medium text-gray-800 tracking-wide animate-pulse">
          Zenvy
        </p>
        <p className="text-sm text-gray-500 mt-1">{message}</p>
      </div>
    </div>
  );
}

// ─── Skeleton card (mirip kartu produk di HomePage) ──────────
export function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-t-[28px] rounded-b-[12px] border border-gray-200 bg-[#fcfcfc] animate-pulse">
      {/* Image area */}
      <div className="bg-[#f0ece6] h-[252px] relative p-4 rounded-t-[28px]">
        {/* Color dots placeholder */}
        <div className="absolute left-4 top-3 flex gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300" />
          <div className="h-4 w-4 rounded-full bg-gray-300" />
        </div>
        {/* Image placeholder */}
        <div className="flex h-full items-center justify-center">
          <div className="w-28 h-28 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Info area */}
      <div className="bg-white p-4 space-y-3">
        {/* Product name */}
        <div className="h-5 bg-gray-200 rounded-md w-3/4" />
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded-md w-1/2" />
        {/* Rating row */}
        <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
          <div className="h-3 w-3 rounded-full bg-gray-200" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

// Grid of skeleton cards (untuk section produk)
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
