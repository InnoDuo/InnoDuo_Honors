import React, { useState, useEffect, useContext } from "react";
import "../assets/css/signin.css";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import useInput from "./microcomponents/customhooks/useInput";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// const baseUrl = "https://innoduo-honors.onrender.com"; // production
const baseUrl = "http://localhost:3000"; // dev tests

import { ThemeContext } from "../context/theme";
import useAuth, { authContext } from "../context/authContext";

const SignIn = () => {
  const history = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [email, bindEmail, resetEmail] = useInput("");
  const [password, bindPassword, resetPassword] = useInput("");

  const { defaultTheme } = useContext(ThemeContext);

  const { loggedIn, login, logout } = useAuth();


  const showPassHandler = () => {
    let userPass = document.getElementById("user-password");
    if (!showPass) {
      userPass.type = "text";
      setShowPass(!showPass);
    } else {
      userPass.type = "password";
      setShowPass(!showPass);
    }
  };

  const signInHandler = async (e) => {
    e.preventDefault();
    resetEmail();
    resetPassword();

    try {
      const response = await fetch(baseUrl + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (data.message === "Logged in successfully") {
        login();
        console.log("Logged in successfully");
        console.log("logged in: ", loggedIn, "user: ");
        history('/students')
        console.log("logged in: ", loggedIn, "user: ");
      } else {
        logout();
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      logout();
      toast.error("An error occurred during sign in.");
    }

  };

  useEffect(() => {
    console.log("loggedIn updated:", loggedIn);
  }, [loggedIn]);


  return (
    <div
      className={`signin-page ${
        defaultTheme === "dark" ? "dark-container" : ""
      }`}
    >
      <div className="signin-container">
        <div className="signin-content">
          <h2 className="form-title">Sign In</h2>

          <form
            action=""
            method="post"
            className="auth-form"
            onSubmit={signInHandler}
          >
            <div className="form-fields">
              <div className="user-email-info input-field">
                <label htmlFor="user-email">Email</label>
                <div className="field-restrict">
                  <div
                    id="email-input-field"
                    className="input-field-wrap"
                    // style={wrapCondition}
                  >
                    <input
                      type="text"
                      name="user-email"
                      id="user-email"
                      placeholder="johndoe"
                      {...bindEmail}
                      required
                      // style={fieldCondition}
                    />
                  </div>
                  <span>@caldwell.edu</span>
                </div>
              </div>

              <div className="user-password-info input-field">
                <label htmlFor="user-password">Password</label>
                <div className="field-restrict">
                  <div
                    className="input-field-wrap"
                    // style={wrapCondition}
                  >
                    <input
                      type="password"
                      name="user-password"
                      id="user-password"
                      placeholder="***********"
                      {...bindPassword}
                      required
                      // style={fieldCondition}
                    />
                    <div className="display-password" onClick={showPassHandler}>
                      <PiEyeBold
                        id="open-eye"
                        className={`pass-icon ${
                          showPass ? "pass-display" : ""
                        }`}
                      />
                      <PiEyeClosedBold
                        id="closed-eye"
                        className={`pass-icon ${
                          showPass ? "" : "pass-display"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="auth-btn-holder">
              <div className="primary-btn">
              
                  <button type="submit">Sign In</button>
              </div>
            </div>
          </form>
        </div>
        <div className="other-options">
          <div className="register-link">Do not have an account? </div>
          <span>
            <NavLink to="/signup">
              <b>Signup</b>
            </NavLink>
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          console.log(loggedIn);
        }}
      >
        Hey
      </button>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
