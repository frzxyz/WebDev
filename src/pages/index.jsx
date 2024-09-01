import { useState, useEffect } from 'react';
import GlobalLayout from '../components/GlobalLayout';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DramaCard from '../components/DramaCard';
import prisma from '../../lib/prisma';

export async function getServerSideProps() {
  const dramas = await prisma.drama.findMany({
    include: {
      genres: true,
    },
  });

  return {
    props: {
      dramas,
    },
  };
}

export default function HomePage({ dramas }) {
  const [filteredDramas, setFilteredDramas] = useState(dramas);

  const handleFilterChange = (filters) => {
    let filtered = [...dramas];

    // Filter by year
    if (filters.year) {
      filtered = filtered.filter(drama => drama.year === filters.year);
    }

    // Filter by genres
    if (filters.genres && filters.genres.length > 0) {
      filtered = filtered.filter(drama =>
        filters.genres.every(genre => drama.genres.map(g => g.name).includes(genre))
      );
    }

    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      filtered = filtered.filter(drama =>
        filters.availability.includes(drama.availability)
      );
    }

    // Sort by selected option
    if (filters.sortOption === 'alphabetic') {
      filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortOption === 'year') {
      filtered = filtered.sort((a, b) => b.year - a.year);
    } else if (filters.sortOption === 'rating') {
      filtered = filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredDramas(filtered);
  };

  return (
    <GlobalLayout>
      <Sidebar />
      <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <SearchBar />
        <Filters onFilterChange={handleFilterChange} />
        <div className="row">
          {filteredDramas.map(drama => (
            <DramaCard key={drama.id} drama={drama} />
          ))}
        </div>
      </main>
    </GlobalLayout>
  );
}
