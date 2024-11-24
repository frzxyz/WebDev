import { useState } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession dari NextAuth
import '../styles/custom.css';

export default function AddReviewForm({ dramaId, onAddReview }) {
  const { data: session } = useSession(); // Dapatkan session user
  const [userName, setUserName] = useState(session?.user?.name || '');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!session) {
      alert('Silakan login terlebih dahulu untuk menambahkan review.');
      return;
    }
  
    const newReview = {
      dramaId,
      userId: session.user.id, 
      userName: session.user.name,
      rating: parseInt(rating),
      comment,
    };
    console.log('Session saat ini:', session);

    console.log('Data review yang akan dikirim:', newReview);
  
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gagal menambahkan review:', errorData);
        throw new Error(errorData.error || 'Failed to submit review');
      }
  
      const addedReview = await response.json();
      onAddReview(addedReview);
  
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label  htmlFor="userName" className="form-label">Name</label>
        <input
          id="userName"
          type="text"
          className="form-control"
          value={userName}
          disabled
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="rating" className="form-label">Rating</label>
        <select
          id="rating"
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
        <label htmlFor="thoughts" className="form-label">Your Thoughts</label>
        <textarea
          id="thoughts"
          className="form-control"
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-secondary btn-filter">Submit</button>
    </form>
  );
}
