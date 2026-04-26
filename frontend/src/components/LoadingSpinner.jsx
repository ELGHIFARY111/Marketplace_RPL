const LoadingSpinner = ({ text = 'Memuat...' }) => (
  <div className="loading-spinner">
    <div style={{ textAlign: 'center' }}>
      <div className="spinner" />
      {text && <p style={{ color: '#666', fontSize: '0.85rem', marginTop: '0.75rem' }}>{text}</p>}
    </div>
  </div>
);

export default LoadingSpinner;
