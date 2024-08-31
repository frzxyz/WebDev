export default function ReviewList({ reviews = [], minRating }) {
  // Check if reviews is an array, otherwise use an empty array
  const filteredReviews = Array.isArray(reviews) ? reviews.filter(review => review.rating >= minRating) : [];

  return (
    <div>
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review, index) => (
          <div key={index} className="mb-4">
            <h5>{review.userName}</h5>
            <p>{review.comment}</p>
            <div>
              {Array.from({ length: review.rating }).map((_, i) => (
                <span key={i} className="text-warning">&#9733;</span>
              ))}
              {Array.from({ length: 5 - review.rating }).map((_, i) => (
                <span key={i} className="text-secondary">&#9733;</span>
              ))}
            </div>
            <p>Date: {review.date}</p>
          </div>
        ))
      ) : (
        <p>No reviews available for this rating.</p>
      )}
    </div>
  );
}
