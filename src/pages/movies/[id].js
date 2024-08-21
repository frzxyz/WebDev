// src/pages/movies/[id].js

import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { movies } from '../../data/movies';

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const movie = movies.find((movie) => movie.id === parseInt(id));

  if (!movie) return <p>Movie not found</p>;

  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-4">{movie.title}</h2>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <img className="w-full" src={movie.poster} alt={movie.title} />
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            {movie.description}
          </p>
          <p className="text-gray-600">Year: {movie.year}</p>
          <p className="text-gray-600">Rating: {movie.rating}</p>
          <p className="text-gray-600">Genre: {movie.genre}</p>
        </div>
      </div>
    </Layout>
  );
}
