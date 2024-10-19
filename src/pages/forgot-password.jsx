import { useState } from 'react';
import "../styles/LoginRegister.css";

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
    <div className="forgotpass-container">
    <div className="forgotpassform-container">
      <form onSubmit={handleSubmit}>
      <img src="../assets/logo-movienow.png" alt="Logo" className="forgotpass-logo" />
        <h1>Forgot Password</h1>
        <span>Enter your email to receive a reset link</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {message && <p>{message}</p>}
        <button type="submit">Send Reset Link</button>
        <a href="/login" >Back to Login</a>
      </form>
    </div>
    </div>
  );
}
