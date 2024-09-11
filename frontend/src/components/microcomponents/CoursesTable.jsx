import React, { useContext, useState } from "react";
import "../../assets/css/customtable.css";
import useInput from "./customhooks/useInput";
import Modal from "../microcomponents/customhooks/Modal";
import { ThemeContext } from "../../context/theme";
import { toast } from "react-toastify";
import CourseInfoFields from "../courses/CourseInfoFields";
const baseURL = "http://localhost:3000";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production

const CoursesTable = ({ cols, tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);
  const [viewModalCourse, setViewModalCourse] = useState(null);
  const [editModalCourse, setEditModalCourse] = useState(null);

  const categoryDisplayNames = {
    CRACAD: "CRACAD Presentation",
    Cores: "Honors Core Classes",
    Events: "Service Events",
    FreshmanSeminar: "Freshman Seminar",
    Research: "Honors Project",
    Seminars: "Honors Seminars",
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const deleteCourseHandler = async (course) => {
    const confirmation = confirm(
      "Do you want to delete the course from your record? This action cannot be undone!"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(
        `${baseURL}/course/${getKeyByValue(
          categoryDisplayNames,
          course.courseCategory
        )}/${course.courseCode}/${course.semester}/${course.sectionId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(
        "An error occured while deleting the course. Please try again later"
      );
    }
  };

  return (
    <div
      className={`table-container ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <Modal
        isOpen={!!viewModalCourse}
        onClose={() => setViewModalCourse(null)}
      >
        <div>
          <h2>Course Details</h2>
          {/* Render detailed information about the student */}
          {viewModalCourse && (
            <div>
              <p>Course Code: {viewModalCourse.courseCode}</p>
              <p>Course Category: {viewModalCourse.courseCategory}</p>
              <p>Course Name: {viewModalCourse.courseName}</p>
              <p>Instructor: {viewModalCourse.instructor}</p>
              <p>Students Count: {viewModalCourse.studentsCount}</p>
              <p>Course Credits: {viewModalCourse.courseCredits}</p>
              <p>Location: {viewModalCourse.location}</p>
              <br></br>
              <p>Course Description: {viewModalCourse.courseDescription}</p>
              <br></br>
              <p>Course Semester: {viewModalCourse.semester}</p>
              <p>Section ID: {viewModalCourse.sectionId}</p>
              <br></br>
            </div>
          )}
        </div>
      </Modal>
      <Modal
        isOpen={!!editModalCourse}
        onClose={() => setEditModalCourse(null)}
      >
        <div>
          <h2>Edit Course</h2>
          {/* Render detailed information about the student */}
          
          {editModalCourse && (
            
            <CourseInfoFields
              courseData={editModalCourse} // Pass the selected course data here
            />
          )}
        </div>
      </Modal>
      <div className="table-content">
        <table className="cust-table">
          <thead className="cust-thead">
            <tr>
              {cols.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody className="cust-tbody">
            {tableData.map((course, index) => (
              <tr key={index}>
                <td>{course.semester}</td>
                <td>{course.courseCode}</td>
                <td>{course.sectionId}</td>
                <td>{course.courseName}</td>
                <td>{course.courseCategory}</td>
                <td>{course.instructor}</td>
                <td>{course.studentsCount}</td>
                <td key="action-items" id="action-items">
                  <p onClick={() => setViewModalCourse(course)}>VIEW</p>
                  <span className="action-item-divider">|</span>
                  <p onClick={() => setEditModalCourse(course)}>EDIT</p>
                  <span className="action-item-divider">|</span>
                  <p onClick={() => deleteCourseHandler(course)}>DELETE</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoursesTable;
