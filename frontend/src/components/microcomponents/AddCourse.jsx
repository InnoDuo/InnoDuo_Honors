import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import useInput from "./customhooks/useInput";
import { toast } from "react-toastify";
import { set } from "mongoose";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

Modal.setAppElement("#root");

const AddCourse = ({ title, message }) => {
  const onClose = () => {
    setModalIsOpen(false); // Directly set the state to close the modal
  };
  
  const semesters = generateSemesters();
  const [modalIsOpen, setModalIsOpen] = useState(true);
  // courses existing in the database, fetched
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(baseUrl + "/getCourses");
        const data = await response.json();
        setCourses(data.courses);
        console.log("Courses fetched:", data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // State to toggle between adding a course or a section
  const [option, setOption] = useState("addCourse");

  // State for Add New Course
  const [courseCode, bindCourseCode, resetCourseCode] = useInput();
  const [courseName, bindCourseName, resetCourseName] = useInput();
  const [courseCategory, bindCourseCategory, resetCourseCategory] = useInput();
  const [courseCredit, bindCourseCredit, resetCourseCredit] = useInput();
  const [courseDescription, bindCourseDescription, resetCourseDescription] =
    useInput();
  const [maxStudents, bindMaxStudents, resetMaxStudents] = useInput();

  // State for Add Section
  const [selectedCourse, bindSelectedCourse, resetSelectedCourse] = useInput();
  const [semester, bindSemester, resetSemester] = useInput();
  const [sectionNumber, bindSectionNumber, resetSectionNumber] =
    useInput();
  const [sectionInstructor, bindSectionInstructor, resetSectionInstructor] =
    useInput();
  const [sectionDuration, bindSectionDuration, resetSectionDuration] =
    useInput();
  const [sectionPeriod, bindSectionPeriod, resetSectionPeriod] = useInput();
  const [sectionLocation, bindSectionLocation, resetSectionLocation] =
    useInput();
  const [studentEmails, setStudentEmails] = useState([""]);

  // State for Autocomplete
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(-1); // For keyboard navigation
  const [activeInputIndex, setActiveInputIndex] = useState(null);
  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let debounceTimer;
    return function (...args) {
      const context = this;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  };
  // Fetch email suggestions from API
  const fetchEmailSuggestions = async (query) => {
    // if (query.length === 0) {
    //   setEmailSuggestions([]);
    //   return;
    // }
    // try {
    //   const response = await fetch(`${baseUrl}/email-suggestions?q=${query}`);
    //   const data = await response.json();
    setEmailSuggestions(
      // data.suggestions ||
      [
        "john.doe@example.com",
        "jane.smith@example.com",
        "mike.jones@example.com",
        "sara.lee@example.com",
        "bob.brown@example.com",
        "alice.wong@example.com",
        "chris.johnson@example.com",
        "emily.davis@example.com",
        "daniel.martin@example.com",
        "karen.wilson@example.com",
      ]
    );
    // } catch (error) {
    //   console.error("Error fetching email suggestions:", error);
    // }
  };

  const debouncedFetchEmailSuggestions = debounce(fetchEmailSuggestions, 300);

  // Handler for adding/removing student fields
  const handleStudentChange = (index, value) => {
    const newStudents = [...studentEmails];
    newStudents[index] = value;
    setStudentEmails(newStudents);

    // Check if the input value matches any suggestion
    const matches = emailSuggestions.some(
      (suggestion) => suggestion.toLowerCase() === value.toLowerCase()
    );

    if (matches) {
      setEmailSuggestions([]); // Clear suggestions if the input matches any suggestion
    } else if (emailSuggestions.includes(value)) {
      setEmailSuggestions([]); // Clear suggestions if the user selects a suggestion
    } else if (!matches && value.length >= 4) {
      setEmailSuggestions([]); // Clear suggestions if the user selects a suggestion}
    } else {
      // Fetch new suggestions only if the value is not already a suggestion and doesn't match
      debouncedFetchEmailSuggestions(value);
      setActiveInputIndex(index); // Set the active input index
    }
  };

  const addStudentField = () => {
    setStudentEmails([...studentEmails, ""]);
  };

  const removeStudentField = (index) => {
    const newStudents = studentEmails.filter((_, i) => i !== index);
    setStudentEmails(newStudents);
  };

  // Handler for Add New Course
  const addCourseHandler = async (e) => {
    e.preventDefault();
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
            courseName,
            courseCategory,
            semesters: {},
            courseDescription,
            courseCredit: courseCredit || 0, // default to 0 if not provided
            maxStudents: maxStudents || null, // optional
          }),
        });
        const data = await response.json();
        if (data.message === "Course added successfully") {
          toast.success(data.message);
          resetAddCourseFields();
          onClose();
        } else {
          toast.error(data.message || "Failed to add course.");
        }
      } catch (error) {
        console.log("An error occurred during adding.");
        console.log(error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };


  // Handler for Add Section
  const addSectionHandler = async (e) => {
    e.preventDefault();
    const confirmation = confirm(
      "A section will be added to the system with the entered information. Do you agree?"
    );
    if (confirmation) {
      try {
        const response = await fetch(baseUrl + "/addsection", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: selectedCourse, // Assuming course ID is used
            semester,
            sectionId: sectionNumber,
            instructor: sectionInstructor,
            duration: sectionDuration,
            period: sectionPeriod,
            location: sectionLocation,
            students: studentEmails.filter((email) => email.trim() !== ""),
          }),
        });
        console.log(selectedCourse);
        const data = await response.json();
        if (data.message === "Section added successfully") {
          toast.success(data.message);
          resetAddSectionFields();
          onClose();
        } else {
          toast.error(data.message || "Failed to add section.");
        }
      } catch (error) {
        console.log("An error occurred during adding.");
        console.log(error);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const resetAddCourseFields = () => {
    resetCourseCode();
    resetCourseName();
    resetCourseCategory();
    resetCourseCredit();
    resetCourseDescription();
    resetMaxStudents();
  };

  const resetAddSectionFields = () => {
    resetSelectedCourse();
    resetSemester();
    resetSectionNumber();
    resetSectionInstructor();
    resetSectionDuration();
    resetSectionPeriod();
    resetSectionLocation();
    setStudentEmails([""]);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          color: "#8D2A2A",
          borderRadius: "8px",
          padding: "20px",
          maxHeight: "90vh",
          overflowY: "auto",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3>{title}</h3>
        <button onClick={onClose} style={{ fontSize: "1.5rem", color: "#000" }}>
          &times;
        </button>
      </div>
      <p style={{ color: "#000000", marginBottom: "20px" }}>{message}</p>

      {/* Option Selector */}
      <div style={optionContainerStyle}>
        <label style={radioLabelStyle}>
          <input
            type="radio"
            value="addCourse"
            checked={option === "addCourse"}
            onChange={() => setOption("addCourse")}
          />
          Add New Course
        </label>
        <label style={radioLabelStyle}>
          <input
            type="radio"
            value="addSection"
            checked={option === "addSection"}
            onChange={() => setOption("addSection")}
          />
          Add Section for Existing Course
        </label>
      </div>

      {/* Conditional Form Rendering */}
      {option === "addCourse" ? (
        <form className="course-info-form" onSubmit={addCourseHandler}>
          <section>
            <h4 style={sectionHeaderStyle}>
              Add a New Course{" "}
              <span style={{ color: "gray", fontSize: "0.75em" }}>
                (never added here before)
              </span>
            </h4>
            <div className="course-info-fields" style={fieldsContainerStyle}>
              {/* Category */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="course-category">Category:</label>
                <select
                  className="input-field-wrap"
                  name="course-category"
                  id="course-category"
                  {...bindCourseCategory}
                  style={inputStyle}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Freshman Seminar">Freshman Seminar</option>
                  <option value="Honors Core Classes">
                    Honors Core Classes
                  </option>
                  <option value="Honors Seminar">Honors Seminar</option>
                  <option value="Honors Project">Honors Project</option>
                  <option value="CRACAD Presentation">
                    CRACAD Presentation
                  </option>
                  <option value="Service Events">Service Events</option>
                </select>
              </div>

              {/* Course Code */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="course-code">Course Code:</label>
                <input
                  type="text"
                  name="course-code"
                  id="course-code"
                  {...bindCourseCode}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Course Name */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="course-name">Course Name:</label>
                <input
                  type="text"
                  name="course-name"
                  id="course-name"
                  {...bindCourseName}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Max Students (Optional) */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="max-students">
                  Max Students{" "}
                  <span style={{ color: "gray", fontSize: "0.75em" }}>
                    (optional)
                  </span>
                </label>
                <input
                  type="number"
                  name="max-students"
                  id="max-students"
                  {...bindMaxStudents}
                  style={inputStyle}
                  min="1"
                />
              </div>

              {/* Description */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="course-description">Description:</label>
                <textarea
                  type="text"
                  name="course-description"
                  id="course-description"
                  {...bindCourseDescription}
                  style={inputStyle}
                  required
                />
              </div>
            </div>
          </section>

          <button type="submit" className="primary-btn" style={buttonStyle}>
            Add Course
          </button>
        </form>
      ) : (
        <form className="course-info-form" onSubmit={addSectionHandler}>
          <section>
            <h4 style={sectionHeaderStyle}>Add a Section to Existing Course</h4>
            <div className="course-info-fields" style={fieldsContainerStyle}>
              {/* Select Existing Course */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="select-course">Select Course:</label>
                <select
                  className="input-field-wrap"
                  name="select-course"
                  id="select-course"
                  {...bindSelectedCourse}
                  style={inputStyle}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course.courseCode}>
                      {course.courseCode} - {course.courseName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section number */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="section-number">Section Number:</label>
                <input
                  type="text"
                  className="input-field-wrap"
                  name="section-number"
                  id="section-number"
                  {...bindSectionNumber}
                  style={inputStyle}
                  placeholder="e.g., 001"
                  required
                />
              </div>

              {/* Semester */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="semester">Semester:</label>
                <select
                  className="input-field-wrap"
                  name="semester"
                  id="semester"
                  {...bindSemester}
                  style={inputStyle}
                  required
                >
                  <option value="">Select Semester</option>
                  {semesters.map((sem, index) => (
                    <option key={index} value={sem}>
                      {sem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Instructor */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="section-instructor">Instructor:</label>
                <input
                  type="text"
                  name="section-instructor"
                  id="section-instructor"
                  {...bindSectionInstructor}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Duration */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="section-duration">Duration:</label>
                <input
                  type="text"
                  name="section-duration"
                  id="section-duration"
                  placeholder="08/30/2024 - 12/15/2024"
                  {...bindSectionDuration}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Period */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="section-period">Period:</label>
                <input
                  type="text"
                  name="section-period"
                  id="section-period"
                  placeholder="MWF 10:00-11:00"
                  {...bindSectionPeriod}
                  style={inputStyle}
                  required
                />
              </div>

              {/* Location */}
              <div className="course-info-field" style={fieldStyle}>
                <label htmlFor="section-location">Location:</label>
                <input
                  type="text"
                  name="section-location"
                  id="section-location"
                  placeholder="Werner 123"
                  {...bindSectionLocation}
                  style={inputStyle}
                  required
                />
              </div>
            </div>
          </section>

          <section className="add-course-section" style={{ marginTop: "20px" }}>
            <h4 style={sectionHeaderStyle}>Add Students</h4>
            {studentEmails.map((email, index) => (
              <div key={index} className="course-info-field" style={fieldStyle}>
                <label htmlFor={`student-${index}`}>Student Email:</label>
                <div style={inputWithButtonStyle}>
                  <input
                    type="text"
                    name={`student-${index}`}
                    id={`student-${index}`}
                    value={email}
                    onChange={(e) => handleStudentChange(index, e.target.value)}
                    onFocus={() => setActiveInputIndex(index)} // Set active input index on focus
                    style={inputStyle}
                    required
                  />

                  <button
                    type="button"
                    onClick={() => removeStudentField(index)}
                    style={removeButtonStyle}
                  >
                    &times;
                  </button>
                  {activeInputIndex === index &&
                    emailSuggestions.length > 0 && (
                      <ul style={suggestionsListStyle}>
                        {emailSuggestions.map((suggestion, i) => (
                          <li
                            key={i}
                            style={{
                              ...suggestionItemStyle,
                              backgroundColor:
                                i === focusedIndex ? "#e0e0e0" : "#fff",
                            }}
                            onClick={() =>
                              handleStudentChange(index, suggestion)
                            }
                            onMouseEnter={() => setFocusedIndex(i)}
                            onMouseLeave={() => setFocusedIndex(-1)}
                          >
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    )}
                </div>
              </div>
            ))}
            
            <button
              type="button"
              onClick={addStudentField}
              style={addButtonStyle}
            >
              + Add Another Student
            </button>
          </section>

          <button type="submit" className="primary-btn" style={buttonStyle}>
            Add Section
          </button>
        </form>
      )}
    </Modal>
  );
};

export default AddCourse;

const suggestionsListStyle = {
  listStyleType: "none",
  margin: 0,
  padding: "5px",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#fff",
  maxHeight: "100px",
  overflowY: "auto",
  position: "absolute",
  zIndex: 10,
};

const suggestionItemStyle = {
  padding: "8px",
  cursor: "pointer",
};

// Inline styles for consistency and improved layout
const optionContainerStyle = {
  display: "flex",
  justifyContent: "start",

  marginBottom: "20px",
};

const radioLabelStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginRight: "50px",
  fontSize: "1rem",
  whiteSpace: "nowrap",
  gap: "1rem",
};

const sectionHeaderStyle = {
  marginBottom: "15px",
  fontSize: "1.2rem",
  color: "#333",
};

const fieldsContainerStyle = {
  display: "flex",
  flexDirection: "row",
  gap: "15px",
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  whiteSpace: "nowrap",
};

const inputStyle = {
  padding: "10px",
  border: "1px solid black",
  borderRadius: "4px",
  marginTop: "5px",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "10px 20px",
  backgroundColor: "#8D2A2A",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "20px",
  alignSelf: "center",
  marginRight: "20px",
};

const addButtonStyle = {
  padding: "5px 10px",
  backgroundColor: "#4CAF50",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  marginTop: "10px",
  alignSelf: "center",
};

const removeButtonStyle = {
  marginLeft: "10px",
  padding: "0 10px",
  backgroundColor: "#f44336",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  cursor: "pointer",
  alignSelf: "center",
};

const inputWithButtonStyle = {
  display: "flex",
  alignItems: "center",
  position: "relative",
};

// Function to generate semesters
function generateSemesters() {
  const currentYear = new Date().getFullYear();
  const semesters = [];

  for (let year = currentYear - 4; year <= currentYear + 4; year++) {
    semesters.push(`FA${year.toString().slice(-2)}`);
    semesters.push(`SP${(year + 1).toString().slice(-2)}`);
  }

  return semesters;
}
