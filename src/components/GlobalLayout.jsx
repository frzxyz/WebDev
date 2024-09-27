// src/components/GlobalLayout.js

import React from 'react';
import Head from 'next/head';
export default function GlobalLayout({ children }) {
  return (
    <div className="bg-dark">
      <Head>
        <title>MovNow</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo-movienow.png" type="image/png" />
      </Head>
      <div className="container-fluid">
        <div className="row">
          {children}
        </div>
      </div>
    </div>
  );
}