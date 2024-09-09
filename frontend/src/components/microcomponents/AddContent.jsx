import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import StudentInfoFields from "../students/StudentInfoFields";
import useInput from "./customhooks/useInput";
import { MdAddCircleOutline, MdRemoveCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

Modal.setAppElement("#root");
const AddContent = ({ title, message, onClose }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([
    { courseCode: "", semester: "", section: "" },
  ]);
  const [id, bindId, resetId] = useInput();
  const [firstName, bindFirstName, resetFirstName] = useInput();
  const [lastName, bindLastName, resetLastName] = useInput();
  const [email, bindEmail, resetEmail] = useInput();
  const [advisor, bindAdvisor, resetAdvisor] = useInput();
  const [gradYear, bindgradYear, resetgradYear] = useInput();
  const [major, bindMajor, resetMajor] = useInput();
  const [phoneNo, bindPhoneNo, resetPhoneNo] = useInput();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(baseUrl + "/catalog");
        const data = await response.json();
        setCourses(data.classes);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
    console.log(selectedCourses);
  }, []);

  const AddStudentHandler = async (e) => {
    e.preventDefault();
    const confirmation = confirm(
      "A student will be added to the system with the entered information. Do you agree?"
    );
    if (confirmation) {
      const username = email.split("@")[0];
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
          // onClose();
          for (const course of selectedCourses) {
            await addStudentToCourse({
              courseCode: course.courseCode,
              semester: course.semester,
              section: course.section,
              studentId: id,
            });
          }
          toast.success("Student added successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log("An error occurred during adding.");
        console.log(error);
      }
    }
  };

  const addStudentToCourse = async (course) => {
    try {
      const response = await fetch(baseUrl + "/addstudenttocourse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });
      const data = await response.json();
      if (data.message === "Student added to course successfully") {
        toast.success("Student added to course successfully");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log("An error occurred while adding the student to the course.");
    }
  };

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses[index][field] = value;
    if (field === "courseCode") {
      updatedCourses[index]["semester"] = "";
      updatedCourses[index]["section"] = "";
    }
    setSelectedCourses(updatedCourses);
  };

  const addCourse = () => {
    setSelectedCourses([
      ...selectedCourses,
      { courseCode: "", semester: "", section: "" },
    ]);
  };

  const removeCourse = (index) => {
    const updatedCourses = [...selectedCourses];
    updatedCourses.splice(index, 1);
    setSelectedCourses(updatedCourses);
  };

  const getSemesters = (courseCode) => {
    if (!courseCode) return [];
    const course = Object.values(courses)
      .flat()
      .find((course) => course.courseCode === courseCode);
    return Object.keys(course?.semesters || {});
  };

  const getSections = (courseCode, semester) => {
    if (!courseCode || !semester) return [];
    const course = Object.values(courses)
      .flat()
      .find((course) => course.courseCode === courseCode);
    return Object.keys(course?.semesters[semester] || {});
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
              {selectedCourses.map((course, index) => (
                <div
                  className="course-wrapper"
                  style={{
                    display: "flex",
                    marginBottom: "10px",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <div
                    className="course-info-field"
                    style={{ marginRight: "10px" }}
                  >
                    <label htmlFor={`course-code-${index}`}>Course Code:</label>
                    <select
                      className="input-field-wrap"
                      name={`course-code-${index}`}
                      id={`course-code-${index}`}
                      value={course.courseCode}
                      onChange={(e) =>
                        handleCourseChange(index, "courseCode", e.target.value)
                      }
                    >
                      <option value="">Select a course</option>
                      {Object.values(courses)
                        .flat()
                        .map((course) => (
                          <option
                            key={course.courseCode}
                            value={course.courseCode}
                          >
                            {course.courseCode}
                          </option>
                        ))}
                    </select>
                  </div>

                  {course.courseCode && (
                    <div
                      className="course-info-field"
                      style={{ marginRight: "10px" }}
                    >
                      <label>Course Name:</label>
                      <p>
                        {
                          Object.values(courses)
                            .flat()
                            .find((c) => c.courseCode === course.courseCode)
                            .courseName
                        }
                      </p>
                    </div>
                  )}

                  {course.courseCode && (
                    <div
                      className="course-info-field"
                      style={{ marginRight: "10px" }}
                    >
                      <label htmlFor={`semester-${index}`}>Semester:</label>
                      <select
                        className="input-field-wrap"
                        name={`semester-${index}`}
                        id={`semester-${index}`}
                        value={course.semester}
                        onChange={(e) =>
                          handleCourseChange(index, "semester", e.target.value)
                        }
                      >
                        <option value="">Select a semester</option>
                        {getSemesters(course.courseCode).map((semester) => (
                          <option key={semester} value={semester}>
                            {semester}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {course.courseCode && course.semester && (
                    <div
                      className="course-info-field"
                      style={{ marginRight: "10px" }}
                    >
                      <label htmlFor={`section-${index}`}>Section:</label>
                      <select
                        className="input-field-wrap"
                        name={`section-${index}`}
                        id={`section-${index}`}
                        value={course.section}
                        onChange={(e) =>
                          handleCourseChange(index, "section", e.target.value)
                        }
                      >
                        <option value="">Select a section</option>
                        {getSections(course.courseCode, course.semester).map(
                          (section) => (
                            <option key={section} value={section}>
                              {section}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )}

                  <button
                    type="button"
                    style={{
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={() => removeCourse(index)}
                  >
                    <MdRemoveCircleOutline size={30} />
                  </button>
                </div>
              ))}

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <button
                  type="button"
                  onClick={addCourse}
                  className="primary-btn"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MdAddCircleOutline size={30} /> Add Course
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

{
  /* <div className="course-wrapper" style={{display:'flex', justifyContent: 'start', alignItems:'center'}}>
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
          <option value="Honors Project">
          Honors Project
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
  </div> */
}

{
  /* <div className="add-course-section" style={{ marginTop: "20px" }}>
    <h3>Add Courses</h3>
  
    <div
      className="course-wrapper"
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "end",
        marginBottom: "10px",
      }}
    >
  
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
  </div> */
}

{
  /* <div
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
          <option value="Honors Project">
            Honors Project
          </option>
          <option value="CRACAD Presentation">
            CRACAD Presentation
          </option>
          <option value="Service Events">Service Events</option>
        </select>
      </div>
    </div>
  ))}
</div> */
}
