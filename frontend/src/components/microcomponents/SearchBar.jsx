import React, {useContext} from "react";
import "../../assets/css/customsearch.css";
import useInput from "./customhooks/useInput";
import { MdAddCircleOutline } from "react-icons/md";
import { HiFilter } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { ThemeContext } from "../../context/theme";


const SearchBar = ({search, onSearchChange, inpPlaceHolder, secBtn, priBtn, onAddClick }) => {
  const { defaultTheme } = useContext(ThemeContext);

  const searchSubmitHandler = (e)=>{
    e.preventDefault()
  }

  return (
    <div className={`search-and-filter-bar ${defaultTheme === 'dark' ? 'dark-container' : ''}`}>
      <div className="search-bar-container">
        <form className="search-bar-wrap" onSubmit={searchSubmitHandler}>
          <div className="search-bar">
            <input
              type="text"
              name="filter-field"
              id="filter-field"
              placeholder={inpPlaceHolder}
              value={search}
              onChange={onSearchChange}

            />
          </div>
          <div className="search-icon" type="submit">
            <IoSearch size={22}/>
          </div>
        </form>
      </div>
      <div className="filter-btns-container">
        <a type="button" className="filter-btn auth-btn">
          <HiFilter />
          <p>{secBtn}</p>
        </a>
        <a type="button" className="add-x-btn primary-btn" onClick={onAddClick}>
          <MdAddCircleOutline size={20} />
          <p>{priBtn}</p>
        </a>
      </div>
    </div>
  );
};

export default SearchBar;
