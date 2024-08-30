import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import DramaCard from '../components/DramaCard';
import { dramas } from '../data/dramas'; // Replace with actual search results
import 'bootstrap/dist/css/bootstrap.min.css';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query; // Extract the query parameter from the URL
  const [filteredDramas, setFilteredDramas] = useState([]);

  useEffect(() => {
    if (query) {
      // Filter dramas based only on the title
      const results = dramas.filter(drama =>
        drama.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDramas(results);
    } else {
      setFilteredDramas(dramas); // Display all dramas if no query is provided
    }
  }, [query]);

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <SearchBar />
          <h5 className="my-4">Searched/Tagged with "{query}"</h5>
          <div className="row">
            {filteredDramas.length > 0 ? (
              filteredDramas.map((drama) => (
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
