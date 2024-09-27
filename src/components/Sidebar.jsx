import { FaSignInAlt, FaBars, FaCaretDown } from 'react-icons/fa';  // Import additional React icons
import { useState } from 'react';

export default function Sidebar({ countries = [], onCountrySelect }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // State to manage dropdown visibility

  const handleCountrySelect = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);  // Deselect the filter
      onCountrySelect(null);  // Pass null to clear the filter
    } else {
      setSelectedCountry(country);  // Select the new country
      onCountrySelect(country);  // Pass the selected country for filtering
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);  // Toggle the dropdown visibility
  };

  return (
    <div>
      {/* Sidebar for larger screens */}
      <nav className="col-md-2 d-md-block sidebar bg-dark" style={{ minWidth: '220px' }}>  {/* Increase sidebar width */}
        <div className="position-sticky">
          <h3 className="sidebar-heading px-3 py-2 d-flex align-items-center">
            <img
              src="https://i.imgur.com/fUTK20b.png"
              alt="Logo"
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
            />
            <a href="/" className="text-white text-decoration-none bg-dark">
              MovNow
            </a>
          </h3>

          {/* Dropdown for small screens */}
          <button
            className="btn btn-dark d-md-none w-100 d-flex justify-content-between align-items-center"
            onClick={toggleDropdown}
          >
            <span className="text-white">Menu</span>
            <FaCaretDown className="text-white" />
          </button>

          {/* Dropdown content (countries + login) */}
          <ul className={`nav flex-column ${isDropdownOpen ? 'd-block' : 'd-none'} d-md-block mt-2`}>
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

            {/* Login button */}
            <li className="nav-item mt-4">
              <a href="/login" className="btn btn-primary btn-filter text-white d-flex align-items-center justify-content-left">
                <FaSignInAlt className="me-2" />  {/* Ensure the React icon is here */}
                Login
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
