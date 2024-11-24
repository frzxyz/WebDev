import { useState } from 'react';

export default function Filters({ onFilterChange }) {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingChange = (e) => {
    const rating = parseInt(e.target.value);
    setSelectedRating(rating);
    onFilterChange(rating);
  };

  return (
    <div className="d-flex align-items-center mb-4">
      <label className="me-2">Filtered by:</label>
      <select
        className="form-select mb-2"
        style={{ width: '150px' }} // Menetapkan lebar tetap
        value={selectedRating}
        onChange={handleRatingChange}
      >
        <option value={0}>All Ratings</option>
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars & Up</option>
        <option value={3}>3 Stars & Up</option>
        <option value={2}>2 Stars & Up</option>
        <option value={1}>1 Star & Up</option>
      </select>

    </div>
  );
}
