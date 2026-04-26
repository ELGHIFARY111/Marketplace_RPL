const TentangKamiPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Tentang Zenvy Apparel</h1>
      
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)', lineHeight: '1.8', color: '#ccc' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>Zenvy Apparel</strong> adalah destinasi utama untuk fashion modern dan trendi. Berdiri sejak tahun 2024, kami berkomitmen untuk menyediakan pakaian berkualitas tinggi yang tidak hanya nyaman dipakai tetapi juga mampu mengekspresikan gaya unik Anda.
        </p>
        
        <p style={{ marginBottom: '1.5rem' }}>
          Kami percaya bahwa fashion adalah bentuk ekspresi diri yang paling kuat. Oleh karena itu, koleksi kami dikurasi dengan cermat dari berbagai kategori, mulai dari atasan, bawahan, gaun, hingga aksesori, untuk memastikan Anda selalu tampil percaya diri di setiap kesempatan.
        </p>
        
        <h3 style={{ color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>Misi Kami</h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li>Menyediakan tren fashion terbaru dengan harga yang terjangkau.</li>
          <li>Mengutamakan kualitas material dan kenyamanan pakaian.</li>
          <li>Memberikan pengalaman belanja online yang mudah, aman, dan menyenangkan.</li>
          <li>Mendukung gaya hidup berkelanjutan melalui pilihan produk yang ramah lingkungan.</li>
        </ul>
        
        <h3 style={{ color: '#fff', marginTop: '2.5rem', marginBottom: '1rem' }}>Mengapa Memilih Kami?</h3>
        <p style={{ marginBottom: '1.5rem' }}>
          Dengan layanan pelanggan yang responsif, pengiriman cepat, dan sistem pembayaran yang aman, Zenvy Apparel berusaha menjadi mitra fashion terbaik Anda. Terima kasih telah mempercayakan gaya Anda pada kami!
        </p>
      </div>
    </div>
  );
};

export default TentangKamiPage;
