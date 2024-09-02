import { useRouter } from 'next/router';
import { dramas } from '../../data/dramas'; // Adjust the path as necessary
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import Filters from '../../components/RatingFilter';
import ReviewList from '../../components/ReviewList';
import AddReviewForm from '../../components/AddReviewForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/custom.css';
import { reviews as initialReviewsData } from '../../data/reviews';
import { useState, useEffect } from 'react';

export default function DramaDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [minRating, setMinRating] = useState(0);
  const [dramaId, setDramaId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]); // Initialize filteredReviews here

  // useEffect to handle the dramaId after the router query is available
  useEffect(() => {
    if (id) {
      const dramaIdParsed = parseInt(id);
      setDramaId(dramaIdParsed);

      const dramaReviews = initialReviewsData.filter(review => review.dramaId === dramaIdParsed);
      setReviews(dramaReviews);
      setFilteredReviews(dramaReviews.filter(review => review.rating >= minRating));
    }
  }, [id]);

  useEffect(() => {
    setFilteredReviews(reviews.filter(review => review.rating >= minRating));
  }, [minRating, reviews]);

  const drama = dramas.find(drama => drama.id === dramaId);

  if (!drama) {
    return <div>Drama not found</div>;
  }

  const handleAddReview = (newReview) => {
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
  };

  const handleFilterChange = (rating) => {
    setMinRating(rating);
  };

  const cast = drama.cast;

  return (
    <div className="container-fluid bg-dark text-white">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <SearchBar />
          <div className="row mt-4">
            <div className="col-md-4">
              <div className="image-container">
                <img 
                  src={drama.poster} 
                  alt={drama.title} 
                  className="img-fluid mb-4"
                />
              </div>
            </div>
            <div className="col-md-8">
              <h1 className="display-4">{drama.title}</h1>
              <p><strong>Other Titles:</strong> {drama.otherTitles}</p>
              <p><strong>Year:</strong> {drama.year}</p>
              <p><strong>Genre:</strong> {drama.genre}</p>
              <p><strong>Rating:</strong> {drama.rating}</p>
              <p><strong>Availability:</strong> {drama.availability}</p>
              <p style={{ textAlign: 'justify' }}><strong>Description:</strong> {drama.description}</p>
            </div>
          </div>

          <div className="row mt-4">
            <h4>Cast</h4>
            <div className="cast-slider">
              <div className="d-flex align-items-center overflow-auto">
                {cast.map((actor, index) => (
                  <div key={index} className="d-flex flex-column align-items-center text-center mx-3">
                    <img 
                      src={actor.photo} 
                      alt={actor.name} 
                      className="img-fluid rounded-circle mb-2" 
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                    />
                    <p className="mb-0 text-truncate">{actor.name}</p>
                    <small className="text-muted">{actor.role}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <h4>Trailer</h4>
            <div className="col-md-12">
              <div className="embed-responsive embed-responsive-16by9">
                <iframe
                  className="embed-responsive-item"
                  src={`https://www.youtube.com/embed/dQw4w9WgXcQ`} // Replace with your video ID
                  allowFullScreen
                  title="Drama Trailer"
                  style={{ width: '100%', height: '40vw', border: 'none' }}
                ></iframe>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <h4>People think about this drama</h4>
            <Filters onFilterChange={handleFilterChange} />
            <ReviewList reviews={filteredReviews} />
          </div>

          <div className="row mt-4">
            <h4>Add yours!</h4>
            <AddReviewForm onAddReview={handleAddReview} />
          </div>
        </main>
      </div>
    </div>
  );
}
