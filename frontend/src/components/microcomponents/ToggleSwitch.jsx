import React from "react";
import "../../assets/css/toggleswitch.css";

const ToggleSwitch = ({ label }) => {
  const onChangeBtn = ()=>{}
  return (
    <div className="toggle-container">
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox" name={label} id={label} onChange={onChangeBtn}/>
        <label htmlFor={label} class="toggle-btn"></label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
