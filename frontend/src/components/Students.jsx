import React from "react";
import CustomTable from "./microcomponents/CustomTable";
import '../assets/css/students.css'
import SearchBar from "./microcomponents/SearchBar";

const Students = () => {
  return (
    <div className="students-container page-container">
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
