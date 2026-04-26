const LokasiPage = () => {
  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Lokasi Kami</h1>
      
      <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Toko Pusat Zenvy Apparel</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            Jl. Raya Telang No. 123<br/>
            Kecamatan Kamal, Kabupaten Bangkalan<br/>
            Jawa Timur, 69162<br/>
            Indonesia
          </p>
        </div>
        
        <div style={{ width: '100%', height: '400px', background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
          {/* In a real app, an iframe to Google Maps would be here */}
          <div>
            <p>Peta Lokasi Google Maps</p>
            <p style={{ fontSize: '0.85rem' }}>(Integrasi Iframe Maps)</p>
          </div>
        </div>
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Jam Operasional</h4>
            <p style={{ color: '#ccc' }}>Senin - Jumat: 09:00 - 20:00<br/>Sabtu - Minggu: 10:00 - 21:00</p>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '0.5rem' }}>Kontak</h4>
            <p style={{ color: '#ccc' }}>Email: info@zenvyapparel.com<br/>WhatsApp: +62 812-3456-7890</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LokasiPage;
