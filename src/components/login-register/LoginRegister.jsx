import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import "../../styles/LoginRegister.css";

const LoginRegister = () => {
  // State untuk mengelola input form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { data: session, status } = useSession();
  const router = useRouter();

  // Jika user sudah login, redirect ke halaman utama
  // useEffect(() => {
  //   if (session) {
  //     router.push('/'); // Redirect ke halaman utama jika sudah login
  //   }
  // }, [session, router]);

  // Fungsi untuk menangani login dengan Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signIn('google', { redirect: false });

      if (result?.error) {
        // Tampilkan pesan error jika terjadi masalah
        alert(result.error);
      } else {
        // Jika sukses, redirect ke halaman utama
        router.push('/');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      alert('Terjadi kesalahan saat login menggunakan Google.');
    }
  };

  // Fungsi untuk menangani submit form registrasi
  const handleRegister = async (e) => {
    e.preventDefault();

    // Regex untuk validasi password: minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert('Password harus minimal 8 karakter, mengandung huruf besar, huruf kecil, dan angka');
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (res.ok) {
        alert('Registrasi berhasil');
      } else {
        const data = await res.json();
        alert(data.message);
      }

      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');

    } catch (error) {
      alert('Terjadi kesalahan saat registrasi');
    }
  };

  // Fungsi untuk menangani submit form login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        alert('Login berhasil');
        // Simpan token di local storage atau state jika diperlukan

        // Redirect berdasarkan roleId
      if (data.roleId === 1) {
        // Jika roleId adalah 1 (Admin), redirect ke halaman admin
        router.push('/cms-users').then(() => {
          // Reload halaman setelah navigasi berhasil
          window.location.reload();
        });
      } else {
        // Jika bukan admin, redirect ke halaman utama atau halaman lain
        router.push('/').then(() => {
          window.location.reload();
        });
      }

      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      alert('Terjadi kesalahan saat login');
    }
  };

  useEffect(() => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove("active");
    });
  }, []);

  // Tampilkan loading jika status session sedang dalam proses
  // if (status === 'loading') return <p>Loading...</p>;

  // // Jangan tampilkan form login jika sudah ada session
  // if (session) return null;

  return (
    <div className="container" id="container">
      {/* Form Registrasi */}
      <div className="form-container sign-up">
        <form onSubmit={handleRegister}>
          <h1>Create Account</h1>
          <div className="social-icons">
            <a href="#" className="icon" onClick={handleGoogleLogin} ><i className="fa-brands fa-google"></i></a>
            {/* <a href="#" className="icon"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a> */}
          </div>
          <span>or use email for registration</span>
          <input
            type="text"
            placeholder="Name"
            value={username} // State dikaitkan dengan value
            onChange={(e) => setUsername(e.target.value)} // Update state saat ada perubahan input
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email} // State dikaitkan dengan value
            onChange={(e) => setEmail(e.target.value)} // Update state saat ada perubahan input
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password} // State dikaitkan dengan value
            onChange={(e) => setPassword(e.target.value)} // Update state saat ada perubahan input
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Form Login */}
      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>
          <div className="social-icons">
            <a href="#" className="icon" onClick={handleGoogleLogin} ><i className="fa-brands fa-google"></i></a>
            {/* <a href="#" className="icon"><i className="fa-brands fa-facebook"></i></a>
            <a href="#" className="icon"><i className="fa-brands fa-github"></i></a> */}
          </div>
          <span>or use email for login</span>
          <input
            type="email"
            placeholder="Email"
            value={email} // State dikaitkan dengan value
            onChange={(e) => setEmail(e.target.value)} // Update state saat ada perubahan input
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password} // State dikaitkan dengan value
            onChange={(e) => setPassword(e.target.value)} // Update state saat ada perubahan input
            required
          />
          <a href="#">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>If you are already MovNow member, easily login</p>
            <button className="hidden" id="login">Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello!</h1>
            <p>Register to use all of MovNow features</p>
            <button className="hidden" id="register">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
