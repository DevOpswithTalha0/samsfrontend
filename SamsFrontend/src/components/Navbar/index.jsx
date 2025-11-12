import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaUserCircle,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/Auth";
import { logout as logoutAction } from "../../redux/slices/User";
import { accessKey } from "../../utils/constants";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasToken, setHasToken] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const dispatch = useDispatch();

  const [logoutApi] = useLogoutMutation();

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Grievance", href: "/grievance" },
    { label: "Events", href: "/events" },
    { label: "Counseling", href: "/counseling" },
    { label: "Feedback", href: "/feedback" },
    { label: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const logoutHandler = async () => {
    try {
      const res = await logoutApi().unwrap();
      if (res?.statusCode === 200) {
        dispatch(logoutAction());
        setHasToken(false);
        setIsDropdownOpen(false);
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(accessKey);
    setHasToken(!!token);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-md transition-all duration-200">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex-none">
            <Link to="/">
              <h1
                className="text-indigo-500 text-4xl sm:text-5xl"
                style={{ fontFamily: "dancingScript" }}
              >
                SAMS
              </h1>
            </Link>
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-indigo-500 p-2 hover:bg-gray-100 rounded-lg focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          <nav className="hidden lg:flex flex-1 justify-center space-x-4 xl:space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-base xl:text-[18px] font-medium transition px-2 xl:px-3 py-1 rounded-lg ${
                  location.pathname === item.href
                    ? "text-indigo-500 font-semibold"
                    : "text-gray-700 hover:text-indigo-600 transition duration-300"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex space-x-2 xl:space-x-4 items-center relative">
            {!hasToken ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-base xl:text-[18px] font-medium text-indigo-500 border border-indigo-500 rounded-lg hover:bg-indigo-100 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-base xl:text-[18px] font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={toggleDropdown}
                  className="rounded-full bg-indigo-100 text-indigo-600 p-2 text-2xl sm:text-3xl hover:bg-indigo-200 transition"
                >
                  <FaUserCircle />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-2 z-50 border border-gray-300">
                    <Link
                      to="/profile"
                      onClick={() => setIsDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-lg mb-2"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 lg:hidden transition duration-300">
          <div className="absolute top-0 left-0 right-0 bg-white shadow-lg border-b border-gray-200">
            <div className="flex justify-between items-center px-4 sm:px-6 py-4">
              <Link to="/">
                <h1
                  className="text-indigo-500 text-4xl sm:text-5xl"
                  style={{ fontFamily: "dancingScript" }}
                >
                  SAMS
                </h1>
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-600 text-2xl p-2 rounded-lg hover:bg-gray-200"
              >
                <IoClose />
              </button>
            </div>

            <div className="flex flex-col items-center py-4 space-y-3 px-4 sm:px-6">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={toggleMenu}
                  className={`text-base sm:text-[18px] font-medium px-3 py-1 rounded-lg transition ${
                    location.pathname === item.href
                      ? "text-indigo-500 font-semibold"
                      : "text-gray-700 hover:text-indigo-600 transition duration-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              {!hasToken ? (
                <>
                  <Link
                    to="/login"
                    onClick={toggleMenu}
                    className="w-full sm:w-3/4 text-center px-4 py-2 text-base font-medium text-indigo-500 border border-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-300"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={toggleMenu}
                    className="w-full sm:w-3/4 text-center px-4 py-2 text-base font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="w-full sm:w-3/4 space-y-2">
                  <Link
                    to="/profile"
                    onClick={toggleMenu}
                    className="block w-full text-center text-base font-medium text-gray-700 border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={async () => {
                      toggleMenu();
                      await logoutHandler();
                    }}
                    className="block w-full text-center text-base font-medium text-red-500 border border-red-400 rounded-lg py-2 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}

              <div className="flex justify-center space-x-4 mt-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram
                    size={20}
                    className="text-indigo-500 hover:text-indigo-700"
                  />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  <FaFacebook
                    size={20}
                    className="text-indigo-500 hover:text-indigo-700"
                  />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                  <FaLinkedin
                    size={20}
                    className="text-indigo-500 hover:text-indigo-700"
                  />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <FaTwitter
                    size={20}
                    className="text-indigo-500 hover:text-indigo-700"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
