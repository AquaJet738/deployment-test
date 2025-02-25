import React from "react";

function Modal(props) {
    const modalRef = React.useRef(null);

    React.useEffect(() => {
        const handleOutsideClick = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                props.onCloseRequested();
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [props]);

    if (!props.isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-slate-800/55 flex justify-center items-center">
            <div ref={modalRef}
                className="p-6 rounded-lg shadow-lg bg-white text-black dark:bg-slate-700 dark:text-white">
                <div className="modal-header flex justify-between items-center font-bold text-lg">
                    <span>{props.headerLabel}</span>
                    <button 
                        aria-label="Close" 
                        className="text-xl font-bold" 
                        onClick={props.onCloseRequested}>
                        &times;
                    </button>
                </div>
                {props.children}
            </div>
        </div>
    );
}

// Implements a sidebar to the left side of the screen
const Sidebar = ({ isOpen, isMobile, darkMode, toggleSidebar, setSelectedList }) => {
  const sidebarRef = React.useRef(null);

  // sidebar will also handle creation of new lists
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newListName, setNewListName] = React.useState("");
  const [lists, setLists] = React.useState([]);

  const handleCreateList = () => {
    if (newListName) {
      console.log("Creating new list:", newListName);
      setLists((prevLists) => [...prevLists, newListName]);
      setNewListName("");
      setIsModalOpen(false);
    }
  };

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
    
      <aside className="sidebar" 
        style={{...styles.sidebar, 
        backgroundColor: darkMode ? "#3E3E3E" : "#D8D7D7",
        color: darkMode ? "white" : "black",
        width: isMobile && !isOpen ? "0" : "12.5em",
        transform: isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)",
        transition: "transform 0.3s ease-in-out",
        overflow: isMobile && !isOpen ? "hidden" : "visible"}}>
        <ul style={styles.list}>
          {lists.map((list, index) => (
            <li key={index}>
              <a href="#"
              onClick={() => setSelectedList(list)}>
                {list}
              </a>
            </li>
          ))}

          <li>
            <button onClick={() => setIsModalOpen(true)} 
              style={{ ...styles.link, background: "transparent", 
                border: "none", color: darkMode ? "white" : "black" }}>
                Create New List
            </button>
          </li> {/* will turn this into a button*/}
        </ul>
      </aside>

      <Modal isOpen={isModalOpen} onCloseRequested={() => setIsModalOpen(false)} headerLabel="Create New List">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="Enter list name"
          style={styles.input}
        />

        <div>
          <button onClick={handleCreateList} style={styles.button}>
            Create
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{ ...styles.button, backgroundColor: "gray" }}>
            Cancel
          </button>
        </div>
      </Modal>

      {/* prompts user to select a list 
      <div style={styles.content}>
        {selectedList ? (
          <div>
            <h2>{selectedList}</h2>
            <p>This is the content for {selectedList}. You can add specific content for each list here.</p>
           
          </div>
        ) : (
          <div>
            <h2>Welcome</h2>
            <p>Select a list to view its contents.</p>
          </div>
        )}
      </div> */}
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
  }, 

  input: {
    padding: "10px",
    marginBottom: "20px",
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },

  button: {
    padding: "10px 20px",
    margin: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Sidebar;
