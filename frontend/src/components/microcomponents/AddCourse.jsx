import React, { useState } from "react";
import Modal from "react-modal";
import useInput from "./customhooks/useInput";


Modal.setAppElement("#root");
const AddCourse = ({ title, message, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const [courseCode, bindCourseCode, resetCourseCode] = useInput();
  const [courseType, bindCourseType, resetCourseType] = useInput();
  const [courseCategory, bindCourseCategory, resetCourseCategory] = useInput();
  const [courseInstructor, bindCourseInstructor, resetCourseInstructor] =
    useInput();

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
          <form className="course-info-form">
            <div className="course-info-fields">
              <div className="course-info-field">
                <label htmlFor="course-code">Course Code:</label>
                <div className="input-field-wrap">
                  <input
                    type="number"
                    name="course-code"
                    idß="course-code"
                    {...bindCourseCode}
                  />
                </div>
              </div>
              <div className="course-info-field">
                <label htmlFor="course-type">Course Type:</label>
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
                <label htmlFor="course-instructor">Instructor:</label>
                <div className="input-field-wrap">
                  <input
                    type="instructor"
                    name="course-instructor"
                    id="course-instructor"
                    {...bindCourseInstructor}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddCourse;
