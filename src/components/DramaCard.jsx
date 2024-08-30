import Link from 'next/link';

export default function DramaCard({ drama }) {
  return (
    <div className="col-md-3">
      <Link href={`/dramas/${drama.id}`} className="text-decoration-none h-100 ">
        <div className="card mb-4 shadow-sm">
          <img src={drama.poster} className="card-img-top" alt={drama.title} />
          <div className="card-body text-truncate">
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
