import prisma from '../../lib/prisma';  // Assuming you're using Prisma for database interaction
import { useState, useEffect } from 'react';
import GlobalLayout from '../components/GlobalLayout';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import DramaCard from '../components/DramaCard';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
// import { SessionProvider } from "next-auth/react";

export async function getServerSideProps(context) {
  const page = parseInt(context.query.page) || 1;
  const pageSize = 25;

  // Fetch all dramas (without pagination)
  const allDramas = await prisma.drama.findMany({
    include: {
      genres: true,
      country: true,
      awards: true,  // Include the related awards
    },
  });

  // Fetch the list of countries from the Country table
  const countries = await prisma.country.findMany({
    select: {
      name: true,  // Select only the country name
    },
  });

  // Fetch the list of genres from the Genre table
  const genres = await prisma.genre.findMany({
    select: {
      name: true,  // Select only the genre name
    },
  });

  // Fetch all availability values and split them into unique platforms
  const allAvailabilities = await prisma.drama.findMany({
    select: {
      availability: true,  // Fetch the availability column
    },
  });

  // Split availabilities by commas and flatten into one array
  const availabilities = [...new Set(allAvailabilities
    .flatMap(drama => drama.availability.split(','))
    .map(platform => platform.trim())  // Remove any extra whitespace
  )];

  // Fetch the distinct list of award names
  const awards = await prisma.award.findMany({
    select: {
      name: true,  // Fetch only the award name
    },
    distinct: ['name'],  // Ensure awards are unique
  });

  return {
    props: {
      allDramas,
      countries: countries || [],
      genres: genres.map(genre => genre.name) || [],
      availabilities: availabilities || [],  // Pass the cleaned unique availabilities
      awards: awards.map(award => award.name) || [],  // Pass the distinct award names
      pageSize,
      currentPage: page,
    },
  };
}



export default function HomePage({ allDramas, countries, genres, availabilities,awards, pageSize, currentPage }) {
  const [filteredDramas, setFilteredDramas] = useState(allDramas);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleFilterChange = (filters) => {
    let filtered = [...allDramas];
  
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
  
    // Filter by availability (split the availability field by commas and match selected platforms)
    if (filters.availability && filters.availability.length > 0) {
      filtered = filtered.filter(drama => {
        const dramaAvailabilities = drama.availability.split(',').map(a => a.trim());
        return filters.availability.some(platform => dramaAvailabilities.includes(platform));
      });
    }
  
    // Filter by selected awards
    if (filters.awards && filters.awards.length > 0) {
      filtered = filtered.filter(drama =>
        drama.awards && filters.awards.every(award => drama.awards.map(a => a.name).includes(award))
      );
    }
  
    // Filter by selected country
    if (selectedCountry) {
      filtered = filtered.filter(drama => drama.country && drama.country.name === selectedCountry);
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
  

  // Use useEffect to apply the country filter after selectedCountry state updates
  useEffect(() => {
    handleFilterChange({});
  }, [selectedCountry]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  // Calculate total number of pages after filtering
  const totalFilteredDramas = filteredDramas.length;
  const totalPages = Math.ceil(totalFilteredDramas / pageSize);

  // Apply pagination to the filtered dramas
  const paginatedDramas = filteredDramas.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <GlobalLayout>
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar (2 columns wide) */}
          <div className="col-lg-2">
            <Sidebar countries={countries} onCountrySelect={handleCountrySelect} />
          </div>
          
          {/* Main Content (9 columns wide) */}
          <main className="col-md-9 col-lg-10 ms-sm-auto px-md-4">
            <SearchBar />
            <Filters genres={genres} availabilities={availabilities} awards={awards} onFilterChange={handleFilterChange} />
            <div className="row">
              {paginatedDramas.map(drama => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="pagination d-flex justify-content-center align-items-center mt-4">
              <a
                href={`/?page=${currentPage > 1 ? currentPage - 1 : 1}`}
                className={`${currentPage === 1 ? 'disabled' : ''}`}
                style={{ marginRight: '15px', cursor: 'pointer' }}
              >
                <AiOutlineLeft size={30} />
              </a>
              <a
                href={`/?page=${currentPage < totalPages ? currentPage + 1 : totalPages}`}
                className={`${currentPage === totalPages ? 'disabled' : ''}`}
                style={{ marginLeft: '15px', cursor: 'pointer' }}
              >
                <AiOutlineRight size={30} />
              </a>
            </div>
          </main>
        </div>
      </div>
    </GlobalLayout>
  );
  
}
