import Link from 'next/link';
import '../styles/custom.css';
export default function DramaCard({ drama }) {
  return (
    <div className="col-md-3 mb-4 d-flex">
      <Link href={`/dramas/${drama.id}`} className="text-decoration-none h-100 w-100">
        <div className="card shadow-lg text-white border-0 d-flex flex-column" style={{ backgroundColor: '#333333' }}>
          <div style={{ flex: '1 0 auto', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img 
              src={drama.poster} 
              className="card-img-top" 
              alt={drama.title} 
              style={{ objectFit: 'contain', width: '100%', height: 'auto', border: 'none' }} 
            />
          </div>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-truncate">{drama.title}</h5>
            <p className="card-text text-truncate">
              {drama.year}
              <br />
              {drama.genre}
              <br />
              Rate: {drama.rating}/5
              <br />
              {drama.views} views
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
