import React, { useContext, useState } from "react";
import CoursesTable from "../microcomponents/CoursesTable";
// import CourseSearchBar from "../microcomponents/CourseSearchBar";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";
import SearchBar from "../microcomponents/SearchBar";
import AddCourse from "../microcomponents/AddCourse";
import { authContext } from "../../context/authContext";

const CoursesPage = ({ tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);
  const {user} = useContext(authContext)
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  console.log(user)

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = ()=>{
    const close = confirm("Do you want to close the window?")
    if(close){
      setModalIsOpen(false)
    }
  }

  const filteredCourses = tableData.filter((course) =>
    `${course.courseCode} ${course.courseName} ${course.semester}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className={`${defaultTheme === "dark" ? "dark-container" : ""}`}>
      <SearchBar search={search} onSearchChange={handleSearchChange} inpPlaceHolder={'Course Code/Type'}  priBtn={'Add'} secBtn={'Filter'} onAddClick={handleAddClick}/>
      <CoursesTable
        cols={[
          "Semester",
          "Course Code",
          "Section",
          "Course Name",
          "Course Category",
          "Instructor",
          "Students Count",
          "Actions",
        ]}
        tableData={filteredCourses}
      />
      {modalIsOpen && (
        <AddCourse
          title="Add Courses"
          message="Fill in the details"
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default CoursesPage;
