import {React, useContext} from "react";
import '../../assets/css/customtable.css'
import { ThemeContext } from "../../context/theme";
import { homeThemeStyle } from "../../App";

const CustomTable = ({ colNo, cols }) => {
  const { defaultTheme } = useContext(ThemeContext);

  return (
    <div className={`table-container ${defaultTheme === 'dark' ? 'dark-container' : ''}`}>
      <div className="table-content">
        <table className="cust-table">
          <thead className="cust-thead">
            <tr>
              {cols.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            <th key='actions'>Actions</th>
            </tr>

            </thead>
          <tbody className="cust-tbody" >
            {[...Array(colNo)].map((_, index) => (
              <tr key={index} >
                {/* {cols.map((_, colIndex) => (
                  <td key={colIndex}>Nice</td>
                ))} */}
                <td>Anuj Khadka</td>
                <td>456123</td>
                <td>Computer Science</td>
                <td>Lee Ho</td>
                <td>2027</td>
                <td>In Progress</td>
                <td key='action-items' id='action-items'>
                    <p>EDIT</p>
                    <span className="action-item-divider">|</span>
                    <p>DELETE</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
