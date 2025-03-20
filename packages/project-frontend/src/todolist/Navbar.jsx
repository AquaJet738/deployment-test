import React from "react";
import { Link } from "react-router";

import { Spinner } from "../Spinner";

// Implements a sticky navbar to the top of the page
const Navbar = ({ darkMode }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  const [loading, setLoading] = React.useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const navbarStyle = {
    backgroundColor: darkMode ? "#333" : "#f5f5f5", // Dark gray for dark mode, light gray for light mode
    color: darkMode ? "#fff" : "#000",
    padding: "1.5em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  React.useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      
      // Ensure sidebar is always visible on larger screens
      if (!mobileView) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <>
      <nav style={navbarStyle} 
        className={`fixed top-0 left-0 w-full h-14 p-4 flex items-center justify-center px-4 z-1001 shadow-md 
          ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {isMobile && (
          <button onClick={toggleSidebar} className="absolute right-4 mr-4 text-xl">
            ☰
          </button>
        )}

        {/* Loading indicator on desktop */}
        {!isMobile && loading && (
          <div className={`fixed right-45 top-4.5 text-black 
            ${darkMode ? "text-white" : "text-black"}
            `}>
            <Spinner />
          </div>
        )}

        {!isMobile && (
          <ul className="flex right-0 space-x-6 ml-auto mr-2">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/mylists" className="hover:text-gray-300">My Lists</Link></li>
            <li><Link to="/profile" className="hover:text-gray-300">My Profile</Link></li>
          </ul>
        )}

        {/* Loading indicator on mobile */}
        {isMobile && isSidebarOpen && (
          <div className={`fixed top-14 right-0 w-48 h-auto p-4 z-40 shadow-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}>
            <ul className="space-y-4">
              <li><Link to="/" className="block py-2">Home</Link></li>
              <li><Link to="/mylists" className="block py-2">My Lists</Link></li>
              <li><Link to="/profile" className="block py-2">My Profile</Link></li>
            </ul>
          </div>
        )}

        {isMobile && loading && (
          <div className={`fixed right-15 top-4.5 text-black 
            ${darkMode ? "text-white" : "text-black"}
            `}>
            <Spinner />
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
