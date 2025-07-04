import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AlignJustify, X, Hotel, User } from 'lucide-react'
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import axios from 'axios';

const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { name: "Home", path: "" },
    { name: "Rooms", path: "rooms" },
    { name: "ContactUs", path: "contactUs" }
  ];

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token); // If token exists, user is logged in
        const response = await axios.get('http://localhost:8000/api/userProfile',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log(response.data.user)
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    }
    fetchUserProfile()
  }, []);


  useEffect(() => {
    if (location.pathname !== '/') {
      setScrolled(true);   // Force navbar to solid color on route change 
      return;
    } else {
      setScrolled(false)
    }
    setScrolled(prev => location.pathname !== '/' ? true : prev)
    const handleScroll = () => {
      setScrolled(window.scrollY >= 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Prevent background scroll when mobile menu is open
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen, location.pathname]);

  const openLogin = () => {
    setShowLogin(true);
    setMenuOpen(false);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const openProfile = () => {
    setShowProfile(true);
    setShowMobileMenu(false);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // setUser({ name: '', email: '', phone: '', address: '' });
    localStorage.removeItem('token')
    navigate('/')
    setIsAuthenticated(false)
    setShowProfile(false);
    setShowMobileMenu(false);
  };



  return (
    <>
      <nav className={`fixed w-full top-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-gray-800 shadow-md' : 'bg-transparent backdrop-blur-md '
        }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className='relative'>
            <div className='absolute pl-3 inset-y-0 left-0 flex items-center h-full'>
              <Hotel className='text-amber-500 pointer-events-none' />
              <Link to="/" className="text-2xl font-bold text-amber-500 ">
                HotelStay
              </Link>
            </div>
          </div>

          <div className="lg:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white font-bold focus:outline-none">
              {menuOpen ? <X /> : <AlignJustify />}
            </button>
          </div>

          <div
            className={`lg:flex lg:items-center lg:gap-6 ${menuOpen ? 'fixed flex flex-col items-center justify-center h-screen bg-gray-700 z-50 gap-6' : 'hidden'
              } absolute lg:static top-16 left-0 w-full lg:w-auto p-4 lg:p-0 shadow lg:shadow-none transition-all duration-300 ease-in-out`}
          >
            {navLinks.map((item, i) => (
              <Link
                key={i}
                to={`/${item.path.toLowerCase()}`}
                onClick={() => setMenuOpen(false)} // Close menu on link click
                className={`block px-4 py-2 font-bold ${menuOpen
                  ? 'text-white hover:text-amber-700 transition ease-in-out'
                  : scrolled
                    ? 'text-gray-400 hover:text-amber-700 hover:shadow-lg'
                    : 'text-white hover:text-amber-800 hover:shadow-lg'
                  } hover:bg-gray-200 rounded-xl transition ease-in-out duration-300`}
              >
                {item.name}
              </Link>
            ))}

            <div className="lg:ml-4 mt-2 lg:mt-0 px-4">
              <div className="lg:ml-4 mt-2 lg:mt-0 px-4">
                {isAuthenticated ? (
                  <button
                    onClick={openProfile}
                    className={`inline-flex items-center font-bold px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow ${scrolled
                      ? 'bg-indigo-500 text-white hover:bg-indigo-700'
                      : 'bg-white text-indigo-600 hover:bg-indigo-100'
                      }`}
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={openLogin}
                    className={`inline-block font-bold px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:scale-105 shadow ${scrolled
                      ? 'bg-indigo-500 text-white hover:bg-indigo-700'
                      : 'bg-white text-indigo-600 hover:bg-indigo-100'
                      }`}
                  >
                    Login
                  </button>
                )}
              </div>

            </div>
          </div>

        </div>
      </nav >
      {/* Login Modal */}
      <Login isOpen={showLogin} onClose={closeLogin} isAuthenticated={setIsAuthenticated} />

      {/* Profile Modal */}
      <Profile
        isOpen={showProfile}
        onClose={closeProfile}
        user={user}
        setUser={setUser}
        onLogout={handleLogout}
      />

    </>
  );
};

export default LandingNavbar;