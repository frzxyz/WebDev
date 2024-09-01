import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Modal from 'react-modal';

export default function Filters({ onFilterChange }) {
  const genres = ['Historical', 'Romance', 'Drama', 'Slice of Life', 'Crime', 'Comedy', 'Fantasy', 'Horror', 'Thriller'];
  const availabilities = ['Netflix', 'Amazon Prime', 'Disney+'];

  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOption, setSortOption] = useState('alphabetic'); 

  const handleYearChange = (date) => {
    setStartDate(date);
    setIsModalOpen(false);
    onFilterChange({ year: date ? date.getFullYear() : null, genres: selectedGenres, availability: selectedAvailability, sortOption });
  };

  const handleClearYear = () => {
    setStartDate(null);
    onFilterChange({ year: null, genres: selectedGenres, availability: selectedAvailability, sortOption });
  };

  const handleGenreChange = (genre) => {
    setSelectedGenres((prevSelectedGenres) => {
      if (prevSelectedGenres.includes(genre)) {
        return prevSelectedGenres.filter(g => g !== genre);
      } else {
        return [...prevSelectedGenres, genre];
      }
    });
  };

  const handleSortChange = (e) => {
    const sort = e.target.value;
    setSortOption(sort);
    onFilterChange({ year: startDate ? startDate.getFullYear() : null, genres: selectedGenres, availability: selectedAvailability, sortOption: sort });
  };

  const handleAvailabilityChange = (platform) => {
    setSelectedAvailability((prevSelectedAvailability) => {
      if (prevSelectedAvailability.includes(platform)) {
        return prevSelectedAvailability.filter(p => p !== platform);
      } else {
        return [...prevSelectedAvailability, platform];
      }
    });
  };

  const toggleDropdown = (dropdownName) => {
    if (openDropdown === dropdownName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdownName);
    }
  };

  useEffect(() => {
    onFilterChange({
      year: startDate ? startDate.getFullYear() : null,
      genres: selectedGenres,
      availability: selectedAvailability,
      sortOption
    });
  }, [sortOption, startDate, selectedGenres, selectedAvailability]);

  return (
    <div className="row mb-4">
      <div className="col">
        <label>Filtered by:</label>

        <button 
          className="btn btn-outline-secondary text-dark mb-1 me-2 ms-2" 
          style={{ width: 'auto' }}
          onClick={() => setIsModalOpen(true)}
        >
          {startDate ? format(startDate, 'yyyy') : 'Year'}
        </button>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Year Picker"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '300px',
              padding: '20px',
              borderRadius: '10px',
            },
          }}
        >
          <h4>Select Year</h4>
          <DatePicker
            selected={startDate}
            onChange={handleYearChange}
            showYearPicker
            dateFormat="yyyy"
            inline
          />
          <button className="btn btn-secondary mt-3" onClick={() => setIsModalOpen(false)}>Close</button>
          {startDate && (
            <button className="btn btn-danger mt-3 ms-2" onClick={handleClearYear}>Clear Year</button>
          )}
        </Modal>

        <div className="dropdown d-inline-block w-auto me-2 ms-2 mb-1 bg-light">
          <button
            className="btn dropdown-toggle btn-outline-secondary text-dark mb-1"
            type="button"
            id="dropdownGenres"
            aria-expanded={openDropdown === 'genres'}
            onClick={() => toggleDropdown('genres')}
          >
            Genre
          </button>
          <ul className={`dropdown-menu ${openDropdown === 'genres' ? 'show' : ''}`} aria-labelledby="dropdownGenres">
            {genres.map((genre) => (
              <li key={genre} className="dropdown-item">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id={`genre-${genre}`}
                    className="form-check-input"
                    value={genre}
                    onChange={() => handleGenreChange(genre)}
                  />
                  <label htmlFor={`genre-${genre}`} className="form-check-label">
                    {genre}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="dropdown d-inline-block w-auto me-2 ms-2 mb-1 bg-light">
          <button
            className="btn dropdown-toggle btn-outline-secondary text-dark mb-1"
            type="button"
            id="dropdownAvailability"
            aria-expanded={openDropdown === 'availability'}
            onClick={() => toggleDropdown('availability')}
          >
            Availability
          </button>
          <ul className={`dropdown-menu ${openDropdown === 'availability' ? 'show' : ''}`} aria-labelledby="dropdownAvailability">
            {availabilities.map((platform) => (
              <li key={platform} className="dropdown-item">
                <div className="form-check">
                  <input
                    type="checkbox"
                    id={`availability-${platform}`}
                    className="form-check-input"
                    value={platform}
                    onChange={() => handleAvailabilityChange(platform)}
                  />
                  <label htmlFor={`availability-${platform}`} className="form-check-label">
                    {platform}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <select className="form-select d-inline-block w-auto me-2 ms-2 mb-1 shadow-sm bg-light border border-secondary">
          <option>Status</option>
        </select>
        <select className="form-select d-inline-block w-auto me-2 ms-2 mb-1 shadow-sm bg-light border border-secondary">
          <option>Award</option>
        </select>
        <button className="btn btn-primary ms-2 shadow-sm mb-1" onClick={() => onFilterChange({ genres: selectedGenres, availability: selectedAvailability, year: startDate ? startDate.getFullYear() : '', sortOption })}>
          Submit
        </button>
      </div>
      <div className="col text-end">
        <label>Sorted by:</label>
        <select 
          className="form-select d-inline-block w-auto shadow-sm ms-2 border border-secondary"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="alphabetic">Alphabetic</option>
          <option value="year">Year</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    </div>
  );
}
