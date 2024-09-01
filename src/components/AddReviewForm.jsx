// src/components/AddReviewForm.jsx

import { useState } from 'react';

export default function AddReviewForm({ dramaId, onAddReview }) { // dramaId harus dikirim dari parent component
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userName, comment, rating, dramaId }), // Sertakan dramaId
      });

      if (response.ok) {
        const newReview = await response.json();
        onAddReview(newReview);
        setUserName('');
        setRating(0);
        setComment('');
      } else {
        console.error('Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
    </form>
  );
}
