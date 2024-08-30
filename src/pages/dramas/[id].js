import { useRouter } from 'next/router';
import { useState } from 'react';
import { dramas } from '../../data/dramas'; // Adjust the path as necessary
import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import Filters from '../../components/RatingFilter';
import ReviewList from '../../components/ReviewList';
import AddReviewForm from '../../components/AddReviewForm';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function DramaDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [minRating, setMinRating] = useState(0);

  const drama = dramas.find(drama => drama.id === parseInt(id)); // Find the drama by ID

  if (!drama) {
    return <div>Drama not found</div>;
  }

  const handleFilterChange = (rating) => {
    setMinRating(rating);
  };

  // Hardcoded cast information using lorem ipsum
  const cast = [
    { name: "Actor 1", photo: "https://via.placeholder.com/100", role: "Main Role" },
    { name: "Actor 2", photo: "https://via.placeholder.com/100", role: "Supporting Role" },
    { name: "Actor 3", photo: "https://via.placeholder.com/100", role: "Supporting Role" },
    { name: "Actor 4", photo: "https://via.placeholder.com/100", role: "Guest Role" },
    { name: "Actor 5", photo: "https://via.placeholder.com/100", role: "Guest Role" },
  ];

  // Hardcoded reviews using lorem ipsum
  const reviews = [
    { userName: "John Doe", date: "2024-01-01", comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", rating: 4 },
    { userName: "Jane Smith", date: "2024-01-02", comment: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", rating: 5 },
    { userName: "Alice Johnson", date: "2024-01-03", comment: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.", rating: 3 },
    { userName: "Bob Brown", date: "2024-01-04", comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.", rating: 4 },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <SearchBar />
          <div className="row mt-4">
            <div className="col-md-4">
              <img src={drama.poster} alt={drama.title} className="img-fluid mb-4" />
            </div>
            <div className="col-md-8">
              <h1 className="display-4">{drama.title}</h1>
              <p><strong>Other Titles:</strong> {drama.otherTitles}</p>
              <p><strong>Year:</strong> {drama.year}</p>
              <p><strong>Genre:</strong> {drama.genre}</p>
              <p><strong>Rating:</strong> {drama.rating}</p>
              <p><strong>Availability:</strong> {drama.availability}</p>
              <p>{drama.description}</p>
            </div>
          </div>

          <div className="row mt-4">
            <h4>Cast</h4>
            <div className="d-flex justify-content-start">
              {cast.map((actor, index) => (
                <div key={index} className="me-3 text-center">
                  <div className="bg-light p-3 mb-2" style={{ width: '100px', height: '100px' }}>
                    <img src={actor.photo} alt={actor.name} className="img-fluid rounded-circle" />
                  </div>
                  <p className="mb-0">{actor.name}</p>
                  <small className="text-muted">{actor.role}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="row mt-4">
            <h4>Trailer</h4>
            <div className="col-md-12">
              <div className="embed-responsive embed-responsive-16by9 bg-light d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                <i className="fa fa-play-circle fa-5x text-muted"></i>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <h4>People think about this drama</h4>
            <Filters onFilterChange={handleFilterChange} />
            <ReviewList reviews={reviews} minRating={minRating} />
          </div>

          <div className="row mt-4">
            <h4>Add yours!</h4>
            <AddReviewForm />
          </div>
        </main>
      </div>
    </div>
  );
}