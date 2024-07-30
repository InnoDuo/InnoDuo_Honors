// import from react
import {React, useContext} from "react";

// import from assets
import "../../assets/css/footer.css";

// import from context
import { ThemeContext } from "../../context/theme";


const Footer = () => {
  const { defaultTheme } = useContext(ThemeContext);

  return (
    <div className={`footer ${defaultTheme === 'dark' ? 'dark-container' : ''}`}>
      Developed By{" "}
      <a href="http://github.com/anuj-khadka" target="_blank" class="inline-link">
        @anuj-khadka
      </a> &{" "}
      <a href="http://github.com/nta45" target="_blank" class="inline-link">
        @nta45
      </a>
    </div>
  );
};

export default Footer;
