import { FaSignInAlt, FaSignOutAlt, FaBars, FaCaretDown } from 'react-icons/fa';  
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';  // Import next-auth hooks

export default function Sidebar({ countries = [], onCountrySelect }) {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: session } = useSession();  // Get session data

  const handleCountrySelect = (country) => {
    if (selectedCountry === country) {
      setSelectedCountry(null);
      onCountrySelect(null);
    } else {
      setSelectedCountry(country);
      onCountrySelect(country);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="col-md-2 d-md-block sidebar bg-dark" style={{ minWidth: '220px' }}>
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

          <button
            className="btn btn-dark d-md-none w-100 d-flex justify-content-between align-items-center"
            onClick={toggleDropdown}
          >
            <span className="text-white">Menu</span>
            <FaCaretDown className="text-white" />
          </button>

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

            {/* Login/Logout Button */}
            <li className="nav-item mt-4">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="btn btn-primary btn-filter text-white d-flex align-items-center justify-content-left"
                >
                  <FaSignOutAlt className="me-2" /> Logout
                </button>
              ) : (
                <button
                  onClick={() => signIn()}
                  className="btn btn-primary btn-filter text-white d-flex align-items-center justify-content-left"
                >
                  <FaSignInAlt className="me-2" /> Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
