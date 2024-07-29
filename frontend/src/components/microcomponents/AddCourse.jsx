import React, { useState } from "react";
import Modal from "react-modal";
import useInput from "./customhooks/useInput";
import { toast } from "react-toastify";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

Modal.setAppElement("#root");
const AddCourse = ({ title, message, onClose }) => {
  const semesters = ["FA24", "SP25", "FA25", "SP26", "FA26"];

  const [modalIsOpen, setModalIsOpen] = useState(true);

  const [courseCode, bindCourseCode, resetCourseCode] = useInput();
  const [courseType, bindCourseType, resetCourseType] = useInput();
  const [courseCategory, bindCourseCategory, resetCourseCategory] = useInput();
  const [courseCredit, bindCourseCredit, resetCourseCredit] = useInput();
  const [courseDescription, bindCourseDescription, resetCourseDescription] =
    useInput();
  const [courseInstructor, bindCourseInstructor, resetCourseInstructor] =
    useInput();
  const [coursePeriod, bindCoursePeriod, resetCoursePeriod] = useInput();
  const [courseLocation, bindCourseLocation, resetCourseLocation] = useInput();
  const [courseDuration, bindCourseDuration, resetCourseDuration] = useInput();

  const AddCourseHandler = async (e) => {
    const confirmation = confirm(
      "A course will be added to the system with the entered information. Do you agree?"
    );
    if (confirmation) {
      try {
        const response = await fetch(baseUrl + "/addcourse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseCode,
            courseType,
            courseCategory,
            courseInstructor,
            courseCredit,
            courseDescription,
            coursePeriod,
            courseDuration,
            courseLocation,
          }),
        });
        const data = await response.json();
        if (data.message === "Course added successfully") {
          toast.success(data.message);
        }
      } catch (error) {
        console.log("An error occurred during adding.");
        console.log(error);
      }
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          background: "grey",
        },
        content: {
          color: "#8D2A2A",
        },
      }}
    >
      <div
        style={{
          width: "100%",
          // backgroundColor: 'red',
          paddingRight: "5px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <button
          onClick={onClose}
          style={{ fontSize: "2rem", color: "#000000" }}
        >
          &times;
        </button>
      </div>
      <div className="main-content">
        <h3 style={{ fontSize: "2rem" }}>{title}</h3>
        <p style={{ color: "#000000" }}>{message} </p>

        <div id="add-course-form-container">
          <form className="course-info-form" method="post">
            <div className="course-info-fields">
              <div className="course-info-field">
                <label htmlFor="course-category">Category:</label>
                <select
                  className="input-field-wrap"
                  name="course-category"
                  id="course-category"
                  {...bindCourseCategory}
                >
                  <option value="not-selected" selected></option>
                  <option value="Freshman Seminar">Freshman Seminar</option>
                  <option value="Honors Core Classes">
                    Honors Core Classes
                  </option>
                  <option value="Honors Seminar">Honors Seminar</option>
                  <option value="Research Methodology">
                    Research Methodology
                  </option>
                  <option value="CRACAD Presentation">
                    CRACAD Presentation
                  </option>
                  <option value="Service Events">Service Events</option>
                </select>
              </div>

              <div className="course-info-field">
                <label htmlFor="course-code">Course Code:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="course-code"
                    idß="course-code"
                    {...bindCourseCode}
                  />
                </div>
              </div>
              <div className="course-info-field">
                <label htmlFor="course-type">Course Name:</label>
                <div className="input-field-wrap">
                  <input
                    type="type"
                    name="course-type"
                    id="course-type"
                    {...bindCourseType}
                  />
                </div>
              </div>

              <div className="course-info-field">
                <label htmlFor="course-instructor">Instructor:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="course-instructor"
                    id="course-instructor"
                    {...bindCourseInstructor}
                  />
                </div>
              </div>

              <div className="course-info-field">
                <label htmlFor="course-credit">Credit:</label>
                <div className="input-field-wrap">
                  <input
                    type="number"
                    name="course-credit"
                    id="course-credit"
                    {...bindCourseCredit}
                  />
                </div>
              </div>

              <div className="course-info-field">
                <label htmlFor="course-description">Description:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="course-description"
                    id="course-description"
                    {...bindCourseDescription}
                  />
                </div>
              </div>

              <div className="course-info-field">
                <label htmlFor="course-period">Period:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="course-period"
                    id="course-period"
                    placeholder="MWF 10:00-11:00"
                    {...bindCoursePeriod}
                  />
                </div>
              </div>

              <div className="course-info-field">
                <label htmlFor="course-duration">Duration:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="course-duration"
                    id="course-duration"
                    placeholder="08/30/2024 - 12/15/2024"
                    {...bindCourseDuration}
                  />
                </div>
              </div>

              <div className="course-info-field">
                <label htmlFor="course-location">Location:</label>
                <div className="input-field-wrap">
                  <input
                    type="text"
                    name="course-location"
                    id="course-location"
                    placeholder="Caldwell University, Albertus Magnus Hall, Room 123"
                    {...bindCourseLocation}
                  />
                </div>
              </div>
            </div>
            <div className="add-course-section" style={{ marginTop: "20px" }}>
              <h3>Add Students</h3>
              <div className="course-info-field">
                <label htmlFor="student-email">Username:</label>
                <div className="input-field-wrap">
                  <input type="text" name="student-email" id="student-email" />
                </div>
              </div>
            </div>
            <a type="button" className="primary-btn" onClick={AddCourseHandler}>
              <p>Add Course</p>
            </a>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCourse;
