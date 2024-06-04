import React from "react";
import "../../assets/css/customsearch.css";
import useInput from "./useInput";
import { MdAddCircleOutline } from "react-icons/md";
import { HiFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";


const SearchBar = () => {
    const [search, bindSearch, resetSearch] = useInput('')
  return (
    <div className="search-and-filter-bar">
      <div className="search-bar-container">
        <form className="search-bar-wrap">
          <form className="search-bar">
            <input
              type="text"
              name="filter-field"
              id="filter-field"
              placeholder="Student Name"
              {...bindSearch}
            />
          </form>
          <div className="search-icon">
            <IoSearch size={22}/>
          </div>
        </form>
      </div>
      <div className="filter-btns-container">
        <a type="button" className="filter-btn auth-btn">
          <HiFilter />
          <p>Filter</p>
        </a>
        <a type="button" className="add-x-btn primary-btn">
          <MdAddCircleOutline size={20} />
          <p>Add</p>
        </a>
      </div>
    </div>
  );
};

export default SearchBar;
