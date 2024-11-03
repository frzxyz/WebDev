import "../styles/LoginRegister.css";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function ErrorSuspended() {
    const router = useRouter();
    const { error } = router.query;
  
    useEffect(() => {
      // Handle the suspended error message
      if (error === "Your account is suspended") {
        router.push("/error-suspended");
      }
    }, [error, router]);

    return (
    <div className="forgotpass-container">
    <div className="forgotpassform-container">
      <form>
      <img src="../assets/logo-movienow.png" alt="Logo" className="forgotpass-logo" />
        <h1>Account is Suspended</h1>
        <span style={{ marginTop: '1rem' }}>Try Login with Another Account</span>
        <Link href="/login">
        <button href="/login">Back to Login</button>
        </Link>
        <a href="/" >Home</a>
      </form>
    </div>
    </div>
  );
}
