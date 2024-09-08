export default function ReviewList({ reviews }) {
  return (
    <div>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
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
        <p>No reviews available for this drama yet.</p>
      )}
    </div>
  );
}