import React from "react";
import "../assets/css/pagenotfound.css";

const PageNotFound = () => {
  return (
    <div className="container-404">
      <div className="content-404">
        <div className="posture-404">
          <div className="big-404">404</div>
          <div className="pg-not-found">Page Not Found</div>
          <div className="msg-404">
            We are sorry but the page you are looking for doesn't exist.
          </div>
        </div>
        <div className="return-btn">
          <div className="primary-btn">
            <a href="/">Return to Home</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
