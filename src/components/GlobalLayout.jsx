// src/components/GlobalLayout.js

import React from 'react';
import Head from 'next/head';

export default function GlobalLayout({ children }) {
  return (
    <div className="bg-light">
      <Head>
        <title>MovieNow</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
        />
      </Head>
      <div className="container-fluid">
        <div className="row">
          {children}
        </div>
      </div>
    </div>
  );
}
