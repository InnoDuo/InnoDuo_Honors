import {React, useContext} from "react";
import CustomTable from "./microcomponents/CustomTable";
import '../assets/css/students.css'
import SearchBar from "./microcomponents/SearchBar";
import { ThemeContext } from "../context/theme";
import { homeThemeStyle } from "../App";


const Students = () => {
  const { defaultTheme } = useContext(ThemeContext);
  return (
    <div className="students-container page-container" style={defaultTheme === 'dark' ? homeThemeStyle : {}}>
      <h2>Honors Students List</h2>
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
