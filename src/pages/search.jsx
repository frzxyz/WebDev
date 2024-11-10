import React from 'react';
import { useRouter } from 'next/router';
import prisma from '../../lib/prisma'; // Make sure this path is correct for your project structure
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import DramaCard from '../components/DramaCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/custom.css';

export async function getServerSideProps(context) {
  const { query, type } = context.query;

  let dramas = [];

  // If there's a query, search based on type (title or actor)
  if (query) {
    if (type === 'actor') {
      // Search dramas where an actor's name contains the query
      dramas = await prisma.drama.findMany({
        where: {
          actors: {
            some: {
              name: {
                contains: query, // Search for actor names that contain the query
                mode: 'insensitive', // Case-insensitive search
              },
            },
          },
        },
        include: {
          genres: true, // Include genres if needed
          actors: true, // Include actors if needed
        },
      });
    } else {
      // Default search by title (movie)
      dramas = await prisma.drama.findMany({
        where: {
          title: {
            contains: query, // Search titles that contain the query
            mode: 'insensitive', // Case-insensitive search
          },
        },
        include: {
          genres: true, // Include genres if needed
          actors: true, // Include actors if needed
        },
      });
    }
  }

  return {
    props: {
      query: query || '', // Pass query to the component
      type: type || 'movie', // Pass type to the component
      dramas,
    },
  };
}

export default function SearchResults({ dramas, query, type }) {
  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-lg-2">
          <Sidebar />
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <SearchBar />
          <h5 className="my-4">Searched {type === 'actor' ? 'Actors' : 'Movies'} for "{query}"</h5>
          <div className="row">
            {dramas.length > 0 ? (
              dramas.map((drama) => (
                <DramaCard key={drama.id} drama={drama} />
              ))
            ) : (
              <p>No {type === 'actor' ? 'actors' : 'movies'} found for "{query}".</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
