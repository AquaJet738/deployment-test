// Implements a sidebar to the left side of the screen
const Sidebar = () => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.list}>
        <li><a href="#" style={styles.link}>Home</a></li>
        <li><a href="#" style={styles.link}>About</a></li>
        <li><a href="#" style={styles.link}>Projects</a></li>
        <li><a href="#" style={styles.link}>Contact</a></li>
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    position: "fixed",
    top: "2em",
    left: 0,
    width: "200px",
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
