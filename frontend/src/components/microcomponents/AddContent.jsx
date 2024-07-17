import React, { useState } from "react";
import Modal from "react-modal";
import StudentInfoFields from "../students/StudentInfoFields";
import useInput from "./customhooks/useInput";
import { MdAddCircleOutline } from "react-icons/md";



Modal.setAppElement("#root");
const AddContent = ({ title, message, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [courseCount, setCourseCount] = useState(1)

  const [id, bindId, resetId] = useInput();
  const [firstName, bindFirstName, resetFirstName] = useInput();
  const [lastName, bindLastName, resetLastName] = useInput();
  const [email, bindEmail, resetEmail] = useInput();
  const [advisor, bindAdvisor, resetAdvisor] = useInput();
  const [classification, bindClassification, resetClassification] = useInput();
  const [major, bindMajor, resetMajor] = useInput();
  const [phoneNo, bindPhoneNo, resetPhoneNo] = useInput();
  const [courseCode, bindCourseCode, resetCourseCode] = useInput();
  const [courseType, bindCourseType, resetCourseType] = useInput();
  const [courseCategory, bindCourseCategory, resetCourseCategory] = useInput();
  const [courseInstructor, bindCourseInstructor, resetCourseInstructor] =
    useInput();

    const AddCourseField = ()=>{
        setCourseCount(courseCount + 1)
        console.log(courseCount)
    }

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
        <div id="add-student-form-container">
          <h3>Student Info</h3>
          <form className="student-info-form">
            <StudentInfoFields
              bindId={bindId}
              bindFirstName={bindFirstName}
              bindLastName={bindLastName}
              bindEmail={bindEmail}
              bindAdvisor={bindAdvisor}
              bindClassification={bindClassification}
              bindMajor={bindMajor}
              bindPhoneNo={bindPhoneNo}
            />

            <div className="add-course-section" style={{ marginTop: "20px" }}>
              <h3>Add Courses</h3>
              <div className="course-wrapper" style={{display:'flex', justifyContent: 'start', alignItems:'center'}}>
                <div className="course-info-fields">
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
                </div>
                <button type="button" style={{marginLeft:'auto', marginRight:'50px'}} onClick={AddCourseField}>
                    <MdAddCircleOutline size={30}/>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddContent;
