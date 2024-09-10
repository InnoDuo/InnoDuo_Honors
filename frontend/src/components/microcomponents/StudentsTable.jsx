import { React, useContext } from "react";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";
import { toast } from "react-toastify";

const baseURL = "http://localhost:3000";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production


const StudentsTable = ({ cols, tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);

  const deleteHandler = async (student)=>{
    const confirmation = confirm("Do you want to delete the student from your record? This action cannot be undone!")

    try{
      const response = await fetch(`${baseURL}/students/${student._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message)
        window.location.reload();
      } else {
        toast.error(data.message)
      }
    }
    catch(err){
      console.log(err.message);
      toast.error("An error occured while deleting the student. Please try again later");
    }
  }
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
                  <p onClick={()=>deleteHandler(student)}>DELETE</p>
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
