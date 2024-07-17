import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Students from "./components/Students";
import Courses from "./components/Courses";
import PageNotFound from "./components/PageNotFound";
import StudentProfile from "./components/StudentProfile";
import { ThemeProvider } from "./context/theme";
import { React, useState, useEffect } from "react";
import { AuthProvider } from "./context/authContext";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [defaultTheme, setDefaultTheme] = useState("light");
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const login = (user) => {
    setLoggedIn(true);
    setUser(user);
    localStorage.setItem("authToken", user.authToken);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setLoggedIn(false);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

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
    const authToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");
    if (authToken && storedUser) {
      setLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <ThemeProvider value={{ defaultTheme, darkTheme, lightTheme }}>
      <AuthProvider value={{ loggedIn, user, login, logout }}>
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
          {/* <HomePage /> */}
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
