import { useState } from 'react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/forgotPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Silakan cek email Anda untuk tautan reset password.');
      } else {
        setMessage(data.message || 'Terjadi kesalahan, coba lagi.');
      }
    } catch (error) {
      setMessage('Terjadi kesalahan.');
    }
  };

  return (
    <div>
      <h1>Lupa Password</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Kirim Tautan Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
