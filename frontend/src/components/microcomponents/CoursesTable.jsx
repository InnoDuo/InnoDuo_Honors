import React, { useContext } from "react";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";
import { toast } from "react-toastify";
const baseURL = "http://localhost:3000";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production

const CoursesTable = ({ cols, tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);

  const categoryDisplayNames = {
    CRACAD: "CRACAD Presentation",
    Cores: "Honors Core Classes",
    Events: "Service Events",
    FreshmanSeminar: "Freshman Seminar",
    Research: "Honors Project",
    Seminars: "Honors Seminars",
  };

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find(key => object[key] === value);
  };

  const deleteCourseHandler = async (course) => {
    const confirmation = confirm(
      "Do you want to delete the course from your record? This action cannot be undone!"
    );

    if (!confirmation) {
      return;
    }

    try {
      const response = await fetch(`${baseURL}/course/${getKeyByValue(categoryDisplayNames, course.courseCategory)}/${course.courseCode}/${course.semester}/${course.sectionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
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
    <div className={`table-container ${defaultTheme === "dark" ? "dark-container" : ""}`}>
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
                  <p>VIEW</p>
                  <span className="action-item-divider">|</span>
                  <p>EDIT</p>
                  <span className="action-item-divider">|</span>
                  <p onClick={()=> deleteCourseHandler(course)}>DELETE</p>
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
