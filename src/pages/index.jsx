
import { useState, useEffect } from 'react';

import GlobalLayout from '../components/GlobalLayout';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DramaCard from '../components/DramaCard';
import '../styles/custom.css';
import prisma from '../../lib/prisma';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';  // Import icons

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page) || 1;  // Get the page number from query params
  const pageSize = 25;  // Number of items per page

  // Calculate the offset (which items to fetch)
  const skip = (page - 1) * pageSize;

  // Fetch movies with pagination
  const dramas = await prisma.drama.findMany({
    skip: skip,
    take: pageSize,  // Fetch 25 items per page
    include: {
      genres: true,
    },
  });

  // Get the total count of dramas for pagination
  const totalDramas = await prisma.drama.count();

  return {
    props: {
      dramas,
      totalDramas,
      currentPage: page,
      pageSize,
    },
  };
}


export default function HomePage({ dramas, totalDramas, currentPage, pageSize }) {
  const [filteredDramas, setFilteredDramas] = useState(dramas);
  const totalPages = Math.ceil(totalDramas / pageSize);  // Calculate total pages
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
      {/* Pagination Controls */}
      <div className="pagination d-flex justify-content-center align-items-center mt-4">
        {/* Previous Button */}
        <a
          href={`/?page=${currentPage > 1 ? currentPage - 1 : 1}`}
          className={`${currentPage === 1 ? 'disabled' : ''}`}
          style={{ marginRight: '15px', cursor: 'pointer' }}
        >
          <AiOutlineLeft size={30} /> {/* Previous Icon */}
        </a>

        {/* Next Button */}
        <a
          href={`/?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
          className={`${currentPage === totalPages ? 'disabled' : ''}`}
          style={{ marginLeft: '15px', cursor: 'pointer' }}
        >
          <AiOutlineRight size={30} /> {/* Next Icon */}
        </a>
      </div>
      </main>
    </GlobalLayout>
  );
}
