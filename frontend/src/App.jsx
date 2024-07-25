import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import HomePage from "./components/layout/HomePage";
import Navbar from "./components/layout/Navbar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Students from "./components/students/Students";
import Courses from "./components//courses/Courses";
import PageNotFound from "./components/layout/PageNotFound";
import StudentProfile from "./components/students/StudentProfile";
import { ThemeProvider } from "./context/theme";
import { React, useState, useEffect } from "react";
import { AuthProvider } from "./context/authContext";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [defaultTheme, setDefaultTheme] = useState("light");
  const [loggedIn, setLoggedIn] = useState();
  const [user, setUser] = useState();

  // useEffect(() => {
  //   const storedUser = sessionStorage.getItem("user");
  //   if (storedUser) {on
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);


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
      <AuthProvider value={{ loggedIn: !!user, login, logout, user }}>
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
