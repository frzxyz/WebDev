export default function ReviewList({ reviews, minRating }) {
  const filteredReviews = reviews.filter(review => review.rating >= minRating);

  return (
    <div>
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review, index) => (
          <div key={index} className="mb-3">
            <strong>{review.userName}</strong> ({review.date})
            <p>{review.comment}</p>
            <div>
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-warning">&#9733;</span>
              ))}
              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                <span key={i} className="text-secondary">&#9733;</span>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No reviews match this rating.</p>
      )}
    </div>
  );
}
