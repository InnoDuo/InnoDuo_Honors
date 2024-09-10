import React, { useState, useEffect, useContext } from "react";
import { authContext } from "../../context/authContext";
import "../../assets/css/studentprofilecatalog.css";

const apiURL = "http://localhost:3000";
// const apiURL = "https://innoduo-honors.onrender.com";

const StudentProfileCatalog = (studentIdg) => {
  const [studentClasses, setStudentClasses] = useState([]);
  // TASK 2: Use AuthContext to get StudentID
  const {user} = useContext(authContext);
  const studentId = studentIdg || '40001';
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${apiURL}/catalog`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authToken: `${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStudentClasses(data.classes);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const requiredClasses = {
    CRACAD: 1,
    Cores: 2,
    Events: 2,
    Freshman: 1,
    Research: 1,
    Seminars: 2,
  };

  const categoryDisplayNames = {
    CRACAD: "CRACAD Presentation",
    Cores: "Honors Core Classes",
    Events: "Service Events",
    Freshman: "Freshman Seminar",
    Research: "Honors Project",
    Seminars: "Honors Seminars",
  };

  const isStudentInClass = (semesters) => {
    const takenSemesters = [];
    for (const semester in semesters) {
      for (const section in semesters[semester]) {
        const sectionData = semesters[semester][section];
        if (sectionData.students.includes(studentId.toString())) {
          takenSemesters.push({
            semester,
            section,
            isComplete: sectionData.isComplete,
          });
        }
      }
    }
    return takenSemesters;
  };

  const renderClass = (classes) => {
    const studentClasses = classes
      .map((cls) => {
        const takenSemesters = isStudentInClass(cls.semesters);
        if (takenSemesters.length > 0) {
          return (
            <div key={cls.courseCode}>
              
                
                {takenSemesters.map((ts, index) => (
                  <span><span
                      style={{
                        display: "inline-block",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: ts.isComplete ? "green" : "orange",
                        marginRight: "6px",
                      }}
                      ></span>{cls.courseCode}{" - "}{cls.courseName}{" "}<span key={index}>
                    ({ts.semester}, Section: {ts.section})
                    </span>
                    <br></br>
                  </span>
                ))}
              
            </div>
          );
        }
        return null;
      })
      .filter(Boolean);

    if (studentClasses.length === 0) {
      return <span>None</span>;
    }
    return studentClasses;
  };

  const getClassCount = (classes) => {
    return classes.reduce(
      (count, cls) =>
        count + (isStudentInClass(cls.semesters).length > 0 ? 1 : 0),
      0
    );
  };

  const renderCategory = (category, classes) => {
    const classCount = getClassCount(classes);
    const requiredCount = requiredClasses[category];
    const isCompleted = requiredCount - classCount;
    var isCompletedColor = "red";
    if (isCompleted <= 0){isCompletedColor = "green";}
    else if (classCount == 0){isCompletedColor = "red";}
    else if (isCompleted >= 1){isCompletedColor = "orange";}

    const circleStyle = {
      display: "inline-block",
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      backgroundColor: isCompletedColor,
      marginLeft: "10px",
      verticalAlign: "middle",
    };

    const categoryNameStyle = {
      flex: "1",
      textAlign: "left",
      paddingLeft: "20px",
    };

    const circleContainerStyle = {
      flex: "0 0 40px",
      textAlign: "center",
    };

    const classContainerStyle = {
      flex: "2",
      textAlign: "left",
      marginLeft: "20px",
    };

    return (
      <div
        key={category}
        className="category-section"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: "10px 0",
        }}
      >
        <h4 style={categoryNameStyle}>{categoryDisplayNames[category]}</h4>
        <div style={circleContainerStyle}>
          <div style={circleStyle}></div>
        </div>
        <div style={classContainerStyle}>{renderClass(classes)}</div>
      </div>
    );
  };
  

  return (
    <div className="catalog-container">
      <div className="catalog-box">
        <h3 className="user-name">Student Course Catalog</h3>
        <div className="catalog-contents">
          {Object.keys(studentClasses).map((category) =>
            renderCategory(category, studentClasses[category])
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfileCatalog;
