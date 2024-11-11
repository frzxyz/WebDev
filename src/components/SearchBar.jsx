import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/custom.css'; // Make sure this path is correct

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('movie'); // Default search type is "movie"
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?type=${searchType}&query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex justify-content-end align-items-center pt-3 pb-2 mb-3">
      <div className="input-group custom-search-bar">
        <select
          className="form-select2" // Apply Bootstrap form-select styling for the dropdown
          style={{ maxWidth: '120px' }} // Adjust width and spacing
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        >
          <option value="movie">Movie</option>
          <option value="actor">Actor</option>
        </select>
        <input 
          type="search" 
          className="form-control custom-input" 
          placeholder={`Search ${searchType.charAt(0).toUpperCase() + searchType.slice(1)}`} 
          aria-label="Search" 
          aria-describedby="search-addon" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}
