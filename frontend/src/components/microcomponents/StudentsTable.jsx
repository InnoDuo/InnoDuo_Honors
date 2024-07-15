import { React, useContext } from "react";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";

const StudentsTable = ({ cols, tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);

  const deleteHandler = (student)=>{
    const confirmation = confirm("Do you want to delete the student from your record? This action cannot be undone!")

    if(confirmation){
      console.log(student)
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
                <td>{(student.status || []).join(", ")}</td>
                <td key="action-items" id="action-items">
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
