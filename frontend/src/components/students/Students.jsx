import { React, useContext, useEffect, useState } from "react";
import "../../assets/css/students.css";
import { ThemeContext } from "../../context/theme";
import { homeThemeStyle } from "../../App";
import { authContext } from "../../context/authContext";
import StudentsPage from "./StudentsPage";

const Students = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const { loggedIn } = useContext(authContext);

  const [tableData, setTableData] = useState([]);
  const [ loading, setLoading ] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [loggedIn]);

  return (
    <div
      className="students-container page-container"
      style={defaultTheme === "dark" ? homeThemeStyle : {}}
    >
      <h2>Honors Students List</h2>
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
        <StudentsPage tableData={tableData} />
      )}
    </div>
  );
};

export default Students;
