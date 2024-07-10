import React, {useState, useEffect} from "react";
import stuCatalog from "../../assets/test-json";
import "../../assets/css/studentprofilecatalog.css";

const apiURL = "http://localhost:3000";
// const apiURL = "https://innoduo-honors.onrender.com";

const StudentProfileCatalog = () => {
    const [courseCatalog, setcourseCatalog] = useState([]);
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        fetch(`${apiURL}/catalog`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                authToken: `${authToken}`
            },
        }).then((response) => response.json())
        .then((data) => {
            // setcourseCatalog(data);
            console.log(data);
        }).catch((error) => {
            console.error("Error fetching data:", error);
        });
    }, [])
            
    // TASK 2: Use AuthContext to get StudentID 
    // const studentId = 789898;

  return (
    <div className="catalog-container">
      <h3 className="user-name">Exact Student Name Catalog</h3>
      <div className="catalog-contents">
        {/* {console.log(stuCatalog)} */}
        <table>
          <tbody>

          <div className="catalog-layout catalog-box">
  {courseCatalog.map((category, index) => (
    <div className="catalog-category" key={index}>
      {Object.keys(category).map((catKey) => (
        <div key={catKey} className="category-section">
          <div className="category-name">{category[catKey].catName}</div>
          <div className="classes-container">
            {Object.keys(category[catKey]).map((classKey) => {
              if (classKey === 'catName') return null; // Skip the catName key
              const classInfo = category[catKey][classKey];
              const semesters = classInfo.semester;

              let isStudentInClass = false;
              Object.keys(semesters).forEach((semKey) => {
                Object.keys(semesters[semKey]).forEach((subSemKey) => {
                  if (semesters[semKey][subSemKey].includes(studentId)) {
                    isStudentInClass = true;
                  }
                });
              });

              if (!isStudentInClass) return null; // Skip classes the student is not in

              return (
                <div className="class-box" key={`${category[catKey].catName}-${classKey}`}>
                  <label className="class-title">{classInfo.className}</label>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  ))}
</div>

          </tbody>
        </table>
        {/* <div className="catalog-content">
                <label className="catagory-title">Honors Seminar</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Honors Core Classes</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Freshman Seminar</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Research Methodology</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Honors Project</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">CRACAD Presentation</label>
                <div className="catagory-lists"></div>
            </div>
            <div className="catalog-content">
                <label className="catagory-title">Service Events</label>
                <div className="catagory-lists"></div>
            </div> */}
      </div>
    </div>
  );
};

export default StudentProfileCatalog;

            {/* <div className="catalog-layout catalog-box">
              {stuCatalog.map((category, index) => (
                <div className="catalog-category" key={index}>
                  {Object.keys(category).map((catKey) => (
                    <div key={catKey} className="category-section">
                      <div className="category-name">
                        {category[catKey].catName} - boo
                      </div>
                      <div className="classes-container">
                        {Object.keys(category[catKey]).map((classKey) => {
                          if (classKey === "catName") return null; // Skip the catName key
                          return (
                            <div
                              className="class-box"
                              key={`${category[catKey].catName}-${classKey}`}
                            >
                              <label className="class-title">
                                {category[catKey][classKey].className}
                              </label>
                              {Object.keys(
                                category[catKey][classKey].semester
                              ).map((semKey) => (
                                <div key={semKey} className="semester-box">
                                  <div className="semester-title">{semKey}</div>
                                  {Object.keys(
                                    category[catKey][classKey].semester[semKey]
                                  ).map((subSemKey) => {
                                    return (
                                      <div
                                        key={subSemKey}
                                        className="class-lists"
                                      >
                                        {category[catKey][classKey].semester[
                                          semKey
                                        ][subSemKey].join(", ")}
                                      </div>
                                    );
                                  })}
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div> */}