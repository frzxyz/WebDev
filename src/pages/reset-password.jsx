import { useState } from 'react';
import { useRouter } from 'next/router';
import "../styles/LoginRegister.css";

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query; // Ambil token dari query URL
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password dan Confirm Password tidak cocok.');
      return;
    }

    try {
      const response = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password berhasil diubah.');
        // Redirect ke halaman login
        router.push('/login');
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
      <h1>Reset Password</h1>
        <span>Enter your New Password</span>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password
            required
          />
        {message && <p>{message}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
    </div>
  );
}
