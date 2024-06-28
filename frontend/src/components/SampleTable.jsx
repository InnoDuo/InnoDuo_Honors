import React, { useState, useEffect} from "react";

const SampleTable = () => {
    const [tableData, setTableData] = useState([]);

  const getData = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      console.error("You are not authenticated.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: `${authToken}`,
        },
      });
      const data = await response.json();
      setTableData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Student ID</th>
          <th>Major</th>
          <th>Advisor</th>
          <th>Grad Year</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((student) => (
          <tr key={student._id}>
            <td>{student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.studentId}</td>
            <td>{student.major}</td>
            <td>{student.advisor}</td>
            <td>{student.gradYear}</td>
            <td>{student.status.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SampleTable;
