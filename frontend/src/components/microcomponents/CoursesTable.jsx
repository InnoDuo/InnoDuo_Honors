import React, { useContext } from "react";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";

const CoursesTable = ({ cols, tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);

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
                <td>{course.courseCode}</td>
                <td>{course.courseName}</td>
                <td>{course.courseCategory}</td>
                <td>{course.instructor}</td>
                <td>{course.studentsCount}</td>
                
                <td key="action-items" id="action-items">
                  <p>EDIT</p>
                  <span className="action-item-divider">|</span>
                  <p>DELETE</p>
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
