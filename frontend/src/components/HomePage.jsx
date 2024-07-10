import React, {useState, useEffect, useContext} from "react";
import "../assets/css/homepage.css";
import honorsFrontImg from "../assets/images/Honors-students-visit-the-UN.jpg";
import AlertBanner from './microcomponents/AlertBanner';
import { ThemeContext } from "../context/theme";
import { authContext } from "../context/authContext";
import ModalBox from "./microcomponents/ModalBox";

// const baseUrl = 'https://innoduo-honors.onrender.com/';
const baseUrl = 'http://localhost:3000/';

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
      <HomeHonorsProject />
      <HonorsNumbers students={students}/>
      <HomeProgramCriteria />
    </div>
  );
};

const HonorsNumbers = ({students}) => {
  return (
    <>
    <div style={{backgroundColor: 'black', padding: '10px', borderRadius: '5px'}}>
        <h1 className="flex justify-center" style={{color:"white"}}><b>Join the Honors Program</b></h1>
        <div className="flex items-center gap-4 justify-center">
        <h2 style={{'color':'red'}}>

        <div className="flex items-center gap-4">
              <UsersIcon className="w-8 h-8" />
              <span className="text-2xl font-bold">{students}</span>
              <span>Honors Students</span>
            </div>
        </h2>
        <h2 style={{'color':'red'}}>

        <div className="flex items-center gap-4">
        <PencilIcon className="w-8 h-8" />
              <span className="text-2xl font-bold">0</span>
              <span>Honors Classes</span>
            </div>
        </h2>
        </div>
      </div>
      <br />
      </>
  );
}

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

export const HomeHonorsProject = () => {
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


function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function PencilIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}