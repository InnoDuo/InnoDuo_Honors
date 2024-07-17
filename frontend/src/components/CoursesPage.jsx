import React, { useContext, useState } from "react";
import CoursesTable from "./microcomponents/CoursesTable";
import CourseSearchBar from "./microcomponents/CourseSearchBar";
import "../assets/css/customtable.css";
import { ThemeContext } from "../context/theme";

const CoursesPage = ({ tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCourses = tableData.filter((course) =>
    `${course.courseCode} ${course.courseName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={`${defaultTheme === "dark" ? "dark-container" : ""}`}>
      <CourseSearchBar search={search} onSearchChange={handleSearchChange} />
      <CoursesTable
        cols={[
          "Course Code",
          "Course Type",
          "Course Category",
          "Instructor",
          "Students Count",
          "Actions",
        ]}
        tableData={filteredCourses}
      />
    </div>
  );
};

export default CoursesPage;
