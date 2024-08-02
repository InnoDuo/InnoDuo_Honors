import React, { useContext, useState, useEffect } from "react";
import "../../assets/css/studentprofile.css";
import StudentProfileCatalog from "../microcomponents/StudentProfileCatalog";
import StudentInfoFields from "./StudentInfoFields";
import useInput from "../microcomponents/customhooks/useInput";
import { ThemeContext } from "../../context/theme";
import { authContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import jsPDF from "jspdf";

const baseUrl = "http://localhost:3000"; // dev tests
// const baseUrl = "https://innoduo-honors.onrender.com"; // prod

const StudentProfile = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const { loggedIn, user } = useContext(authContext);

  console.log("usususu", user);

  const [id, bindId, resetId, updateId] = useInput(user?.studentId);
  const [firstName, bindFirstName, resetFirstName, updateFirstName] = useInput(
    user?.firstName
  );
  const [lastName, bindLastName, resetLastName, updateLastName] = useInput(
    user?.lastName
  );
  const [email, bindEmail, resetEmail, updateEmail] = useInput(
    user?.username + "@caldwell.edu"
  );
  const [advisor, bindAdvisor, resetAdvisor, updateAdvisor] = useInput(
    user?.advisor
  );
  const [
    gradYear,
    bindGradYear,
    resetGradYear,
    updateGradYear,
  ] = useInput(user?.gradYear);
  const [major, bindMajor, resetMajor, updateMajor] = useInput(user?.major);
  const [phoneNo, bindPhoneNo, resetPhoneNo, updatePhoneNo] = useInput(
    user?.phoneNo
  );


  const printProfileHandler = async () => {
    const doc = new jsPDF();

    doc.text("Student Profile", 10, 10);
    doc.text(`ID: ${id}`, 10, 20);
    doc.text(`Name: ${firstName} ${lastName}`, 10, 30);
    doc.text(`Email: ${email}`, 10, 40);
    doc.text(`Advisor: ${advisor}`, 10, 50);
    doc.text(`Graduation Year: ${gradYear}`, 10, 60);
    doc.text(`Major: ${major}`, 10, 70);
    doc.text(`Phone Number: ${phoneNo}`, 10, 80);

    doc.save("student-profile.pdf");
  };


  useEffect(() => {
    if (user) {
      updateId(user.studentId);
      updateFirstName(user.firstName);
      updateLastName(user.lastName);
      updateEmail(user.username);
      updateAdvisor(user.advisor);
      updateGradYear(user.gradYear);
      updateMajor(user.major);
      updatePhoneNo(user.phoneNo);
    }
  }, [user]);

 

  const profileSubmitHandler = async (e) => {
    e.preventDefault();

    const updatedProfile = {
      studentId: id,
      firstName,
      lastName,
      username: email,
      advisor,
      gradYear,
      major,
      phoneNo,
    };

    console.log(updatedProfile);
    try {
      const response = await fetch(`${baseUrl}/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: id,
          firstName,
          lastName,
          username: email,
          advisor,
          gradYear,
          major,
          phoneNo,
        }),
      });
      const data = await response.json();
      if (data.message === "profile updated successfully") {
        console.log("wowowowow", data.newUser);
        updateId(data.newUser.studentId);
        updateFirstName(data.newUser.firstName);
        updateLastName(data.newUser.lastName);
        updateEmail(data.newUser.username);
        updateAdvisor(data.newUser.advisor);
        updateGradYear(data.newUser.gradYear);
        updateMajor(data.newUser.major);
        updatePhoneNo(data.newUser.phoneNo);
        sessionStorage.setItem("user", JSON.stringify(data.newUser));

        toast.success("profile updating");
        

      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  if(!loggedIn) {
    return <div
    style={{padding:"20px", height: '90vh'}}>User not logged in. First login to view the page.</div>
  }
   
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`page-container ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
      id="student-profile"
    >
      <div className="student-info-container">
        <div className="student-name">
          <h2>Student Name</h2>
        </div>
        <div className="student-info-content">
          <form
            className="student-info-form"
            onSubmit={profileSubmitHandler}
            method="post"
          >
            <StudentInfoFields
              bindId={bindId}
              bindFirstName={bindFirstName}
              bindLastName={bindLastName}
              bindEmail={bindEmail}
              bindAdvisor={bindAdvisor}
              bindGradYear={bindGradYear}
              bindMajor={bindMajor}
              bindPhoneNo={bindPhoneNo}
              disableField={true}
            />
            <div className="btn-container">

            <div className="primary-btn student-info-update">
              <button type="submit">Update</button>
            </div>
            <div className="sign-in-btn auth-btn info-print-btn" onClick={printProfileHandler}>
              <a>Print Profile</a>
            </div>
            </div>
          </form>
        </div>
      </div>
      <div className="student-catalog-container">
        <StudentProfileCatalog />
      </div>
      <ToastContainer />
    </div>
  );
};

export default StudentProfile;
