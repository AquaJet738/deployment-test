import React from "react";

// Implements a sidebar to the left side of the screen
const Sidebar = ({ isOpen, isMobile, darkMode, toggleSidebar }) => {
  const sidebarRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && isOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile, toggleSidebar]);

  return (
    <>
      {isMobile && (
        <button onClick={toggleSidebar} 
          style={{ position: "fixed", top: "1em", left: "1em", marginRight: "2em", zIndex: 1100 }}>
          ☰ View My Lists
        </button>
      )}
    
    <aside className="sidebar" style={{...styles.sidebar, 
      backgroundColor: darkMode ? "#3E3E3E" : "#D8D7D7",
      color: darkMode ? "white" : "black",
      width: isMobile && !isOpen ? "0" : "12.5em",
      transform: isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)",
      transition: "transform 0.3s ease-in-out",
      overflow: isMobile && !isOpen ? "hidden" : "visible"}}>
      <ul style={styles.list}>
        <li><a href="#" style={{ ...styles.link, color: darkMode ? "white" : "black" }}>List1</a></li>
        <li><a href="#" style={{ ...styles.link, color: darkMode ? "white" : "black" }}>Create New List</a></li> {/* will turn this into a button*/}
      </ul>
    </aside>
    </>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: "3em",
    left: 0,
    width: "12.5em",
    height: "100vh",
    backgroundColor: "#222",
    color: "white",
    padding: "20px",
    zIndex: 1000,
    
  },

  list: {
    listStyle: "none",
    padding: 0,
  },

  link: {
    color: "white",
    textDecoration: "none",
    display: "block",
    padding: "10px 0",
  }
};

export default Sidebar;
