import Link from 'next/link';
import { useRouter } from 'next/router';
import '../styles/custom.css';

export default function DramaCard({ drama }) {
  const router = useRouter();

  const incrementViews = async () => {
    try {
      await fetch('/api/incrementViews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dramaId: drama.id }), // Pass the drama ID to the API
      });
    } catch (error) {
      console.error('Failed to increment views', error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    await incrementViews();
    // Navigate to the drama details page after updating views
    router.push(`/dramas/${drama.id}`);
  };

  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 d-flex">
      <a href={`/dramas/${drama.id}`} onClick={handleClick} className="text-decoration-none h-100 w-100">
        <div className="card shadow-sm text-white border-0 d-flex flex-column" style={{ backgroundColor: '#333333' }}>
          <div style={{ flex: '1 0 auto', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={drama.urlPhoto} className="card-img-top" alt={drama.title} style={{ height: 'auto' }} />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-truncate">{drama.title}</h5>
            <p className="card-text text-truncate">
              {drama.year}
              <br />
              {Array.isArray(drama.genres) ? drama.genres.map(genre => genre.name).join(', ') : 'No genres available'}
              <br />
              Rate: {drama.rating !== null ? `${drama.rating}/10` : 'No rating'}
              <br />
              {drama.views} views
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
