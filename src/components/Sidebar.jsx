import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa'; // Importing the sign-in icon

export default function Sidebar() {
  return (
    <nav className="col-md-2 d-md-block sidebar bg-dark">
      <div className="position-sticky">
        <h3 className="sidebar-heading px-3 py-2 d-flex align-items-center"> {/* Flexbox for alignment */}
          {/* Add your image here */}
          <img 
            src="https://i.imgur.com/fUTK20b.png"  // Change this to the actual image path
            alt="Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}  // Adjust size and spacing
          />
          <Link href="/" className="text-white text-decoration-none">
            MovNow
          </Link>
        </h3>
        <ul className="nav flex-column">
          <li className="nav-item">
            <a className="nav-link active text-white" href="#">Japan</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">Korea</a>
          </li>
          <li className="nav-item">
            <a className="nav-link text-white" href="#">China</a>
          </li>
          <li className="nav-item mt-4">
            <Link href="/login" className="nav-link btn btn-primary text-white fw-bold d-flex align-items-center justify-content-left py-2">
              <FaSignInAlt className="me-2" /> {/* Icon with margin */}
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}