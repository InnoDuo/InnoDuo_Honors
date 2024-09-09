import { React, useContext } from "react";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";
import { ToastContainer, toast } from "react-toastify";

// url to connect to the backend
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

const StudentsTable = ({ cols, tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);

  const deleteHandler = async (student) => {
    const confirmation = confirm(
      "Do you want to delete the student from your record? This action cannot be UNDONE!"
    );

    if (confirmation) {
      try {
        const response = await fetch(baseUrl + "/delete-student", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ studentId: student.studentId }),
        });
        const data = await response.json();
        if (data.message === "Student deleted successfully") {
          toast.success("Student deleted successfully");
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("An error occurred while deleting student");
        }
      } catch (error) {
        toast.error("An error occurred while deleting student");
      }
    }
  };
  return (
    <div
      className={`table-container ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <div className="table-content">
        <table className="cust-table">
          <thead className="cust-thead">
            <tr>
              {cols.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
              <th key="actions">Actions</th>
            </tr>
          </thead>

          <tbody className="cust-tbody">
            {tableData.map((student) => (
              <tr key={student._id}>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.studentId}</td>
                <td>{student.major}</td>
                <td>{student.advisor}</td>
                <td>{student.gradYear}</td>
                <td key="action-items" id="action-items">
                  <p>STATUS</p>
                  <span className="action-item-divider">|</span>
                  <p>EDIT</p>
                  <span className="action-item-divider">|</span>
                  <p onClick={() => deleteHandler(student)}>DELETE</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsTable;
