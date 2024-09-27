import { useState } from 'react';
import { useRouter } from 'next/router';
import '../styles/custom.css'; // Make sure this path is correct

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex justify-content-end align-items-center pt-3 pb-2 mb-3 ">
      <div className="input-group custom-search-bar">
        <input 
          type="search" 
          className="form-control custom-input" 
          placeholder="Search Movie" 
          aria-label="Search" 
          aria-describedby="search-addon" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
}
