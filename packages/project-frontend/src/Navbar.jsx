import React from "react";
import Sidebar from "./Sidebar";

// Implements a sticky navbar to the top of the page
const Navbar = ({ darkMode }) => {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

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
      <nav className={`fixed top-0 left-0 w-full h-14 p-4 flex items-center justify-center px-4 z-1001 shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
        {isMobile && (
          <button onClick={toggleSidebar} className="absolute right-4 mr-4 text-xl">
            ☰
          </button>
        )}
        <h1 className="absolute w-full text-center max-w-xs mx-auto sm:text-lg text-base font-bold break-words">
          CSC 437 Final Project
        </h1>

        {/*Navigation pages are always shown on laptops and desktops*/}
        {!isMobile && (
          <ul className="flex right-0 space-x-6 ml-auto mr-2">
            <li><a href="#" className="hover:text-gray-300">Home</a></li>
            <li><a href="#" className="hover:text-gray-300">My Profile</a></li>
          </ul>
        )}
        
        {/*The sidebar is used only for tablets and mobile devices*/}
        {isMobile && isSidebarOpen && (
          <div className={`fixed top-14 right-0 w-48 h-auto p-4 z-40 shadow-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"
            }`}>
            <ul className="space-y-4">
              <li><a href="#" className="block py-2">Home</a></li>
              <li><a href="#" className="block py-2">My Profile</a></li>
            </ul>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
