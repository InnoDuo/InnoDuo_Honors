import {React, useContext} from "react";
import CustomTable from "./microcomponents/CustomTable";
import '../assets/css/students.css'
import SearchBar from "./microcomponents/SearchBar";
import { ThemeContext } from "../context/theme";
import { homeThemeStyle } from "../App";
import { authContext } from "../context/authContext";


const Students = () => {
  const { defaultTheme } = useContext(ThemeContext);
  const { loggedIn } = useContext(authContext);
  return (
    <div className="students-container page-container" style={defaultTheme === 'dark' ? homeThemeStyle : {}}>
      <h2>Honors Students List</h2>
      <p>Logged in: {loggedIn}</p>
      <SearchBar />
      <CustomTable
        colNo={70}
        cols={[
          "Student Name",
          "ID",
          "Major",
          "Advisor",
          "Graduation Year",
          "Status",
        ]}
      />
    </div>
  );
};

export default Students;
