import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = {
    header: {
      background: "#F6E4A5",
      padding: "12px 0",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    brand: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#333",
      flexShrink: 0,
    },
    hamburger: {
      display: "block",
      cursor: "pointer",
      fontSize: "26px",
      background: "none",
      border: "none",
      color: "#333",
    },
    desktopMenu: {
      display: "flex",
      gap: "20px",
    },
    link: {
      fontSize: "16px",
      color: "#333",
      textDecoration: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      transition: "background 0.3s ease, color 0.3s ease",
    },
    activeLink: {
      background: "#333",
      color: "#fff",
    },
  };

  return (
    <header style={styles.header}>
      {/* Extra CSS for hover + responsive + animation */}
      <style>
        {`
          .nav-link {
            transition: background 0.3s ease, color 0.3s ease;
            display: block;
          }
          .nav-link:hover {
            background: #ddd;
          }

          /* Mobile menu transition */
          .mobile-menu {
            overflow: hidden;
            max-height: 0;
            opacity: 0;
            transition: max-height 0.4s ease, opacity 0.4s ease;
          }
          .mobile-menu.open {
            max-height: 500px; /* enough space to expand */
            opacity: 1;
          }

          @media (min-width: 768px) {
            .hamburger-btn {
              display: none !important;
            }
            .mobile-menu {
              display: none !important;
            }
            .desktop-menu {
              display: flex !important;
            }
          }

          @media (max-width: 767px) {
            .desktop-menu {
              display: none !important;
            }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.brand}>Namma RTB Ganesha</div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="hamburger-btn"
          style={styles.hamburger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Desktop Menu */}
        <nav className="desktop-menu" style={styles.desktopMenu}>
          <NavLink
            to="/"
            end
            className="nav-link"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/homa"
            className="nav-link"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Homa
          </NavLink>
          <NavLink
            to="/events"
            className="nav-link"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Events
          </NavLink>
          <NavLink
            to="/contact"
            className="nav-link"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Contact
          </NavLink>
          <NavLink
            to="/payment"
            className="nav-link"
            style={({ isActive }) =>
              isActive ? { ...styles.link, ...styles.activeLink } : styles.link
            }
          >
            Payment
          </NavLink>
        </nav>
      </div>

      {/* Mobile Menu (collapsible with animation) */}
      <div className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <NavLink
          to="/"
          end
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
          onClick={() => setIsOpen(false)}
        >
          Home
        </NavLink>
        <NavLink
          to="/homa"
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
          onClick={() => setIsOpen(false)}
        >
          Homa
        </NavLink>
        <NavLink
          to="/events"
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
          onClick={() => setIsOpen(false)}
        >
          Events
        </NavLink>
        <NavLink
          to="/contact"
          className="nav-link"
          style={({ isActive }) =>
            isActive ? { ...styles.link, ...styles.activeLink } : styles.link
          }
          onClick={() => setIsOpen(false)}
        >
          Contact
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
