import React, { useState } from "react";
import Modal from "react-modal";
import StudentInfoFields from "../students/StudentInfoFields";
import useInput from "./customhooks/useInput";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

Modal.setAppElement("#root");
const AddContent = ({ title, message, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  //   const [courseCount, setCourseCount] = useState(1);
  const history = useNavigate();
  const [courses, setCourses] = useState([
    {
      courseCode: "",
      courseType: "",
      courseCategory: "",
    },
  ]);

  const [id, bindId, resetId] = useInput();
  const [firstName, bindFirstName, resetFirstName] = useInput();
  const [lastName, bindLastName, resetLastName] = useInput();
  const [email, bindEmail, resetEmail] = useInput();
  const [advisor, bindAdvisor, resetAdvisor] = useInput();
  const [gradYear, bindgradYear, resetgradYear] = useInput();
  const [major, bindMajor, resetMajor] = useInput();
  const [phoneNo, bindPhoneNo, resetPhoneNo] = useInput();

  const AddCourseFieldsHandler = () => {
    setCourses([
      ...courses,
      {
        courseCode: "",
        courseType: "",
        courseCategory: "",
      },
    ]);
  };

  const CourseChangeHandler = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index][field] = value;
    setCourses(updatedCourses);
  };

  const AddStudentHandler = async (e) => {
    e.preventDefault();
    console.log("addddeedd");
    const confirmation = confirm(
      "A student will be added to the system with the entered information. Do you agree?"
    );
    if (confirmation) {
      console.log("confirmed");
    }
    const username = email.split('@')[0];
    try {
      const response = await fetch(baseUrl + "/addstudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          firstName,
          lastName,
          email,
          username,
          advisor,
          gradYear,
          major,
          phoneNo,
        }),
      });
      const data = await response.json();
      if (data.message === "Added successfully") {
        console.log("added to db");
        onClose();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("An error occurred during adding.");
      console.log(error);
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
        <div id="add-student-form-container">
          <h3>Student Info</h3>
          <form className="student-info-form" method="post">
            <StudentInfoFields
              bindId={bindId}
              bindFirstName={bindFirstName}
              bindLastName={bindLastName}
              bindEmail={bindEmail}
              bindAdvisor={bindAdvisor}
              bindgradYear={bindgradYear}
              bindMajor={bindMajor}
              bindPhoneNo={bindPhoneNo}
            />

            <div className="add-course-section" style={{ marginTop: "20px" }}>
              <h3>Add Courses</h3>
              {/* <div className="course-wrapper" style={{display:'flex', justifyContent: 'start', alignItems:'center'}}>
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
              </div> */}

              <div
                className="course-wrapper"
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "end",
                  marginBottom: "10px",
                }}
              >
                <div
                  className="course-inner-wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  {courses.map((course, index) => (
                    <div
                      className="course-info-fields"
                      key={index}
                      style={{ marginBottom: "10px" }}
                    >
                      <div className="course-info-field">
                        <label htmlFor={`course-code-${index}`}>
                          Course Code:
                        </label>
                        <div className="input-field-wrap">
                          <input
                            type="text"
                            name={`course-code-${index}`}
                            id={`course-code-${index}`}
                            value={course.courseCode}
                            onChange={(e) =>
                              CourseChangeHandler(
                                index,
                                "courseCode",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="course-info-field">
                        <label htmlFor={`course-type-${index}`}>
                          Course Type:
                        </label>
                        <div className="input-field-wrap">
                          <input
                            type="text"
                            name={`course-type-${index}`}
                            id={`course-type-${index}`}
                            value={course.courseType}
                            onChange={(e) =>
                              CourseChangeHandler(
                                index,
                                "courseType",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="course-info-field">
                        <label htmlFor={`course-category-${index}`}>
                          Category:
                        </label>
                        <select
                          className="input-field-wrap"
                          name={`course-category-${index}`}
                          id={`course-category-${index}`}
                          value={course.courseCategory}
                          onChange={(e) =>
                            CourseChangeHandler(
                              index,
                              "courseCategory",
                              e.target.value
                            )
                          }
                        >
                          <option value="not-selected"></option>
                          <option value="Freshman Seminar">
                            Freshman Seminar
                          </option>
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
                  ))}
                </div>

                <button
                  type="button"
                  style={{
                    marginLeft: "auto",
                    marginRight: "50px",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                  }}
                  onClick={AddCourseFieldsHandler}
                >
                  <MdAddCircleOutline size={30} />
                </button>
              </div>
            </div>
            <a
              type="button"
              className="primary-btn"
              onClick={AddStudentHandler}
            >
              <p>Add Student</p>
            </a>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddContent;
