import { FaSignInAlt } from 'react-icons/fa';  // Import the React icon
import { useState } from 'react';

export default function Sidebar({ countries = [], onCountrySelect }) {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountrySelect = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);  // Deselect the filter
      onCountrySelect(null);  // Pass null to clear the filter
    } else {
      setSelectedCountry(country);  // Select the new country
      onCountrySelect(country);  // Pass the selected country for filtering
    }
  };

  return (
    <nav className="col-md-2 d-md-block sidebar bg-dark">
      <div className="position-sticky">
        <h3 className="sidebar-heading px-3 py-2 d-flex align-items-center">
          <img
            src="https://i.imgur.com/fUTK20b.png"
            alt="Logo"
            style={{ width: '40px', height: '40px', marginRight: '10px' }}
          />
          <a href="/" className="text-white text-decoration-none">
            MovNow
          </a>
        </h3>

        <ul className="nav flex-column">
          {/* Dynamically list the countries */}
          {countries.map((country, index) => (
            <li key={index} className="nav-item">
              <a
                className={`nav-link ${selectedCountry === country.name ? 'active bg-primary' : ''} text-white`}
                href="#"
                onClick={() => handleCountrySelect(country.name)}
              >
                {country.name}
              </a>
            </li>
          ))}

          {/* Add some spacing before the Login button */}
          <li className="nav-item mt-4">
            <a href="/login" className="nav-link btn btn-primary text-white d-flex align-items-center justify-content-left">
              <FaSignInAlt className="me-2" />  {/* Add the React icon here */}
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
