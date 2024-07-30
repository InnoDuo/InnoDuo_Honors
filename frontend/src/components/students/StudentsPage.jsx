import React, { useContext, useState } from "react";
import StudentsTable from "../microcomponents/StudentsTable";
import SearchBar from "../microcomponents/SearchBar";
import "../../assets/css/customtable.css";
import { ThemeContext } from "../../context/theme";
import AddContent from "../microcomponents/AddContent";
import { authContext } from "../../context/authContext";
import UnauthorizedAccess from "../microcomponents/UnauthorizedAccess";

const StudentsPage = ({ tableData }) => {
  const { defaultTheme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const {user} = useContext(authContext);

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

  const filteredStudents = tableData.filter((student) =>
    `${student.firstName} ${student.lastName} ${student.studentId}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if(user?.role !== "admin" && user?.role !== "superAdmin") {
    return (
      <UnauthorizedAccess />
    )
  }

  return (
    <div className={`${defaultTheme === "dark" ? "dark-container" : ""}`}>
      <SearchBar
        search={search}
        onSearchChange={handleSearchChange}
        inpPlaceHolder={"Student Name"}
        priBtn={"Add"}
        secBtn={"Filter"}
        onAddClick={handleAddClick}
      />
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
      {modalIsOpen && (
        <AddContent
          title="Add Student"
          message="Fill in the details"
          onClose={onCloseModal}
        />
      )}
    </div>
  );
};

export default StudentsPage;
