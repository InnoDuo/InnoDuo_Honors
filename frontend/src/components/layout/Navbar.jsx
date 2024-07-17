import React from "react";
import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/navbar.css";
import uniLogoTrans from "../../assets/images/uni-logo-trans.png";
import ToggleSwitch from "../microcomponents/ToggleSwitch";
import useAuth, { authContext } from "../../context/authContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { loggedIn } = useContext(authContext);
  const { logout } = useAuth();

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <div className="brand-logo">
        <NavLink to="/">
          <img src={uniLogoTrans} alt="uni-logo" />
        </NavLink>
      </div>
      <div className={`nav-menu ${menuOpen ? "open" : ""}`}>
        <div className="nav-links">
          {loggedIn === true && (
            <>
              <div className="nav-items"><NavLink to="/courses">Courses</NavLink></div>
              <div className="nav-items">
                <NavLink to="/students">Students</NavLink>
              </div>
              <div className="nav-items">
                <NavLink to="/profile">Profile</NavLink>
              </div>
            </>
          )}
        </div>
        <div className="theme-container">
          <ToggleSwitch label="theme" />
        </div>
        <div className="nav-auth">
          {loggedIn === false ? (
            <NavLink
              to="/signin"
              className={`sign-in-btn auth-btn ${
                menuOpen ? "primary-btn" : ""
              }`}
            >
              Sign In
            </NavLink>
          ) : (
            <NavLink
              to="/"
              onClick={() => {
                logout();
                toast.success("You have been logged out!");
              }}
              className={`sign-in-btn auth-btn ${
                menuOpen ? "primary-btn" : ""
              }`}
            >
              Log out
            </NavLink>
          )}
        </div>
      </div>
      <div className="hamburger-menu" onClick={handleMenuToggle}>
        &#9776;
      </div>
    </div>
  );
};

export default Navbar;
