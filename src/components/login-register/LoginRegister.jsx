import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';

import "../../styles/LoginRegister.css";

const LoginRegister = () => {
  // State untuk mengelola input form
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to error-suspended page if account is suspended
  useEffect(() => {
    if (router.query.error === "Callback") {
      router.push("/error-suspended");
    }
  }, [router.query.error, router]);

  // Fungsi untuk menangani login dengan Google
  const handleGoogleLogin = async () => {
    try {
      const result = await signIn('google', { redirect: false });

      if (result?.error) {
        if (result.error === "Your account is suspended") {
          // Redirect to login with error=suspended if account is suspended
          router.push('/error-suspended');
        } else {
          alert(result.error); // Show other errors as alerts
        }
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.error) {
    if (result.error === 'Your account is suspended') {
      // Redirect to error-suspended page if account is suspended
      router.push('/error-suspended');
    } else {
      setError(result.error); // Display other errors on the login form
    }
  } else {
    window.location.href = "/"; // Redirect to the homepage if login is successful
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
          {error && <p style={{ color: 'red', fontSize: '16px' }}>{error}</p>}
          <a href="/forgot-password">Forget Your Password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>Easily login if you are already member</p>
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
