import {React, useContext} from "react";
import "../../assets/css/footer.css";
import { homeThemeStyle } from "../../App";
import { ThemeContext } from "../../context/theme";


const Footer = () => {
  const { defaultTheme } = useContext(ThemeContext);

  return (
    <div className="footer" style={defaultTheme === 'dark' ? homeThemeStyle : {}}>
      Developed By{" "}
      <a href="http://github.com/anuj-khadka" class="inline-link">
        @anuj-khadka
      </a> &{" "}
      <a href="http://github.com/nta45" class="inline-link">
        @nta45
      </a>
    </div>
  );
};

export default Footer;
