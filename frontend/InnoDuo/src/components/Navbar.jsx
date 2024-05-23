import React from "react";
import "../assets/css/navbar.css";
import uniLogoTrans from "../assets/images/uni-logo-trans.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="brand-logo">
        <img src={uniLogoTrans} alt="uni-logo" />
      </div>
      <div className="nav-menu">
        <div className="nav-links">
          <div className="nav-items">Courses</div>
          <div className="nav-items">Students</div>
          <div className="nav-items">Faculty</div>
          <div className="nav-items">Profile</div>
        </div>
        <div className="nav-auth">
          <div className="sign-in-btn auth-btn">Sign In</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
