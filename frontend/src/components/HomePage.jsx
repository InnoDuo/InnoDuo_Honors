import React, {useState, useEffect, useContext} from "react";
import "../assets/css/homepage.css";
import honorsFrontImg from "../assets/images/Honors-students-visit-the-UN.jpg";
import AlertBanner from './microcomponents/AlertBanner';
import { ThemeContext } from "../context/theme";
import { authContext } from "../context/authContext";
import ModalBox from "./microcomponents/ModalBox";

const baseUrl = 'https://innoduo-honors.onrender.com/';

const HomePage = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const { loggedIn } = useContext(authContext);
  const [students, setStudents] = useState([]);
  const [alert, setAlert] = useState({ message: `This site is not officially deployed yet. This is a test preview for Developers.`, type: 'error' });

  const showAlert = (message, type) => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert({ message: '', type: '' });
  };

  useEffect(() => {
    fetch(baseUrl + 'totalStudents')
    .then(response => response.json()).then(data=>{
      setStudents(data.totalStudents);
    })
    .catch(error => {
      console.error('Error fetching students:', error);
    });}, []
    );

  return (
    <div className={`home-page page-container ${defaultTheme === 'dark' ? 'dark-container' : ''}`}>
      <AlertBanner message={alert.message} type={alert.type} onClose={closeAlert} />
      {/* <ModalBox title="New Message" message="this is a new message to all the students for the upcoming registration."/> */}
      {loggedIn && <HomeIntroduction />}
      <HomeHonorsProject students={students}/>
      <HomeProgramCriteria />
    </div>
  );
};

const HomeIntroduction = () => {
  return (
    <div className="introduction-contain home-content">
      <div className="introduction-content">
        <div className="heading-one">
          <h1>Honors Program</h1>
        </div>
        <div className="introduction-desc">
          The Caldwell Honors Program is a nationally recognized program that
          provides intellectual enrichment, curated and topical Honors Seminars,
          and rigorous research opportunities for top honors students.
          <br />
          The Honors Program is designed to challenge academically motivated
          students through a number of requirements, including two
          interdisciplinary honors seminars, two honors core classes, a research
          methods class, and a directed research-based honors project.
          Additionally, Caldwell Honors students are entitled to the following:
          <ul style={{ paddingLeft: "30px" }}>
            <li>Scholarship incentive ($1,000)</li>
            <li>Study abroad incentive grant ($1,000)</li>
            <li>Priority registration </li>
            <li>Housing for Honors students</li>
          </ul>
        </div>
        <div className="apply-link">
          <a
            className="primary-btn"
            target="_blank"
            href="https://live-caldwell.pantheonsite.io/academics/honors-program/honors-program-application/"
          >
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
  );
};

export const HomeHonorsProject = ({students}) => {
  return (
    <div className="hon-project-content home-content">
      <div className="heading-two">
        <h1>Honors Project</h1>
      </div>
      <div className="hon-project-desc">
        The{" "}
        <a href="https://www.caldwell.edu/academics/honors-program/honors-project-guidelines/" target="_blank" class="inline-link">
          honors project
        </a>{" "}
        is a three-credit independent study, HP 405, that may be either a
        research-based or creative endeavor. The topic is proposed by the
        student with the assistance of a project advisor of the student’s
        choice. The topic must then be approved by the Honors Program Committee,
        a committee of interdisciplinary faculty, led by Dr. Harney-Mahajan and
        Dr. Sigurjonsson.
      </div>
      <br />
      <div style={{backgroundColor: 'lightgray', padding: '10px', borderRadius: '5px'}}>
        <p><b>Test for Anuj Here ↓</b></p>
        <h2 style={{'color':'red'}}>
          
          There are currently {students} students in the Honors Program.
        </h2>
        <p style={{fontSize:'10px'}}><i>Add more in the database to see the changes in the number.</i></p>
      </div>
    </div>
  );
};

const HomeProgramCriteria = () => {
  return (
    <div className="criteria-content home-content">
      <div className="heading-two">
        <h1>Program Criteria</h1>
      </div>
      <div className="criteria-desc">
        Students must maintain full-time status and a 3.5 GPA to remain in the
        program. They must also participate in at least one event or trips
        sponsored by the program each academic year. <br />
        The seminar and project model of the program prepares students to
        succeed in graduate school. After each seminar and the project, students
        are awarded monetary, merit scholarships. Upon completion of the
        program, a student is designated as a graduate from the Honors Program,
        which will be specified on the transcript and diploma. Students are also
        provided with an Honors Program stole, to be worn at graduation, and a
        number of other special events are organized at the time of graduation,
        including Honors Convocation.
        <br />
        Caldwell Honors students should expect that their achievement will be
        considered favorably by graduate schools and employers.
      </div>
    </div>
  );
};

export default HomePage;
