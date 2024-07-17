import { React, useContext, useState, useEffect } from "react";
import "../../assets/css/studentprofile.css";
import StudentProfileCatalog from "../microcomponents/StudentProfileCatalog";
import useInput from "../microcomponents/customhooks/useInput";
import { ThemeContext } from "../../context/theme";
import { authContext } from "../../context/authContext";
const baseUrl = "http://localhost:3000"; // dev tests
// const baseUrl = "https://innoduo-honors.onrender.com"; // prod
import io from "socket.io-client";

// const socket = io(baseUrl);

const StudentProfile = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const [user, setUser] = useState({});

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  useEffect(() => {
    if (user) {
      resetId(user.studentId);
      resetEmail(user.firstName);
      resetEmail(user.lastName);
      resetEmail(user.username);
      resetAdvisor(user.advisor);
      resetClassification(user.gradYear);
      resetMajor(user.major);
      resetPhoneNo(user.phoneNo);
    }
  }, [user]);

  // useEffect(() => {
  //   socket.on("profileUpdated", (updatedProfile) => {
  //     setUser(updatedProfile);
  //     localStorage.setItem("user", JSON.stringify(updatedProfile));
  //   });

  //   return () => {
  //     socket.off("profileUpdated");
  //   };
  // }, []);

  console.log("usususu", user);

  const [id, bindId, resetId] = useInput(user.studentId);
  const [firstName, bindFirstName, resetFirstName] = useInput(user.firstName);
  const [lastName, bindLastName, resetLastName] = useInput(user.lastName);
  const [email, bindEmail, resetEmail] = useInput(
    user.username,
    "@caldwell.edu"
  );
  const [advisor, bindAdvisor, resetAdvisor] = useInput(user.advisor);
  const [classification, bindClassification, resetClassification] = useInput(
    user.classification
  );
  const [major, bindMajor, resetMajor] = useInput(user.major);
  const [phoneNo, bindPhoneNo, resetPhoneNo] = useInput(user.phoneNo);

  if (!user) {
    return <div>Loading...</div>;
  }

  const profileSubmitHandler = async (e) => {
    e.preventDefault();
    // resetId();
    // resetFirstName();
    // resetLastName();
    // resetEmail();
    // resetAdvisor();
    // resetClassification();
    // resetMajor();
    // resetPhoneNo();

    const updatedProfile = {
      studentId: id,
      firstName,
      lastName,
      username: email,
      advisor,
      classification,
      major,
      phoneNo,
    };

    console.log(updatedProfile)
    try {
      const response = await fetch(`${baseUrl}/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfile),
      });
      const data = await response.json();
      setUser(data.userProfile);
      localStorage.setItem("user", JSON.stringify(data.userProfile));
    } catch (error) {
      console.error("error:", error);
    }
  };

  return (
    <div
      className={`page-container ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <div className="student-info-container">
        <div className="student-name">
          <h2>Student Name</h2>
        </div>
        <div className="student-info-content">
          <form
            action=""
            className="student-info-form"
            onSubmit={profileSubmitHandler}
          >
            <div className="student-info-fields">
              <div className="student-info-field disabled-input">
                <label htmlFor="student-id"> Student ID:</label>
                <div className="input-field-wrap">
                  <input
                    type="number"
                    name="student-id"
                    id="student-id"
                    {...bindId}
                    disabled
                  />
                </div>
              </div>
              <div className="student-info-field disabled-input">
                <label htmlFor="student-email">Email:</label>
                <div className="input-field-wrap">
                  <input
                    type="email"
                    name="student-email"
                    id="student-email"
                    {...bindEmail}
                    disabled
                  />
                </div>
              </div>
              <div className="student-info-field disabled-input">
                <label htmlFor="student-first-name">First Name:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="student-first-name"
                    id="student-first-name"
                    {...bindFirstName}
                    disabled
                  />
                </div>
              </div>
              <div className="student-info-field disabled-input">
                <label htmlFor="student-last-name">Last Name:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="student-last-name"
                    id="student-last-name"
                    {...bindLastName}
                    disabled
                  />
                </div>
              </div>
              <div className="student-info-field">
                <label htmlFor="student-major">Major:</label>
                <select
                  className="input-field-wrap"
                  type="text"
                  name="student-major"
                  id="student-major"
                  {...bindMajor}
                >
                  <option value="not-selected" selected></option>
                  <option
                    value="Combined B.S. in Psychology / M.A. in Applied Behavior
                    Analysis"
                  >
                    Combined B.S. in Psychology / M.A. in Applied Behavior
                    Analysis
                  </option>
                  <option value="Pathways to ABA">Pathways to ABA</option>

                  <option value="Art">Art</option>
                  <option value="Art Therapy Double Major in Art and Psychology">
                    Art Therapy Double Major in Art and Psychology
                  </option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Studio Art">Studio Art</option>

                  <option value="Accounting">Accounting</option>
                  <option value="Business Administration">
                    Business Administration
                  </option>
                  <option value="Business Analytics">Business Analytics</option>
                  <option value="Business and English">
                    Business and English
                  </option>
                  <option value="Management Information Systems">
                    Management Information Systems
                  </option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Esports Management">Esports Management</option>
                  <option value="Financial Economics">
                    Financial Economics
                  </option>
                  <option value="Five-Year Combined B.S/M.B.A">
                    Five-Year Combined B.S/M.B.A
                  </option>
                  <option value="Five-Year Combined B.S./M.S.">
                    Five-Year Combined B.S./M.S.
                  </option>
                  <option value="Healthcare Administration">
                    Healthcare Administration
                  </option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sport Management">Sport Management</option>
                  <option value="Supply Chain Management">
                    Supply Chain Management
                  </option>
                  <option value="Communication and Media Studies">
                    Communication and Media Studies
                  </option>
                  <option value="Education-Combined B.A/M.A Program">
                    Education – Combined B.A/M.A Program
                  </option>
                  <option value="Elementary Education (K-6 Certification)">
                    Elementary Education (K-6 Certification)
                  </option>
                  <option value="Secondary Education (K-12 Certification)">
                    Secondary Education (K-12 Certification)
                  </option>
                  <option value="School Nurse Certification – Instructional">
                    School Nurse Certification – Instructional
                  </option>
                  <option value="School Nurse Certification – Non-Instructional">
                    School Nurse Certification – Non-Instructional
                  </option>
                  <option value="English">English</option>
                  <option value="Biology ">Biology </option>
                  <option value="Communication Science and Disorders">
                    Communication Science and Disorders
                  </option>
                  <option value="Health Science">Health Science</option>
                  <option value="Healthcare Administration">
                    Healthcare Administration
                  </option>
                  <option value="Medical Imaging">Medical Imaging</option>
                  <option value="Medical Technology">Medical Technology</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Pre-Medical ">Pre-Medical </option>
                  <option value="Public Health Education">
                    Public Health Education
                  </option>
                  <option value="School Nurse Certification – Instructional">
                    School Nurse Certification – Instructional
                  </option>
                  <option value="School Nurse Certification – Non-Instructional">
                    School Nurse Certification – Non-Instructional
                  </option>
                  <option value="History and Political Science">
                    History and Political Science
                  </option>
                  <option value="History">History</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Social Studies">Social Studies</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Applied Language">Applied Language</option>
                  <option value="Spanish ">Spanish </option>
                  <option value="Music">Music</option>
                  <option value="Music">Music</option>
                  <option value="Natural Sciences">Natural Sciences</option>
                  <option value="Biology">Biology</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Environmental Science">
                    Environmental Science
                  </option>
                  <option value="Exercise Science">Exercise Science</option>
                  <option value="Health Science">Health Science</option>
                  <option value="Medical Technology ">
                    Medical Technology{" "}
                  </option>
                  <option value="Pre-Medical ">Pre-Medical </option>
                  <option value="Nursing and Public Health">
                    Nursing and Public Health
                  </option>
                  <option value="Communication Science and Disorders">
                    Communication Science and Disorders
                  </option>
                  <option value="Nursing">Nursing</option>
                  <option value="Public Health Education">
                    Public Health Education
                  </option>
                  <option value="School Nurse Certification – Instructional">
                    School Nurse Certification – Instructional
                  </option>
                  <option value="School Nurse Certification – Non-Instructional">
                    School Nurse Certification – Non-Instructional
                  </option>
                  <option value="Psychology and Counseling">
                    Psychology and Counseling
                  </option>
                  <option value="Combined B.S in Psychology/ M.A. in Counseling (Available in All Specialization)">
                    Combined B.S in Psychology/ M.A. in Counseling (Available in
                    All Specialization)
                  </option>
                  <option value="Psychology">Psychology</option>
                  <option value="Psychology – Combined B.S./ M.A. in Applied Behavioral Analysis">
                    Psychology – Combined B.S./ M.A. in Applied Behavioral
                    Analysis
                  </option>
                  <option value="Sociology and Criminal Justice">
                    Sociology and Criminal Justice
                  </option>
                  <option value="Criminal justice">Criminal justice</option>
                  <option value="Sociology">Sociology</option>
                  <option value="Theology and Philosophy">
                    Theology and Philosophy
                  </option>
                  <option value="Theology ">Theology </option>
                </select>
              </div>
              <div className="student-info-field">
                <label htmlFor="student-classification">Classification:</label>
                <select
                  className="input-field-wrap"
                  name="student-classification"
                  id="student-classification"
                  {...bindClassification}
                >
                  <option value="not-selected" selected></option>
                  <option value="freshmen">Freshmen</option>
                  <option value="sophomore">Sophomore</option>
                  <option value="junior">Junior</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
              <div className="student-info-field">
                <label htmlFor="student-contact">Mobile Number:</label>
                <div className="input-field-wrap">
                  <input
                    type="number"
                    name="student-contact"
                    id="student-contact"
                    {...bindPhoneNo}
                  />
                </div>
              </div>
              <div className="student-info-field">
                <label htmlFor="student-advisor">Advisor:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="student-advisor"
                    id="student-advisor"
                    {...bindAdvisor}
                  />
                </div>
              </div>
            </div>
            <div className="primary-btn student-info-update">
              <button type="submit">Update</button>
            </div>
          </form>
        </div>
      </div>
      <div className="student-catalog-container">
        <StudentProfileCatalog />
      </div>
    </div>
  );
};

export default StudentProfile;
