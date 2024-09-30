import React from 'react';
import { useRouter } from 'next/router';
import prisma from '../../lib/prisma'; // Pastikan path ini sesuai dengan struktur proyek Anda
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import DramaCard from '../components/DramaCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

export async function getServerSideProps(context) {
  const { query } = context.query;

  // Jika ada query, filter drama berdasarkan title
  const dramas = await prisma.drama.findMany({
    where: {
      title: {
        contains: query, // Mencari judul yang mengandung kata yang dicari
        mode: 'insensitive', // Agar pencarian tidak case-sensitive
      },
    },
    include: {
      genres: true, // Termasuk genres jika diperlukan
      actors: true, // Termasuk actors jika diperlukan
    },
  });

  return {
    props: {
      query: query || '', // Kirim query ke komponen
      dramas,
    },
  };
}

export default function SearchResults({ dramas, query }) {
  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-lg-2">
            <Sidebar/>
          </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <SearchBar />
          <h5 className="my-4">Searched/Tagged with "{query}"</h5>
          <div className="row">
            {dramas.length > 0 ? (
              dramas.map((drama) => (
                <DramaCard key={drama.id} drama={drama} />
              ))
            ) : (
              <p>No dramas found for "{query}".</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
