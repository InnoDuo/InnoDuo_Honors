import React, { useContext, useState, useEffect } from "react";
import "../../assets/css/studentprofile.css";
import StudentProfileCatalog from "../microcomponents/StudentProfileCatalog";
import StudentInfoFields from "./StudentInfoFields";
import useInput from "../microcomponents/customhooks/useInput";
import { ThemeContext } from "../../context/theme";
import { authContext } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const baseUrl = "http://localhost:3000"; // dev tests
// const baseUrl = "https://innoduo-honors.onrender.com"; // prod

const StudentProfile = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const { user } = useContext(authContext);

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
        setTimeout(() => {
          window.location.reload();
        }, 3000);


      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

   
  if (!user) {
    return <div>Loading...</div>;
  }

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
            <div className="primary-btn student-info-update">
              <button type="submit">Update</button>
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
