import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import Modal from 'react-modal';
import '../styles/custom.css';

export default function Filters({ genres, availabilities, awards, onFilterChange }) {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedAwards, setSelectedAwards] = useState([]);  // New state for selected awards
  const [startDate, setStartDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [sortOption, setSortOption] = useState('alphabetic');

  const handleYearChange = (date) => {
    setStartDate(date);
    setIsModalOpen(false);
    onFilterChange({ year: date ? date.getFullYear() : null, genres: selectedGenres, availability: selectedAvailability, awards: selectedAwards, sortOption });
  };

  const handleClearYear = () => {
    setStartDate(null);
    onFilterChange({ year: null, genres: selectedGenres, availability: selectedAvailability, awards: selectedAwards, sortOption });
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
    onFilterChange({ year: startDate ? startDate.getFullYear() : null, genres: selectedGenres, availability: selectedAvailability, awards: selectedAwards, sortOption: sort });
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

  // New function to handle Award selection
  const handleAwardChange = (award) => {
    setSelectedAwards((prevSelectedAwards) => {
      if (prevSelectedAwards.includes(award)) {
        return prevSelectedAwards.filter(a => a !== award);
      } else {
        return [...prevSelectedAwards, award];
      }
    });
  };

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  useEffect(() => {
    onFilterChange({
      year: startDate ? startDate.getFullYear() : null,
      genres: selectedGenres,
      availability: selectedAvailability,
      awards: selectedAwards,  // Include selected awards in the filter update
      sortOption,
    });
  }, [sortOption, startDate, selectedGenres, selectedAvailability, selectedAwards]);

  return (
    <div className="row mb-4">
      <div className="col text-white">
        <label>Filtered by:</label>

        <button 
          className="btn btn-outline-secondary text-white mb-1 me-2 ms-2 btn-filter"
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

        {/* Genre Dropdown */}
        <div className="dropdown d-inline-block w-auto me-2 ms-2 mb-1 bg-dark">
          <button
            className="btn dropdown-toggle btn-outline-secondary text-white mb-1 btn-filter"
            type="button"
            id="dropdownGenres"
            aria-expanded={openDropdown === 'genres'}
            onClick={() => toggleDropdown('genres')}
          >
            Genre
          </button>
          <ul className={`dropdown-menu ${openDropdown === 'genres' ? 'show' : ''}`} aria-labelledby="dropdownGenres">
            <div className="genre-scroll-container">
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
            </div>
          </ul>
        </div>

        <div className="dropdown d-inline-block w-auto me-2 ms-2 mb-1 bg-dark">
          <button
            className="btn dropdown-toggle btn-outline-secondary text-white mb-1 btn-filter"
            type="button"
            id="dropdownAvailability"
            aria-expanded={openDropdown === 'availability'}
            onClick={() => toggleDropdown('availability')}
          >
            Availability
          </button>
          <ul className={`dropdown-menu ${openDropdown === 'availability' ? 'show' : ''}`} aria-labelledby="dropdownAvailability">
            <div className="scrollable-dropdown">  {/* Add scrollable container */}
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
                    <label htmlFor={`availability-${platform}`} className="form-check-label availability-label">
                      {platform}
                    </label>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>


        <div className="dropdown d-inline-block w-auto me-2 ms-2 mb-1 bg-dark">
          <button
            className="btn dropdown-toggle btn-outline-secondary text-white mb-1 btn-filter"
            type="button"
            id="dropdownAwards"
            aria-expanded={openDropdown === 'awards'}
            onClick={() => toggleDropdown('awards')}
          >
            Award
          </button>
          <ul className={`dropdown-menu ${openDropdown === 'awards' ? 'show' : ''}`} aria-labelledby="dropdownAwards">
            <div className="scrollable-dropdown"> 
              {awards.map((award) => (
                <li key={award} className="dropdown-item">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      id={`award-${award}`}
                      className="form-check-input"
                      value={award}
                      onChange={() => handleAwardChange(award)}
                    />
                    <label htmlFor={`award-${award}`} className="form-check-label award-label">
                      {award}
                    </label>
                  </div>
                </li>
              ))}
            </div>
          </ul>
        </div>


      </div>
      <div className="col text-end">
      <label className="me-2">Sorted by:</label>
      <select
        className="btn dropdown-toggle btn-outline-secondary text-white mb-1 btn-filter"
        value={sortOption}
        onChange={handleSortChange}
        style={{ width: '130px' }}
      >
        <option value="alphabetic">Alphabetic</option>
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </select>
    </div>


    </div>
  );
}
