export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  return (
    <div>
      {reviews.map((review, index) => (
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
      ))}
    </div>
  );
}
