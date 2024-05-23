import React from "react";
import "../assets/css/homepage.css";
import honorsFrontImg from "../assets/images/Honors-students-visit-the-UN.jpg"

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="introduction-contain">
        <div className="introduction-content">
          <div className="heading-one">
            <h1>Honors Program</h1>
          </div>
          <div className="introduction-desc">
            The Caldwell Honors Program is a nationally recognized program that
            provides intellectual enrichment, curated and topical Honors
            Seminars, and rigorous research opportunities for top honors
            students.
            <br />
            The Honors Program is designed to challenge academically motivated
            students through a number of requirements, including two
            interdisciplinary honors seminars, two honors core classes, a
            research methods class, and a directed research-based honors
            project. Additionally, Caldwell Honors students are entitled to the
            following: - Scholarship incentive ($1,000) - Study abroad incentive
            grant ($1,000) - Priority registration - Housing for Honors students
          </div>
        </div>
        <div className="introduction-img">
            <div className="introduction-img-holder">
                <img src={honorsFrontImg} alt="honors-students-visit-the-UN" />
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
