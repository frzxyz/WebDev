// import Link from 'next/link';
// export default function DramaCard({ drama }) {
//   return (
//     <div className="col-md-3">
//       <Link href={`/dramas/${drama.id}`} className="text-decoration-none h-100">
//         <div className="card mb-4 shadow-sm">
//           <img src={drama.urlPhoto} className="card-img-top" alt={drama.title} style={{ height: 'auto' }} />
//           <div className="card-body text-truncate">
//             <h5 className="card-title text-truncate">{drama.title}</h5>
//             <p className="card-text text-truncate">
//               {drama.year}
//               <br />
//               {Array.isArray(drama.genres) ? drama.genres.map(genre => genre.name).join(', ') : 'No genres available'}
//               <br />
//               Rate: {drama.rating !== null ? `${drama.rating}/5` : 'No rating'}
//               <br />
//               {drama.views} views
//             </p>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }


import Link from 'next/link';
import '../styles/custom.css';

export default function DramaCard({ drama }) {
  return (
    <div className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4 d-flex"> {/* Adjusted for better responsive behavior */}
      <Link href={`/dramas/${drama.id}`} className="text-decoration-none h-100 w-100">
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
              Rate: {drama.rating !== null ? `${drama.rating}/5` : 'No rating'}
              <br />
              {drama.views} views
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}