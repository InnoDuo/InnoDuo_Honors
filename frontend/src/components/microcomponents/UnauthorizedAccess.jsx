import { ThemeContext } from "../../context/theme";
import { useContext } from "react";

const UnauthorizedAccess = () => {
    const { defaultTheme } = useContext(ThemeContext);
  return (
    <div className={`page-container ${defaultTheme === "dark" ? "dark-container" : ""}`}>
        <h1>Unauthorized access. Only admins have access to the page!</h1>
    </div>
  )
}

export default UnauthorizedAccess