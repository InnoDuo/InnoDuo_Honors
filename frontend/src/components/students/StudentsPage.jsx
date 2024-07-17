import React, { useContext, useState } from "react";
import StudentsTable from "../microcomponents/StudentsTable";
import SearchBar from "../microcomponents/SearchBar";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";

const StudentsPage = ({tableData}) => {
  const { defaultTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredStudents = tableData.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.studentId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div
      className={`${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <SearchBar search={search} onSearchChange={handleSearchChange} inpPlaceHolder={'Student Name'} priBtn={'Add'} secBtn={'Filter'}/>
      <StudentsTable
        cols={[
          "First Name",
          "Last Name",
          "Student ID",
          "Major",
          "Advisor",
          "Graduation Year",
        ]}
        tableData={filteredStudents}
      />
    </div>
  );
};

export default StudentsPage;
