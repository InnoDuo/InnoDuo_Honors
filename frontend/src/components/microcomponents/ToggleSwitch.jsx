import React from "react";
import "../../assets/css/toggleswitch.css";
import useTheme from "../../context/theme"


const ToggleSwitch = ({ label }) => {
  const {defaultTheme, darkTheme, lightTheme} = useTheme() 

  const onChangeBtn = (e) => {
    const darkModeStatus = e.currentTarget.checked
    if(darkModeStatus){
      darkTheme()
    }
    else{
      lightTheme()
    }
  };
  return (
    <div className="toggle-container">
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          onChange={onChangeBtn}
          checked={defaultTheme === 'dark'}
        />
        <label htmlFor={label} class="toggle-btn"></label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
