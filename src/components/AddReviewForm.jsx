import { useState } from 'react';

export default function AddReviewForm() {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send to API)
    console.log({ name, rating, comment });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Rating</label>
        <select
          className="form-select"
          value={rating}
          onChange={(e) => setRating(parseInt(e.target.value))}
          required
        >
          <option value={0}>Select rating</option>
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1} Star{ i + 1 > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Your Thoughts</label>
        <textarea
          className="form-control"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}
