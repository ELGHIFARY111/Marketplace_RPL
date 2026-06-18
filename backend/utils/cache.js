/**
 * Simple in-memory TTL cache untuk menghindari query DB berulang.
 * Cocok untuk dipakai di Render free tier yang lambat DB-nya.
 */

const store = new Map();

/**
 * Ambil data dari cache
 * @param {string} key
 * @returns {any|null} - null jika tidak ada atau sudah expired
 */
function get(key) {
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }

  return entry.value;
}

/**
 * Simpan data ke cache
 * @param {string} key
 * @param {any} value
 * @param {number} ttlSeconds - berapa detik cache berlaku (default 60 detik)
 */
function set(key, value, ttlSeconds = 60) {
  store.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

/**
 * Hapus satu entry dari cache (misal setelah ada update data)
 * @param {string} key
 */
function del(key) {
  store.delete(key);
}

/**
 * Hapus semua entry yang key-nya diawali prefix tertentu
 * @param {string} prefix
 */
function delByPrefix(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) {
      store.delete(key);
    }
  }
}

/**
 * Kosongkan seluruh cache
 */
function clear() {
  store.clear();
}

/**
 * Bersihkan entry yang sudah expired (opsional, panggil berkala)
 */
function purgeExpired() {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.expiresAt) {
      store.delete(key);
    }
  }
}

// Auto-purge expired entries setiap 5 menit
setInterval(purgeExpired, 5 * 60 * 1000);

module.exports = { get, set, del, delByPrefix, clear };
