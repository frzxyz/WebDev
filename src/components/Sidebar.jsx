import Link from 'next/link';

export default function Sidebar() {
  return (
    <nav className="col-md-2 d-md-block sidebar bg-dark">
      <div className="position-sticky">
        <h3 className="sidebar-heading px-3 py-2">
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
        </ul>
      </div>
    </nav>
  );
}
