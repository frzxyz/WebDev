import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react'; // Import useSession

import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import Filters from '../../components/RatingFilter';
import ReviewList from '../../components/ReviewList';
import AddReviewForm from '../../components/AddReviewForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/custom.css';

import prisma from '../../../lib/prisma';
import { useState } from 'react';

function formatDate(date) {
  return date.toLocaleDateString('en-CA'); // Format tanggal YYYY-MM-DD
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const drama = await prisma.drama.findUnique({
    where: { id: parseInt(id) },
    include: {
      genres: true,
      actors: true,
      reviews: true, // Sertakan review
    },
  });

  // Format tanggal review di server sebelum dikirim ke klien
  drama.reviews = drama.reviews.map(review => ({
    ...review,
    date: formatDate(review.date),
  }));

  return {
    props: {
      drama,
      initialReviews: drama.reviews,
    },
  };
}

export default function DramaDetails({ drama, initialReviews }) {
  const router = useRouter();
  const { data: session } = useSession(); // Cek status login
  const [reviews, setReviews] = useState(initialReviews);
  const [filteredReviews, setFilteredReviews] = useState(initialReviews);

  const handleAddReview = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
    setFilteredReviews(prevFiltered => [...prevFiltered, newReview]);
  };

  if (!drama) {
    return <div>Drama not found</div>;
  }

  const cast = drama.actors;

  return (
    <div className="container-fluid bg-dark text-white">
      <div className="row">
        <div className="col-lg-2">
          <Sidebar />
        </div>
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <SearchBar />
          <div className="row mt-4">
            <div className="col-md-4">
              <img
                src={drama.urlPhoto}
                alt={drama.title}
                className="img-fluid mb-4"
                style={{ width: '300px', height: '450px', objectFit: 'cover' }}
              />
            </div>
            <div className="col-md-8">
              <h1 className="display-4">{drama.title}</h1>
              <p><strong>Alternative Titles:</strong> {drama.alternativeTitle}</p>
              <p><strong>Year:</strong> {drama.year}</p>
              <p><strong>Genres:</strong> {drama.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>Duration:</strong> {drama.duration} Minutes</p>
              <p><strong>Rating:</strong> {drama.rating}</p>
              <p><strong>Availability:</strong> {drama.availability}</p>
              <p style={{ textAlign: 'justify' }}><strong>Description:</strong> {drama.synopsis}</p>
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
                      style={{ objectFit: 'cover', width: '50px', height: '50px' }}
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
                  src={convertToEmbedUrl(drama.trailerLink)}
                  allowFullScreen
                  title="Drama Trailer"
                  style={{ width: '70%', height: '30vw', border: 'none' }}
                ></iframe>
              </div>
            </div>
          </div>

          <div className="row mt-4">
            <h4>People think about this drama</h4>
            <Filters onFilterChange={(rating) => setFilteredReviews(reviews.filter(r => r.rating >= rating))} />
            <ReviewList reviews={filteredReviews} />
          </div>

          <div className="row mt-4">
            <h4>Add yours!</h4>
            {session ? (
              <AddReviewForm dramaId={drama.id} onAddReview={handleAddReview} />
            ) : (
              <p>Please <a href="/login">login</a> to add a review.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function convertToEmbedUrl(url) {
  let videoId;

  // Check if the URL is in the short format (youtu.be)
  if (url.includes("youtu.be")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }
  // Check if the URL is in the standard format (youtube.com)
  else if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  }

  // Build the new embedded URL with parameters
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&controls=1`;
}

// Example usage
const originalUrl = "https://youtu.be/49_44FFKZ1M?feature=shared";
const embedUrl = convertToEmbedUrl(originalUrl);
console.log(embedUrl);
