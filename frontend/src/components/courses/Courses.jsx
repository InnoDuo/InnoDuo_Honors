import { React, useContext, useEffect, useState } from "react";
import "../../assets/css/students.css";
import { ThemeContext } from "../../context/theme";
import { authContext } from "../../context/authContext";
import CoursesPage from "./CoursesPage";
import UnauthorizedAccess from "../microcomponents/UnauthorizedAccess";

const Courses = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const { loggedIn, user } = useContext(authContext);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("user from courses", user?.role);

  const getData = async () => {
    const authToken = sessionStorage.getItem("authToken");
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [loggedIn]);

  const categoryDisplayNames = {
    CRACAD: "CRACAD Presentation",
    Cores: "Honors Core Classes",
    Events: "Service Events",
    Freshman: "Freshman Seminar",
    Research: "Honors Project",
    Seminars: "Honors Seminars",
  };

  const transformData = (rawData) => {
    const classes = rawData.classes;
    const allClasses = [];

    Object.keys(classes).forEach((category) => {
      classes[category].forEach((classInfo) => {
        Object.keys(classInfo.semesters).forEach((semester) => {
          Object.keys(classInfo.semesters[semester]).forEach((section) => {
            const sectionInfo = classInfo.semesters[semester][section];
            if (sectionInfo.isComplete) {
              allClasses.push({
                courseCode: classInfo.courseCode,
                courseName: classInfo.courseName,
                courseCategory: categoryDisplayNames[category],
                instructor: sectionInfo.instructor, // Replace with actual data if available
                studentsCount: sectionInfo.students.length,
              });
            }
          });
        });
      });
    });

    return allClasses;
  };

  if(user?.role !== "admin" && user?.role !== "superAdmin") {
    return (
      <UnauthorizedAccess />
    )
  }

  return (
    <div
      className={`students-container page-container ${defaultTheme === 'dark' ? 'dark-container' : ''}`}
    >
      <h2>Honors Courses List</h2>
      {loading ? (
        <div class="main-item">
          <div class="static-background">
            <div class="background-masker btn-divide-left"></div>
          </div>

          <div class="animated-background">
            <div class="background-masker btn-divide-left"></div>
          </div>
        </div>
      ) : (
        <CoursesPage tableData={tableData} />
      )}
    </div>
  );
};

export default Courses;
