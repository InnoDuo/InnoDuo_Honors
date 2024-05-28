import React from "react";
import { useState } from "react";
import "../assets/css/navbar.css";
import uniLogoTrans from "../assets/images/uni-logo-trans.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="brand-logo">
        <a href="/">
        <img src={uniLogoTrans} alt="uni-logo" />
        </a>
      </div>
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <div className="nav-links">
          <div className="nav-items">Courses</div>
          <div className="nav-items">Students</div>
          <div className="nav-items">Faculty</div>
          <div className="nav-items">Profile</div>
        </div>
        <div className="nav-auth">
          <a href='/signin' className={`sign-in-btn auth-btn ${menuOpen? "primary-btn" : ""}`}>Sign In</a>
        </div>
      </div>
        <div className="hamburger-menu" onClick={handleMenuToggle}>
        &#9776;
      </div>
    </div>
  );
};

export default Navbar;
