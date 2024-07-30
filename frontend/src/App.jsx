// import from react 
import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// import from components
import Footer from "./components/layout/Footer";
import HomePage from "./components/layout/HomePage";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Students from "./components/students/Students";
import Courses from "./components//courses/Courses";
import PageNotFound from "./components/layout/PageNotFound";
import StudentProfile from "./components/students/StudentProfile";

// import from assets
import "./App.css";

// import from contexts
import { ThemeProvider } from "./context/theme";
import { authContext, AuthProvider } from "./context/authContext";


function App() {
  const [defaultTheme, setDefaultTheme] = useState("light");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  // functions for authContext
  const login = (user) => {
    setLoggedIn(true);
    setUser(user);
    sessionStorage.setItem("authToken", user.authToken);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setLoggedIn(false);
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("user");
  };

  // functions for themeContext
  const darkTheme = () => {
    setDefaultTheme("dark");
  };
  const lightTheme = () => {
    setDefaultTheme("light");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("dark", "light");
    document.querySelector("html").classList.add(defaultTheme);
  }, [defaultTheme]);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    const storedUser = sessionStorage.getItem("user");
    if (authToken && storedUser) {
      setLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ThemeProvider value={{ defaultTheme, darkTheme, lightTheme }}>
      <AuthProvider value={{ loggedIn, login, logout, user }}>

        <Router>

          <Navbar />

          {/* Adding Routes here  */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/students" element={<Students />} />
            <Route path="/profile" element={<StudentProfile />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <ToastContainer />

          <Footer />

        </Router>

      </AuthProvider>
    </ThemeProvider>
  );
}

export const homeThemeStyle = {
  backgroundColor: "#272727",
  color: "#f1f1f1",
};

export default App;
