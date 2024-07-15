import { React, useContext, useEffect, useState } from "react";
import StudentsTable from "./microcomponents/StudentsTable";
import "../assets/css/students.css";
import SearchBar from "./microcomponents/SearchBar";
import { ThemeContext } from "../context/theme";
import { homeThemeStyle } from "../App";
import { authContext } from "../context/authContext";
import CoursesTable from "./microcomponents/CoursesTable";

const Courses = () => {
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
      const response = await fetch("http://localhost:3000/catalog", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authToken: `${authToken}`,
        },
      });
      const data = await response.json();
      const transformedData = transformData(data);
      setTableData(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [loggedIn]);

  const transformData = (rawData) => {
    const classes = rawData.classes;
    const allClasses = [];

    Object.keys(classes).forEach((category) => {
      classes[category].forEach((classInfo) => {
        Object.keys(classInfo.semesters).forEach((semester) => {
          Object.keys(classInfo.semesters[semester]).forEach((section) => {
            const sectionInfo = classInfo.semesters[semester][section];
            if (sectionInfo.isCompleted) {
              allClasses.push({
                courseCode: classInfo.courseCode,
                courseType: classInfo.courseName,
                instructor: "Instructor Name", // Replace with actual data if available
                studentsCount: sectionInfo.students.length,
              });
            }
          });
        });
      });
    });

    return allClasses;
  };

  const cols = ["Course Code", "Course Type", "Instructor", "Students Count", "Actions"];

  return (
    <div
      className="students-container page-container"
      style={defaultTheme === "dark" ? homeThemeStyle : {}}
    >
      <h2>Honors Courses List</h2>
      <SearchBar />
      <CoursesTable
        cols={cols}
        tableData={tableData}
      />
    </div>
  );
};

export default Courses;
