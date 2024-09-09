// src/pages/login.js

import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import { IoArrowBackSharp } from "react-icons/io5";

import LoginRegister from '../components/login-register/LoginRegister';

import "../styles/LoginRegister.css";

export default function LoginPage() {
    return (
        <div className='page-container'>
            <Link href="/">
                <h3 className='back-button'>
                    <IoArrowBackSharp />Back to Home
                </h3>
            </Link>
            <div>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
            </Head>
            <LoginRegister />
            </div>
        </div>
    );
  }