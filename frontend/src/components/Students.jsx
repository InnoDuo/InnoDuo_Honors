import {React, useContext, useEffect, useState} from "react";
import StudentsTable from "./microcomponents/StudentsTable";
import '../assets/css/students.css'
import SearchBar from "./microcomponents/SearchBar";
import { ThemeContext } from "../context/theme";
import { homeThemeStyle } from "../App";
import { authContext } from "../context/authContext";
import StudentsPage from "./StudentsPage";


const Students = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const { loggedIn } = useContext(authContext);

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
  }, [loggedIn]);

  return (
    <div className="students-container page-container" style={defaultTheme === 'dark' ? homeThemeStyle : {}}>
      <h2>Honors Students List</h2>
      <p>Logged in: {loggedIn? 'true':'false'}</p>
      {/* <SearchBar />
      <StudentsTable
        cols={[
          "First Name",
          "Last Name",
          "ID",
          "Major",
          "Advisor",
          "Graduation Year",
          "Status",
        ]}
        tableData={tableData}
      /> */}
      <StudentsPage tableData={tableData} />
    </div>
  );
};

export default Students;
