// src/components/DramaCard.js

export default function DramaCard({ drama }) {
    return (
      <div className="col-12 col-md-6 col-lg-3 mb-4"> {/* This ensures 4 cards per row on large screens */}
        <div className="card">
          <img src={drama.poster} className="card-img-top" alt={drama.title} />
          <div className="card-body">
            <h5 className="card-title">{drama.title}</h5>
            <p className="card-text">{drama.year}<br />{drama.genre}<br />Rate: {drama.rating}/5<br />{drama.views} views</p>
          </div>
        </div>
      </div>
    );
  }
  