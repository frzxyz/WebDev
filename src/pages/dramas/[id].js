import { useRouter } from 'next/router';


import Sidebar from '../../components/Sidebar';
import SearchBar from '../../components/SearchBar';
import Filters from '../../components/RatingFilter';
import ReviewList from '../../components/ReviewList';
import AddReviewForm from '../../components/AddReviewForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/custom.css';

import prisma from '../../../lib/prisma'; // Pastikan path ini sesuai
import { useState } from 'react';

function formatDate(date) {
  return date.toLocaleDateString('en-CA');  // Format YYYY-MM-DD sesuai standar Kanada
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const drama = await prisma.drama.findUnique({
    where: { id: parseInt(id) },
    include: {
      genres: true,
      actors: true,
      reviews: true, // Sertakan review dalam query
    },
  });


  // Format tanggal di sisi server sebelum mengirim ke klien
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
  const { id } = router.query;
  const [minRating, setMinRating] = useState(0);

  const [reviews, setReviews] = useState(initialReviews);
  const [filteredReviews, setFilteredReviews] = useState(initialReviews);

  const handleAddReview = (newReview) => {
    setReviews((prevReviews) => [...prevReviews, newReview]);
    setFilteredReviews((prevFiltered) => [...prevFiltered, newReview]);
  };


  if (!drama) {
    return <div>Drama not found</div>;
  }


  const cast = drama.actors;


  return (
    <div className="container-fluid bg-dark text-white">
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <SearchBar />
          <div className="row mt-4">
            <div className="col-md-4">
              <img src={drama.urlPhoto} alt={drama.title} className="img-fluid mb-4" />

            </div>
            <div className="col-md-8">
              <h1 className="display-4">{drama.title}</h1>
              <p><strong>Alternative Titles:</strong> {drama.alternativeTitle}</p>
              <p><strong>Year:</strong> {drama.year}</p>
              <p><strong>Genres:</strong> {drama.genres.map(genre => genre.name).join(', ')}</p>
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

                  src={convertToEmbedUrl(drama.trailerLink)} // Pastikan URL ini diubah menjadi format yang benar
                  allowFullScreen
                  title="Drama Trailer"
                  style={{ width: '70%', height: '30vw', border: 'none' }}

                ></iframe>
              </div>
            </div>
          </div>

          {/* Review dan Tambah Review Form */}
          <div className="row mt-4">

          <h4>People think about this drama</h4>
          <Filters onFilterChange={(rating) => setFilteredReviews(reviews.filter(r => r.rating >= rating))} />
          <ReviewList reviews={filteredReviews} />
        </div>

        <div className="row mt-4">
          <h4>Add yours!</h4>
          <AddReviewForm dramaId={drama.id} onAddReview={handleAddReview} />
        </div>

        </main>
      </div>
    </div>
  );
}


function convertToEmbedUrl(url) {
  return url.replace("watch?v=", "embed/");
}

