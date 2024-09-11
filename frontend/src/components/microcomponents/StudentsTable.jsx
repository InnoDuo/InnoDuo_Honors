<<<<<<< HEAD
import  React, {useContext, useState } from "react";
=======
import React, { useState, useContext } from 'react';
import Modal from './customhooks/Modal'; // Make sure the path to the Modal component is correct
>>>>>>> d26fe8a7e6f2752ec6d7540d4c7342ba539d6248
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";
import { toast } from "react-toastify";
import StudentProfileCatalog from './StudentProfileCatalog';
const baseUrl = "http://localhost:3000"; // dev tests
// const baseUrl = "https://innoduo-honors.onrender.com"; // prod

const StudentsTable = ({ cols, tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);
<<<<<<< HEAD
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStudentId, setHoveredStudentId] = useState(null);
=======
  const [modalStudent, setModalStudent] = useState(null);
>>>>>>> d26fe8a7e6f2752ec6d7540d4c7342ba539d6248

  const deleteHandler = async (student) => {
    const confirmation = confirm(
      "Do you want to delete the student from your record? This action cannot be undone!"
    );

    if (!confirmation) return;

    try {
      const response = await fetch(`${baseUrl}/students/${student._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        window.location.reload(); // Consider fetching and updating state instead of reloading
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err.message);
      toast.error(
        "An error occurred while deleting the student. Please try again later"
      );
    }
  };

  return (
    <div className={`table-container ${defaultTheme === "dark" ? "dark-container" : ""}`}>
      <Modal isOpen={!!modalStudent} onClose={() => setModalStudent(null)}>
        <div>
          <h2>Student Details</h2>
          {/* Render detailed information about the student */}
          {modalStudent && (
            <div>
              <p>Name: {modalStudent.firstName} {modalStudent.lastName}</p>
              <p>Student ID: {modalStudent.studentId}</p>
              <p>Major: {modalStudent.major}</p>
              <br></br>
              <StudentProfileCatalog studentIdg={modalStudent.studentId} />
            </div>
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
              <th>Actions</th>
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
<<<<<<< HEAD
                  <div 
                  className="stat-preview-container"
                  onMouseEnter={() => {
                    setHoveredStudentId(student._id);
                  }}
                  onMouseLeave={() => {
                    setHoveredStudentId(null);
                  }}>
                    <p>STATUS</p>
                    <div
                      className="stat-preview"
                    >
                      {
                        hoveredStudentId === student._id && (
                          <StudentStatusPreview student={student} />
                        )}
                    </div>
                  </div>
=======
                  <p onClick={() => setModalStudent(student)}>STATUS</p>
>>>>>>> d26fe8a7e6f2752ec6d7540d4c7342ba539d6248
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

const StudentStatusPreview = React.memo(({ student }) => {
  console.log("student");

  return(
    <div className="stat-preview-content">
      <p>Student Status for {student.firstName} {student.lastName}</p>
      </div>
  )
});

export default StudentsTable;
