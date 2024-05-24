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
            following: 
              <ul style={{paddingLeft: '30px'}}>
              <li>Scholarship incentive ($1,000)</li>
              <li>Study abroad incentive
            grant ($1,000)</li>
              <li>Priority registration </li>
              <li>Housing for Honors students</li>
            </ul>
          </div>
          <div className="apply-link">
            <a className="primary-btn" target="_blank" href="https://live-caldwell.pantheonsite.io/academics/honors-program/honors-program-application/">
              Apply Now
            </a>
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
