import React, { useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { logout } from "../../Reducer/UserReducer/userAction";
import { UserCircle } from "lucide-react";
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md m-2 rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Brand */}
          <h1 className="text-2xl font-bold tracking-wide">Thoughter</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="font-bold hover:text-gray-200 transition transform active:scale-120">Home</a>
            <a href="/posts" className="font-bold hover:text-gray-200 transition transform active:scale-120">Posts</a>
            <a href="/about" className="font-bold hover:text-gray-200 transition transform active:scale-120">About</a>
            <a href="/contact" className="font-bold hover:text-gray-200 transition transform active:scale-120">Contact</a>

            {!isAuthenticated ? (
              <>
                <a href="/login" className="bg-white text-blue-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-100">
                  Login
                </a>
                <a href="/signup" className="bg-gray-100 text-blue-600 px-4 py-1.5 rounded-lg font-semibold hover:bg-gray-200">
                  Signup
                </a>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <a href="/profile">
                  <UserCircle className="w-6 h-6" />
                </a>
                <button
                
                  onClick={handleLogout}
                  className="bg-red-500  transition transform active:scale-95 hover:bg-red-600 px-4 py-1.5 rounded-lg font-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden transition-transform duration-300"
          >
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ${
                isOpen ? "rotate-90" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ✅ Animated Mobile Dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-96 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"}`}
      >
        <div className="bg-blue-700 space-y-2 px-4 pb-4 pt-2">
          <a href="/" className="block py-2 font-bold hover:text-gray-200">Home</a>
          <a href="/posts" className="block py-2 font-bold hover:text-gray-200">Posts</a>
          <a href="/about" className="block py-2 font-bold hover:text-gray-200">About</a>
          <a href="/contact" className="block py-2 font-bold hover:text-gray-200">Contact</a>

          {!isAuthenticated ? (
            <div className="flex flex-col space-y-2">
              <a href="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
                Login
              </a>
              <a href="/signup" className="bg-gray-100 text-blue-600 px-4 py-2 rounded-lg font-semibold">
                Signup
              </a>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <a
                href="/profile"
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
              >
                <UserCircle className="w-6 h-6" />
                <span>Profile</span>
              </a>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
