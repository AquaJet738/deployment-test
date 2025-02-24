// Implements a sticky navbar to the top of the page
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.logo}>CSC 437 Final Project</h1>
      <ul style={styles.navLinks}>
        <li><a href="#home" style={styles.link}>Home</a></li>
        <li><a href="#about" style={styles.link}>About</a></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    top: 0,
    left: 0,
    position: "fixed",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "3em",
    backgroundColor: "#333",
    color: "#fff",
    padding: "1em",
    zIndex: 1001
  },
  
  logo: {
    margin: 0,
  },

  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1em",
  },
  link: {
    color: "white",
    textDecoration: "none",
  },
};

export default Navbar;
