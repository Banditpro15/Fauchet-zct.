import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Memproses...');
    try {
      const resp = await axios.post('/api/faucet', { address });
      if (resp.data.success) {
        setMessage('✅ ' + resp.data.message);
      } else {
        setMessage('❌ ' + resp.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
      <h1>Zenchain Testnet Faucet</h1>
      <p>Masukkan alamat testnet Zenchain untuk mendapatkan ZTC gratis</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Masukkan alamat testnet"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Klaim ZTC
        </button>
      </form>

      {message && (
        <div style={{ marginTop: '1rem' }}>
          {message}
        </div>
      )}
    </div>
  );
}
